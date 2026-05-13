import Link from "next/link";
import { requireActiveMember } from "@/lib/content/paywall";
import { ARTICLES } from "@/lib/content/articles";

export const metadata = { title: "บทความเชิงลึก | MAMULAB Member" };

export default async function ArticlesIndex() {
  await requireActiveMember();

  return (
    <div className="space-y-10">
      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold/70">
          Premium · บทความเชิงลึก
        </p>
        <h1 className="font-display text-3xl text-white md:text-4xl">
          คลังบทความเชิงลึกของสมาชิก
        </h1>
        <p className="mt-2 text-sm text-white/65">
          {ARTICLES.length} บทความ · เน้นการประยุกต์ใช้กับธุรกิจจริง
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/member/articles/${a.slug}`}
            className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-gold/40 hover:bg-white/[0.06]"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
              {a.category}
            </p>
            <h2 className="mt-3 font-display text-xl text-white md:text-2xl leading-snug group-hover:text-gold-gradient">
              {a.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              {a.excerpt}
            </p>
            <p className="mt-auto pt-6 text-xs text-white/45">
              อ่าน ~{a.readMinutes} นาที · {a.publishedAt}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
