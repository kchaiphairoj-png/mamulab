// SlipOK API integration — automatic slip verification.
// Docs: https://slipok.com/docs
//
// We use the "verify-by-file" endpoint: send the slip image and SlipOK does the
// QR-decoding + bank-API check for us, returning structured data we can match
// against our expected amount.
//
// All functions throw a SlipOKError on failure with a Thai-friendly message
// suitable for displaying to end users.

const ENDPOINT_BASE = "https://api.slipok.com/api/line/apikey";

export class SlipOKError extends Error {
  constructor(
    public code:
      | "CONFIG_MISSING"
      | "DUPLICATE_SLIP"
      | "AMOUNT_MISMATCH"
      | "ACCOUNT_MISMATCH"
      | "SLIP_INVALID"
      | "NETWORK_ERROR"
      | "UNKNOWN",
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "SlipOKError";
  }
}

export type SlipOKResult = {
  ref: string;
  amount: number;
  transTimestamp: string;
  receiver: { name?: string; bank?: string; account?: string };
  sender: { name?: string; bank?: string; account?: string };
  raw: unknown;
};

/**
 * Verify a slip image with SlipOK.
 *
 * @param imageBytes  Raw bytes of the slip image (PNG/JPG)
 * @param fileName    Original file name (for the multipart filename)
 * @returns           Parsed verification result on success
 */
export async function verifySlip(
  imageBytes: ArrayBuffer | Uint8Array,
  fileName = "slip.jpg"
): Promise<SlipOKResult> {
  const apiKey = process.env.SLIPOK_API_KEY;
  const branchId = process.env.SLIPOK_BRANCH_ID;

  if (!apiKey || !branchId) {
    throw new SlipOKError(
      "CONFIG_MISSING",
      "ระบบยังไม่ได้ตั้งค่า SlipOK กรุณาติดต่อแอดมิน"
    );
  }

  const url = `${ENDPOINT_BASE}/${branchId}`;
  const blob = new Blob([imageBytes as BlobPart]);
  const form = new FormData();
  form.append("files", blob, fileName);
  form.append("log", "true"); // SlipOK records duplicate detection only when log=true

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "x-authorization": apiKey },
      body: form,
    });
  } catch (err) {
    throw new SlipOKError(
      "NETWORK_ERROR",
      "เชื่อมต่อระบบตรวจสลิปไม่ได้ ลองใหม่อีกครั้ง",
      err
    );
  }

  const json = (await res.json().catch(() => null)) as
    | SlipOKApiResponse
    | null;

  if (!res.ok || !json?.success) {
    // Map known SlipOK error codes to friendlier Thai messages
    const code = json?.code as number | undefined;
    if (code === 1012) {
      throw new SlipOKError(
        "DUPLICATE_SLIP",
        "สลิปนี้ถูกใช้ไปแล้ว กรุณาใช้สลิปใหม่",
        json
      );
    }
    if (code === 1010) {
      throw new SlipOKError(
        "SLIP_INVALID",
        "อ่านสลิปไม่ออก กรุณาส่งภาพชัด ๆ อีกครั้ง",
        json
      );
    }
    throw new SlipOKError(
      "SLIP_INVALID",
      json?.message ?? "ตรวจสลิปไม่ผ่าน กรุณาลองใหม่",
      json
    );
  }

  const d = json.data;
  return {
    ref: d.transRef,
    amount: Number(d.amount),
    transTimestamp: d.transTimestamp,
    receiver: {
      name: d.receiver?.displayName ?? d.receiver?.name,
      bank: d.receiver?.bank?.short ?? d.receiver?.bankName,
      account: d.receiver?.account?.value,
    },
    sender: {
      name: d.sender?.displayName ?? d.sender?.name,
      bank: d.sender?.bank?.short ?? d.sender?.bankName,
      account: d.sender?.account?.value,
    },
    raw: json,
  };
}

/**
 * Validate that a SlipOK result matches our expected amount and receiving
 * account. Throws on mismatch.
 */
export function assertMatchesExpected(
  result: SlipOKResult,
  expected: { amount: number; receiverAccountNumber: string }
) {
  if (result.amount !== expected.amount) {
    throw new SlipOKError(
      "AMOUNT_MISMATCH",
      `ยอดในสลิป (${result.amount} บาท) ไม่ตรงกับยอดที่ต้องชำระ (${expected.amount} บาท)`
    );
  }

  if (result.receiver.account) {
    const slipAcc = result.receiver.account.replace(/\D/g, "");
    const expectAcc = expected.receiverAccountNumber.replace(/\D/g, "");
    // SlipOK often masks middle digits with X — compare visible digits
    const matches = compareMaskedAccount(slipAcc, expectAcc);
    if (!matches) {
      throw new SlipOKError(
        "ACCOUNT_MISMATCH",
        "เลขบัญชีผู้รับในสลิปไม่ตรงกับบัญชีของ MAMULAB"
      );
    }
  }
}

function compareMaskedAccount(slip: string, expected: string): boolean {
  // SlipOK may return e.g. "xxx-x-x4379-x". Strip mask chars and check
  // that every digit in slip appears at the same position in expected.
  if (slip.length !== expected.length && slip.length !== 0) {
    // Different format — only compare last 4 as fallback
    return slip.slice(-4) === expected.slice(-4);
  }
  for (let i = 0; i < slip.length; i++) {
    const c = slip[i];
    if (c === "x" || c === "X" || c === "*" || c === "-") continue;
    if (c !== expected[i]) return false;
  }
  return true;
}

// ---------- Types matching SlipOK response ----------

type SlipOKApiResponse = {
  success: boolean;
  code?: number;
  message?: string;
  data: {
    transRef: string;
    amount: number | string;
    transTimestamp: string;
    receiver?: {
      displayName?: string;
      name?: string;
      bank?: { short?: string };
      bankName?: string;
      account?: { value?: string };
    };
    sender?: {
      displayName?: string;
      name?: string;
      bank?: { short?: string };
      bankName?: string;
      account?: { value?: string };
    };
  };
};
