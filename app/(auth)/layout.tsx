import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/Container";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-midnight-deep">
      <header className="border-b border-white/10">
        <Container className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-display text-xl text-gold-gradient transition hover:opacity-80"
          >
            MAMULAB
          </Link>
          <Link
            href="/"
            className="text-sm text-white/65 transition hover:text-gold-light"
          >
            ← กลับหน้าหลัก
          </Link>
        </Container>
      </header>

      <Container className="py-12 md:py-20">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </Container>
    </main>
  );
}
