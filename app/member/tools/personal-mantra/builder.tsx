"use client";

import { useMemo, useState } from "react";
import {
  buildPersonalMantras,
  CATEGORY_LABEL,
  CATEGORY_HINT,
  type Mantra,
} from "@/lib/personalMantra";

export default function PersonalMantraBuilder() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [refreshIndex, setRefreshIndex] = useState(0);

  const result = useMemo(
    () =>
      birthDate ? buildPersonalMantras(birthDate, name, refreshIndex) : null,
    [birthDate, name, refreshIndex]
  );

  return (
    <div className="space-y-8">
      {/* Input form */}
      <section className="rounded-3xl border border-gold/30 bg-gradient-to-br from-royal/40 via-midnight-soft to-midnight-deep p-6 sm:p-8 print:hidden">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
          Step 1 · ใส่ข้อมูล
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="mantra-name"
              className="mb-2 block text-xs text-white/65"
            >
              ชื่อ / ชื่อเล่น
            </label>
            <input
              id="mantra-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น มุก / พี่ตุ๊ก"
              className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <p className="mt-1 text-[11px] text-white/45">
              ชื่อจะใส่ลงในมันตรา ทำให้รู้สึกเป็นของเราจริง ๆ
            </p>
          </div>

          <div>
            <label
              htmlFor="mantra-dob"
              className="mb-2 block text-xs text-white/65"
            >
              วันเกิด
            </label>
            <input
              id="mantra-dob"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <p className="mt-1 text-[11px] text-white/45">
              ใช้คำนวณเลขเจ้าของ — ไม่ถูกส่งออกจากเครื่องคุณ
            </p>
          </div>
        </div>
      </section>

      {!result && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/55 print:hidden">
          ใส่วันเกิดด้านบนเพื่อสร้างมันตราของคุณ
        </div>
      )}

      {result && (
        <>
          {/* Identity card */}
          <section className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/10 via-violet/5 to-transparent p-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
              มันตราของ {result.name}
            </p>
            <div className="mt-3 flex items-baseline gap-5">
              <span className="font-display text-5xl text-gold-gradient leading-none">
                {result.root}
              </span>
              <div>
                <p className="font-display text-xl text-white">
                  {result.archetype}
                </p>
                <p className="mt-0.5 text-sm text-white/65">
                  {result.planet}
                </p>
              </div>
            </div>
          </section>

          {/* Three mantras */}
          <section className="space-y-5">
            {result.mantras.map((m) => (
              <MantraCard key={m.category} mantra={m} />
            ))}
          </section>

          {/* Actions */}
          <section className="flex flex-wrap items-center justify-between gap-4 print:hidden">
            <button
              type="button"
              onClick={() => setRefreshIndex((i) => i + 1)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-midnight-deep/60 px-5 py-2.5 text-sm text-gold-light transition hover:border-gold hover:bg-gold/10"
            >
              สุ่มมันตราชุดใหม่ ↻
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.02]"
            >
              บันทึกเป็น PDF / พิมพ์
            </button>
          </section>

          <p className="text-center text-xs text-white/45 print:hidden">
            มันตรานี้สำหรับแรงบันดาลใจส่วนตัว · พกในมือถือ พิมพ์ติดผนัง ใช้ทุกวัน
          </p>
        </>
      )}
    </div>
  );
}

function MantraCard({ mantra }: { mantra: Mantra }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(mantra.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // ignore
    }
  }

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 print:break-inside-avoid print:border-black/20 print:bg-white print:text-black">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light print:text-black/60">
            {CATEGORY_LABEL[mantra.category]}
          </p>
          <p className="mt-1 text-xs text-white/55 print:text-black/55">
            {CATEGORY_HINT[mantra.category]}
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-full border border-gold/40 bg-midnight-deep/60 px-3 py-1 text-[11px] text-gold-light transition hover:border-gold hover:bg-gold/10 print:hidden"
        >
          {copied ? "คัดลอกแล้ว ✓" : "คัดลอก"}
        </button>
      </div>

      <p className="mt-5 font-display text-xl leading-[1.7] text-white print:text-black md:text-2xl">
        “{mantra.text}”
      </p>
    </article>
  );
}
