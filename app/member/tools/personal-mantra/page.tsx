import Link from "next/link";
import { requireActiveMember } from "@/lib/content/paywall";
import PersonalMantraBuilder from "./builder";

export const metadata = {
  title: "มันตราส่วนตัวจากวันเกิด | MAMULAB Member",
};

export default async function PersonalMantraPage() {
  await requireActiveMember();

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <nav className="flex items-center gap-2 text-xs text-white/55 print:hidden">
        <Link href="/member" className="hover:text-gold-light">
          Member
        </Link>
        <span>/</span>
        <Link href="/member/tools" className="hover:text-gold-light">
          เครื่องมือ
        </Link>
      </nav>

      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70 print:hidden">
          Tool · Personal Mantra
        </p>
        <h1 className="font-display text-3xl text-white md:text-4xl leading-tight">
          มันตราส่วนตัวจากวันเกิด
        </h1>
        <p className="mt-3 text-white/70 leading-relaxed print:hidden">
          ใส่ชื่อกับวันเกิด — ระบบจะคำนวณเลขเจ้าของของคุณ
          และเลือกมันตรา 3 บทที่ตรงพลังของคุณ
          1 บทสำหรับเปิดวัน · 1 บทสำหรับปิดดีล · 1 บทสำหรับดูแลใจปลายวัน
          บันทึกเป็น PDF เก็บไว้ดูทุกวันได้
        </p>
      </header>

      <PersonalMantraBuilder />
    </div>
  );
}
