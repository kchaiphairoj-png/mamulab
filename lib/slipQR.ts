/**
 * slipQR — extract & validate a Thai bank slip QR.
 *
 * Why server-side: prevents the browser from lying about the QR contents.
 *
 * Validation strategy (simplest workable):
 *  1. Read the image with jimp (pure-JS, no native deps so it works on Vercel).
 *  2. Decode QR using jsQR.
 *  3. Confirm the payload starts with EMVCo header "0002" — every Thai bank
 *     slip QR begins with this. Random photos / unrelated QRs are rejected.
 *  4. Hash the QR string → use as `slip_ref` for the unique constraint on
 *     payments. A slip cannot be re-used because the same QR yields the same
 *     hash, and the DB rejects duplicates.
 */

import { createHash } from "node:crypto";
import jsQR from "jsqr";
import { Jimp } from "jimp";

export class SlipError extends Error {
  constructor(
    public code:
      | "NO_QR"
      | "NOT_SLIP"
      | "DUPLICATE"
      | "READ_FAIL",
    message: string
  ) {
    super(message);
    this.name = "SlipError";
  }
}

export type SlipFingerprint = {
  /** Raw QR string scanned from the slip */
  qr: string;
  /** SHA-256 fingerprint truncated to 64 hex chars — used as slip_ref */
  hash: string;
};

export async function extractSlipFingerprint(
  buffer: Buffer
): Promise<SlipFingerprint> {
  let image;
  try {
    image = await Jimp.read(buffer);
  } catch {
    throw new SlipError("READ_FAIL", "อ่านไฟล์ภาพไม่ได้ ลองใหม่อีกครั้ง");
  }

  // jimp returns a Buffer in image.bitmap.data; wrap it in Uint8ClampedArray
  // for jsQR without copying.
  const { data, width, height } = image.bitmap;
  const pixels = new Uint8ClampedArray(
    data.buffer,
    data.byteOffset,
    data.byteLength
  );

  const code = jsQR(pixels, width, height);
  if (!code) {
    throw new SlipError(
      "NO_QR",
      "ไม่พบ QR code ในภาพ กรุณาส่งภาพสลิปแบบเต็มที่เห็น QR ชัดเจน"
    );
  }

  const qr = code.data;
  // Thai bank slip QRs follow EMVCo TLV format. The first 4 chars are the
  // PayloadFormatIndicator tag (00) + length (02) — i.e. "0002".
  if (!qr.startsWith("0002")) {
    throw new SlipError(
      "NOT_SLIP",
      "QR นี้ไม่ใช่สลิปธนาคาร กรุณาส่งสลิปจริง"
    );
  }

  const hash = createHash("sha256").update(qr).digest("hex");

  return { qr, hash };
}
