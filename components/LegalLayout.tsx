import Link from "next/link";
import { ReactNode } from "react";
import Container from "./Container";
import Footer from "./Footer";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-midnight-deep">
      <header className="border-b border-white/10">
        <Container className="flex items-center justify-between py-6">
          <Link
            href="/"
            className="font-display text-xl text-gold-gradient transition hover:opacity-80"
          >
            MAMULAB
          </Link>
          <Link
            href="/"
            className="text-sm text-white/70 transition hover:text-gold-light"
          >
            ← กลับหน้าหลัก
          </Link>
        </Container>
      </header>

      <Container className="py-16 md:py-24">
        <article className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            {title === "นโยบายความเป็นส่วนตัว"
              ? "Privacy Policy"
              : "Terms & Conditions"}
          </p>
          <h1 className="font-display text-3xl text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-white/50">อัปเดตล่าสุด: {updated}</p>

          <div className="mt-12 space-y-8 text-white/80 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mt-3 [&_a]:text-gold-light [&_a]:underline">
            {children}
          </div>
        </article>
      </Container>

      <Footer />
    </main>
  );
}
