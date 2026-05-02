import Container from "./Container";

export default function Program() {
  return (
    <section className="relative bg-midnight py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-royal via-midnight to-midnight-deep p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-violet/15 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold-light">
                Coming Program
              </p>
              <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
                เตรียมพบกับคอร์ส
                <br />
                <span className="text-gold-gradient">
                  MAMULAB Seller
                </span>
                <span className="block mt-2 text-2xl md:text-3xl text-white/85">
                  มูยอดขายแม่ค้าออนไลน์
                </span>
              </h2>

              <div className="mt-7 space-y-4 text-white/80 leading-relaxed">
                <p>
                  คอร์สสด + ออนไลน์{" "}
                  <span className="text-gold-light">6–8 สัปดาห์</span>{" "}
                  สำหรับแม่ค้าออนไลน์ระดับจริงจัง
                  ที่อยากเอาศาสตร์ตัวเลขและมูเก็ตติ้งมาใช้กับ live, content
                  และระบบขายทั้งเพจ
                </p>
                <p className="text-white/65">
                  โฟกัสผลลัพธ์: ยอดขายต่อเดือน
                  และความมั่นใจในการ live / ขายของออนไลน์อย่างมีระบบ
                </p>
              </div>

              <a
                href="#lead-magnet"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.02]"
              >
                อยากรู้รายละเอียดคอร์ส (ฝากอีเมลไว้)
                <span className="ml-2">→</span>
              </a>
            </div>

            <div className="grid gap-3">
              {[
                { label: "ระยะเวลา", value: "6–8 สัปดาห์" },
                { label: "รูปแบบ", value: "สด + ออนไลน์" },
                { label: "เหมาะกับ", value: "แม่ค้าออนไลน์ระดับ scale" },
                { label: "เป้าหมาย", value: "ยอดขาย + ระบบทำซ้ำได้" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    {item.label}
                  </span>
                  <span className="text-sm text-gold-light">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
