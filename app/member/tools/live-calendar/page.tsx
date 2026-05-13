import Link from "next/link";
import { requireActiveMember } from "@/lib/content/paywall";
import LiveCalendarTool from "./calendar";

export const metadata = {
  title: "ปฏิทินฤกษ์ Live ของคุณ | MAMULAB Member",
};

export default async function LiveCalendarPage() {
  await requireActiveMember();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <nav className="flex items-center gap-2 text-xs text-white/55">
        <Link href="/member" className="hover:text-gold-light">
          Member
        </Link>
        <span>/</span>
        <Link href="/member/tools" className="hover:text-gold-light">
          เครื่องมือ
        </Link>
      </nav>

      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
          Tool · Live Calendar
        </p>
        <h1 className="font-display text-3xl text-white md:text-4xl leading-tight">
          ปฏิทินฤกษ์ Live ของคุณ
        </h1>
        <p className="mt-3 text-white/70 leading-relaxed">
          ใส่วันเกิด — ระบบจะคำนวณเลขเจ้าของของคุณ
          แล้วไฮไลต์ ‘วันทอง’ ทุกวันในเดือนที่ดีที่สุดสำหรับ Live ใหญ่
          พร้อมเวลาทองและคำแนะนำสั้น ๆ
        </p>
      </header>

      <LiveCalendarTool />
    </div>
  );
}
