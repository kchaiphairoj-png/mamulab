/**
 * weeklyEnergy — generates content for "พลังประจำสัปดาห์" deterministically
 * from the calendar week number. Each ISO week produces a stable theme +
 * 9 root-number profiles so members get fresh weekly content with no manual
 * editing.
 */

import { getNumerologyProfile, type RootNumber } from "@/lib/numerology";

export type WeeklyProfile = {
  number: RootNumber;
  planet: string;
  theme: string;
  bestDay: string;
  doThis: string[];
  avoidThis: string[];
};

export type WeeklyContent = {
  weekNumber: number; // ISO week of year
  year: number;
  weekTheme: string; // shared theme for the whole week
  startLabel: string; // Thai: "12-18 พ.ค."
  profiles: WeeklyProfile[]; // 1..9
};

function toBangkok(now: Date): { year: number; month: number; day: number } {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(now);
  return {
    year: parseInt(parts.find((p) => p.type === "year")!.value, 10),
    month: parseInt(parts.find((p) => p.type === "month")!.value, 10),
    day: parseInt(parts.find((p) => p.type === "day")!.value, 10),
  };
}

/** ISO week of year (1-53). Standard ISO algorithm. */
function isoWeek(y: number, m: number, d: number): number {
  const date = new Date(Date.UTC(y, m - 1, d));
  const dayNum = (date.getUTCDay() + 6) % 7; // Monday = 0
  date.setUTCDate(date.getUTCDate() - dayNum + 3); // nearest Thursday
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const diff = (date.getTime() - firstThursday.getTime()) / 86400000;
  return 1 + Math.round(diff / 7);
}

function startOfWeek(y: number, m: number, d: number) {
  const date = new Date(Date.UTC(y, m - 1, d));
  const dayNum = (date.getUTCDay() + 6) % 7; // 0 = Monday
  date.setUTCDate(date.getUTCDate() - dayNum);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function endOfWeek(y: number, m: number, d: number) {
  const date = new Date(Date.UTC(y, m - 1, d));
  const dayNum = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - dayNum + 6); // Sunday
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

const TH_MONTHS_SHORT = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

/** Theme pool — 12 themes cycle through the year. Edit freely. */
const THEMES = [
  "สัปดาห์แห่งการตั้งราคาใหม่",
  "สัปดาห์แห่งการฟังลูกค้า",
  "สัปดาห์แห่งการลบของที่ไม่ขาย",
  "สัปดาห์แห่งการเชื่อมต่อชุมชน",
  "สัปดาห์แห่งการ Live ที่กล้า",
  "สัปดาห์แห่งการขึ้นราคาที่ใช่",
  "สัปดาห์แห่งการดูแลลูกค้าเก่า",
  "สัปดาห์แห่งคอนเทนต์ที่ลึก",
  "สัปดาห์แห่งระบบและการทำซ้ำ",
  "สัปดาห์แห่งการลองสิ่งใหม่",
  "สัปดาห์แห่งการพักและไตร่ตรอง",
  "สัปดาห์แห่งการปิดดีล",
];

// Best days table — varies per root by week index to avoid being identical
const BEST_DAYS = [
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
  "อาทิตย์",
];

const DO_POOL: Record<RootNumber, string[][]> = {
  1: [
    [
      "Live สด 1 ครั้งโดยอยู่หน้ากล้องคนเดียว — โชว์ความมั่นใจ",
      "ปักหมุดสินค้า ‘ที่หนึ่ง’ ของร้านไว้บนเพจ",
    ],
    [
      "ปรับ bio ให้มีคำว่า ‘หนึ่งเดียวใน...’ หรือ ‘แรกของ...’",
      "ลองออก SKU limited 1 ตัวสัปดาห์นี้",
    ],
  ],
  2: [
    [
      "ทักลูกค้าเก่า 5 คน — ไม่ต้องขาย แค่ถามไถ่",
      "ส่ง broadcast LINE OA แบบอบอุ่น ไม่ใช่ฮาร์ดเซลล์",
    ],
    [
      "เปิด poll ใน story ถามลูกค้าว่าอยากให้นำสินค้าตัวไหนมาเพิ่ม",
      "ตอบ DM ด้วยการ ‘เรียกชื่อ’ ลูกค้าทุกครั้ง",
    ],
  ],
  3: [
    [
      "ทำคอนเทนต์สอน 1 เรื่องที่คุณรู้ลึกที่สุด",
      "เขียน FAQ ตอบคำถามลูกค้าที่พบบ่อย 5 ข้อ",
    ],
    [
      "เปิด class สั้น 30 นาทีให้ลูกค้าฟรี",
      "สรุปบทความเชิงลึกในเพจ — ลูกค้ารู้สึกได้ value",
    ],
  ],
  4: [
    [
      "ทดลอง format Live ใหม่ที่ไม่เคยทำ — 1 ครั้งก็พอ",
      "ลองโพสต์เวลาที่ไม่เคยโพสต์",
    ],
    [
      "ลด SKU ที่ขายไม่ออก 1 ตัวออก — เปิดที่ให้ของใหม่",
      "สลับ banner เพจ test reaction",
    ],
  ],
  5: [
    [
      "ลงคอนเทนต์สั้นไว ๆ 3 ตัวในสัปดาห์",
      "ตามเทรนด์ TikTok ของหมวดสินค้าคุณ 1 ตัว ทำของตัวเอง",
    ],
    [
      "Flash sale 24 ชม. — โพสต์เริ่มเช้า ปิดเที่ยงคืน",
      "ใช้ตัวเลขในแคปชั่นทุกโพสต์ในสัปดาห์",
    ],
  ],
  6: [
    [
      "ปรับ feed ให้สีหลัก consistent ทุกโพสต์",
      "ออกแบบรีวิวลูกค้าใหม่ ให้ดูพรีเมียมขึ้น",
    ],
    [
      "Live ในมุมที่แสงดี + เสื้อสีที่ตรงพลัง",
      "ลองเสนอ bundle ของแต่งบ้าน/แฟชั่น พรีเมียม",
    ],
  ],
  7: [
    [
      "ลดจำนวนคอนเทนต์ลง — เพิ่มคุณภาพ",
      "พักจากการเช็คยอดทุกชั่วโมง · ดู weekly รวมเดียว",
    ],
    [
      "เขียน reflection หลัง Live ในสมุด 5 บรรทัด",
      "ปิด notification 1 วันเพื่อชาร์จ",
    ],
  ],
  8: [
    [
      "ขึ้นราคา 1 SKU ที่ขายดีอยู่แล้ว 10-15%",
      "เปิด upsell package premium ในร้าน",
    ],
    [
      "ทบทวนต้นทุน + กำไรของ top 3 SKU",
      "เสนอ subscription / membership ราคาเต็มมูลค่า",
    ],
  ],
  9: [
    [
      "ปิด SKU ที่ขายมา 6 เดือนแต่ยังไม่ทำกำไร",
      "Launch master bundle รวมของยอดนิยม",
    ],
    [
      "เคลียร์สต็อกของเก่า → เปิดทางของรอบใหม่",
      "ขอ testimonials ลูกค้า top 5 — เก็บไว้ใช้",
    ],
  ],
};

const AVOID_POOL: Record<RootNumber, string[][]> = {
  1: [
    [
      "ห้ามตามผู้นำคนอื่น — เลือกทางของตัวเอง",
      "อย่ารับงาน collab ที่ไม่ตรงแบรนด์",
    ],
  ],
  2: [
    [
      "อย่าฮาร์ดเซลล์ในสัปดาห์นี้ — ลูกค้าจะถอย",
      "ห้าม ignore DM ที่เห็นแล้ว",
    ],
  ],
  3: [
    [
      "อย่าพูดยาวเกินไปใน Live — ตัดให้กระชับ",
      "ห้ามใช้ศัพท์ที่ลูกค้าไม่เข้าใจ",
    ],
  ],
  4: [
    ["อย่า pivot ใหญ่สัปดาห์เดียวกับ Launch", "ห้ามเปลี่ยน niche แบบไม่มีข้อมูล"],
  ],
  5: [
    [
      "อย่ายึดติด trend ที่ไม่เข้ากับแบรนด์",
      "ห้ามลด quality เพื่อให้ทันเทรนด์",
    ],
  ],
  6: [
    [
      "อย่าลดราคาเพื่อ ‘แค่ขาย’ — เสียพลังลักชัวรี่",
      "ห้ามโพสต์ภาพคุณภาพต่ำในสัปดาห์นี้",
    ],
  ],
  7: [
    [
      "อย่า over-think จนไม่ปล่อยงาน",
      "ห้ามเปรียบเทียบตัวเองกับเพจคนอื่น",
    ],
  ],
  8: [
    [
      "อย่ายอมลดราคาให้คนต่อแรง — ปล่อยลูกค้านั้นไป",
      "ห้ามขายราคาต่ำกว่าต้นทุน + กำไร",
    ],
  ],
  9: [
    [
      "อย่าเริ่มของใหม่ก่อนปิดของเก่าให้สวย",
      "ห้ามแบกของขายไม่ออกไปสัปดาห์หน้า",
    ],
  ],
};

export function getThisWeekContent(now: Date = new Date()): WeeklyContent {
  const bkk = toBangkok(now);
  const week = isoWeek(bkk.year, bkk.month, bkk.day);
  const start = startOfWeek(bkk.year, bkk.month, bkk.day);
  const end = endOfWeek(bkk.year, bkk.month, bkk.day);

  const sameMonth = start.month === end.month;
  const startLabel = sameMonth
    ? `${start.day}-${end.day} ${TH_MONTHS_SHORT[start.month - 1]}`
    : `${start.day} ${TH_MONTHS_SHORT[start.month - 1]} - ${end.day} ${TH_MONTHS_SHORT[end.month - 1]}`;

  const weekTheme = THEMES[week % THEMES.length];

  const profiles: WeeklyProfile[] = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map(
    (n) => {
      const profile = getNumerologyProfile(n);
      const pool = DO_POOL[n];
      const avoidPool = AVOID_POOL[n];
      return {
        number: n,
        planet: profile.planet.th,
        theme: profile.identity,
        bestDay: BEST_DAYS[(week + n) % BEST_DAYS.length],
        doThis: pool[week % pool.length],
        avoidThis: avoidPool[week % avoidPool.length],
      };
    }
  );

  return {
    weekNumber: week,
    year: bkk.year,
    weekTheme,
    startLabel,
    profiles,
  };
}
