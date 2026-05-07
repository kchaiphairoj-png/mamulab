import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getMembershipStatus } from "@/lib/membership";

export const metadata = { title: "สมาชิก / ชำระเงิน | MAMULAB" };

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const status = await getMembershipStatus(user.id);

  const { data: payments } = await supabase
    .from("payments")
    .select("amount, status, created_at, rejected_reason")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-10">
      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
          Billing
        </p>
        <h1 className="font-display text-3xl text-white md:text-4xl">
          สมาชิก &amp; ชำระเงิน
        </h1>
      </header>

      <section className="rounded-3xl border border-gold/30 bg-gradient-to-br from-royal/40 via-midnight-soft to-midnight-deep p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-light">
          แพ็กเกจสมาชิก
        </p>
        <h2 className="mt-2 font-display text-2xl text-white">
          MAMULAB Member · 199 บาท / เดือน
        </h2>
        <ul className="mt-5 space-y-2 text-sm text-white/80">
          {[
            "เข้าถึงบทความเชิงลึก 10+ เรื่อง",
            "เครื่องมือคำนวณชื่อร้านขั้นสูง + ปฏิทินฤกษ์ Live",
            "พลังประจำสัปดาห์เฉพาะเลขของคุณ (อัปเดตทุกจันทร์)",
            "Mini course วิดีโอ 5–15 นาที",
          ].map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {status.isActive ? (
          <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-sm">
            <p className="text-gold-light">สมาชิกใช้งานอยู่</p>
            <p className="mt-1 text-white/85">
              ใช้งานได้อีก {status.daysLeft} วัน · หมดอายุ{" "}
              {status.expiresAt?.toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-gold-gradient/50 px-6 py-3 text-sm font-semibold text-midnight-deep/60"
            >
              ชำระเงิน (เร็ว ๆ นี้)
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-gold/40 px-6 py-3 text-sm text-gold-light transition hover:border-gold hover:bg-gold/10"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        )}

        <p className="mt-4 text-xs text-white/50">
          ระบบชำระเงิน + อัปโหลดสลิป (PromptPay) จะเปิดในเฟส 2 — ตอนนี้บัญชีของคุณพร้อมใช้งานเมื่อเปิดให้บริการ
        </p>
      </section>

      <section>
        <h3 className="font-display text-lg text-white">ประวัติการชำระเงิน</h3>
        {!payments?.length ? (
          <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/55">
            ยังไม่มีรายการ
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
            {payments.map((p, i) => (
              <li key={i} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-white">
                    ฿{p.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/55">
                    {new Date(p.created_at).toLocaleString("th-TH")}
                  </p>
                  {p.rejected_reason && (
                    <p className="mt-1 text-xs text-red-300">
                      {p.rejected_reason}
                    </p>
                  )}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    p.status === "verified"
                      ? "border border-gold/40 bg-gold/10 text-gold-light"
                      : p.status === "rejected"
                        ? "border border-red-400/30 bg-red-500/10 text-red-200"
                        : "border border-white/15 bg-white/[0.04] text-white/65"
                  }`}
                >
                  {p.status === "verified"
                    ? "ตรวจสอบแล้ว"
                    : p.status === "rejected"
                      ? "ปฏิเสธ"
                      : "รอตรวจสอบ"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
