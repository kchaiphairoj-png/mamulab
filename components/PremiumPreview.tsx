import Link from "next/link";
import Container from "./Container";
import { ARTICLES } from "@/lib/content/articles";

/**
 * Premium Preview — surfaces a peek of what lives inside the member area
 * so visitors can see concrete value before signing up. Renders 4 highlight
 * articles + 3 interactive tools + the weekly content as locked teasers.
 *
 * Reads the live ARTICLES registry so it stays in sync as content is added.
 */

const TOOLS_PREVIEW = [
  {
    title: "คำนวณชื่อร้านขั้นสูง",
    desc: "พิมพ์ชื่อร้าน → ระบบนับพยัญชนะ สระ วรรณยุกต์ทุกตัว แสดงเลขราก + ธุรกิจที่เหมาะ",
    badge: "Interactive",
  },
  {
    title: "ปฏิทินฤกษ์ Live ของคุณ",
    desc: "ใส่วันเกิด → ระบบไฮไลต์ ‘วันทอง’ ส่วนตัวทั้งเดือน + คำแนะนำเวลาทอง Live",
    badge: "Interactive",
  },
  {
    title: "สร้างมันตราส่วนตัวจากวันเกิด",
    desc: "ระบบเลือกมันตรา 3 บทเฉพาะคุณ — เปิดวัน / ปิดดีล / ดูแลใจ · พิมพ์ PDF ได้",
    badge: "Interactive",
  },
] as const;

export default function PremiumPreview() {
  // Show the 4 newest articles as preview cards
  const previewArticles = ARTICLES.slice(0, 4);
  const totalArticles = ARTICLES.length;

  return (
    <section
      id="premium-preview"
      className="relative bg-midnight py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(201,168,76,0.12),_transparent_60%)] pointer-events-none" />
      <Container className="relative">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            MAMULAB Library · คลังเนื้อหาเชิงลึก
          </p>
          <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
            สิ่งที่อยู่ใน
            <span className="text-gold-gradient">คลัง</span>
            <br className="hidden md:block" />
            จ่ายครั้งเดียว · ใช้ได้ 365 วัน
          </h2>
          <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
            ราคา 599 บาทแลกกับ <span className="text-gold-light">{totalArticles} บทความเชิงลึก
            + 3 เครื่องมือคำนวณส่วนตัว + พลังประจำสัปดาห์ที่อัปเดตเองทุกจันทร์</span>{" "}
            — เห็นทุกอย่างที่ได้ก่อนตัดสินใจ
          </p>
        </div>

        {/* Articles preview */}
        <div className="mt-14">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl text-gold-light md:text-2xl">
              📚 บทความเชิงลึก
            </h3>
            <span className="text-xs text-white/55">
              {totalArticles} บท · ~80 นาทีอ่าน
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {previewArticles.map((a) => (
              <article
                key={a.slug}
                className="relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7"
              >
                <span className="flex items-center justify-between">
                  <span className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-gold-light">
                    {a.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/55">
                    <LockIcon /> Member
                  </span>
                </span>
                <h4 className="mt-4 font-display text-lg text-white md:text-xl leading-snug">
                  {a.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {a.excerpt}
                </p>
                <p className="mt-auto pt-5 text-xs text-white/45">
                  อ่าน ~{a.readMinutes} นาที
                </p>
              </article>
            ))}
          </div>

          {totalArticles > previewArticles.length && (
            <p className="mt-5 text-center text-sm text-white/55">
              + อีก {totalArticles - previewArticles.length} บท ใน ‘คลังบทความสมาชิก’
            </p>
          )}
        </div>

        {/* Tools preview */}
        <div className="mt-14">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl text-gold-light md:text-2xl">
              🛠️ เครื่องมือ Interactive
            </h3>
            <span className="text-xs text-white/55">3 ตัว · ใช้กับเพจของคุณตอนนี้</span>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {TOOLS_PREVIEW.map((t) => (
              <article
                key={t.title}
                className="relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="flex items-center justify-between">
                  <span className="inline-flex rounded-full border border-violet-400/40 bg-violet/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-violet-200">
                    {t.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/55">
                    <LockIcon /> Member
                  </span>
                </span>
                <h4 className="mt-4 font-display text-lg text-white leading-snug">
                  {t.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {t.desc}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Weekly content callout */}
        <div className="mt-14 rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/10 via-violet/5 to-transparent p-7 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold-light/80">
                อัปเดตทุกวันจันทร์
              </p>
              <h3 className="mt-2 font-display text-2xl text-white md:text-3xl leading-snug">
                พลังประจำสัปดาห์ + ‘วันทอง’ สำหรับเลขของคุณ
              </h3>
              <p className="mt-3 text-white/75 leading-relaxed">
                ทุกวันจันทร์ระบบสร้างเนื้อหาใหม่ — ธีมของสัปดาห์ · วันทองของแต่ละเลข
                · ‘ทำสิ่งนี้’ vs ‘หลีกเลี่ยง’ · เน้น actionable มากกว่าแรงบันดาลใจ
              </p>
            </div>
            <div className="font-display text-5xl text-gold-gradient text-right leading-none md:text-7xl">
              52
              <p className="mt-1 font-sans text-xs uppercase tracking-widest text-white/55">
                สัปดาห์ / ปี
              </p>
            </div>
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-gold/40 bg-gradient-to-br from-midnight-soft via-midnight to-midnight-deep p-8 text-center shadow-glow md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
            MAMULAB Library — Lifetime Access 1 ปี
          </p>
          <p className="mt-3 font-display text-4xl text-white md:text-5xl">
            ฿599<span className="ml-1 text-lg text-white/55">/ ปี</span>
          </p>
          <p className="mt-1 text-sm text-white/55">~50 บาท/เดือน · ใช้ได้ 365 วัน · จ่ายครั้งเดียว ไม่ต่ออายุอัตโนมัติ</p>

          <div className="mt-7 grid gap-3 text-left text-sm md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-300">
                ✓ ได้
              </p>
              <ul className="mt-2 space-y-1.5 text-white/85">
                <li>· {totalArticles} บทความเชิงลึก (~76 นาที)</li>
                <li>· เครื่องมือคำนวณส่วนตัว 3 ตัว</li>
                <li>· พลังประจำสัปดาห์ · 52 ครั้ง/ปี</li>
                <li>· เครื่องมือ PDF Export</li>
                <li>· เข้าใหม่ได้ทุกวัน 365 วัน</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/55">
                ✗ ยังไม่มี (จะแจ้งถ้าเพิ่ม)
              </p>
              <ul className="mt-2 space-y-1.5 text-white/55">
                <li>· Community / Forum</li>
                <li>· Live Q&amp;A session</li>
                <li>· วิดีโอ mini course</li>
                <li>· ที่ปรึกษา 1-on-1</li>
                <li>· Email digest อัตโนมัติ</li>
              </ul>
            </div>
          </div>

          <Link
            href="/member"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.02]"
          >
            🔓 ปลดล็อก Library · 599 บาท
            <span aria-hidden>→</span>
          </Link>

          <p className="mt-5 text-[11px] text-white/45">
            จ่ายแล้วใช้งานได้ทันทีหลังอัปโหลดสลิป · ไม่มีระบบ auto-renew · ไม่บังคับต่ออายุ
          </p>
        </div>
      </Container>
    </section>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 1 1 6 0v3H9z" />
    </svg>
  );
}
