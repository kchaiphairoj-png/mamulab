"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      type="button"
      className="rounded-full border border-gold/40 px-5 py-2 text-sm text-gold-light transition hover:border-gold hover:bg-gold/10 print:hidden"
    >
      บันทึกเป็น PDF
    </button>
  );
}
