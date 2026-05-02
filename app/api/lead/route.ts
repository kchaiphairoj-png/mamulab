import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name: string;
  email: string;
  consent: boolean;
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<LeadPayload>;
    const name = (body.name ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim().toLowerCase();
    const consent = Boolean(body.consent);
    const source = (body.source ?? "landing").toString();

    if (!name || !email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "INVALID_INPUT" },
        { status: 400 }
      );
    }
    if (!consent) {
      return NextResponse.json(
        { ok: false, error: "CONSENT_REQUIRED" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const record = { name, email, consent, source, timestamp };

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      // POST to Google Apps Script webhook / Zapier / Make / n8n / etc.
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        console.error("Lead webhook failed", await res.text());
      }
    } else {
      // No webhook configured yet — just log so we don't lose data in dev.
      console.log("[LEAD]", record);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead route error", err);
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
