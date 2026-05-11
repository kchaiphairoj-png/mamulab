/**
 * POST /api/payment/verify
 *
 * Receives a slip image, extracts the embedded QR code, and grants a 30-day
 * membership if the slip has never been used before.
 *
 * No external service is required — we use server-side QR decoding so the
 * customer can pay → upload → use immediately.
 *
 * Flow:
 *  1. Auth check
 *  2. Validate file (type, size)
 *  3. Upload to Supabase Storage (audit trail)
 *  4. Decode QR + check uniqueness against `payments.slip_ref`
 *  5. On success: insert payment(verified) + membership(active, +30 days)
 *  6. On failure: insert payment(rejected) with reason
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PAYMENT } from "@/lib/payment";
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

  // 2. Read file from form-data
  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    if (f instanceof File) file = f;
  } catch {
    return NextResponse.json(
      { ok: false, error: "อ่านไฟล์ไม่ได้" },
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
  const slipPath = `${user.id}/${Date.now()}.${ext}`;

  // 3. Upload to Storage (we keep a copy regardless of outcome)
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
    await recordRejected(supabase, user.id, slipPath, message);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 400 }
    );
  }

  // 5. Insert payment with slip_ref = hash. The unique index on slip_ref
  //    will reject duplicates atomically.
  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + PAYMENT.durationDays * 86400000
  );

  const { error: payErr } = await supabase.from("payments").insert({
    user_id: user.id,
    amount: PAYMENT.price,
    slip_url: slipPath,
    slip_ref: fingerprint.hash,
    trans_date: now.toISOString(),
    status: "verified",
    verified_at: now.toISOString(),
  });
  if (payErr) {
    if (payErr.code === "23505") {
      // Unique violation = slip already used
      await recordRejected(
        supabase,
        user.id,
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

  // 6. Grant membership
  const { error: memErr } = await supabase.from("memberships").insert({
    user_id: user.id,
    plan: "monthly",
    status: "active",
    started_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
  });
  if (memErr) {
    console.error("membership insert failed", memErr);
    return NextResponse.json(
      { ok: false, error: "เปิดสมาชิกไม่สำเร็จ ติดต่อแอดมิน" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    expiresAt: expiresAt.toISOString(),
  });
}

async function recordRejected(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  slipPath: string,
  reason: string
) {
  await supabase.from("payments").insert({
    user_id: userId,
    amount: PAYMENT.price,
    slip_url: slipPath,
    status: "rejected",
    rejected_reason: reason,
  });
}
