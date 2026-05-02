import Container from "./Container";

const stats = [
  {
    value: "70%+",
    label: "คนไทยยอมรับว่าเชื่อเรื่องดูดวงและตัวเลข",
  },
  {
    value: "หมื่นล้านบาท",
    label: "มูลค่าตลาดสายมูในไทยต่อปี (ประเมินรวม)",
  },
  {
    value: "Live Commerce",
    label: "ช่องทางที่กำลังเติบโตแรงที่สุดในอีคอมเมิร์ซไทย",
  },
];

export default function SocialProof() {
  return (
    <section className="relative bg-midnight-deep py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            Insight
          </p>
          <h2 className="font-display text-3xl text-white md:text-5xl">
            ทำไม{" "}
            <span className="text-gold-gradient">สายมู</span>{" "}
            ถึงไม่ใช่แค่กระแส?
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 text-center"
            >
              <p className="font-display text-3xl text-gold-gradient md:text-4xl">
                {s.value}
              </p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-5 text-center text-white/75 leading-relaxed">
          <p>
            ตลาดสายมูในไทยถูกประเมินว่ามีมูลค่าหลายหมื่นล้านบาทต่อปี
            และมากกว่า 70% ของคนไทยยอมรับว่าเชื่อเรื่องดูดวงและตัวเลข
          </p>
          <p>
            ในขณะเดียวกัน social commerce และ live commerce กำลังเติบโตแรง
            แบรนด์ใหญ่หันมาใช้{" "}
            <span className="text-gold-light">‘มูเก็ตติ้ง’</span>{" "}
            ดึงดูดลูกค้า
          </p>
          <p className="text-gold-light">
            MAMULAB เกิดขึ้นเพื่อนำพลังศรัทธานี้
            มาเชื่อมกับระบบการขายของแม่ค้าออนไลน์ระดับพรีเมียม
          </p>
        </div>
      </Container>
    </section>
  );
}
