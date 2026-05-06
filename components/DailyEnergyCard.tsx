"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "./Container";
import { getTodayEnergy, TIP_CATEGORY_LABEL } from "@/lib/dailyEnergy";
import { trackEvent } from "@/lib/track";

/**
 * DailyEnergyCard
 * - Sits above the Hero
 * - Shows today's universal lucky number, color, best live windows,
 *   one rotating tip, and a daily mantra
 * - Pure client computation; same content for everyone in Thailand
 *   on the same calendar day
 * - Soft accordion: details collapsed on first paint to keep above-the-fold light
 */
export default function DailyEnergyCard() {
  // Compute on the client to ensure timezone matches the visitor.
  // We render a thin skeleton on SSR/first paint to avoid hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const energy = useMemo(() => getTodayEnergy(), []);

  useEffect(() => {
    setMounted(true);
    trackEvent("daily_energy_viewed", {
      number: energy.number,
      date: energy.dateKey,
    });
  }, [energy.dateKey, energy.number]);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      trackEvent("daily_tip_expanded", {
        number: energy.number,
        date: energy.dateKey,
      });
    }
  };

  const handleShare = async () => {
    trackEvent("daily_share_clicked", {
      number: energy.number,
      date: energy.dateKey,
    });
    const text = `พลังแม่ค้าวันนี้ ${energy.thaiDate}
เลขประจำวัน ${energy.number} · ${energy.profile.planet}
${energy.mantra}
ดูเพิ่มที่ mamulab.com`;
    try {
      if (typeof navigator === "undefined") return;
      const nav = navigator as Navigator & {
        share?: (data: ShareData) => Promise<void>;
        clipboard?: { writeText: (s: string) => Promise<void> };
      };
      if (typeof nav.share === "function") {
        await nav.share({
          title: "พลังแม่ค้าวันนี้ · MAMULAB",
          text,
          url: "https://mamulab.com",
        });
        return;
      }
      if (nav.clipboard?.writeText) {
        await nav.clipboard.writeText(text);
        alert("คัดลอกข้อความสำหรับแชร์แล้ว ✨");
      }
    } catch {
      // user cancelled — silent
    }
  };

  return (
    <section
      aria-label="พลังประจำวันของแม่ค้าออนไลน์"
      className="relative bg-midnight-deep pt-6 sm:pt-8"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-royal/40 via-midnight-soft to-midnight-deep p-5 shadow-glow sm:p-7">
          {/* decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-violet/15 blur-3xl" />

          <div className="relative grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-7">
            {/* Number Badge */}
            <div className="flex items-center gap-4 md:block">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-gold/40 bg-midnight-deep/60 sm:h-24 sm:w-24">
                <span className="font-display text-4xl text-gold-gradient sm:text-5xl">
                  {mounted ? energy.number : "·"}
                </span>
              </div>
              <div className="md:hidden">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold/70">
                  พลังวันนี้
                </p>
                <p className="mt-1 text-sm text-white/80">
                  {mounted ? energy.thaiDate : "กำลังคำนวณ..."}
                </p>
              </div>
            </div>

            {/* Headline + meta */}
            <div className="min-w-0">
              <p className="hidden text-[11px] uppercase tracking-[0.3em] text-gold/70 md:block">
                Daily Energy · {mounted ? energy.dateKey : ""}
              </p>
              <h2 className="mt-1 font-display text-xl text-white sm:text-2xl md:text-3xl">
                {mounted
                  ? `พลังแม่ค้าวันนี้ — เลข ${energy.number} ${energy.profile.planet}`
                  : "พลังแม่ค้าวันนี้"}
              </h2>
              <p className="mt-2 text-sm text-white/75 sm:text-base">
                {mounted
                  ? energy.profile.identity
                  : "เลขประจำวัน · สีเสริมพลัง · ช่วงเวลาทอง · เคล็ดลับการขาย"}
              </p>

              {/* color row */}
              {mounted && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-white/55">สีเสริมพลัง:</span>
                  {energy.profile.colors.map((c) => (
                    <span
                      key={c.name}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/85"
                    >
                      <span
                        className="h-3 w-3 rounded-full ring-1 ring-white/30"
                        style={{ background: c.hex }}
                        aria-hidden
                      />
                      {c.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action: expand */}
            <div className="flex items-center justify-start gap-2 md:justify-end">
              <button
                type="button"
                onClick={handleToggle}
                aria-expanded={open}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-midnight-deep/60 px-5 py-2.5 text-sm font-medium text-gold-light transition hover:border-gold hover:bg-gold/10"
              >
                {open ? "ย่อดู" : "ดูเคล็ดวันนี้"}
                <span
                  aria-hidden
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>
            </div>
          </div>

          {/* Expanded details */}
          {mounted && open && (
            <div className="relative mt-6 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
              {/* Live windows */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold-light/80">
                  ช่วงเวลาทอง · Live
                </p>
                <ul className="mt-3 space-y-3">
                  {energy.liveWindows.map((w) => (
                    <li key={w.label}>
                      <p className="text-sm font-medium text-white">
                        {w.label} · {w.range}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-white/65">
                        {w.reason}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick tip */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold-light/80">
                  เคล็ดวันนี้ · {TIP_CATEGORY_LABEL[energy.tip.category]}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  {energy.tip.text}
                </p>
              </div>

              {/* Mantra */}
              <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/15 via-violet/10 to-transparent p-5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold-light/80">
                  มันตราเปิดร้านวันนี้
                </p>
                <p className="mt-3 font-display text-base leading-relaxed text-white sm:text-lg">
                  “{energy.mantra}”
                </p>
                <button
                  type="button"
                  onClick={handleShare}
                  className="mt-4 inline-flex items-center gap-2 text-xs text-gold-light transition hover:text-gold"
                >
                  แชร์พลังวันนี้ ↗
                </button>
              </div>
            </div>
          )}

          {mounted && (
            <p className="relative mt-4 text-[11px] text-white/45">
              เนื้อหาเปลี่ยนทุกวัน · เพื่อแรงบันดาลใจและเคล็ดลับขาย ไม่ใช่คำพยากรณ์
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
