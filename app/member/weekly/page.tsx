import { requireActiveMember } from "@/lib/content/paywall";
import { getThisWeekContent } from "@/lib/weeklyEnergy";

export const metadata = { title: "พลังประจำสัปดาห์ | MAMULAB Member" };

export default async function WeeklyPage() {
  await requireActiveMember();
  const week = getThisWeekContent();

  return (
    <div className="space-y-12">
      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
          Week {week.weekNumber} · {week.year}
        </p>
        <h1 className="font-display text-3xl text-white md:text-5xl leading-tight">
          {week.weekTheme}
        </h1>
        <p className="mt-3 text-sm text-white/65">
          {week.startLabel} — ค้นหาเลขของคุณด้านล่าง · เปลี่ยนทุกวันจันทร์
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {week.profiles.map((p) => (
          <article
            key={p.number}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-display text-4xl text-gold-gradient leading-none">
                {p.number}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
                  ROOT {p.number} · {p.planet}
                </p>
                <h2 className="mt-1 font-display text-lg text-white">
                  {p.theme}
                </h2>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold-light">
                วันทองของสัปดาห์
              </p>
              <p className="mt-1 text-sm text-white">{p.bestDay}</p>
            </div>

            <div className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-300">
                ทำสิ่งนี้
              </p>
              <ul className="mt-2 space-y-2 text-sm text-white/85">
                {p.doThis.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300">
                หลีกเลี่ยง
              </p>
              <ul className="mt-2 space-y-2 text-sm text-white/85">
                {p.avoidThis.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <p className="text-center text-xs text-white/45">
        เนื้อหารายสัปดาห์อัปเดตทุกวันจันทร์ · เพื่อแรงบันดาลใจในการตัดสินใจทางธุรกิจ
      </p>
    </div>
  );
}
