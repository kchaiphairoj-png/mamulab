import type { Metadata } from "next";
import { Prompt, Cinzel } from "next/font/google";
import Analytics from "@/components/Analytics";
import FloatingLine from "@/components/FloatingLine";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mamulab.com"),
  title: "MAMULAB – ห้องทดลองสายมูสำหรับแม่ค้าออนไลน์",
  description:
    "MAMULAB ใช้ศาสตร์ตัวเลข + มูเก็ตติ้ง + ระบบคอนเทนต์ ช่วยแม่ค้าออนไลน์ระดับพรีเมียมมูอย่างมีระบบ ให้ยอดขายพุ่งขึ้นจริง",
  keywords: [
    "MAMULAB",
    "มูเก็ตติ้ง",
    "ศาสตร์ตัวเลข",
    "แม่ค้าออนไลน์",
    "เลขมงคล",
    "สายมู",
    "live commerce",
  ],
  openGraph: {
    title: "MAMULAB – ห้องทดลองสายมูสำหรับแม่ค้าออนไลน์",
    description:
      "ใช้ศาสตร์ตัวเลข + มูเก็ตติ้ง + ระบบคอนเทนต์ ช่วยแม่ค้าออนไลน์มูอย่างมีระบบ",
    url: "https://mamulab.com",
    siteName: "MAMULAB",
    locale: "th_TH",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${prompt.variable} ${cinzel.variable}`}>
      <body className="font-sans bg-midnight-deep text-white antialiased">
        {children}
        <FloatingLine />
        <Analytics />
      </body>
    </html>
  );
}
