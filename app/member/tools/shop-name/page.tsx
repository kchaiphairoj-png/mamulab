import Link from "next/link";
import { requireActiveMember } from "@/lib/content/paywall";
import ShopNameCalculator from "./calculator";

export const metadata = {
  title: "คำนวณชื่อร้านขั้นสูง | MAMULAB Member",
};

export default async function ShopNamePage() {
  await requireActiveMember();

  return (
    <div className="mx-auto max-w-3xl space-y-10">
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
          Tool · เลขศาสตร์
        </p>
        <h1 className="font-display text-3xl text-white md:text-4xl leading-tight">
          คำนวณชื่อร้านขั้นสูง
        </h1>
        <p className="mt-3 text-white/70 leading-relaxed">
          พิมพ์ชื่อร้านลงไป — ระบบจะนับพยัญชนะ สระ และวรรณยุกต์ทุกตัว
          แสดงเลขรวม + เลขราก 1–9 พร้อมแนวทาง business
          ที่เลขรากนั้นเหมาะกับและจุดที่ต้องระวัง
        </p>
      </header>

      <ShopNameCalculator />
    </div>
  );
}
