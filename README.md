# MAMULAB — Landing Page

ห้องทดลองสายมูสำหรับแม่ค้าออนไลน์ · Numerology & Muketing Lab.

Next.js 14 (App Router) + TypeScript + Tailwind CSS — พร้อม deploy บน Vercel และเชื่อมโดเมน `mamulab.com`

## Features

- ✅ Single-page landing 9 sections (Hero → Pain → About → Method → LeadMagnet → WhoFor → Program → SocialProof → Footer)
- ✅ Lead capture API (`/api/lead`) เชื่อม Google Sheets / Zapier / Make ผ่าน webhook env var
- ✅ Google Analytics 4 + Meta Pixel (เปิด/ปิดอัตโนมัติด้วย env var)
- ✅ Privacy Policy + Terms & Conditions (เนื้อหาเริ่มต้นรองรับ PDPA)
- ✅ Dynamic OG image (1200×630) — สวยทุกครั้งที่แชร์
- ✅ Dynamic favicon
- ✅ Floating LINE OA button มุมขวาล่างทุกหน้า
- ✅ SEO metadata + Open Graph
- ✅ Responsive (mobile-first)

## โครงสร้าง

```
mamulab/
├── app/
│   ├── layout.tsx                # Root layout + fonts + Analytics + FloatingLine
│   ├── page.tsx                  # Landing
│   ├── globals.css
│   ├── icon.tsx                  # Dynamic favicon
│   ├── opengraph-image.tsx       # Dynamic OG image
│   ├── api/lead/route.ts         # POST endpoint รับ lead
│   ├── privacy-policy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── Container.tsx
│   ├── Hero.tsx                  # 4.1
│   ├── Pain.tsx                  # 4.2
│   ├── About.tsx                 # 4.3
│   ├── Method.tsx                # 4.4
│   ├── LeadMagnet.tsx            # 4.5
│   ├── LeadForm.tsx              # PDPA + GA/Pixel events
│   ├── WhoFor.tsx                # 4.6
│   ├── Program.tsx               # 4.7
│   ├── SocialProof.tsx           # 4.8
│   ├── Footer.tsx                # 4.9
│   ├── LegalLayout.tsx
│   ├── Analytics.tsx             # GA4 + Meta Pixel
│   └── FloatingLine.tsx          # Floating LINE OA button
├── lib/config.ts                 # SOCIAL + ANALYTICS config (อ่านจาก env)
├── docs/google-sheets-webhook.md
├── .env.example
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## เริ่มใช้งาน (Local)

```bash
cd mamulab
npm install
cp .env.example .env.local      # แล้วใส่ค่าจริง (ดูด้านล่าง)
npm run dev
```

เปิดที่ `http://localhost:3000`

## Environment Variables

ดู [.env.example](.env.example) ครบทุกตัว สรุป:

| ตัวแปร | ใช้ทำอะไร | จำเป็น |
|---|---|---|
| `LEAD_WEBHOOK_URL` | URL webhook ที่จะรับ lead (Google Apps Script / Zapier / Make) | ⚠️ ถ้าไม่ใส่ จะแค่ log ลง console |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`) | optional |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID | optional |
| `NEXT_PUBLIC_LINE_OA_URL` | URL แอดเพื่อน LINE OA (เช่น `https://lin.ee/xxxx`) | ✅ |
| `NEXT_PUBLIC_FACEBOOK_URL` | URL Facebook Page | optional |
| `NEXT_PUBLIC_TIKTOK_URL` | URL TikTok | optional |
| `NEXT_PUBLIC_INSTAGRAM_URL` | URL Instagram | optional |

## Deploy ขึ้น Vercel

1. Push repo ขึ้น GitHub
2. ไปที่ [vercel.com/new](https://vercel.com/new) → import repo
3. Framework auto-detect เป็น Next.js
4. ใน **Environment Variables** ใส่ค่าทั้งหมดจาก `.env.example` ที่ต้องการเปิดใช้
5. กด **Deploy**

### ผูกโดเมน mamulab.com

1. ไปที่ **Settings → Domains** → Add `mamulab.com` และ `www.mamulab.com`
2. ตั้ง DNS records ที่ผู้ให้บริการโดเมน:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`
3. รอ DNS propagate — Vercel ออก SSL cert ให้อัตโนมัติ

## เก็บ Lead เข้า Google Sheets

ดูคู่มือเต็มที่ [docs/google-sheets-webhook.md](docs/google-sheets-webhook.md) — ใช้เวลาประมาณ 5 นาที ได้ระบบเก็บ lead ฟรี

## วิเคราะห์ผ่าน GA4 + Meta Pixel

เมื่อมี lead ใหม่ ระบบจะยิง event อัตโนมัติ:

- **GA4**: `event: generate_lead, label: landing_lead_form`
- **Meta Pixel**: `Lead`

ใช้ event เหล่านี้สร้าง conversion / custom audience สำหรับรีมาร์เก็ตติ้งได้เลย

## Design System

- **สี**: น้ำเงิน/ดำเข้ม (`midnight`, `royal`) + accent ทอง (`gold`) + ม่วง (`violet`)
- **ฟอนต์**: `Prompt` (TH/EN body) + `Cinzel` (display ภาษาอังกฤษ)
- **โทน**: Premium spirituality — clean, modern, ไม่ใช้สัญลักษณ์ไสยศาสตร์หนัก ๆ

## License

© MAMULAB. All rights reserved.
