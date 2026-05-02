"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Container from "./Container";
import {
  calculateRootNumber,
  formatThaiDate,
  getNumerologyProfile,
  parseBirthDate,
  PRODUCT_MAP,
  type NumerologyProfile,
} from "@/lib/numerology";
import { trackEvent } from "@/lib/track";

type ResultState = {
  profile: NumerologyProfile;
  birthDateLabel: string;
} | null;

export default function BirthDateWidget() {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResultState>(null);
  const [openedTracked, setOpenedTracked] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  // Fire "opened" once when widget enters viewport.
  useEffect(() => {
    if (openedTracked || typeof IntersectionObserver === "undefined") return;
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackEvent("birth_widget_opened");
          setOpenedTracked(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [openedTracked]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const parsed = parseBirthDate(date);
    if (!parsed) {
      setError("กรุณาใส่วันเดือนปีเกิดที่ถูกต้อง (พ.ศ. ต้องไม่อยู่ในอนาคต)");
      return;
    }
    const root = calculateRootNumber(parsed);
    const profile = getNumerologyProfile(root);
    const birthDateLabel = formatThaiDate(parsed);

    trackEvent("birth_date_submitted", { root });
    setResult({ profile, birthDateLabel });

    // Smooth-scroll the card into view after render.
    queueMicrotask(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      trackEvent("birth_result_shown", { root });
    });
  }

  function handleReset() {
    setResult(null);
    setError("");
    setDate("");
  }

  function handleCTA(profile: NumerologyProfile) {
    trackEvent("birth_cta_clicked", {
      root: profile.root,
      product: profile.cta.productKey,
    });
  }

  function handleShare(profile: NumerologyProfile) {
    trackEvent("birth_share_clicked", { root: profile.root });
    const text = `เลขราก ${profile.root} · ${profile.planet.th} (${profile.planet.en})\n${profile.identity}\n— จาก MAMULAB ห้องทดลองสายมูสำหรับแม่ค้าออนไลน์`;
    const url = "https://mamulab.com";
    if (typeof navigator !== "undefined" && "share" in navigator) {
      navigator
        .share?.({ title: "MAMULAB", text, url })
        .catch(() => fallbackCopy(`${text}\n${url}`));
    } else {
      fallbackCopy(`${text}\n${url}`);
    }
  }

  function fallbackCopy(text: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).catch(() => undefined);
  }

  return (
    <section
      ref={sectionRef}
      id="insight"
      className="relative bg-midnight py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(201,168,76,0.10),_transparent_60%)] pointer-events-none" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            Free · 30 seconds
          </p>
          <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
            ใส่วันเกิด ดู<span className="text-gold-gradient">จังหวะการขาย</span>
            <br className="hidden md:block" /> ของคุณวันนี้
          </h2>
          <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
            ไม่ใช่หมอดู — เป็นไกด์สั้น ๆ ว่าวันนี้คุณควรโฟกัสคอนเทนต์แบบไหน
            ใช้สีอะไร และมุม sales ไหนเหมาะกับ ‘พลังธุรกิจ’ ของคุณ
          </p>
        </div>

        {/* FORM */}
        {!result && (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-xl rounded-3xl border border-gold/30 bg-midnight-soft/80 p-6 backdrop-blur md:p-10"
            aria-labelledby="insight-form-heading"
          >
            <h3 id="insight-form-heading" className="sr-only">
              ฟอร์มใส่วันเกิด
            </h3>
            <label
              htmlFor="birth-date"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold-light/80"
            >
              วันเดือนปีเกิด
            </label>
            <input
              id="birth-date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <p className="mt-2 text-xs text-white/45">
              ข้อมูลใช้คำนวณในเบราว์เซอร์เท่านั้น เราไม่บันทึกวันเกิดของคุณ
            </p>

            {error && (
              <p className="mt-3 text-sm text-red-300" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center rounded-full bg-gold-gradient px-7 py-4 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.01]"
            >
              ดูจังหวะการขายของฉัน
              <span className="ml-2 transition group-hover:translate-x-1">
                →
              </span>
            </button>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-white/40">
              เพื่อแรงบันดาลใจและไกด์ในการตัดสินใจประจำวัน
              ไม่ใช่คำพยากรณ์หรือคำสัญญาผลลัพธ์ทางธุรกิจ
            </p>
          </form>
        )}

        {/* RESULT */}
        {result && (
          <div ref={resultRef} className="mt-12">
            <ResultCard
              profile={result.profile}
              birthDateLabel={result.birthDateLabel}
              onReset={handleReset}
              onCTA={() => handleCTA(result.profile)}
              onShare={() => handleShare(result.profile)}
            />
          </div>
        )}
      </Container>
    </section>
  );
}

// =====================================================================
// Result card — extracted within same file for tight coupling
// =====================================================================
function ResultCard({
  profile,
  birthDateLabel,
  onReset,
  onCTA,
  onShare,
}: {
  profile: NumerologyProfile;
  birthDateLabel: string;
  onReset: () => void;
  onCTA: () => void;
  onShare: () => void;
}) {
  const product = PRODUCT_MAP[profile.cta.productKey];

  return (
    <article
      className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-gold/40 bg-gradient-to-br from-midnight-soft via-midnight to-midnight-deep shadow-glow"
      aria-label={`ผลพลังตัวเลข ${profile.root}`}
    >
      <div className="relative grid gap-8 p-8 md:grid-cols-[auto_1fr] md:gap-10 md:p-12">
        {/* Big number */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-light/80">
            เลขรากของคุณ
          </span>
          <span
            className="font-display text-[7rem] leading-none text-gold-gradient md:text-[9rem]"
            aria-hidden
          >
            {profile.root}
          </span>
          <span className="mt-1 text-sm text-white/65">
            {profile.planet.th} · {profile.planet.en}
          </span>
        </div>

        {/* Body */}
        <div className="space-y-7">
          <header>
            <p className="text-xs uppercase tracking-[0.25em] text-gold/70">
              พลังประจำตัว
            </p>
            <p className="mt-2 font-display text-xl text-white md:text-2xl leading-snug">
              {profile.identity}
            </p>
          </header>

          <Section title="คำแนะนำของวันนี้">
            <p>{profile.todayAdvice}</p>
          </Section>

          <Section title="สีที่เพิ่มพลังการขายของคุณ">
            <div className="flex flex-wrap items-center gap-3">
              {profile.colors.map((c) => (
                <span
                  key={c.hex}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/85"
                >
                  <span
                    className="h-4 w-4 rounded-full ring-1 ring-white/30"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden
                  />
                  {c.name}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {profile.styling}
            </p>
          </Section>

          <Section title="เคล็ดที่ไม่มีใครบอก">
            <p className="text-white/85">{profile.uncommonTip}</p>
          </Section>

          {/* CTA box */}
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-violet/10 to-transparent p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-light/80">
              {profile.cta.label}
            </p>
            <p className="mt-2 font-display text-lg text-white md:text-xl">
              {product.label}
            </p>
            <p className="mt-1 text-sm text-white/70 leading-relaxed">
              {product.tagline}
            </p>
            <a
              href={product.href}
              onClick={onCTA}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.02]"
            >
              เริ่มจากสิ่งที่เหมาะกับพลังของคุณวันนี้
              <span className="ml-2">→</span>
            </a>
          </div>

          {/* Footer actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-sm">
            <p className="text-xs text-white/45">
              คำนวณจาก {birthDateLabel}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onShare}
                className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/80 transition hover:border-gold/50 hover:text-gold-light"
              >
                แชร์ผลของฉัน
              </button>
              <button
                type="button"
                onClick={onReset}
                className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/80 transition hover:border-gold/50 hover:text-gold-light"
              >
                ลองใส่วันเกิดอื่น
              </button>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-white/40">
            * บุ๊กมาร์กหน้านี้ไว้ในมือถือ —
            กลับมาเช็กก่อน live ทุกครั้งเพื่อปรับสีและมุมคอนเทนต์ให้ตรงพลัง
            <br />
            เพื่อแรงบันดาลใจประจำวัน ไม่ใช่คำสัญญาผลลัพธ์
          </p>
        </div>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.25em] text-gold/70">
        {title}
      </p>
      <div className="mt-2 text-white/80 leading-relaxed">{children}</div>
    </section>
  );
}
