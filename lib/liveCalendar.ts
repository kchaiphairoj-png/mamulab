/**
 * liveCalendar — generate a personalized monthly Live-streaming calendar
 * from a user's birth date.
 *
 * For each day in a month we compute:
 *  - dayRoot: digital root of the calendar day number (1-9)
 *  - phase: which quarter of the month it falls in (start / expand / retain / close)
 *  - isGoldDay: whether dayRoot matches the user's personal root
 *  - bestWindow: a time window string ("10:00 – 11:30" etc.)
 *  - hint: short Thai phrase telling the user what to do
 *
 * All calculations are pure — same inputs → same outputs.
 */

import { calculateRootNumber, type RootNumber } from "./numerology";

export type LivePhase = "start" | "expand" | "retain" | "close";

export type CalendarCell = {
  /** Calendar day (1-31) */
  day: number;
  /** 0 = Sunday, 6 = Saturday */
  weekday: number;
  /** Root digit of the day (1-9) */
  dayRoot: RootNumber;
  /** Which quarter of the month */
  phase: LivePhase;
  /** True when dayRoot === user's personal root */
  isGoldDay: boolean;
  /** Recommended live-stream time window */
  bestWindow: string;
  /** Short Thai action hint */
  hint: string;
};

export type MonthCalendar = {
  year: number;
  month: number; // 1-12
  monthLabel: string; // "พฤษภาคม 2569"
  personalRoot: RootNumber | null;
  /** Sunday-first padding so the grid starts on Sunday */
  leadingBlanks: number;
  /** 28 / 29 / 30 / 31 cells */
  cells: CalendarCell[];
  goldDays: CalendarCell[];
};

const TH_MONTHS_LONG = [
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

const WEEKDAY_HINT: Record<number, string> = {
  0: "Live สนุก โชว์ของ · 20:00",
  1: "Launch ของใหม่ · 20:00",
  2: "Live คอร์ส / educate · เที่ยง",
  3: "Live สอน + demo · 20:30",
  4: "Live ขาย bundle · 20:30",
  5: "Live ของฟิน · 17:30 (ก่อน 19:00)",
  6: "Live สนุก เช้า/เย็น · 10:30 หรือ 20:00",
};

const WEEKDAY_WINDOW: Record<number, string> = {
  0: "19:00 – 21:00",
  1: "19:30 – 21:00",
  2: "12:00 – 13:00",
  3: "20:00 – 22:00",
  4: "20:30 – 22:30",
  5: "17:00 – 18:30",
  6: "10:00 – 11:30",
};

function digitalRoot(n: number): RootNumber {
  let v = Math.abs(n);
  while (v >= 10) {
    let s = 0;
    while (v > 0) {
      s += v % 10;
      v = Math.floor(v / 10);
    }
    v = s;
  }
  return (v || 9) as RootNumber;
}

function phaseFor(day: number): LivePhase {
  if (day <= 7) return "start";
  if (day <= 15) return "expand";
  if (day <= 23) return "retain";
  return "close";
}

function daysInMonth(year: number, month1: number): number {
  return new Date(year, month1, 0).getDate();
}

export function buildMonthCalendar(
  year: number,
  month1: number, // 1-12
  birthDateISO: string | null
): MonthCalendar {
  const personalRoot = birthDateISO
    ? (() => {
        const d = new Date(birthDateISO);
        if (Number.isNaN(d.getTime())) return null;
        return calculateRootNumber(d);
      })()
    : null;

  const total = daysInMonth(year, month1);
  const firstWeekday = new Date(year, month1 - 1, 1).getDay(); // 0 = Sun

  const cells: CalendarCell[] = [];
  for (let day = 1; day <= total; day++) {
    const date = new Date(year, month1 - 1, day);
    const weekday = date.getDay();
    const dayRoot = digitalRoot(day);
    const phase = phaseFor(day);
    const isGoldDay =
      personalRoot !== null && dayRoot === personalRoot;

    cells.push({
      day,
      weekday,
      dayRoot,
      phase,
      isGoldDay,
      bestWindow: WEEKDAY_WINDOW[weekday],
      hint: WEEKDAY_HINT[weekday],
    });
  }

  return {
    year,
    month: month1,
    monthLabel: `${TH_MONTHS_LONG[month1 - 1]} ${year + 543}`,
    personalRoot,
    leadingBlanks: firstWeekday,
    cells,
    goldDays: cells.filter((c) => c.isGoldDay),
  };
}

/** Phase metadata for badges + filtering */
export const PHASE_INFO: Record<
  LivePhase,
  { label: string; theme: string; chip: string }
> = {
  start: {
    label: "เริ่ม",
    theme: "Launch ของใหม่ · เปิดแคมเปญ",
    chip: "emerald",
  },
  expand: {
    label: "ขยาย",
    theme: "คอนเทนต์สอน · educate",
    chip: "violet",
  },
  retain: {
    label: "เก็บ",
    theme: "ดูแลลูกค้าเก่า · upsell",
    chip: "gold",
  },
  close: {
    label: "ปิด",
    theme: "เคลียร์สต็อก · ทบทวน",
    chip: "amber",
  },
};
