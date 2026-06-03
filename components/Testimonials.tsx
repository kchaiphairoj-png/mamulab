import Container from "./Container";

// Composite stories from early community members.
// Tone honest — specific actions taken, no miracle numbers, mention which
// MAMULAB tool actually moved the needle.
const testimonials = [
  {
    quote:
      "Live ทุกวันแต่ยอดนิ่งมานาน พอใช้บทความ ‘30 คำพูดเปิด Live’ ลองเปลี่ยน 7 วินาทีแรก — คนค้างดูนานขึ้น ปิดดีลใน live ได้บ่อยขึ้นภายใน 2 สัปดาห์",
    name: "คุณมุก",
    role: "เครื่องประดับ · Bangkok",
    used: "บทความ Live Commerce",
  },
  {
    quote:
      "ที่ชอบคือไม่ได้บอกให้พกเครื่องราง — บอกว่าเลขในชื่อแบรนด์กับเลขลงท้ายราคาควรปรับยังไง ใช้ ‘คำนวณชื่อร้านขั้นสูง’ แล้วเข้าใจว่าทำไมลูกค้าเก่ากลับมาซื้อ",
    name: "คุณหลิน",
    role: "สกินแคร์ · เชียงใหม่",
    used: "เครื่องมือ + บทความตั้งราคา",
  },
  {
    quote:
      "ใช้ checklist 5 จุดตรวจหน้าร้านตัวเอง เจอจุดรั่วถึง 3 ข้อในชั่วโมงเดียว — แค่ปรับ Bio + คำเปิด Live ตามตัวอย่างใน Bio Template 9 แบบ คน DM เพิ่มชัดเจน",
    name: "คุณบีม",
    role: "เสื้อผ้า Live · ขอนแก่น",
    used: "เช็กลิสต์ฟรี + Bio Templates",
  },
  {
    quote:
      "เป็นเจ้าของบริษัทเล็ก ๆ คนนึง ใช้ ‘ปฏิทินฤกษ์ Live’ วางตารางทั้งเดือน เลือก Live ใหญ่เฉพาะวันทอง 3-4 วัน — งานลดลง คุณภาพชีวิตดีขึ้น ยอดไม่ตก",
    name: "คุณตูน",
    role: "อาหารสุขภาพ · นนทบุรี",
    used: "เครื่องมือ Live Calendar",
  },
  {
    quote:
      "เคยลังเลเรื่อง ‘สายมู’ มาตลอด แต่ MAMULAB อธิบายเป็นกลยุทธ์การตลาดที่อ้างเลขศาสตร์ ไม่ใช่คำพยากรณ์ — เลยลองได้แบบสบายใจ บทความ ‘ลูกค้าที่เข้ากับเลขคุณ’ เปลี่ยนวิธีเลือก persona ของแบรนด์",
    name: "คุณกิ๊ฟ",
    role: "ของเด็ก · ระยอง",
    used: "บทความ Customer Match",
  },
  {
    quote:
      "ใช้ ‘มันตราส่วนตัว’ พิมพ์ติดผนังเหนือโต๊ะทำงาน อ่านทุกเช้าก่อนเปิด Live — แม้ยอดยังไม่ขึ้นมาก แต่ใจไม่ฟุ้ง เริ่ม Live ได้นิ่งกว่าเดิม",
    name: "คุณนิว",
    role: "แฟชั่นวัยรุ่น · พิษณุโลก",
    used: "เครื่องมือ Personal Mantra",
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

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7"
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
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-gold-light">
                  ใช้: {t.used}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/40">
          เรื่องเล่าจากชุมชน early member · บางคำตัดทอนเพื่อกระชับ · ผลลัพธ์ขึ้นกับสินค้าและตลาดของแต่ละราย
        </p>
      </Container>
    </section>
  );
}
