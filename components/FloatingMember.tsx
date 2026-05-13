"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Floating "เข้าสู่พื้นที่สมาชิก Premium" button — appears bottom-right above
 * the LINE button on public marketing pages.
 *
 * Hidden on /member, /admin, /login, /register where the member area already
 * has its own navigation.
 */
export default function FloatingMember() {
  const pathname = usePathname();
  const hidden =
    pathname?.startsWith("/member") ||
    pathname?.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register";
  if (hidden) return null;

  return (
    <Link
      href="/member"
      aria-label="เข้าสู่พื้นที่สมาชิก Premium"
      className="group fixed bottom-[88px] right-5 z-50 flex items-center gap-3 rounded-full border border-gold/40 bg-midnight-deep/95 px-4 py-3 shadow-glow backdrop-blur transition hover:scale-105 hover:border-gold sm:bottom-[104px] sm:right-8"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-midnight-deep">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 13l-3-3 1.4-1.4L11 11.2l4.6-4.6L17 8l-6 6z" />
        </svg>
      </span>
      <span className="hidden pr-1 text-sm font-medium text-gold-light sm:inline">
        พื้นที่สมาชิก
      </span>
    </Link>
  );
}
