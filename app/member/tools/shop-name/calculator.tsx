"use client";

import { useMemo, useState } from "react";
import {
  calculateThaiNumerology,
  SHOP_NAME_INSIGHTS,
} from "@/lib/thaiNumerology";

export default function ShopNameCalculator() {
  const [name, setName] = useState("");
  const trimmed = name.trim();
  const result = useMemo(
    () => (trimmed ? calculateThaiNumerology(trimmed) : null),
    [trimmed]
  );

  const insight = result
    ? SHOP_NAME_INSIGHTS[result.root]
    : undefined;

  return (
    <div className="space-y-8">
      <div>
        <label
          htmlFor="shop-name"
          className="mb-2 block text-xs uppercase tracking-[0.25em] text-gold-light"
        >
          ชื่อร้านที่อยากตรวจ
        </label>
        <input
          id="shop-name"
          type="text"
          autoComplete="off"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="พิมพ์ชื่อร้านภาษาไทย เช่น มะม่วง แลคกี้"
          className="w-full rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-4 text-xl text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
        <p className="mt-2 text-xs text-white/45">
          ระบบนับเฉพาะอักษรไทย เว้นวรรค-ภาษาอังกฤษถูกข้ามอัตโนมัติ
        </p>
      </div>

      {!result && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/55">
          พิมพ์ชื่อร้านด้านบนเพื่อเริ่ม
        </div>
      )}

      {result && insight && (
        <>
          {/* Score card */}
          <section className="rounded-3xl border border-gold/30 bg-gradient-to-br from-royal/40 via-midnight-soft to-midnight-deep p-8 shadow-glow">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
                  ผลรวมทั้งหมด
                </p>
                <p className="mt-1 font-display text-3xl text-white">
                  {result.total}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
                  เลขรากของชื่อ
                </p>
                <p className="font-display text-6xl text-gold-gradient">
                  {result.root}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-[0.25em] text-gold-light/80">
                {insight.planet} · {insight.vibe}
              </p>
              <p className="mt-3 leading-relaxed text-white/85">
                {insight.recommendation}
              </p>
            </div>
          </section>

          {/* Letter breakdown */}
          <section>
            <h3 className="mb-3 font-display text-lg text-white">
              การคำนวณ
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {result.parts.map((p, i) => (
                <div
                  key={i}
                  title={p.type}
                  className={`flex flex-col items-center justify-center rounded-lg border px-2.5 py-1.5 text-center ${
                    p.type === "ignored"
                      ? "border-white/5 bg-white/[0.02] text-white/30"
                      : p.type === "consonant"
                        ? "border-gold/30 bg-gold/5 text-white"
                        : p.type === "vowel"
                          ? "border-violet/30 bg-violet/5 text-white"
                          : "border-white/15 bg-white/[0.04] text-white/65"
                  }`}
                >
                  <span className="font-display text-lg leading-none">
                    {p.char}
                  </span>
                  <span className="mt-1 text-[10px] text-white/55">
                    {p.value || "-"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-white/55">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-gold/40" /> พยัญชนะ
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-violet/40" /> สระ
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-white/20" /> วรรณยุกต์
              </span>
            </div>
          </section>

          {/* Best for / Watch out */}
          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300">
                เหมาะกับธุรกิจ
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                {insight.bestFor.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/5 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300">
                จุดที่ต้องระวัง
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                {insight.watchOut.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <p className="text-center text-xs text-white/45">
            เครื่องมือนี้ใช้เพื่อแรงบันดาลใจในการตัดสินใจทางธุรกิจ ไม่ใช่คำพยากรณ์
          </p>
        </>
      )}
    </div>
  );
}
