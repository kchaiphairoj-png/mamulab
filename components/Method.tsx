import Container from "./Container";

const steps = [
  {
    num: "01",
    title: "Decode",
    th: "ถอดรหัส",
    desc: "ถอดรหัสตัวเลขและพลังหน้าร้านออนไลน์ของคุณตอนนี้ ทั้งชื่อร้าน เบอร์ เพจ และโปรไฟล์ เพื่อให้รู้ว่าจุดไหน ‘มูเต็ม’ จุดไหน ‘รั่ว’",
  },
  {
    num: "02",
    title: "Design",
    th: "ออกแบบ",
    desc: "ออกแบบแบรนด์ โปรไฟล์ และคอนเทนต์ให้ตรงกับพลังที่อยากเรียก ทั้งสี ตัวเลข ภาษา และ visual ที่สื่อสารกับลูกค้าเป้าหมายระดับพรีเมียม",
  },
  {
    num: "03",
    title: "Deploy",
    th: "ลงระบบ",
    desc: "ลงระบบ live, content calendar, LINE OA และใช้ AI ช่วยทำซ้ำได้ ให้แม่ค้าทำงานน้อยลง แต่ยอดขายและลูกค้าใหม่เข้าต่อเนื่อง",
  },
];

export default function Method() {
  return (
    <section className="relative bg-midnight py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            The Method
          </p>
          <h2 className="font-display text-3xl text-white md:text-5xl">
            วิธีมูอย่างมีระบบของ{" "}
            <span className="text-gold-gradient">MAMULAB</span>
          </h2>
          <p className="mt-5 text-white/65">
            สามขั้นตอนที่เราใช้กับแม่ค้าออนไลน์ระดับพรีเมียม เพื่อเปลี่ยน
            ‘ความเชื่อ’ ให้เป็น ‘ระบบยอดขายที่วัดผลได้’
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 transition hover:border-gold/40"
            >
              <div className="absolute -right-6 -top-6 font-display text-[6rem] leading-none text-gold/10 transition group-hover:text-gold/20">
                {step.num}
              </div>
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
                  Step {i + 1}
                </p>
                <h3 className="mt-3 font-display text-3xl text-gold-gradient">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-white/60">{step.th}</p>
                <p className="mt-6 text-white/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
