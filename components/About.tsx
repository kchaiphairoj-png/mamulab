import Container from "./Container";

const helps = [
  "ปรับชื่อร้าน / ชื่อแบรนด์ / เลข / สี ให้สอดคล้องกับ positioning และ target ลูกค้า",
  "ออกแบบ bio และโปรไฟล์เพจสายมูที่ดึงดูดลูกค้าที่ใช่ ไม่ใช่ลูกค้ามั่ว ๆ",
  "สร้าง script live / caption / content calendar ที่ใช้ศาสตร์ตัวเลข + มูเก็ตติ้ง",
  "สร้างระบบ follow-up ผ่าน LINE OA และเครื่องมือออนไลน์ ให้ปิดการขายต่อเนื่อง",
];

export default function About() {
  return (
    <section className="relative bg-midnight-deep py-24 md:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
              What is MAMULAB
            </p>
            <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
              <span className="text-gold-gradient">MAMULAB</span> คืออะไร?
            </h2>

            <div className="mt-8 space-y-5 text-white/80 leading-relaxed">
              <p>
                <span className="text-gold-light">MAMULAB</span>{" "}
                คือห้องทดลองสายมูสำหรับแม่ค้าออนไลน์และเจ้าของกิจการ
                ที่เอา{" "}
                <span className="text-white">
                  ศาสตร์ตัวเลข + กลยุทธ์การตลาดออนไลน์ (Muketing) +
                  ระบบคอนเทนต์และ AI
                </span>{" "}
                มาช่วยวางโครงสร้างหน้าร้านออนไลน์ live caption bio
                ให้ “มูแล้วพุ่ง” ในมิติยอดขาย
              </p>
              <p className="text-white/65">
                เราไม่ใช่หมอดูทั่วไป และไม่ขายสัญญาณการลงทุน
                แต่ช่วยปรับแบรนด์และระบบขายให้สอดคล้องกับความเชื่อของเจ้าของธุรกิจ
                อย่างมืออาชีพ
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-gold/30 via-violet/20 to-transparent opacity-60 blur-xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10 backdrop-blur">
              <p className="mb-6 text-sm uppercase tracking-[0.25em] text-gold-light">
                เราช่วยเรื่องอะไรบ้าง
              </p>
              <ul className="space-y-5">
                {helps.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-lg text-gold-gradient">
                      0{i + 1}
                    </span>
                    <span className="text-white/85 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
