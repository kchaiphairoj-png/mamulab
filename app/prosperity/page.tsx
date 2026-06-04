import Link from "next/link";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { SOCIAL } from "@/lib/config";

const LINE_OA_URL = SOCIAL.line;

export const metadata = {
  title: "For True Believers in Luck & Prosperity | MAMULAB",
  description:
    "Curated talismans for those who believe — Enochian Coin & Japanese Money-Attraction Long Wallet. Limited pieces, hand-selected by MAMULAB.",
};

export default function ProsperityPage() {
  return (
    <main className="min-h-screen bg-midnight-deep">
      {/* Header */}
      <header className="border-b border-white/10">
        <Container className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-display text-xl text-gold-gradient transition hover:opacity-80"
          >
            MAMULAB
          </Link>
          <Link
            href="/"
            className="text-sm text-white/65 transition hover:text-gold-light"
          >
            ← กลับหน้าหลัก
          </Link>
        </Container>
      </header>

      {/* Hero */}
      <section className="relative bg-midnight-deep py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(201,168,76,0.25),_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,_rgba(91,63,163,0.15),_transparent_60%)] pointer-events-none" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold/80">
              The MAMULAB Talismans Collection
            </p>
            <h1 className="font-display text-4xl text-white md:text-6xl leading-[1.05]">
              <span className="text-gold-gradient">For True Believers</span>
              <span className="block mt-3 text-2xl font-sans font-medium text-white/90 md:text-3xl">
                ในเสริมโชค ดูดทรัพย์ และพลังแห่งความรุ่งเรือง
              </span>
            </h1>
            <p className="mt-8 text-white/75 max-w-2xl mx-auto leading-relaxed md:text-lg">
              สำหรับคนที่<em>เชื่อ</em>ในความเชื่อ — และอยากเชิญพลังแห่งความมั่งคั่ง
              เข้ามาในชีวิตอย่างรวดเร็ว
              MAMULAB คัดสรรของ 2 ชิ้น จาก 2 ศาสตร์โบราณที่คนทั่วโลกบูชา —
              <span className="text-gold-light"> Enochian Coin</span> และ
              <span className="text-gold-light"> กระเป๋าสตางค์ใบยาวดูดเงินญี่ปุ่น</span>
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-white/55">
              <span className="rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 tracking-widest">
                ✦ Limited pieces
              </span>
              <span className="rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 tracking-widest">
                ✦ Hand-selected
              </span>
              <span className="rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 tracking-widest">
                ✦ Order via LINE OA
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Product 1: Enochian Coin */}
      <section className="relative bg-midnight py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Visual */}
            <div className="relative order-1 md:order-1">
              <CoinVisual />
            </div>

            {/* Description */}
            <div className="order-2 md:order-2 space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
                Item 01 · The Enochian Coin
              </p>
              <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
                <span className="text-gold-gradient">Enochian Coin</span>
                <span className="block mt-2 text-xl font-sans font-medium text-white/85 md:text-2xl">
                  เหรียญลึกลับจากศาสตร์ Enochian
                </span>
              </h2>

              <p className="text-white/80 leading-relaxed">
                Enochian คือศาสตร์โบราณที่ John Dee นักปราชญ์ของราชสำนักอังกฤษ
                ในศตวรรษที่ 16 ค้นพบ ผ่านการสื่อสารกับ ‘ภาษาของทูตสวรรค์’ —
                เหรียญ Enochian Coin ถูกใช้สัญลักษณ์<em>ความมั่งคั่ง ความรุ่งเรือง
                และการปลดล็อกศักยภาพในตัวเอง</em>
              </p>

              <ul className="space-y-3 text-sm text-white/85">
                {[
                  "พกพาในกระเป๋าสตางค์เพื่อ ‘ลื่นไหลเรื่องเงิน’",
                  "วางบนโต๊ะทำงานเพื่อพลังความสำเร็จ",
                  "ใช้เป็นเครื่องบูชาในการทำสมาธิเรื่องความมั่งคั่ง",
                  "สำหรับเจ้าของกิจการที่เชื่อใน ‘พลังเชิงสัญลักษณ์’ ของวัตถุ",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-3xl border border-gold/40 bg-gradient-to-br from-gold/15 via-violet/5 to-transparent p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gold-light/80">
                      ราคา
                    </p>
                    <p className="mt-1 font-display text-4xl text-gold-gradient">
                      ฿4,500
                    </p>
                  </div>
                  <p className="text-xs text-white/55">
                    Limited stock ·<br /> 1 เหรียญต่อ 1 คำสั่งซื้อ
                  </p>
                </div>
                <a
                  href={LINE_OA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.01]"
                >
                  <LineIcon /> สอบถาม / สั่งซื้อทาง LINE OA
                </a>
                <p className="mt-3 text-center text-[11px] text-white/45">
                  ทักมาบอกว่า ‘สนใจ Enochian Coin’ — ทีมงานจะส่งภาพชัด + วิธีโอน
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product 2: Japanese Money Wallet */}
      <section className="relative bg-midnight-deep py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(91,63,163,0.18),_transparent_60%)] pointer-events-none" />
        <Container className="relative">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Description */}
            <div className="order-2 md:order-1 space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
                Item 02 · 黄金財布
              </p>
              <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
                <span className="text-gold-gradient">
                  Japanese Money-Attraction Wallet
                </span>
                <span className="block mt-2 text-xl font-sans font-medium text-white/85 md:text-2xl">
                  กระเป๋าสตางค์ใบยาวดูดเงินสไตล์ญี่ปุ่น
                </span>
              </h2>

              <p className="text-white/80 leading-relaxed">
                ตามตำราโบราณของญี่ปุ่น — ธนบัตรเป็น ‘แขกผู้มีเกียรติ’ ที่ต้องเดินตรง
                ไม่งอตัวในกระเป๋า กระเป๋าใบยาวจึง<em>เคารพ</em>เงิน และเงินจะ<em>กลับมา</em>
                หาเจ้าของอย่างต่อเนื่อง
              </p>

              <p className="text-white/80 leading-relaxed">
                คัดสรรในโทนหนัง<span className="text-gold-light">ทองและดำ</span>{" "}
                ที่ตรงกับศาสตร์<em>金運</em> (Kin-un) หรือ ‘โชคทางการเงิน’
                ของญี่ปุ่น ซึ่งเป็นสีที่ดึงดูดความมั่งคั่งสูงสุด
              </p>

              <ul className="space-y-3 text-sm text-white/85">
                {[
                  "ใบยาว ธนบัตรอยู่ตรง ไม่งอ — เคารพเงิน ตามตำราญี่ปุ่น",
                  "หนังโทนทอง/ดำ ตามศาสตร์ Kin-un (金運)",
                  "ของขวัญตัวเองให้พลังการเงินรอบใหม่",
                  "ใช้คู่กับ Enochian Coin เพิ่มพลังร่วม",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-3xl border border-gold/40 bg-gradient-to-br from-gold/15 via-violet/5 to-transparent p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gold-light/80">
                      ราคา / ใบ
                    </p>
                    <p className="mt-1 font-display text-4xl text-gold-gradient">
                      ฿4,000
                    </p>
                  </div>
                  <p className="text-xs text-white/55">
                    Hand-picked ·<br /> ทักเช็คสต็อกก่อนสั่ง
                  </p>
                </div>
                <a
                  href={LINE_OA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.01]"
                >
                  <LineIcon /> สอบถาม / สั่งซื้อทาง LINE OA
                </a>
                <p className="mt-3 text-center text-[11px] text-white/45">
                  ทักมาบอกว่า ‘สนใจกระเป๋าญี่ปุ่น’ — ทีมงานจะส่งภาพรายละเอียดให้เลือก
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="relative order-1 md:order-2">
              <WalletVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* Bundle teaser */}
      <section className="relative bg-midnight py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-gold/40 bg-gradient-to-br from-midnight-soft via-midnight to-midnight-deep p-8 text-center shadow-glow md:p-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
              Bundle · ยินดีพิเศษ
            </p>
            <h2 className="mt-3 font-display text-2xl text-white md:text-4xl leading-snug">
              สั่งทั้ง <span className="text-gold-gradient">2 ชิ้นพร้อมกัน</span>
            </h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              สำหรับลูกค้าที่ต้องการพลังสองศาสตร์ทำงานร่วมกัน —
              ทักเข้า LINE OA แจ้งว่า ‘สั่ง Bundle’
              ทีมงานจะคุยส่วนลดและการจัดส่งให้คุณ
            </p>
            <p className="mt-3 text-sm text-gold-light">
              ราคารวมปกติ ฿8,500 · ทักมาคุย<em>ส่วนลด bundle</em>ใน LINE OA
            </p>
            <a
              href={LINE_OA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.02]"
            >
              <LineIcon /> ทักคุย Bundle ใน LINE OA
            </a>
          </div>
        </Container>
      </section>

      {/* Why MAMULAB */}
      <section className="relative bg-midnight-deep py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/70 text-center">
              Why MAMULAB curates these
            </p>
            <h2 className="mt-3 font-display text-2xl text-white md:text-3xl text-center leading-snug">
              เราเลือกเฉพาะของที่ <span className="text-gold-gradient">‘เข้าใจ’</span>{" "}
              ก่อน
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Hand-selected",
                  desc: "ผ่านการคัดเลือกจากแหล่งที่เราเข้าถึงเอง ไม่ใช่ของ mass production",
                },
                {
                  title: "Tradition-honest",
                  desc: "อธิบาย ‘ที่มา’ ของแต่ละชิ้นตามตำราจริง ไม่บิดเบือน",
                },
                {
                  title: "Limited stock",
                  desc: "ของแต่ละชิ้นมีจำนวนน้อย — เพื่อให้ลูกค้ารู้สึก ‘เข้าถึงพิเศษ’",
                },
              ].map((it) => (
                <article
                  key={it.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center"
                >
                  <p className="font-display text-lg text-gold-light">
                    {it.title}
                  </p>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {it.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ + disclaimer */}
      <section className="relative bg-midnight py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl space-y-6 text-sm text-white/75 leading-relaxed">
            <h3 className="font-display text-xl text-white md:text-2xl">
              คำถามที่พบบ่อย
            </h3>

            <Q
              q="ของจริงไหม?"
              a="MAMULAB คัดสรรของจริงทุกชิ้น — ลูกค้าได้รับของก่อนชำระเงินยินดี ส่งคืนได้ถ้าไม่ตรงตามอธิบาย ภายใน 7 วัน"
            />
            <Q
              q="รับประกันโชคไหม?"
              a="ไม่รับประกันโชคหรือผลลัพธ์ทางการเงิน — สิ่งของเหล่านี้เป็น symbol ของความเชื่อ ตามตำราโบราณ ความหมายในใจเจ้าของคือพลังที่แท้จริง"
            />
            <Q
              q="ส่งทั่วประเทศไหม?"
              a="ส่งทั่วประเทศไทย ผ่าน Kerry / Flash Express ทักรายละเอียดใน LINE OA"
            />
            <Q
              q="จ่ายอย่างไร?"
              a="โอนเข้าบัญชีธนาคาร MAMULAB — ทีมงานจะส่งรายละเอียดให้ในแชท"
            />
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-[11px] text-white/40 leading-relaxed">
            สินค้าในหน้านี้เป็น symbol ของความเชื่อตามตำราโบราณ
            ไม่ใช่คำสัญญาทางการเงินหรือโชคชะตา · MAMULAB ไม่รับประกันผลลัพธ์
            แต่รับประกันคุณภาพและความถูกต้องของของจริง
          </p>
        </Container>
      </section>

      <Footer />
    </main>
  );
}

function Q({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="font-medium text-white">{q}</p>
      <p className="mt-2 text-white/75 leading-relaxed">{a}</p>
    </div>
  );
}

function LineIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18 4C9.7 4 3 9.4 3 16.1c0 6 5.4 11 12.7 12 .5.1 1.2.3 1.4.7.2.4.1 1 .1 1.4l-.2 1.4c-.1.4-.3 1.6 1.4.9 1.7-.7 9.5-5.6 13-9.6 2.4-2.7 3.6-5.4 3.6-8.8C35 9.4 28.3 4 20 4h-2zm-7.4 7.7h2.1c.3 0 .5.2.5.5v5.7h3.1c.3 0 .5.2.5.5v1.5c0 .3-.2.5-.5.5h-5.2c-.3 0-.5-.2-.5-.5v-7.7c0-.3.3-.5.5-.5zm7.6 0h2.1c.3 0 .5.2.5.5v7.7c0 .3-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5v-7.7c0-.3.3-.5.5-.5zm4.3 0h2.1c.2 0 .3.1.4.2l3.5 4.7v-4.4c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5v7.7c0 .3-.2.5-.5.5h-2.1c-.2 0-.3-.1-.4-.2l-3.5-4.7v4.4c0 .3-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5v-7.7c0-.3.3-.5.5-.5z" />
    </svg>
  );
}

function CoinVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,_rgba(245,226,125,0.4),_transparent_60%)] blur-2xl" />
      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        aria-label="Enochian Coin"
      >
        <defs>
          <linearGradient id="goldRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5e27d" />
            <stop offset="50%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#7d5a00" />
          </linearGradient>
          <radialGradient id="coinFace" cx="0.35" cy="0.3">
            <stop offset="0%" stopColor="#fff7d6" />
            <stop offset="40%" stopColor="#e8c869" />
            <stop offset="80%" stopColor="#a47a1f" />
            <stop offset="100%" stopColor="#5a3f00" />
          </radialGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="200" cy="200" r="180" fill="url(#coinFace)" />
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="url(#goldRim)"
          strokeWidth="6"
        />
        <circle
          cx="200"
          cy="200"
          r="165"
          fill="none"
          stroke="url(#goldRim)"
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
        {/* Inner sigil — pentagram-like */}
        <g
          stroke="url(#goldRim)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        >
          <circle cx="200" cy="200" r="110" />
          <circle cx="200" cy="200" r="80" />
          {Array.from({ length: 7 }).map((_, i) => {
            const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
            const x = 200 + Math.cos(angle) * 110;
            const y = 200 + Math.sin(angle) * 110;
            return (
              <line
                key={i}
                x1="200"
                y1="200"
                x2={x}
                y2={y}
              />
            );
          })}
          {Array.from({ length: 7 }).map((_, i) => {
            const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
            const x = 200 + Math.cos(angle) * 110;
            const y = 200 + Math.sin(angle) * 110;
            return (
              <circle key={`c${i}`} cx={x} cy={y} r="4" fill="url(#goldRim)" />
            );
          })}
        </g>
        {/* Center mark */}
        <text
          x="200"
          y="218"
          textAnchor="middle"
          fontFamily="serif"
          fontSize="64"
          fontWeight="700"
          fill="url(#goldRim)"
        >
          ✦
        </text>
      </svg>
    </div>
  );
}

function WalletVisual() {
  return (
    <div className="relative mx-auto aspect-[5/3] w-full max-w-md">
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_70%_30%,_rgba(245,226,125,0.35),_transparent_60%)] blur-2xl" />
      <svg
        viewBox="0 0 500 300"
        className="relative h-full w-full"
        aria-label="Japanese Money-Attraction Long Wallet"
      >
        <defs>
          <linearGradient id="walletGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2f10" />
            <stop offset="50%" stopColor="#1c1410" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id="walletStitch" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5e27d" />
            <stop offset="100%" stopColor="#a47a1f" />
          </linearGradient>
        </defs>
        {/* Wallet body */}
        <rect
          x="30"
          y="40"
          width="440"
          height="220"
          rx="18"
          fill="url(#walletGold)"
          stroke="url(#walletStitch)"
          strokeWidth="2"
        />
        {/* Horizontal fold line */}
        <line
          x1="30"
          y1="150"
          x2="470"
          y2="150"
          stroke="url(#walletStitch)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.7"
        />
        {/* Stitch border */}
        <rect
          x="42"
          y="52"
          width="416"
          height="196"
          rx="14"
          fill="none"
          stroke="url(#walletStitch)"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.85"
        />
        {/* Gold emblem 金運 */}
        <g transform="translate(250 150)">
          <circle
            cx="0"
            cy="0"
            r="40"
            fill="none"
            stroke="url(#walletStitch)"
            strokeWidth="2"
          />
          <text
            x="0"
            y="12"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="32"
            fontWeight="700"
            fill="url(#walletStitch)"
          >
            金
          </text>
        </g>
      </svg>
    </div>
  );
}
