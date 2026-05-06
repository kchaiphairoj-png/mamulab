/**
 * dailyEnergy — pure deterministic helpers that map a calendar date to:
 *  - lucky number (1–9)
 *  - planet + color recommendation
 *  - best live-stream time-windows
 *  - rotating quick tip for online sellers (30 tips total)
 *  - daily mantra for selling intent
 *
 * Everything is pure: same input → same output. No timezone surprises:
 * we always use Asia/Bangkok wall-clock to pick "today" so every visitor in
 * Thailand sees the same content within a single calendar day.
 *
 * To customize content later, edit the arrays at the bottom of this file.
 * Nothing else needs to change.
 */

import {
  getNumerologyProfile,
  type NumerologyProfile,
  type RootNumber,
} from "./numerology";

// ---------- Types ----------

export type LiveWindow = {
  label: string; // e.g. "ช่วงเช้าทอง"
  range: string; // e.g. "09:30 – 11:00"
  reason: string; // why this window today
};

export type DailyEnergy = {
  /** ISO yyyy-mm-dd in Asia/Bangkok */
  dateKey: string;
  /** Day of year, 1-based, used for rotation */
  dayOfYear: number;
  /** Today's universal lucky number (1–9) — derived from full date */
  number: RootNumber;
  /** The matching numerology profile (planet, colors, etc.) */
  profile: NumerologyProfile;
  /** Best live-stream windows for today (1–2 windows) */
  liveWindows: LiveWindow[];
  /** A practical tip for online sellers, rotated daily */
  tip: { category: TipCategory; text: string };
  /** Daily selling-intent mantra */
  mantra: string;
  /** Thai-formatted long date, e.g. "ศุกร์ที่ 3 พฤษภาคม 2569" */
  thaiDate: string;
};

export type TipCategory = "live" | "content" | "mindset" | "line";

// ---------- Public API ----------

/** Get today's energy (uses Asia/Bangkok wall-clock) */
export function getTodayEnergy(now: Date = new Date()): DailyEnergy {
  const bkk = toBangkok(now);
  return getEnergyForDate(bkk);
}

/** Get energy for a specific calendar date (year/month/day in Bangkok) */
export function getEnergyForDate(date: {
  year: number;
  month: number;
  day: number;
}): DailyEnergy {
  const { year, month, day } = date;
  const number = sumDigitsToRoot(year * 10000 + month * 100 + day);
  const profile = getNumerologyProfile(number);

  const dayOfYear = computeDayOfYear(year, month, day);
  const dateKey = `${year}-${pad(month)}-${pad(day)}`;
  const weekday = computeWeekday(year, month, day); // 0 = Sunday

  return {
    dateKey,
    dayOfYear,
    number,
    profile,
    liveWindows: pickLiveWindows(weekday, number),
    tip: pickTip(dayOfYear),
    mantra: MANTRAS[(number - 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8],
    thaiDate: formatThaiDate(year, month, day, weekday),
  };
}

// ---------- Helpers ----------

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

/** Convert a UTC Date instance to a {year,month,day} in Asia/Bangkok */
function toBangkok(now: Date): { year: number; month: number; day: number } {
  // Use Intl to be timezone-correct without needing a tz library.
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(now);
  const year = parseInt(parts.find((p) => p.type === "year")!.value, 10);
  const month = parseInt(parts.find((p) => p.type === "month")!.value, 10);
  const day = parseInt(parts.find((p) => p.type === "day")!.value, 10);
  return { year, month, day };
}

/** Reduce a number to its root digit (1–9). 0 maps to 9. */
function sumDigitsToRoot(n: number): RootNumber {
  let v = Math.abs(n);
  while (v >= 10) {
    let s = 0;
    while (v > 0) {
      s += v % 10;
      v = Math.floor(v / 10);
    }
    v = s;
  }
  if (v === 0) v = 9;
  return v as RootNumber;
}

function computeDayOfYear(year: number, month: number, day: number): number {
  const isLeap =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const md = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let d = day;
  for (let i = 0; i < month - 1; i++) d += md[i];
  return d;
}

/** Zeller-like weekday computation. 0 = Sunday … 6 = Saturday */
function computeWeekday(y: number, m: number, d: number): number {
  // Use UTC to avoid local-tz drift; we already have date as Bangkok wall-clock.
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

const THAI_DAYS = [
  "อาทิตย์",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
];

const THAI_MONTHS = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

function formatThaiDate(
  y: number,
  m: number,
  d: number,
  weekday: number
): string {
  return `${THAI_DAYS[weekday]}ที่ ${d} ${THAI_MONTHS[m - 1]} ${y + 543}`;
}

// ---------- Content (edit freely) ----------

/**
 * Best live windows are picked from a pool based on:
 *  - weekday (weekend vs weekday viewer behavior)
 *  - today's universal number (energy of the day)
 *
 * Customize these strings to match your audience.
 */
function pickLiveWindows(weekday: number, n: RootNumber): LiveWindow[] {
  const isWeekend = weekday === 0 || weekday === 6;

  const morning: LiveWindow = {
    label: "ช่วงเช้าทอง",
    range: isWeekend ? "10:00 – 11:30" : "09:30 – 10:30",
    reason: isWeekend
      ? "วันหยุด ลูกค้าพร้อมจ่ายและตัดสินใจช้า ๆ ได้"
      : "ก่อนเริ่มงาน ลูกค้าเปิดมือถือ feed ยังไม่หนาแน่น",
  };

  const evening: LiveWindow = {
    label: "ช่วงปิดดีลทอง",
    range: isWeekend ? "20:00 – 22:00" : "20:30 – 22:30",
    reason:
      "หลังอาหารเย็น ลูกค้าผ่อนคลาย คุยยาวได้ พลังเลข " +
      n +
      " ช่วยปิดการขาย",
  };

  // Numbers 1, 5, 9 = high energy → push two windows.
  // Numbers 2, 6, 7 = soft energy → focus on evening only.
  if (n === 2 || n === 6 || n === 7) return [evening];
  return [morning, evening];
}

const MANTRAS: Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, string> = {
  0: "วันนี้ฉันคือผู้นำ ลูกค้าเลือกฉันเพราะฉันชัดเจนและมั่นคง",
  1: "วันนี้ฉันรับฟัง ลูกค้าเปิดใจให้ฉันเพราะฉันใส่ใจ",
  2: "วันนี้ฉันเล่าเรื่อง สินค้าของฉันมีความหมาย ลูกค้ารู้สึกได้",
  3: "วันนี้ฉันสร้างระบบ ทุกการขายเป็นไปตามแผนที่วางไว้",
  4: "วันนี้ฉันเปลี่ยนเร็ว ทดลองใหม่โดยไม่กลัวพลาด",
  5: "วันนี้ฉันโอบกอด ลูกค้ารู้สึกอบอุ่นและกลับมาซื้อซ้ำ",
  6: "วันนี้ฉันสงบ คำพูดของฉันมีน้ำหนัก ปิดการขายด้วยศรัทธา",
  7: "วันนี้ฉันมั่งคั่ง เงินไหลเข้าตามคุณค่าที่ฉันส่งมอบ",
  8: "วันนี้ฉันกล้า ตั้งราคาเต็มมูลค่า ลูกค้าที่ใช่ตอบรับเสมอ",
};

/**
 * 32 rotating tips for Thai online sellers.
 * Categories: live, content, mindset, line.
 * Add/edit freely — they rotate by day-of-year so the order is stable.
 */
const TIPS: { category: TipCategory; text: string }[] = [
  // === LIVE (10) ===
  {
    category: "live",
    text: "เปิด Live ด้วยการ ‘ตั้งคำถาม’ แทนการแนะนำตัว — คนหยุดดูเพราะอยากรู้คำตอบ",
  },
  {
    category: "live",
    text: "ทุก 7 นาทีของ Live ให้สรุปราคา + แพ็กเกจหนึ่งครั้ง คนที่เพิ่งเข้าจะไม่หลุด",
  },
  {
    category: "live",
    text: "ใช้คำว่า ‘แม่ค้าจะปิดราคานี้พรุ่งนี้’ แทน ‘โปรลดราคา’ — สร้าง urgency ที่ไม่ดูสแปม",
  },
  {
    category: "live",
    text: "ก่อน Live 10 นาที โพสต์รูปสินค้า + เวลาเริ่ม คนที่เห็นจะตั้งเตือนใน reels",
  },
  {
    category: "live",
    text: "ตอบคอมเมนต์โดยเรียก ‘ชื่อ’ ลูกค้า ทุกครั้ง — ยอดสั่งจะเพิ่ม 30%",
  },
  {
    category: "live",
    text: "ปิด Live ด้วยคำว่า ‘เดี๋ยวส่งสรุปใน LINE OA นะคะ’ — ดึงคนเข้า OA ได้ทุกครั้ง",
  },
  {
    category: "live",
    text: "ใส่ตัวเลข ‘เหลือ 3 ตัวสุดท้าย’ จริง อย่ามั่ว ลูกค้าเก่าจับได้และเลิกเชื่อ",
  },
  {
    category: "live",
    text: "Live สั้น 30 นาที ขายเฉพาะหมวดเดียว ดีกว่า Live ยาว 2 ชม. ขายทุกอย่าง",
  },
  {
    category: "live",
    text: "ก่อน Live เคาะ ‘ราคาพิเศษเฉพาะคนใน Live’ ไว้ในใจ ห้ามเปลี่ยนระหว่าง Live",
  },
  {
    category: "live",
    text: "เปิด Live แล้วคนยังน้อย ให้แชร์ Live ลง story ของตัวเอง 1 ครั้ง — ดึงคนเข้าได้แน่นอน",
  },

  // === CONTENT (8) ===
  {
    category: "content",
    text: "Caption บรรทัดแรกต้องไม่มีคำว่า ‘สวัสดีค่ะ’ — เปลือง 3 บรรทัดที่คนเห็นในฟีด",
  },
  {
    category: "content",
    text: "ใช้ตัวเลขในหัวเรื่องคอนเทนต์ทุกครั้ง: ‘3 ข้อ’, ‘5 จุด’ — engage rate สูงกว่า 2 เท่า",
  },
  {
    category: "content",
    text: "โพสต์ ‘เบื้องหลัง’ การแพ็คของจริง คนรู้สึกใกล้ชิดและไว้ใจมากกว่ารีวิว",
  },
  {
    category: "content",
    text: "Hashtag เกิน 5 ตัวไม่ช่วยเพิ่ม reach แล้ว — ใช้ 3-5 ตัวที่ตรงกลุ่มเป้าหมายพอ",
  },
  {
    category: "content",
    text: "วิดีโอ 9-15 วิ ขายดีกว่าวิดีโอ 60 วินาทีในกลุ่มแม่ค้าออนไลน์ไทย",
  },
  {
    category: "content",
    text: "โพสต์รีวิวลูกค้า ให้เบลอ ‘ชื่อ’ ออก ดูน่าเชื่อถือกว่าเปิดทั้งหมด",
  },
  {
    category: "content",
    text: "เลือก ‘สีหลัก’ ของฟีด 2 สี ใช้ซ้ำทุกโพสต์ คนเห็นปุ๊บรู้ว่าเป็นเพจคุณ",
  },
  {
    category: "content",
    text: "โพสต์ราคาที่ลงท้ายด้วย ‘90’ หรือ ‘99’ ให้น้อยลง — ใช้เลขเสริมพลังเช่น 88, 168",
  },

  // === MINDSET (8) ===
  {
    category: "mindset",
    text: "ลูกค้าที่ต่อราคาแรง คือลูกค้าที่ไม่ใช่ของคุณ — ปฏิเสธอย่างนุ่มนวลเพื่อรักษาพลัง",
  },
  {
    category: "mindset",
    text: "ยอดวันนี้ตก ไม่ได้แปลว่าทั้งสัปดาห์ตก — ดูค่าเฉลี่ย 7 วัน ก่อนตัดสินใจอะไร",
  },
  {
    category: "mindset",
    text: "เลิกเทียบยอดกับเพจคนอื่น เทียบยอดของตัวเองกับเดือนก่อนเท่านั้น",
  },
  {
    category: "mindset",
    text: "วันที่ไม่อยากทำอะไรเลย ให้ตอบ DM ลูกค้าเก่า 5 คน — ฟื้นพลังและยอดในวันเดียว",
  },
  {
    category: "mindset",
    text: "การขาย = การช่วยลูกค้าตัดสินใจ ไม่ใช่การยัดเยียด ปรับ mindset แล้วปิดดีลง่ายขึ้น",
  },
  {
    category: "mindset",
    text: "ลูกค้าซื้อเพราะคุณ ‘ฟัง’ ไม่ใช่เพราะคุณ ‘พูดเก่ง’",
  },
  {
    category: "mindset",
    text: "ก่อน Live 5 นาที หายใจลึก 10 ครั้ง — พลังที่นิ่งดึงดูดลูกค้าที่ใช่",
  },
  {
    category: "mindset",
    text: "วันนี้ทำให้ดีกว่าเมื่อวาน 1% ก็พอ ในหนึ่งปี = 37 เท่า",
  },

  // === LINE OA / SYSTEM (6) ===
  {
    category: "line",
    text: "ส่งบรอดแคสต์ LINE OA วันธรรมดาเช้า 10:00 อัตราเปิดสูงสุดของแม่ค้าออนไลน์ไทย",
  },
  {
    category: "line",
    text: "Welcome message ใน LINE OA ต้องไม่เกิน 3 บรรทัด + 1 ปุ่ม CTA ชัดเจน",
  },
  {
    category: "line",
    text: "ตั้ง rich menu ให้มีปุ่ม ‘ดูสินค้าใหม่’ + ‘ทักแอดมิน’ — ลดงานตอบ DM 50%",
  },
  {
    category: "line",
    text: "ลูกค้าเก่าทักมาถามอะไร เก็บไว้เป็น ‘คำถามที่พบบ่อย’ ตั้ง auto-reply",
  },
  {
    category: "line",
    text: "ทุกการ Live ขอ LINE ลูกค้าใหม่ขั้นต่ำ 5 คน — สร้างฐานสำหรับ broadcast",
  },
  {
    category: "line",
    text: "บรอดแคสต์เดือนละไม่เกิน 4 ครั้ง คนไม่ block และยอดขายเดือนพุ่ง",
  },
];

function pickTip(dayOfYear: number) {
  // Stable rotation through the year
  return TIPS[dayOfYear % TIPS.length];
}

export const TIP_CATEGORY_LABEL: Record<TipCategory, string> = {
  live: "Live Commerce",
  content: "Content",
  mindset: "Mindset",
  line: "LINE OA",
};
