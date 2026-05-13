import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Premium article shell. Provides consistent header, breadcrumb, max width,
 * and footer "save for later / share / next article" actions.
 */
export default function ArticleLayout({
  category,
  title,
  excerpt,
  readMinutes,
  publishedAt,
  children,
}: {
  category: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  publishedAt: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-white/55">
        <Link href="/member" className="hover:text-gold-light">
          Member
        </Link>
        <span>/</span>
        <Link
          href="/member/articles"
          className="hover:text-gold-light"
        >
          บทความเชิงลึก
        </Link>
      </nav>

      {/* Title block */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold-light">
            {category}
          </span>
          <span className="text-xs text-white/45">
            อ่าน ~{readMinutes} นาที · {publishedAt}
          </span>
        </div>

        <h1 className="mt-5 font-display text-3xl text-white md:text-5xl leading-[1.15]">
          {title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-white/75">
          {excerpt}
        </p>
      </header>

      {/* Body */}
      <div className="article-body space-y-7 text-[15px] leading-[1.85] text-white/85">
        {children}
      </div>

      {/* Footer */}
      <footer className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
          อ่านต่อ
        </p>
        <p className="mt-2 text-white/75">
          เนื้อหานี้เป็นส่วนหนึ่งของ MAMULAB Member
        </p>
        <Link
          href="/member/articles"
          className="mt-5 inline-flex items-center justify-center rounded-full border border-gold/40 px-6 py-2 text-sm text-gold-light transition hover:border-gold hover:bg-gold/10"
        >
          ดูบทความอื่น →
        </Link>
      </footer>
    </article>
  );
}
