import Container from "./Container";

const targets = [
  {
    title: "แม่ค้าออนไลน์ระดับ scale",
    desc: "ที่มียอดขายอยู่แล้วระดับ 30,000–300,000 บาท/เดือน และอยาก scale ต่อให้เป็นระบบ ไม่ใช่พึ่งโชคและพลังเฉพาะหน้า",
  },
  {
    title: "เจ้าของแบรนด์สายมู",
    desc: "ที่เชื่อเรื่องสายมู / เลขศาสตร์อยู่แล้ว แต่อยากใช้ความเชื่อช่วยยอดขายอย่างมีโครงสร้าง วัดผลได้",
  },
  {
    title: "แม่ค้า live / content จัดเต็ม",
    desc: "ที่ขยัน live ลงคอนเทนต์ทุกวัน แต่รู้สึกว่ามูไม่โดนกลุ่มเป้าหมายที่มีกำลังซื้อ อยากดึงลูกค้าระดับพรีเมียมเข้ามา",
  },
];

export default function WhoFor() {
  return (
    <section className="relative bg-midnight-deep py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            Who is it for
          </p>
          <h2 className="font-display text-3xl text-white md:text-5xl">
            <span className="text-gold-gradient">MAMULAB</span> เหมาะกับใคร?
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {targets.map((t) => (
            <div
              key={t.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-gold/40 hover:bg-white/[0.06]"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-light">
                ✓
              </div>
              <h3 className="font-display text-xl text-white">{t.title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
