/**
 * POST /api/payment/verify
 *
 * Receives a slip image from the authenticated user. Flow:
 *  1. Validate file (type, size)
 *  2. Upload to Supabase Storage (`slips/{user_id}/...`)
 *  3. Forward image to SlipOK for automatic verification
 *  4. Assert amount + receiving account match our configured values
 *  5. On success: insert membership (active, +30 days) + payment (verified)
 *  6. On failure: insert payment (rejected) with reason, return error
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PAYMENT } from "@/lib/payment";
import {
  verifySlip,
  assertMatchesExpected,
  SlipOKError,
} from "@/lib/slipok";

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
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const slipPath = `${user.id}/${Date.now()}.${ext}`;

  // 3. Upload to Storage (we keep a copy regardless of verification outcome)
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

  // 4. Verify with SlipOK
  try {
    const result = await verifySlip(arrayBuffer, file.name);

    assertMatchesExpected(result, {
      amount: PAYMENT.price,
      receiverAccountNumber: PAYMENT.bank.accountNumber,
    });

    // 5a. Success → record payment + grant membership
    const now = new Date();
    const expiresAt = new Date(
      now.getTime() + PAYMENT.durationDays * 86400000
    );

    const { error: payErr } = await supabase.from("payments").insert({
      user_id: user.id,
      amount: result.amount,
      slip_url: slipPath,
      slip_ref: result.ref,
      trans_date: result.transTimestamp,
      status: "verified",
      verified_at: now.toISOString(),
      slipok_response: result.raw as object,
    });
    if (payErr) {
      // Possibly duplicate ref — still surface as duplicate to user
      if (payErr.code === "23505") {
        return NextResponse.json(
          { ok: false, error: "สลิปนี้ถูกใช้ไปแล้ว" },
          { status: 409 }
        );
      }
      console.error("payment insert failed", payErr);
      return NextResponse.json(
        { ok: false, error: "บันทึกการชำระไม่สำเร็จ ติดต่อแอดมิน" },
        { status: 500 }
      );
    }

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
  } catch (err) {
    // 5b. Failure → record rejected payment + return Thai error
    const message =
      err instanceof SlipOKError ? err.message : "ตรวจสลิปไม่ผ่าน";

    await supabase.from("payments").insert({
      user_id: user.id,
      amount: PAYMENT.price,
      slip_url: slipPath,
      status: "rejected",
      rejected_reason: message,
      slipok_response:
        err instanceof SlipOKError ? (err.details as object) : null,
    });

    return NextResponse.json(
      { ok: false, error: message },
      { status: 400 }
    );
  }
}
