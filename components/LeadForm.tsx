"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    if (!consent) {
      setErrorMsg("กรุณายินยอมการรับข้อมูลตาม PDPA ก่อนส่งฟอร์ม");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, consent, source: "landing" }),
      });

      if (!res.ok) throw new Error("REQUEST_FAILED");

      // Fire analytics events if available
      if (typeof window !== "undefined") {
        const w = window as unknown as {
          gtag?: (...args: unknown[]) => void;
          fbq?: (...args: unknown[]) => void;
        };
        w.gtag?.("event", "generate_lead", {
          event_category: "engagement",
          event_label: "landing_lead_form",
        });
        w.fbq?.("track", "Lead");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setErrorMsg("ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/40 bg-gold/10 p-8 text-center">
        <p className="font-display text-2xl text-gold-gradient">
          ขอบคุณค่ะ ✨
        </p>
        <p className="mt-3 text-white/85">
          เช็กลิสต์ของคุณกำลังเดินทางไปที่อีเมล กรุณาตรวจสอบกล่องจดหมาย
          (และโฟลเดอร์ Promotions / Spam ด้วยนะคะ)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="lead-name"
          className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold-light/80"
        >
          ชื่อของคุณ
        </label>
        <input
          id="lead-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="เช่น คุณมุก"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <div>
        <label
          htmlFor="lead-email"
          className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold-light/80"
        >
          อีเมล
        </label>
        <input
          id="lead-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/75">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-gold"
        />
        <span className="leading-relaxed">
          ฉันยินยอมให้ MAMULAB ส่งข้อมูล เนื้อหาที่เกี่ยวข้อง
          และข้อเสนอผ่านอีเมล ตาม{" "}
          <a href="#" className="text-gold-light underline">
            PDPA
          </a>
        </span>
      </label>

      {errorMsg && (
        <p className="text-sm text-red-300">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-full items-center justify-center rounded-full bg-gold-gradient px-7 py-4 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting"
          ? "กำลังส่ง..."
          : "ขอรับเช็กลิสต์มูหน้าร้านฟรี"}
        <span className="ml-2 transition group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
