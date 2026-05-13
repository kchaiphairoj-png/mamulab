import type { ReactNode } from "react";

/**
 * Building blocks for premium articles. Each component is a self-contained,
 * stylable unit so writers can compose articles like LEGO.
 */

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 mb-3 font-display text-2xl text-white md:text-3xl">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 mb-2 font-display text-xl text-gold-light">
      {children}
    </h3>
  );
}

export function P({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={className}>{children}</p>;
}

export function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-lg leading-relaxed text-white/90 ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="ml-5 list-disc space-y-2">{children}</ul>;
}

export function OL({ children }: { children: ReactNode }) {
  return <ol className="ml-5 list-decimal space-y-2">{children}</ol>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="text-white">{children}</strong>;
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-gold/20 px-1.5 py-0.5 text-gold-light">
      {children}
    </span>
  );
}

/** Pull-quote / aside / insight box */
export function Callout({
  variant = "insight",
  title,
  children,
}: {
  variant?: "insight" | "tip" | "warning" | "action";
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    insight: "border-gold/40 bg-gold/10",
    tip: "border-violet/40 bg-violet/10",
    warning: "border-red-400/40 bg-red-500/10",
    action: "border-emerald-400/40 bg-emerald-500/10",
  } as const;
  const labels = {
    insight: "Insight",
    tip: "Tip",
    warning: "ระวัง",
    action: "ลงมือทำ",
  } as const;

  return (
    <aside
      className={`my-8 rounded-2xl border ${styles[variant]} p-6`}
    >
      <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/65">
        {title ?? labels[variant]}
      </p>
      <div className="text-white/90 leading-relaxed">{children}</div>
    </aside>
  );
}

/** Numerology root number block — title + body grid */
export function NumberBlock({
  number,
  planet,
  title,
  children,
}: {
  number: number;
  planet?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="my-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-7">
      <div className="flex items-baseline gap-5">
        <span className="font-display text-5xl text-gold-gradient leading-none">
          {number}
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
            ROOT {number}{planet ? ` · ${planet}` : ""}
          </p>
          <h3 className="mt-1 font-display text-xl text-white md:text-2xl">
            {title}
          </h3>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-white/85 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

/** Copy-able template block — for caption / script / mantra */
export function Template({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="my-6 rounded-2xl border border-gold/30 bg-midnight-soft/60 p-5">
      <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold-light">
        {label}
      </p>
      <p className="whitespace-pre-line text-white leading-relaxed">
        “{text}”
      </p>
    </div>
  );
}

/** Single-line tip with check icon — for action lists inside NumberBlock */
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((t, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gold/40 text-[10px] text-gold-light">
            ☐
          </span>
          <span className="text-sm text-white/85">{t}</span>
        </li>
      ))}
    </ul>
  );
}
