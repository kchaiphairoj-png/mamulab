"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Status =
  | { kind: "idle" }
  | { kind: "uploading" }
  | { kind: "verifying" }
  | { kind: "error"; message: string };

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function UploadSlipForm() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStatus({ kind: "idle" });
    const f = e.target.files?.[0];
    if (!f) {
      setPreview(null);
      setFileName("");
      return;
    }
    if (!ALLOWED.includes(f.type)) {
      setStatus({
        kind: "error",
        message: "รองรับเฉพาะไฟล์ภาพ (JPG / PNG / WebP)",
      });
      return;
    }
    if (f.size > MAX_BYTES) {
      setStatus({
        kind: "error",
        message: "ไฟล์ใหญ่เกิน 5MB กรุณาลดขนาดภาพ",
      });
      return;
    }
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = fileRef.current?.files?.[0];
    if (!f) {
      setStatus({ kind: "error", message: "กรุณาเลือกไฟล์สลิปก่อน" });
      return;
    }

    setStatus({ kind: "uploading" });

    try {
      const form = new FormData();
      form.append("file", f);

      setStatus({ kind: "verifying" });

      const res = await fetch("/api/payment/verify", {
        method: "POST",
        body: form,
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!res.ok || !json?.ok) {
        setStatus({
          kind: "error",
          message: json?.error ?? "ตรวจสลิปไม่ผ่าน กรุณาลองใหม่",
        });
        return;
      }

      // Success — redirect to success page
      router.push("/member/billing/pay/success");
      router.refresh();
    } catch {
      setStatus({
        kind: "error",
        message: "เชื่อมต่อไม่ได้ กรุณาลองใหม่",
      });
    }
  }

  const isWorking =
    status.kind === "uploading" || status.kind === "verifying";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label
        htmlFor="slip-file"
        className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center transition ${
          preview
            ? "border-gold/40 bg-gold/5"
            : "border-white/15 bg-white/[0.02] hover:border-gold/40 hover:bg-white/[0.04]"
        }`}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="slip preview"
              className="max-h-72 rounded-xl object-contain"
            />
            <span className="text-xs text-white/65">{fileName}</span>
            <span className="text-xs text-gold-light">
              คลิกเพื่อเลือกใหม่
            </span>
          </>
        ) : (
          <>
            <span className="text-3xl">📤</span>
            <span className="text-sm text-white/85">
              คลิกเพื่อเลือกภาพสลิป
            </span>
            <span className="text-xs text-white/55">
              JPG / PNG / WebP · ไม่เกิน 5MB
            </span>
          </>
        )}
        <input
          ref={fileRef}
          id="slip-file"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={isWorking}
        />
      </label>

      {status.kind === "error" && (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
          {status.message}
        </div>
      )}

      {isWorking && (
        <div className="rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-gold-light">
          {status.kind === "uploading"
            ? "กำลังอัปโหลดสลิป..."
            : "กำลังตรวจสอบสลิป — รอ ~5 วินาที"}
        </div>
      )}

      <button
        type="submit"
        disabled={isWorking || !preview}
        className="inline-flex w-full items-center justify-center rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isWorking ? "กำลังตรวจสอบ…" : "ส่งสลิป + เปิดสมาชิก"}
      </button>

      <p className="text-center text-xs text-white/45">
        ระบบใช้บริการตรวจสลิปอัตโนมัติ (SlipOK) ไม่เก็บข้อมูลบัญชีของผู้โอน
      </p>
    </form>
  );
}
