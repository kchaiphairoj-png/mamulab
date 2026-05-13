import Link from "next/link";
import { requireActiveMember } from "@/lib/content/paywall";

export const metadata = { title: "เครื่องมือ | MAMULAB Member" };

const TOOLS = [
  {
    slug: "shop-name",
    title: "คำนวณชื่อร้านขั้นสูง",
    desc: "นับพลังจากพยัญชนะ + สระ + วรรณยุกต์ทุกตัว แสดงเลขรากและธุรกิจที่เหมาะ",
    badge: "Live",
  },
  {
    slug: "live-calendar",
    title: "ปฏิทินฤกษ์ Live ของคุณ",
    desc: "ปฏิทินตลอดเดือน — ไฮไลต์วันทอง · เวลาทอง · คำแนะนำตามวัน ใช้วันเกิดคำนวณ",
    badge: "Live",
  },
  {
    slug: "personal-mantra",
    title: "มันตราส่วนตัวจากวันเกิด",
    desc: "สร้างมันตรา 3 บทเฉพาะคุณจากวันเกิด · เปิดวัน / ปิดดีล / ดูแลใจ · พิมพ์ PDF ได้",
    badge: "Live",
  },
] as const;

export default async function ToolsIndex() {
  await requireActiveMember();

  return (
    <div className="space-y-10">
      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
          Premium · เครื่องมือ
        </p>
        <h1 className="font-display text-3xl text-white md:text-4xl">
          เครื่องมือสำหรับสมาชิก
        </h1>
        <p className="mt-2 text-sm text-white/65">
          เครื่องมือ interactive ที่ใช้กับธุรกิจของคุณได้ทันที
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => {
          const available = t.badge === "Live";
          const className = `group block rounded-3xl border p-7 transition ${
            available
              ? "border-white/10 bg-white/[0.04] hover:border-gold/40 hover:bg-white/[0.06]"
              : "border-white/10 bg-white/[0.02] opacity-70"
          }`;
          const inner = (
            <>
              <span
                className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${
                  available
                    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                    : "border-white/15 bg-white/[0.04] text-white/55"
                }`}
              >
                {t.badge}
              </span>
              <h2 className="mt-4 font-display text-xl text-white">
                {t.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {t.desc}
              </p>
              <p className="mt-5 text-xs text-gold-light">
                {available ? "เปิดเครื่องมือ →" : "ลองใช้ในเวอร์ชันถัดไป"}
              </p>
            </>
          );
          return available ? (
            <Link
              key={t.slug}
              href={`/member/tools/${t.slug}`}
              className={className}
            >
              {inner}
            </Link>
          ) : (
            <div key={t.slug} className={className}>
              {inner}
            </div>
          );
        })}
      </section>
    </div>
  );
}
