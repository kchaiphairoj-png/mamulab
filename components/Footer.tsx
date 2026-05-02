import Link from "next/link";
import Container from "./Container";
import { SOCIAL } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-midnight-deep">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-gold-gradient">
              MAMULAB
            </p>
            <p className="mt-3 text-sm text-white/65 leading-relaxed">
              ห้องทดลองสายมูสำหรับแม่ค้าออนไลน์
              <br />
              Numerology &amp; Muketing Lab for Premium Online Sellers.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-light/70">
              ติดตามเรา
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <a
                  href={SOCIAL.line}
                  className="transition hover:text-gold-light"
                >
                  LINE Official Account
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.facebook}
                  className="transition hover:text-gold-light"
                >
                  Facebook Page
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.tiktok}
                  className="transition hover:text-gold-light"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.instagram}
                  className="transition hover:text-gold-light"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-light/70">
              ข้อมูล
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-gold-light"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-gold-light"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <a
                  href="#lead-magnet"
                  className="transition hover:text-gold-light"
                >
                  ขอรับเช็กลิสต์ฟรี
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
          <p>
            © {year} MAMULAB – ห้องทดลองสายมูสำหรับแม่ค้าออนไลน์. All rights
            reserved.
          </p>
          <p className="tracking-widest">mamulab.com</p>
        </div>
      </Container>
    </footer>
  );
}
