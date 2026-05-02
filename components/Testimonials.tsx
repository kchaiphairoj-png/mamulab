import Container from "./Container";

// Replace these with real testimonials when ready.
// Keep tone honest — specific, restrained, no miracle numbers.
const testimonials = [
  {
    quote:
      "ก่อนหน้านี้ live ทุกวันแต่ยอดนิ่ง พอปรับสีเสื้อ + เปลี่ยน hook ตามที่ MAMULAB แนะนำ ยอดต่อ live เพิ่มขึ้นชัดเจนภายใน 2 สัปดาห์",
    name: "คุณมุก",
    role: "แม่ค้าออนไลน์ · เครื่องประดับ",
  },
  {
    quote:
      "ที่ชอบคือไม่ได้บอกให้พกเครื่องราง — แต่บอกว่าเลขในชื่อร้านกับราคาสินค้าควรปรับยังไง เห็นผลกับลูกค้าเก่าก่อนเลย",
    name: "คุณหลิน",
    role: "เจ้าของแบรนด์สกินแคร์",
  },
  {
    quote:
      "ใช้ checklist ตรวจหน้าร้านตัวเอง 5 ข้อ เจอจุดรั่วถึง 3 ข้อ — แก้แล้ว conversion DM สูงขึ้นในรอบเดียว",
    name: "คุณบีม",
    role: "Live commerce · เสื้อผ้า",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-midnight-deep py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            From our community
          </p>
          <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
            แม่ค้าที่ใช้แนวคิด <span className="text-gold-gradient">MAMULAB</span>{" "}
            แล้วเล่าให้ฟัง
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8"
            >
              <span
                className="font-display text-3xl text-gold-gradient"
                aria-hidden
              >
                “
              </span>
              <blockquote className="mt-3 text-white/85 leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm">
                <p className="text-white">{t.name}</p>
                <p className="text-white/55 text-xs">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/40">
          บางความเห็นตัดทอนเพื่อความกระชับ · ผลลัพธ์ขึ้นกับสินค้าและตลาดของแต่ละราย
        </p>
      </Container>
    </section>
  );
}
