import Link from "next/link";
import RegisterForm from "./form";

export const metadata = {
  title: "สมัครสมาชิก | MAMULAB",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next ?? "/member";

  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
        Member · 199 บาท / ปี
      </p>
      <h1 className="font-display text-3xl text-white md:text-4xl">
        สมัครสมาชิก
      </h1>
      <p className="mt-2 text-sm text-white/65">
        เริ่มจากการสร้างบัญชีฟรี — จ่ายค่าสมาชิกในขั้นต่อไป
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
        <RegisterForm />
      </div>

      <p className="mt-6 text-center text-sm text-white/65">
        มีบัญชีแล้ว?{" "}
        <Link
          href={`/login${next !== "/member" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="text-gold-light underline transition hover:text-gold"
        >
          เข้าสู่ระบบ
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-white/45">
        การสมัครถือว่ายอมรับ{" "}
        <Link href="/terms" className="underline hover:text-gold-light">
          ข้อตกลง
        </Link>{" "}
        และ{" "}
        <Link href="/privacy-policy" className="underline hover:text-gold-light">
          นโยบายความเป็นส่วนตัว
        </Link>
      </p>
    </div>
  );
}
