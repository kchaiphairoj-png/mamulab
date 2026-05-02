import Link from "next/link";
import PrintButton from "@/components/PrintButton";

export const metadata = {
  title: "เช็กลิสต์มูหน้าร้านออนไลน์ | MAMULAB",
  description:
    "5 จุดมูหน้าร้านออนไลน์ ที่แม่ค้าสายมูระดับพรีเมียมมักพลาด — เช็กลิสต์ฟรีจาก MAMULAB",
};

const items = [
  {
    no: "01",
    title: "ชื่อร้าน + เลขประจำเพจ ตรงพลังที่อยากเรียกหรือยัง?",
    desc: "เลขแต่ละตัวมีพลังต่างกัน เลขที่ใช้ในชื่อร้าน เบอร์โทร เลขเพจ ส่งผลกับ ‘คนที่ดึงเข้ามา’ มากกว่าที่คิด ลองนับเลขทั้งหมดและดูว่าตรงกับเป้าหมายธุรกิจไหม",
    checks: [
      "นับผลรวมตัวเลขในชื่อร้าน (สูตรเลขศาสตร์)",
      "เลขลงท้ายเบอร์ที่ใช้ติดต่อ — เลขเรียกเงิน หรือ เลขเรียกปัญหา?",
      "URL/username เพจ มีตัวเลขที่ขัดกับพลังที่ต้องการไหม",
    ],
  },
  {
    no: "02",
    title: "Bio / โปรไฟล์เพจ — สื่อกับลูกค้าระดับพรีเมียมจริงไหม?",
    desc: "Bio คือบรรทัดแรกที่ลูกค้าตัดสินใจ ‘กดแอด’ หรือ ‘ปัด’ ภาษาที่ใช้ต้องสื่อสารกับลูกค้าระดับพรีเมียม ไม่ใช่ลูกค้ามั่ว ๆ",
    checks: [
      "Bio บอกชัดไหมว่า ‘ขายอะไร’ + ‘ให้ใคร’ + ‘ผลลัพธ์อะไร’",
      "ภาษาในโปรไฟล์ใช้คำสายมูพรีเมียม หรือคำขายของทั่วไป?",
      "ภาพปก/รูปโปรไฟล์ดูแพง พรีเมียม สอดคล้องกับราคาที่ขายหรือเปล่า",
    ],
  },
  {
    no: "03",
    title: "สี + ภาพคอนเทนต์ ส่งพลังการขายตรงกับกลุ่มเป้าหมายไหม?",
    desc: "สีและภาพคือ ‘พลังที่มองเห็น’ ลูกค้าจะรู้สึกได้ใน 0.3 วินาที ก่อนอ่านข้อความใดๆ สีควรสอดคล้องกับ ‘พลังที่อยากเรียก’ และ ‘ลูกค้าที่อยากให้มา’",
    checks: [
      "feed มี ‘สีหลัก’ ชัดเจนไหม หรือสีกระจัดกระจาย",
      "สีในโปรไฟล์ส่งพลังเงิน เสน่ห์ หรือสุขภาพ ตรงกับสินค้าไหม",
      "ภาพ live / cover ดูพรีเมียม หรือดูคล้ายแม่ค้าทั่วไป",
    ],
  },
  {
    no: "04",
    title: "ระบบ Follow-up — ปิดการขายต่อเนื่องหรือยัง?",
    desc: "ลูกค้าทักมาแล้ว ‘หาย’ คือ leak ที่ใหญ่สุดของแม่ค้าออนไลน์ มูแค่ดึงเข้ามายังไม่พอ ต้อง ‘มูให้อยู่ + มูให้กลับมา’",
    checks: [
      "ลูกค้าทักมาทาง Live / DM แล้วถูกตามต่อใน LINE OA หรือไม่",
      "มีบรอดแคสต์ตามจังหวะดวงและฤกษ์ไหม",
      "ลูกค้าเก่าได้รับ message ถามไถ่ + offer ต่อไปไหม",
    ],
  },
  {
    no: "05",
    title: "ราคา + แพ็กเกจ ใช้พลังเลขช่วยปิดการขายไหม?",
    desc: "ราคาเป็น ‘ตัวเลข’ ที่ส่งพลังโดยตรง เลขที่ลงท้ายราคาส่งผลทั้งกับ ‘ลูกค้ารู้สึกอย่างไรกับราคา’ และ ‘พลังการเงินของแบรนด์’",
    checks: [
      "เลขลงท้ายราคาคือเลขที่ดูดเงินหรือผลักเงิน",
      "แพ็กเกจตั้งราคาแบบสุ่ม หรือคำนวณเลขศาสตร์",
      "ราคาแสดงในโปรไฟล์ตรงกับพลังที่อยากดึงดูดลูกค้าระดับใด",
    ],
  },
];

export default function ChecklistPage() {
  return (
    <main className="min-h-screen bg-midnight-deep">
      <header className="border-b border-white/10 print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-xl text-gold-gradient transition hover:opacity-80"
          >
            MAMULAB
          </Link>
          <div className="flex items-center gap-3">
            <PrintButton />
            <Link
              href="/"
              className="text-sm text-white/70 transition hover:text-gold-light"
            >
              ← กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 md:py-20">
        <div className="text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            Free Checklist · MAMULAB
          </p>
          <h1 className="font-display text-3xl text-white md:text-5xl leading-tight">
            5 จุดมู
            <span className="text-gold-gradient">หน้าร้านออนไลน์</span>
            <br />
            ที่แม่ค้าสายมูระดับพรีเมียมมักพลาด
          </h1>
          <p className="mt-6 text-white/65 max-w-2xl mx-auto leading-relaxed">
            ใช้เช็กลิสต์นี้ตรวจสอบ ‘หน้าร้านออนไลน์’ ของคุณตอนนี้ — ทำเครื่องหมายข้างข้อที่ ‘ผ่าน’
            แล้ว เพื่อดูว่ายังมีจุดไหนที่ ‘มูไม่เต็ม’ บ้าง
          </p>
        </div>

        <div className="mt-14 space-y-6">
          {items.map((item) => (
            <section
              key={item.no}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10 print:break-inside-avoid"
            >
              <div className="flex items-baseline gap-5">
                <span className="font-display text-4xl text-gold-gradient md:text-5xl">
                  {item.no}
                </span>
                <h2 className="font-display text-xl text-white md:text-2xl leading-snug">
                  {item.title}
                </h2>
              </div>

              <p className="mt-4 text-white/75 leading-relaxed">
                {item.desc}
              </p>

              <ul className="mt-6 space-y-3">
                {item.checks.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gold/50 text-xs text-gold-light">
                      ☐
                    </span>
                    <span className="text-sm text-white/85 leading-relaxed">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mt-14 rounded-3xl border border-gold/30 bg-gradient-to-r from-gold/10 via-violet/10 to-transparent p-8 md:p-10 text-center print:hidden">
          <h2 className="font-display text-2xl text-white md:text-3xl">
            ตรวจครบแล้ว แต่ยังไม่ ‘มูเต็ม’?
          </h2>
          <p className="mt-3 text-white/75 max-w-xl mx-auto leading-relaxed">
            MAMULAB กำลังเปิดคอร์ส
            <strong className="text-gold-light"> MAMULAB Seller</strong> —
            มูยอดขายแม่ค้าออนไลน์ 6–8 สัปดาห์
            สำหรับคนที่อยากใช้ศาสตร์ตัวเลข + มูเก็ตติ้ง อย่างมีระบบ
          </p>
          <Link
            href="/#lead-magnet"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gold-gradient px-7 py-3 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.02]"
          >
            สนใจคอร์ส (ฝากอีเมลไว้)
            <span className="ml-2">→</span>
          </Link>
        </section>

        <footer className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} MAMULAB · mamulab.com
          <br />
          ห้ามทำซ้ำหรือดัดแปลงเพื่อใช้เชิงพาณิชย์โดยไม่ได้รับอนุญาต
        </footer>
      </article>
    </main>
  );
}
