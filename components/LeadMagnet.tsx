import Container from "./Container";
import LeadForm from "./LeadForm";
import { SOCIAL } from "@/lib/config";

const LINE_OA_URL = SOCIAL.line;

export default function LeadMagnet() {
  return (
    <section
      id="lead-magnet"
      className="relative bg-midnight-deep py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(201,168,76,0.12),_transparent_60%)]" />
      <Container className="relative">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20 md:items-center">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
              Free Checklist
            </p>
            <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
              เริ่มมูอย่างมีระบบ ด้วย
              <br />
              <span className="text-gold-gradient">เช็กลิสต์ฟรี</span>{" "}
              จาก MAMULAB
            </h2>

            <div className="mt-6 space-y-4 text-white/80 leading-relaxed">
              <p>
                เรามีเช็กลิสต์{" "}
                <span className="text-gold-light">
                  “5 จุดมูหน้าร้านออนไลน์ ที่แม่ค้าสายมูระดับพรีเมียมมักพลาด”
                </span>{" "}
                ให้คุณโหลดฟรี
              </p>
              <p className="text-white/65">
                เหมาะสำหรับแม่ค้าออนไลน์ที่ต้องการตรวจสอบว่า โปรไฟล์ เพจ
                ชื่อร้าน เลขต่าง ๆ ของตัวเองตอนนี้ ‘มูเต็ม’ หรือยัง
              </p>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-white/75">
              {[
                "ตรวจชื่อร้าน + เลขประจำเพจให้ตรงพลังที่อยากเรียก",
                "ตรวจ bio / โปรไฟล์ ว่าสื่อสารกับลูกค้าระดับพรีเมียมจริงไหม",
                "ตรวจสีและภาพคอนเทนต์ ว่าส่งพลังการขายตรงไหม",
                "เช็กระบบ follow-up ว่าปิดการขายต่อเนื่องหรือยัง",
                "เช็กพลังเลขใน price point + แพ็กเกจ",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-gold/30 via-violet/20 to-transparent opacity-60 blur-xl" />
            <div className="relative rounded-3xl border border-gold/30 bg-midnight-soft/80 p-8 md:p-10 backdrop-blur">
              <LeadForm />
              <div className="mt-6 border-t border-white/10 pt-6 text-center text-sm">
                <p className="text-white/55">
                  หรือกดเพิ่มเพื่อน LINE OA เพื่อรับทาง LINE แทน
                </p>
                <a
                  href={LINE_OA_URL}
                  className="mt-3 inline-flex items-center justify-center rounded-full border border-gold/40 px-5 py-2 text-sm text-gold-light transition hover:border-gold hover:bg-gold/10"
                >
                  เพิ่มเพื่อน LINE OA →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
