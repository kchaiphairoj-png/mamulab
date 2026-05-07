import Link from "next/link";
import LoginForm from "./form";

export const metadata = {
  title: "เข้าสู่ระบบ | MAMULAB",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; registered?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next ?? "/member";
  const justRegistered = sp.registered === "1";

  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
        Member
      </p>
      <h1 className="font-display text-3xl text-white md:text-4xl">
        เข้าสู่ระบบ
      </h1>
      <p className="mt-2 text-sm text-white/65">
        เข้าถึงเนื้อหาเชิงลึก เครื่องมือ และคอนเทนต์รายสัปดาห์
      </p>

      {justRegistered && (
        <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-sm text-white">
          สมัครสำเร็จ ✨ เราส่งลิงก์ยืนยันไปที่อีเมลของคุณแล้ว
          กดยืนยันก่อนแล้วกลับมา login
        </div>
      )}

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
        <LoginForm next={next} />
      </div>

      <p className="mt-6 text-center text-sm text-white/65">
        ยังไม่มีบัญชี?{" "}
        <Link
          href={`/register${next !== "/member" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="text-gold-light underline transition hover:text-gold"
        >
          สมัครสมาชิก
        </Link>
      </p>
    </div>
  );
}
