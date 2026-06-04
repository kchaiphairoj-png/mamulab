import Link from "next/link";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { SOCIAL } from "@/lib/config";

const LINE_OA_URL = SOCIAL.line;

export const metadata = {
  title: "For True Believers in Luck & Prosperity | MAMULAB",
  description:
    "Curated talismans for those who believe — Enochian Coin (พระประดิษฐาน วัดบางพันธุ์) & BeRichy Long Wallet collection. Limited pieces, hand-selected by MAMULAB.",
};

// Image paths under /public/prosperity/ — drop the photos in this folder and
// they appear automatically. Until then a soft gold gradient placeholder shows.
const IMG = {
  wallets: "/prosperity/wallets-lineup.jpg",
  walletDetail: "/prosperity/wallet-detail.jpg",
  coinFaces: "/prosperity/coin-faces.jpg",
  coinBox: "/prosperity/coin-box.jpg",
};

const WALLET_COLORS = [
  { name: "ครีม", hex: "#e8dec1", trait: "พลังอ่อนโยน · ดูดเงินสุภาพ" },
  { name: "ดำ", hex: "#1c1410", trait: "พลังอำนาจ · เก็บเงินมั่นคง" },
  { name: "เขียวเข้ม", hex: "#2c4232", trait: "พลังเติบโต · ลงทุนคืนกลับ" },
  { name: "แดง", hex: "#a02222", trait: "พลังเสน่ห์ · เรียกลูกค้า" },
  { name: "น้ำตาล", hex: "#7a4828", trait: "พลังมั่นคง · รากฐานแน่น" },
];

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
              MAMULAB คัดสรร 2 ชิ้นจาก 2 ศาสตร์ที่คนทั่วโลกบูชา —
              <span className="text-gold-light">
                {" "}
                เหรียญอีโนเชี่ยน (พระประดิษฐาน วัดบางพันธุ์)
              </span>{" "}
              และ
              <span className="text-gold-light">
                {" "}
                BeRichy กระเป๋าสตางค์ใบยาวดูดเงินสไตล์ญี่ปุ่น
              </span>
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
            <div className="relative order-1">
              <ProductImage
                src={IMG.coinFaces}
                alt="เหรียญอีโนเชี่ยน — หน้าและหลัง"
                aspect="aspect-[4/5]"
              />
            </div>

            <div className="order-2 space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
                Item 01 · เหรียญอีโนเชี่ยน
              </p>
              <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
                <span className="text-gold-gradient">Enochian Coin</span>
                <span className="block mt-2 text-xl font-sans font-medium text-white/85 md:text-2xl">
                  พระประดิษฐาน · วัดบางพันธุ์
                </span>
              </h2>

              <p className="text-white/80 leading-relaxed">
                เหรียญอีโนเชี่ยน คือเหรียญศักดิ์สิทธิ์ที่รวมพลัง 2 ศาสตร์เข้าด้วยกัน —
                ด้านหน้าคือ<em>พระประดิษฐาน</em> เทพแห่งความมั่งคั่งและความสำเร็จ
                ด้านหลังคือ<em>สัญลักษณ์อีโนเชี่ยน</em>
                (Sigillum Dei Aemeth) แห่งวงรอบเจ็ดทิศ
                ที่ John Dee ปราชญ์ราชสำนักอังกฤษศตวรรษที่ 16 ใช้ในพิธีกรรมเรียกพลังบวก
              </p>

              <ul className="space-y-3 text-sm text-white/85">
                {[
                  "เหรียญทองแดง — เนื้อกลั่นพิเศษจากวัดบางพันธุ์ กรุงเทพมหานคร",
                  "กรอบโลหะคุณภาพสูง ห้อยพกได้ ไม่กระทบหากสัมผัส",
                  "พร้อมกล่องประกอบพิธีและกระดาษเขียนเป้าหมาย",
                  "ใบประกอบพิธีกรรม 1 ปี (เปิดอ่านครั้งเดียวตอนครบรอบ)",
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
                  ทักมาบอกว่า ‘สนใจเหรียญอีโนเชี่ยน’ — ทีมงานจะส่งภาพชัด + วิธีโอน
                </p>
              </div>
            </div>
          </div>

          {/* Ritual instructions */}
          <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1fr] md:items-start">
            <ProductImage
              src={IMG.coinBox}
              alt="เหรียญอีโนเชี่ยนในกล่องพร้อมใบประกอบพิธี"
              aspect="aspect-[3/4]"
            />
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
                วิธีใช้กล่องอีโนเชี่ยนเพื่อความสำเร็จ
              </p>
              <h3 className="mt-2 font-display text-2xl text-white md:text-3xl leading-snug">
                พิธีกรรม 1 ปี
              </h3>
              <ol className="mt-6 space-y-3 text-sm text-white/85">
                {[
                  "นำเหรียญอีโนเชี่ยน (หรือกำไล) ออกจากกล่อง — เหลือกล่องเปล่าให้เห็นสัญลักษณ์ที่ก้นกล่องชัดเจน",
                  "เตรียมกระดาษแผ่นเล็ก 10 แผ่น เขียนเป้าหมายที่ต้องการ — เรื่องละ 1 แผ่น แยกต่างหาก พร้อมระบุวันเดือนปีที่อยากให้สำเร็จ",
                  "เขียนเสร็จ อ่านออกเสียงแผ่นละ 10 รอบ แล้วใส่กระดาษทั้ง 10 แผ่นลงในกล่อง",
                  "ปิดฝากล่อง",
                  "นำไปวางในที่มิดชิด เก็บเงียบ ๆ ไว้ 1 ปีเต็ม",
                  "ครบ 1 ปี นำมาเปิดอ่านทบทวน — ดูว่าสำเร็จกี่ข้อ",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-sm text-gold-light">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[11px] text-white/45 leading-relaxed">
                * พิธีกรรมนี้เป็นความเชื่อตามตำราโบราณ ใช้เพื่อจัดระเบียบเจตจำนงและสมาธิ
                ไม่ใช่คำสัญญาผลลัพธ์
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Product 2: BeRichy Wallets */}
      <section className="relative bg-midnight-deep py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(91,63,163,0.18),_transparent_60%)] pointer-events-none" />
        <Container className="relative">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1 space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
                Item 02 · BeRichy Wallet
              </p>
              <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
                <span className="text-gold-gradient">BeRichy</span>
                <span className="block mt-2 text-xl font-sans font-medium text-white/85 md:text-2xl">
                  กระเป๋าดี · พิธีดี · สีถูกโฉลก
                </span>
              </h2>

              <p className="italic text-gold-light/85 leading-relaxed">
                “เก็บเงินอยู่นาน · ออมเงินเพิ่มพูน · คู่ควรกับเงินสุดที่รักของคุณ”
              </p>

              <p className="text-white/80 leading-relaxed">
                BeRichy คือกระเป๋าสตางค์ใบยาวที่ออกแบบตามหลัก<em>金運</em>{" "}
                (Kin-un — โชคทางการเงินของญี่ปุ่น) —
                ธนบัตรเป็น<em>แขกผู้มีเกียรติ</em> ที่ต้องเดินตรง ไม่งอตัวในกระเป๋า
                กระเป๋าใบยาวจึง<em>เคารพ</em>เงิน และเงินจะ<em>กลับมา</em>
                หาเจ้าของอย่างต่อเนื่อง
              </p>

              <p className="text-white/80 leading-relaxed">
                หนังคุณภาพสูง · เย็บมือ · มีให้เลือก{" "}
                <span className="text-gold-light">5 สี</span>{" "}
                ตามพลังที่อยากเรียก — เลือกสีถูกโฉลกตามเลขเจ้าของของคุณ
                (ใช้ <Link href="/member/tools/shop-name" className="underline hover:text-gold-light">เครื่องมือคำนวณ</Link> ก่อนเลือกสี)
              </p>

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
                  <LineIcon /> สั่งซื้อ / เช็คสีและสต็อกใน LINE OA
                </a>
                <p className="mt-3 text-center text-[11px] text-white/45">
                  ทักว่า ‘สนใจ BeRichy สี ...’ — ทีมงานจะส่งภาพชัดของสีนั้น
                </p>
              </div>
            </div>

            <div className="relative order-1 md:order-2">
              <ProductImage
                src={IMG.wallets}
                alt="BeRichy กระเป๋าสตางค์ใบยาว 5 สี"
                aspect="aspect-square"
              />
            </div>
          </div>

          {/* 5 colors palette */}
          <div className="mt-16">
            <div className="mb-6 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
                5 สีให้เลือก · ตามพลังที่อยากเรียก
              </p>
              <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">
                เลือกสี<span className="text-gold-gradient">ถูกโฉลก</span>
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {WALLET_COLORS.map((c) => (
                <div
                  key={c.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center"
                >
                  <div
                    className="mx-auto h-16 w-16 rounded-full ring-2 ring-white/20"
                    style={{ background: c.hex }}
                    aria-hidden
                  />
                  <p className="mt-3 font-display text-lg text-white">
                    {c.name}
                  </p>
                  <p className="mt-1 text-xs text-white/65 leading-relaxed">
                    {c.trait}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detail photos */}
          <div className="mt-12">
            <ProductImage
              src={IMG.walletDetail}
              alt="รายละเอียดงานเย็บ ภายในกระเป๋า BeRichy"
              aspect="aspect-square"
            />
            <p className="mt-3 text-center text-xs text-white/55">
              รายละเอียดงานเย็บมือ · ช่องใส่บัตร · ช่องใส่ธนบัตรกว้าง รับแบงก์ 1000 ได้พอดี
            </p>
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
              เหรียญอีโนเชี่ยน + BeRichy Wallet — ทักเข้า LINE OA แจ้งว่า ‘สั่ง Bundle’
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
                  desc: "BeRichy & เหรียญอีโนเชี่ยนผ่านการคัดเลือกจากต้นแหล่งจริง · ไม่ใช่ของ mass production",
                },
                {
                  title: "Tradition-honest",
                  desc: "อธิบาย ‘ที่มา’ ของแต่ละชิ้นตามตำราจริง · ไม่บิดเบือนเป็นคำสัญญา",
                },
                {
                  title: "Limited stock",
                  desc: "ของแต่ละชิ้นมีจำนวนน้อย · เพื่อให้ลูกค้ารู้สึก ‘เข้าถึงพิเศษ’",
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
              q="เหรียญอีโนเชี่ยนผ่านการประกอบพิธีไหม?"
              a="ผ่านการประกอบพิธีจากวัดบางพันธุ์ กรุงเทพมหานคร · พร้อมกล่องและใบประกอบพิธี 1 ปีให้ครบ"
            />
            <Q
              q="BeRichy ใบยาวมีกี่สี?"
              a="5 สีหลัก — ครีม / ดำ / เขียวเข้ม / แดง / น้ำตาล · เลือกตามพลังที่อยากเรียก หรือสีตามเลขเจ้าของของคุณ"
            />
            <Q
              q="รับประกันโชคไหม?"
              a="ไม่รับประกันโชคหรือผลลัพธ์ทางการเงิน · สิ่งของเหล่านี้เป็น symbol ของความเชื่อตามตำราโบราณ — ความหมายในใจเจ้าของคือพลังที่แท้จริง"
            />
            <Q
              q="ส่งทั่วประเทศไหม?"
              a="ส่งทั่วประเทศไทย ผ่าน Kerry / Flash Express · ทักรายละเอียดใน LINE OA"
            />
            <Q
              q="จ่ายอย่างไร?"
              a="โอนเข้าบัญชีธนาคาร MAMULAB · ทีมงานจะส่งรายละเอียดให้ในแชท · ใช้สลิปจริงตามขั้นตอนปกติ"
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

/**
 * ProductImage — shows a real photo from /public/prosperity/ when available,
 * with a premium gold/midnight gradient placeholder underneath so the layout
 * never breaks (even before photos are uploaded).
 */
function ProductImage({
  src,
  alt,
  aspect,
}: {
  src: string;
  alt: string;
  aspect: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-midnight-soft via-royal/30 to-midnight ${aspect}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(245,226,125,0.18),_transparent_60%)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="relative h-full w-full object-cover"
      />
    </div>
  );
}
