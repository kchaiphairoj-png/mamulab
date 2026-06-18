/**
 * POST /api/payment/verify
 *
 * Receives a slip image, extracts the embedded QR code, and grants the
 * product entitlement (Library, Course, or Inner Circle) keyed by
 * `product_code` from the form payload.
 *
 * Flow:
 *  1. Auth check
 *  2. Resolve product_code → product (default 'library' for backwards compat)
 *  3. Validate file (type, size)
 *  4. Upload to Supabase Storage (audit trail, scoped by product)
 *  5. Decode QR + check uniqueness against `payments.slip_ref`
 *  6. On success: insert payment(verified) + grant entitlement
 *  7. On failure: insert payment(rejected) with reason
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProduct, isProductCode } from "@/lib/products";
import {
  durationWindow,
  grantEntitlement,
} from "@/lib/membership";
import { extractSlipFingerprint, SlipError } from "@/lib/slipQR";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // 1. Must be logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "กรุณา login ก่อน" },
      { status: 401 }
    );
  }

  // 2. Read form
  let file: File | null = null;
  let productCodeRaw = "library";
  try {
    const form = await req.formData();
    const f = form.get("file");
    if (f instanceof File) file = f;
    const pc = form.get("product_code");
    if (typeof pc === "string" && pc.trim()) productCodeRaw = pc.trim();
  } catch {
    return NextResponse.json(
      { ok: false, error: "อ่านไฟล์ไม่ได้" },
      { status: 400 }
    );
  }

  if (!isProductCode(productCodeRaw)) {
    return NextResponse.json(
      { ok: false, error: "ไม่รู้จักรายการสินค้านี้" },
      { status: 400 }
    );
  }
  const product = getProduct(productCodeRaw);
  if (!product || !product.active) {
    return NextResponse.json(
      { ok: false, error: "สินค้านี้ปิดการขายแล้ว" },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json(
      { ok: false, error: "ไม่พบไฟล์สลิป" },
      { status: 400 }
    );
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { ok: false, error: "ไฟล์ต้องเป็นรูปภาพ (JPG / PNG / WebP)" },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "ไฟล์ใหญ่เกิน 5MB" },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  // Path scopes by product so admin can browse slips per product.
  const slipPath = `${user.id}/${product.code}/${Date.now()}.${ext}`;

  // 3. Upload to Storage
  const { error: uploadErr } = await supabase.storage
    .from("slips")
    .upload(slipPath, file, {
      contentType: file.type,
      upsert: false,
    });
  if (uploadErr) {
    console.error("slip upload failed", uploadErr);
    return NextResponse.json(
      { ok: false, error: "อัปโหลดสลิปไม่สำเร็จ ลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }

  // 4. Decode QR + validate
  let fingerprint;
  try {
    fingerprint = await extractSlipFingerprint(buffer);
  } catch (err) {
    const message =
      err instanceof SlipError ? err.message : "ตรวจสลิปไม่ผ่าน";
    await recordRejected(supabase, user.id, product.code, slipPath, message);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 400 }
    );
  }

  // 5. Insert payment with slip_ref = hash. The unique index on slip_ref
  //    will reject duplicates atomically across all products.
  const window = durationWindow(product.code);
  if (!window) {
    return NextResponse.json(
      { ok: false, error: "ไม่พบ config ของสินค้านี้" },
      { status: 500 }
    );
  }

  const { error: payErr } = await supabase.from("payments").insert({
    user_id: user.id,
    product_code: product.code,
    amount: product.price,
    slip_url: slipPath,
    slip_ref: fingerprint.hash,
    trans_date: window.startedAt.toISOString(),
    status: "verified",
    verified_at: window.startedAt.toISOString(),
  });
  if (payErr) {
    if (payErr.code === "23505") {
      // Unique violation = slip already used (across any product)
      await recordRejected(
        supabase,
        user.id,
        product.code,
        slipPath,
        "สลิปนี้ถูกใช้ไปแล้ว"
      );
      return NextResponse.json(
        { ok: false, error: "สลิปนี้ถูกใช้ไปแล้ว กรุณาใช้สลิปใหม่" },
        { status: 409 }
      );
    }
    console.error("payment insert failed", payErr);
    return NextResponse.json(
      { ok: false, error: "บันทึกการชำระไม่สำเร็จ ติดต่อแอดมิน" },
      { status: 500 }
    );
  }

  // 6. Grant entitlement (extends existing if user already had one active)
  const grantRes = await grantEntitlement(supabase, {
    userId: user.id,
    productCode: product.code,
    startedAt: window.startedAt,
    expiresAt: window.expiresAt,
  });
  if (grantRes.error) {
    console.error("entitlement insert failed", grantRes.error);
    return NextResponse.json(
      { ok: false, error: "เปิดสิทธิ์ใช้งานไม่สำเร็จ ติดต่อแอดมิน" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    productCode: product.code,
    expiresAt: window.expiresAt.toISOString(),
  });
}

async function recordRejected(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  productCode: string,
  slipPath: string,
  reason: string
) {
  const product = getProduct(productCode);
  await supabase.from("payments").insert({
    user_id: userId,
    product_code: productCode,
    amount: product?.price ?? 0,
    slip_url: slipPath,
    status: "rejected",
    rejected_reason: reason,
  });
}
