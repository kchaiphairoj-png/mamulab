import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMembershipStatus } from "@/lib/membership";

export const metadata = { title: "ยินดีต้อนรับสมาชิก | MAMULAB" };

export default async function PaySuccessPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const status = await getMembershipStatus(user.id);
  if (!status.isActive) {
    // If somehow they reach here without active membership, send them back
    redirect("/member/billing");
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
        <span className="text-4xl">✨</span>
      </div>

      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
        Welcome to MAMULAB
      </p>
      <h1 className="font-display text-3xl text-white md:text-5xl">
        ยินดีต้อนรับ <span className="text-gold-gradient">สมาชิก!</span>
      </h1>
      <p className="mt-4 text-white/75">
        ระบบเปิดสมาชิกของคุณเรียบร้อยแล้ว · ใช้งานได้อีก{" "}
        <span className="text-gold-light">{status.daysLeft} วัน</span>
        <br />
        หมดอายุ{" "}
        {status.expiresAt?.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/member/articles"
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left transition hover:border-gold/40 hover:bg-white/[0.06]"
        >
          <p className="font-display text-lg text-white">
            บทความเชิงลึก →
          </p>
          <p className="mt-1 text-sm text-white/65">
            10 บทความเลขศาสตร์ + กลยุทธ์การขาย
          </p>
        </Link>
        <Link
          href="/member/tools"
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left transition hover:border-gold/40 hover:bg-white/[0.06]"
        >
          <p className="font-display text-lg text-white">
            เครื่องมือ →
          </p>
          <p className="mt-1 text-sm text-white/65">
            คำนวณชื่อร้าน · ปฏิทินฤกษ์ Live
          </p>
        </Link>
      </div>

      <Link
        href="/member"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.02]"
      >
        ไปที่ Dashboard →
      </Link>
    </div>
  );
}
