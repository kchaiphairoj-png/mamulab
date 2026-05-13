import Container from "./Container";
import { SOCIAL } from "@/lib/config";

const LINE_OA_URL = SOCIAL.line;

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-midnight-deep">
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(91,63,163,0.18),_transparent_70%)] pointer-events-none" />

      <Container className="relative z-10 py-24 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-gold-light backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
              MUKETING LAB · EST. 2025
            </span>

            <h1 className="font-display text-4xl leading-tight md:text-6xl md:leading-[1.05]">
              <span className="text-gold-gradient">MAMULAB</span>
              <span className="block mt-3 text-2xl font-sans font-medium text-white/90 md:text-3xl">
                ห้องทดลองสายมู
                <br className="hidden md:block" />
                สำหรับแม่ค้าออนไลน์
              </span>
            </h1>

            <p className="text-base text-white/75 md:text-lg max-w-xl leading-relaxed">
              ใช้ศาสตร์ตัวเลข + มูเก็ตติ้ง + ระบบคอนเทนต์
              ช่วยแม่ค้าออนไลน์มูอย่างมีระบบ ให้ยอดขายพุ่งขึ้นจริง
            </p>

            <p className="text-sm italic text-gold-light/70 max-w-xl">
              A numerology &amp; “Muketing” lab for Thai online sellers who want
              to turn belief into predictable sales growth.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#name-analyzer"
                className="group inline-flex items-center justify-center rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(245,226,125,0.5)]"
              >
                วิเคราะห์ชื่อร้านฟรี
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#insight"
                className="inline-flex items-center justify-center rounded-full border border-gold/40 px-7 py-3.5 text-sm font-medium text-gold-light transition hover:border-gold hover:bg-gold/10"
              >
                ใส่วันเกิดดูจังหวะการขาย
              </a>
              <a
                href={LINE_OA_URL}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/75 transition hover:border-gold/40 hover:text-gold-light"
              >
                เพิ่มเพื่อน LINE OA
              </a>
            </div>

            <p className="text-xs text-white/55 max-w-md leading-relaxed">
              สำหรับแม่ค้าออนไลน์ที่มียอดอยู่แล้ว{" "}
              <span className="text-gold-light">30k–300k บาท/เดือน</span> และอยาก
              scale ต่ออย่างมีระบบ — ใช้เวลา 30 วินาทีดูคำแนะนำของวันนี้
            </p>
          </div>

          <div className="relative flex h-[420px] items-center justify-center md:h-[520px]">
            <HeroOrnament />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroOrnament() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[420px] w-[420px] rounded-full border border-gold/20 animate-pulse-glow" />
        <div className="absolute h-[320px] w-[320px] rounded-full border border-violet/30" />
        <div className="absolute h-[220px] w-[220px] rounded-full border border-gold/30" />
        <div className="absolute h-[120px] w-[120px] rounded-full bg-gradient-to-br from-gold-light/40 via-gold/20 to-transparent blur-md" />
      </div>

      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full opacity-80"
        aria-hidden
      >
        <defs>
          <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5e27d" />
            <stop offset="50%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#7d5a00" />
          </linearGradient>
        </defs>
        {[1, 2, 3, 5, 6, 8, 9].map((n, i) => {
          const angle = (i / 7) * Math.PI * 2;
          const r = 170;
          const cx = 200 + Math.cos(angle) * r;
          const cy = 200 + Math.sin(angle) * r;
          return (
            <g key={n}>
              <circle
                cx={cx}
                cy={cy}
                r={18}
                fill="none"
                stroke="url(#goldStroke)"
                strokeWidth="0.8"
              />
              <text
                x={cx}
                y={cy + 5}
                textAnchor="middle"
                fontFamily="serif"
                fontSize="14"
                fill="url(#goldStroke)"
              >
                {n}
              </text>
            </g>
          );
        })}
        <circle
          cx="200"
          cy="200"
          r="60"
          fill="none"
          stroke="url(#goldStroke)"
          strokeWidth="0.6"
          strokeDasharray="2 4"
        />
      </svg>
    </div>
  );
}
