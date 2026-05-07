import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getMembershipStatus } from "@/lib/membership";

export default async function MemberDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null; // layout already redirects

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const status = await getMembershipStatus(user.id);

  return (
    <div className="space-y-10">
      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
          Member Dashboard
        </p>
        <h1 className="font-display text-3xl text-white md:text-4xl">
          สวัสดี {profile?.full_name ?? "คุณ"} 👋
        </h1>
      </header>

      {/* Membership status */}
      <section
        className={`rounded-3xl border p-7 ${
          status.isActive
            ? "border-gold/40 bg-gradient-to-br from-gold/15 via-violet/10 to-transparent"
            : "border-white/10 bg-white/[0.04]"
        }`}
      >
        {status.isActive ? (
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm text-gold-light">สมาชิกใช้งานอยู่</p>
              <p className="mt-1 font-display text-2xl text-white">
                แพ็กเกจ {status.plan === "monthly" ? "รายเดือน" : status.plan}
              </p>
              <p className="mt-1 text-sm text-white/65">
                ใช้งานได้อีก {status.daysLeft} วัน · หมดอายุ{" "}
                {status.expiresAt?.toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Link
              href="/member/articles"
              className="inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-midnight-deep shadow-glow"
            >
              เข้าดูเนื้อหาเชิงลึก →
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm text-gold-light">ยังไม่ได้เป็นสมาชิก</p>
              <p className="mt-1 font-display text-2xl text-white">
                ปลดล็อกเนื้อหาเชิงลึก 199 บาท / เดือน
              </p>
              <p className="mt-1 text-sm text-white/65">
                บทความเชิงลึก, mini courses, เครื่องมือเลขศาสตร์, และเนื้อหารายสัปดาห์
              </p>
            </div>
            <Link
              href="/member/billing"
              className="inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-midnight-deep shadow-glow"
            >
              ชำระเงิน 199 บาท →
            </Link>
          </div>
        )}
      </section>

      {/* Quick links */}
      <section className="grid gap-5 md:grid-cols-3">
        <DashboardCard
          title="บทความเชิงลึก"
          desc="10 บทความเลขศาสตร์ + กลยุทธ์การขายแบบเฉพาะกลุ่ม"
          href="/member/articles"
          available={status.isActive}
        />
        <DashboardCard
          title="เครื่องมือ"
          desc="คำนวณชื่อร้าน · ปฏิทินฤกษ์ Live · มันตราส่วนตัว"
          href="/member/tools"
          available={status.isActive}
        />
        <DashboardCard
          title="พลังประจำสัปดาห์"
          desc="เนื้อหาสำหรับเลขของคุณ · อัปเดตทุกจันทร์"
          href="/member/weekly"
          available={status.isActive}
        />
      </section>
    </div>
  );
}

function DashboardCard({
  title,
  desc,
  href,
  available,
}: {
  title: string;
  desc: string;
  href: string;
  available: boolean;
}) {
  return (
    <Link
      href={available ? href : "/member/billing"}
      className={`group block rounded-2xl border p-6 transition ${
        available
          ? "border-white/10 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.06]"
          : "border-white/10 bg-white/[0.02] opacity-70 hover:opacity-100"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg text-white">{title}</h3>
        {!available && (
          <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-gold-light">
            Locked
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{desc}</p>
      <p className="mt-4 text-xs text-gold-light transition group-hover:text-gold">
        {available ? "เข้าดู →" : "ปลดล็อกด้วยสมาชิก →"}
      </p>
    </Link>
  );
}
