import Container from "./Container";

const faqs = [
  {
    q: "ตัวเลขเหล่านี้แม่นจริงไหม?",
    a: "เราไม่ได้ใช้ตัวเลขเป็นคำพยากรณ์ แต่ใช้เป็นกรอบ ‘ทำให้ตัดสินใจง่ายขึ้น’ — เช่น เลือกสีคอนเทนต์ของวัน เลือกมุม sales ที่จะลอง ผลลัพธ์ทางธุรกิจขึ้นกับการลงมือ ไม่ได้ขึ้นกับเลข",
  },
  {
    q: "ทำไม MAMULAB ใช้คำว่า ‘มูเก็ตติ้ง’ ไม่ใช่ ‘ดูดวง’?",
    a: "เพราะเรารวมความเชื่อ + กลยุทธ์การตลาด + ระบบคอนเทนต์ ในที่เดียว เป้าหมายไม่ใช่ ‘บอกอนาคต’ แต่คือทำให้แบรนด์คุณ ‘ขายได้จริงและวัดผลได้จริง’",
  },
  {
    q: "ฉันต้องเปลี่ยนชื่อหรือเปลี่ยนเบอร์ไหม?",
    a: "ส่วนใหญ่ ‘ไม่ต้อง’ — เราโฟกัสที่สิ่งที่ปรับได้ทันที เช่น ชื่อเพจ ช่อง bio สีหน้า feed มุมเปิด live ราคาสินค้า ก่อนแนะนำการเปลี่ยนแปลงที่ใหญ่กว่านั้น",
  },
  {
    q: "คอร์สเหมาะกับมือใหม่ที่ยังไม่มียอดเลยไหม?",
    a: "ไม่เหมาะ คอร์สของเราออกแบบสำหรับแม่ค้าที่มียอดอยู่แล้วระดับ 30,000–300,000 บาท/เดือน และอยาก scale ต่อ ถ้ายังเริ่มจาก 0 แนะนำให้เริ่มจากเช็กลิสต์ฟรีและคอนเทนต์ก่อน",
  },
  {
    q: "ถ้าฉันไม่เชื่อเรื่องสายมู จะใช้ MAMULAB ได้ไหม?",
    a: "ใช้ได้ — กว่า 60% ของเครื่องมือเรา (positioning / live script / content system / loyalty funnel) คือกลยุทธ์การขายตรง ๆ ที่ใช้ได้แม้ไม่เชื่อเรื่องเลข",
  },
  {
    q: "ราคาคอร์สเริ่มเท่าไหร่?",
    a: "คอร์ส MAMULAB Seller จะเปิดเร็ว ๆ นี้ ราคาและรอบจะส่งให้ผู้ที่ฝากอีเมลไว้ก่อนเป็นกลุ่มแรก",
  },
];

export default function FAQ() {
  return (
    <section className="relative bg-midnight py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            FAQ
          </p>
          <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
            คำถามที่แม่ค้าถาม<span className="text-gold-gradient">บ่อย</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03]">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-start justify-between gap-6 p-6 md:p-7">
                <span className="text-base font-medium text-white md:text-lg">
                  {f.q}
                </span>
                <span
                  className="mt-1 shrink-0 text-gold-light transition group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-white/75 md:px-7 md:pb-7 md:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
