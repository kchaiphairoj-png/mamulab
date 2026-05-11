import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMembershipStatus } from "@/lib/membership";
import {
  PAYMENT,
  formatAccountNumber,
  formatBaht,
} from "@/lib/payment";
import UploadSlipForm from "./upload-form";
import CopyButton from "./copy-button";

export const metadata = { title: "ชำระเงิน | MAMULAB" };

export default async function PayPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Already active? Don't show the payment form.
  const status = await getMembershipStatus(user.id);
  if (status.isActive) redirect("/member/billing");

  const accNo = PAYMENT.bank.accountNumber;
  const amount = PAYMENT.price;

  return (
    <div className="space-y-10">
      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
          Step 1 of 2 · ชำระเงิน
        </p>
        <h1 className="font-display text-3xl text-white md:text-4xl">
          โอนเงิน {formatBaht(amount)} บาท
        </h1>
        <p className="mt-2 text-sm text-white/65">
          เปิดแอปธนาคารของคุณ → โอนเงินตามรายละเอียดด้านล่าง →
          กลับมาอัปโหลดสลิปเพื่อเปิดสมาชิกอัตโนมัติ
        </p>
      </header>

      {/* Bank account card */}
      <section className="rounded-3xl border border-gold/30 bg-gradient-to-br from-royal/40 via-midnight-soft to-midnight-deep p-7 shadow-glow">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-light">
          โอนเข้าบัญชี
        </p>

        <dl className="mt-6 space-y-5">
          <Row label="ธนาคาร">
            <span className="font-display text-lg text-white">
              {PAYMENT.bank.name}
            </span>
          </Row>

          <Row label="ชื่อบัญชี">
            <span className="font-display text-lg text-white">
              {PAYMENT.bank.accountName}
            </span>
          </Row>

          <Row label="เลขที่บัญชี">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl text-gold-gradient tracking-wider">
                {formatAccountNumber(accNo)}
              </span>
              <CopyButton value={accNo} label="คัดลอกเลขบัญชี" />
            </div>
          </Row>

          <Row label="ยอดที่ต้องโอน">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl text-gold-gradient">
                ฿ {formatBaht(amount)}
              </span>
              <CopyButton
                value={amount.toString()}
                label={`คัดลอกยอด ${amount}`}
              />
            </div>
          </Row>
        </dl>

        <ul className="mt-7 space-y-1.5 text-xs text-white/55">
          <li>· โอนยอด {formatBaht(amount)} บาท เป๊ะ ๆ — ห้ามขาดหรือเกิน</li>
          <li>· เก็บสลิปไว้ใช้ในขั้นถัดไป</li>
          <li>· ระบบจะตรวจสลิปอัตโนมัติภายใน 5 วินาที</li>
        </ul>
      </section>

      {/* Upload */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-light">
          Step 2 of 2 · อัปโหลดสลิป
        </p>
        <h2 className="mt-2 font-display text-2xl text-white">
          อัปโหลดสลิปการโอนเงิน
        </h2>
        <p className="mt-1 text-sm text-white/65">
          ภาพสลิปแบบเต็ม ไม่ครอบตัด · รองรับ JPG / PNG ขนาดไม่เกิน 5MB
        </p>

        <div className="mt-6">
          <UploadSlipForm />
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:items-center">
      <dt className="text-sm text-white/55">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
