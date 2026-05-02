import Container from "./Container";

const painPoints = [
  "Live ขายของแทบทุกวัน แต่คนดูกับยอดสั่งซื้อยังนิ่ง",
  "เชื่อเรื่องตัวเลข/สีมงคล แต่ไม่รู้จะเอามาช่วยโปรไฟล์เพจและคอนเทนต์ยังไง",
  "ลงคอนเทนต์ทุกวันเหมือนพูดกับอากาศ ไม่มีลูกค้าใหม่เข้ามา",
  "เคยมูด้วยการซื้อของ พกเครื่องราง เปลี่ยนเบอร์ แต่ไม่มีระบบวัดผลยอดขายจริง",
];

export default function Pain() {
  return (
    <section className="relative bg-midnight py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            The Pain
          </p>
          <h2 className="font-display text-3xl text-white md:text-5xl">
            มูเยอะแล้ว…{" "}
            <span className="text-gold-gradient">
              แต่ยอดขายยังไม่พุ่ง?
            </span>
          </h2>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {painPoints.map((point) => (
            <li
              key={point}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  ×
                </span>
                <p className="text-white/85 leading-relaxed">{point}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-violet/10 to-transparent p-8 md:p-10">
          <p className="text-lg text-white md:text-xl leading-relaxed">
            ปัญหาอาจไม่ใช่ที่{" "}
            <span className="text-gold-light">ความเชื่อ</span>
            <br className="hidden md:block" />
            แต่อยู่ที่{" "}
            <span className="text-gold-gradient font-semibold">
              “วิธีใช้ความเชื่อแบบไม่มีระบบ”
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
