"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Container from "./Container";
import { SOCIAL } from "@/lib/config";
import { trackEvent } from "@/lib/track";
import {
  analyseShopName,
  PRIMARY_SYSTEM_LABEL,
  type ShopNameAnalysis,
} from "@/lib/nameAnalyzer";
import {
  NAME_MEANINGS,
  MASTER_MEANINGS,
  colorHex,
  type NameNumberMeaning,
  type MasterNumberMeaning,
} from "@/lib/nameMeanings";
import { downloadShareImage, type ShareFormat } from "@/lib/shareImage";

const LINE_OA_URL = SOCIAL.line;

type State =
  | { kind: "idle" }
  | { kind: "loading"; ticker: number }
  | { kind: "result"; analysis: ShopNameAnalysis };

const LOADING_LINES = [
  "กำลังถอดรหัสเลข Chaldean…",
  "กำลังถอดรหัสเลขศาสตร์ไทย…",
  "กำลังประเมินพลังแบรนด์…",
];

export default function NameAnalyzer() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const [busyFormat, setBusyFormat] = useState<ShareFormat | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const trimmed = input.trim();
  const canSubmit = trimmed.length >= 2;

  // Rotate the loading line text while we sit in the loading state.
  useEffect(() => {
    if (state.kind !== "loading") return;
    const id = setInterval(() => {
      setState((s) =>
        s.kind === "loading" ? { kind: "loading", ticker: s.ticker + 1 } : s
      );
    }, 250);
    return () => clearInterval(id);
  }, [state.kind]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const a = analyseShopName(trimmed);
    if (!a) return;

    trackEvent("name_analyzer_submit", {
      length: trimmed.length,
      hasThai: a.hasThai,
      hasEnglish: a.hasEnglish,
    });

    setState({ kind: "loading", ticker: 0 });
    // Brief simulated delay so the user feels the "analysis" happen
    window.setTimeout(() => {
      setState({ kind: "result", analysis: a });
      queueMicrotask(() =>
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }, 800);
  }

  function handleRetry() {
    trackEvent("name_analyzer_retry");
    setState({ kind: "idle" });
    setInput("");
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const handleShare = useCallback(
    async (format: ShareFormat, analysis: ShopNameAnalysis) => {
      try {
        setBusyFormat(format);
        trackEvent(
          format === "story"
            ? "name_analyzer_share_story"
            : "name_analyzer_share_feed",
          { value: analysis.primaryValue }
        );
        await downloadShareImage(analysis, format);
      } catch (err) {
        console.error("share image failed", err);
        alert("บันทึกรูปไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setBusyFormat(null);
      }
    },
    []
  );

  function handleLineClick() {
    trackEvent("name_analyzer_line_click");
  }

  return (
    <section
      ref={sectionRef}
      id="name-analyzer"
      className="relative bg-midnight-deep py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(91,63,163,0.15),_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,_rgba(201,168,76,0.10),_transparent_60%)] pointer-events-none" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            Free Tool · 30 seconds
          </p>
          <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
            วิเคราะห์<span className="text-gold-gradient">ชื่อร้าน</span>
            ของคุณ
            <br className="hidden md:block" /> มูเต็มหรือยัง?
          </h2>
          <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
            ใส่ชื่อร้านที่ใช้อยู่ตอนนี้ — เราถอดรหัสเลข{" "}
            <span className="text-gold-light">3 ระบบ</span> (Chaldean / Pythagorean / ไทย)
            ให้ในเบราว์เซอร์ พร้อมคำแนะนำว่าเหมาะกับสินค้าและสีแบบไหน
          </p>
        </div>

        {state.kind !== "result" && (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-xl rounded-3xl border border-gold/30 bg-midnight-soft/80 p-6 backdrop-blur md:p-10"
            aria-labelledby="name-analyzer-form-heading"
          >
            <h3 id="name-analyzer-form-heading" className="sr-only">
              ฟอร์มวิเคราะห์ชื่อร้าน
            </h3>
            <label
              htmlFor="shop-name-input"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold-light/80"
            >
              ชื่อร้านของคุณ
            </label>
            <input
              id="shop-name-input"
              type="text"
              required
              maxLength={80}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="เช่น MAMULAB หรือ ร้านสวยใส"
              autoComplete="off"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
              disabled={state.kind === "loading"}
            />
            <p className="mt-2 text-xs text-white/45">
              {trimmed.length === 1
                ? "ใส่อย่างน้อย 2 ตัวอักษร"
                : "ข้อมูลคำนวณในเบราว์เซอร์เท่านั้น เราไม่บันทึกชื่อร้านของคุณ"}
            </p>

            <button
              type="submit"
              disabled={!canSubmit || state.kind === "loading"}
              aria-disabled={!canSubmit || state.kind === "loading"}
              className="group mt-6 inline-flex w-full items-center justify-center rounded-full bg-gold-gradient px-7 py-4 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {state.kind === "loading"
                ? LOADING_LINES[state.ticker % LOADING_LINES.length]
                : "วิเคราะห์ชื่อร้านฟรี"}
              {state.kind !== "loading" && (
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-white/40">
              เพื่อแรงบันดาลใจในการพัฒนาแบรนด์ · ไม่ใช่คำพยากรณ์
            </p>
          </form>
        )}

        {state.kind === "result" && (
          <div ref={resultRef} className="mt-12">
            <ResultCard
              analysis={state.analysis}
              busyFormat={busyFormat}
              onShare={handleShare}
              onRetry={handleRetry}
              onLineClick={handleLineClick}
            />
          </div>
        )}
      </Container>
    </section>
  );
}

// ====================================================================
// Result card
// ====================================================================
function ResultCard({
  analysis,
  busyFormat,
  onShare,
  onRetry,
  onLineClick,
}: {
  analysis: ShopNameAnalysis;
  busyFormat: ShareFormat | null;
  onShare: (format: ShareFormat, a: ShopNameAnalysis) => void;
  onRetry: () => void;
  onLineClick: () => void;
}) {
  const reduced = analysis.primaryReducedTo ?? analysis.primaryValue;
  const meaning: NameNumberMeaning = NAME_MEANINGS[reduced];
  const master: MasterNumberMeaning | undefined =
    MASTER_MEANINGS[analysis.primaryValue];

  return (
    <article
      className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-gold/40 bg-gradient-to-br from-midnight-soft via-midnight to-midnight-deep shadow-glow"
      aria-label={`ผลวิเคราะห์ชื่อร้าน ${analysis.shopName}`}
    >
      <div className="relative grid gap-8 p-7 md:grid-cols-[auto_1fr] md:gap-10 md:p-12">
        {/* Big number */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-light/80">
            เลขหลักของแบรนด์
          </span>
          <span
            className="font-display text-[6rem] leading-none text-gold-gradient md:text-[8rem]"
            aria-hidden
          >
            {master
              ? `${analysis.primaryValue}/${analysis.primaryReducedTo}`
              : analysis.primaryValue}
          </span>
          <span className="mt-1 text-sm text-white/65">
            {PRIMARY_SYSTEM_LABEL[analysis.primarySystem]}
          </span>
        </div>

        <div className="space-y-7">
          <header>
            <p className="text-xs uppercase tracking-[0.25em] text-gold/70">
              ชื่อร้าน
            </p>
            <p className="mt-1 font-display text-2xl text-white md:text-3xl break-words">
              {analysis.shopName}
            </p>
            <p className="mt-3 font-display text-xl text-gold-gradient md:text-2xl">
              {master ? master.title : meaning.title}
            </p>
            <p className="mt-1 text-white/80 leading-relaxed">
              {master ? master.subtitle : meaning.subtitle}
            </p>
          </header>

          {/* All-systems table */}
          <Section title="📊 คะแนนทุกระบบ">
            <ul className="grid gap-2 text-sm">
              {analysis.chaldean && (
                <ScoreRow
                  label="Chaldean (สากล)"
                  value={
                    analysis.chaldean.isMaster
                      ? `${analysis.chaldean.value}/${analysis.chaldean.masterReducedTo}`
                      : String(analysis.chaldean.value)
                  }
                  emphasised={analysis.primarySystem === "chaldean"}
                />
              )}
              {analysis.pythagorean && (
                <ScoreRow
                  label="Pythagorean (สากล)"
                  value={
                    analysis.pythagorean.isMaster
                      ? `${analysis.pythagorean.value}/${analysis.pythagorean.masterReducedTo}`
                      : String(analysis.pythagorean.value)
                  }
                />
              )}
              {analysis.thai && (
                <ScoreRow
                  label="เลขศาสตร์ไทย"
                  value={
                    analysis.thai.isMaster
                      ? `${analysis.thai.value}/${analysis.thai.masterReducedTo}`
                      : String(analysis.thai.value)
                  }
                  emphasised={analysis.primarySystem === "thai"}
                />
              )}
            </ul>
          </Section>

          {master && (
            <Section title="🔮 หมายเหตุเลขมาสเตอร์">
              <p className="text-white/85 leading-relaxed">{master.note}</p>
              <p className="mt-3 text-sm text-emerald-300">
                ✦ {master.extraStrength}
              </p>
              <p className="mt-2 text-sm text-amber-300">
                ⚠ {master.extraWarning}
              </p>
            </Section>
          )}

          <Section title="⚡ พลังของแบรนด์">
            <p className="text-white/85 leading-relaxed">{meaning.energy}</p>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {meaning.personality}
            </p>
          </Section>

          <Section title="🎯 จุดแข็ง">
            <p className="text-white/85 leading-relaxed">{meaning.strength}</p>
          </Section>

          <Section title="⚠️ ระวัง">
            <p className="text-white/85 leading-relaxed">{meaning.weakness}</p>
          </Section>

          <Section title="✓ เหมาะกับธุรกิจประเภท">
            <ul className="space-y-1.5">
              {meaning.bestForBusinessTypes.map((b) => (
                <li key={b} className="flex items-start gap-2 text-white/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="🎨 สีเสริมพลัง">
            <div className="flex flex-wrap items-center gap-2.5">
              {meaning.colors.primary.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/85"
                >
                  <span
                    className="h-4 w-4 rounded-full ring-1 ring-white/30"
                    style={{ backgroundColor: colorHex(c) }}
                    aria-hidden
                  />
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              {meaning.colors.reason}
            </p>
            <p className="mt-2 text-xs text-white/55">
              <span className="text-amber-300">หลีกเลี่ยง:</span>{" "}
              {meaning.colors.avoid.join(" · ")}
            </p>
          </Section>

          <Section title="📅 วันมงคล">
            <p className="text-white/85">{meaning.luckyDays}</p>
          </Section>

          <Section title="💡 เคล็ดมูเก็ตติ้ง">
            <p className="text-white/85 leading-relaxed">{meaning.contentTip}</p>
          </Section>

          <Section title="🔧 ปรับเล็กน้อยให้พลังเพิ่ม">
            <p className="text-white/85 leading-relaxed">{meaning.quickFix}</p>
          </Section>

          {/* Share buttons */}
          <div className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
            <button
              type="button"
              disabled={busyFormat !== null}
              onClick={() => onShare("story", analysis)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] px-5 py-3 text-sm text-gold-light transition hover:border-gold hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busyFormat === "story" ? "กำลังบันทึก…" : "📸 บันทึกรูป Story 9:16"}
            </button>
            <button
              type="button"
              disabled={busyFormat !== null}
              onClick={() => onShare("feed", analysis)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] px-5 py-3 text-sm text-gold-light transition hover:border-gold hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busyFormat === "feed" ? "กำลังบันทึก…" : "📸 บันทึกรูป Feed 1:1"}
            </button>
            <button
              type="button"
              onClick={onRetry}
              className="sm:col-span-2 inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm text-white/80 transition hover:border-gold/50 hover:text-gold-light"
            >
              🔄 วิเคราะห์ชื่ออื่น
            </button>
          </div>

          {/* LINE CTA */}
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-violet/10 to-transparent p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-light/80">
              อยากได้รายงานละเอียด
            </p>
            <p className="mt-2 font-display text-lg text-white md:text-xl leading-snug">
              พร้อมแนะนำการปรับชื่อร้านให้ ‘มูเต็ม’?
            </p>
            <a
              href={LINE_OA_URL}
              onClick={onLineClick}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.02]"
            >
              <LineIcon /> เพิ่มเพื่อน LINE OA
            </a>
          </div>

          <p className="text-[11px] leading-relaxed text-white/40">
            เครื่องมือนี้สำหรับแรงบันดาลใจในการพัฒนาแบรนด์ · ไม่ใช่คำพยากรณ์หรือคำสัญญาผลลัพธ์ทางธุรกิจ
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

function ScoreRow({
  label,
  value,
  emphasised,
}: {
  label: string;
  value: string;
  emphasised?: boolean;
}) {
  return (
    <li
      className={`flex items-center justify-between rounded-xl border px-4 py-2.5 ${
        emphasised
          ? "border-gold/40 bg-gold/10 text-gold-light"
          : "border-white/10 bg-white/[0.03] text-white/80"
      }`}
    >
      <span className="text-xs uppercase tracking-widest">{label}</span>
      <span className="font-display text-lg">{value}</span>
    </li>
  );
}

function LineIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 36 36"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M18 4C9.7 4 3 9.4 3 16.1c0 6 5.4 11 12.7 12 .5.1 1.2.3 1.4.7.2.4.1 1 .1 1.4l-.2 1.4c-.1.4-.3 1.6 1.4.9 1.7-.7 9.5-5.6 13-9.6 2.4-2.7 3.6-5.4 3.6-8.8C35 9.4 28.3 4 20 4h-2zm-7.4 7.7h2.1c.3 0 .5.2.5.5v5.7h3.1c.3 0 .5.2.5.5v1.5c0 .3-.2.5-.5.5h-5.2c-.3 0-.5-.2-.5-.5v-7.7c0-.3.3-.5.5-.5zm7.6 0h2.1c.3 0 .5.2.5.5v7.7c0 .3-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5v-7.7c0-.3.3-.5.5-.5zm4.3 0h2.1c.2 0 .3.1.4.2l3.5 4.7v-4.4c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5v7.7c0 .3-.2.5-.5.5h-2.1c-.2 0-.3-.1-.4-.2l-3.5-4.7v4.4c0 .3-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5v-7.7c0-.3.3-.5.5-.5z" />
    </svg>
  );
}
