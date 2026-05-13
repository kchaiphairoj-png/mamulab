/**
 * nameAnalyzer — analyse a shop name across 3 numerology systems:
 *   1. Chaldean (English/Latin)     — 1–8 (no 9, sacred)
 *   2. Pythagorean (English/Latin)  — 1–9
 *   3. Thai numerology              — 1–8 (vowels = 0)
 *
 * Master numbers 11/22/33 are preserved (not reduced to single digit).
 * All calculations are pure and run in the browser.
 */

// ---------- Letter value maps ----------

const CHALDEAN: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

const PYTHAGOREAN: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

const THAI_LETTERS: Record<string, number> = {
  // 1
  ก: 1, ด: 1, ถ: 1, ท: 1, ภ: 1, ฤ: 1,
  // 2
  ข: 2, ช: 2, บ: 2, ป: 2, ง: 2,
  // 3
  ฆ: 3, ฑ: 3, ฒ: 3, ฉ: 3, ณ: 3,
  // 4
  ค: 4, ธ: 4, ร: 4, ษ: 4,
  // 5
  ฌ: 5, น: 5, ม: 5, ห: 5, ฮ: 5, ฎ: 5,
  // 6
  จ: 6, ล: 6, ว: 6, อ: 6,
  // 7
  ซ: 7, ศ: 7, ส: 7,
  // 8
  ย: 8, ฟ: 8, ผ: 8, ฝ: 8, พ: 8,
};

// Thai vowels / tone marks → 0 (ignored)
const THAI_IGNORE = new Set([
  "ะ", "า", "ิ", "ี", "ึ", "ื", "ุ", "ู",
  "เ", "แ", "โ", "ใ", "ไ", "ๅ", "ำ",
  "่", "้", "๊", "๋", "์", "ํ", "ๆ",
]);

// ---------- Character classification ----------

function isLatin(ch: string): boolean {
  return /^[a-zA-Z]$/.test(ch);
}

function isThaiConsonant(ch: string): boolean {
  return THAI_LETTERS[ch] !== undefined;
}

function isThaiIgnore(ch: string): boolean {
  return THAI_IGNORE.has(ch);
}

function isThaiChar(ch: string): boolean {
  return isThaiConsonant(ch) || isThaiIgnore(ch);
}

// ---------- Reduction with master number support ----------

const MASTER_NUMBERS = new Set([11, 22, 33]);

function sumDigits(n: number): number {
  let s = 0;
  let v = Math.abs(n);
  while (v > 0) {
    s += v % 10;
    v = Math.floor(v / 10);
  }
  return s;
}

/**
 * Reduce to single digit 1–9, preserving 11/22/33 master numbers at any step.
 */
export function reduceWithMaster(n: number): number {
  let v = Math.abs(n);
  while (v > 9) {
    if (MASTER_NUMBERS.has(v)) return v;
    v = sumDigits(v);
  }
  return v || 9;
}

/** Reduce all the way to 1–9 (no master preservation) — used for color/etc. */
export function reduceToDigit(n: number): number {
  let v = Math.abs(n);
  while (v > 9) v = sumDigits(v);
  return v || 9;
}

// ---------- Per-system analysis ----------

export type SystemBreakdown = {
  /** Raw sum before reduction */
  total: number;
  /** Reduced value (1–9 or 11/22/33) */
  value: number;
  /** True if value is a master number */
  isMaster: boolean;
  /** When master, this is the reduced single-digit form (e.g. 22 → 4) */
  masterReducedTo?: number;
  /** Per-character contributions */
  parts: { char: string; value: number }[];
};

function analyseEnglish(
  text: string,
  table: Record<string, number>
): SystemBreakdown | null {
  const parts: { char: string; value: number }[] = [];
  let total = 0;
  for (const raw of text) {
    if (!isLatin(raw)) continue;
    const upper = raw.toUpperCase();
    const v = table[upper];
    if (v === undefined) continue;
    parts.push({ char: upper, value: v });
    total += v;
  }
  if (parts.length === 0) return null;

  const value = reduceWithMaster(total);
  const isMaster = MASTER_NUMBERS.has(value);
  return {
    total,
    value,
    isMaster,
    masterReducedTo: isMaster ? reduceToDigit(value) : undefined,
    parts,
  };
}

function analyseThai(text: string): SystemBreakdown | null {
  const parts: { char: string; value: number }[] = [];
  let total = 0;
  for (const ch of text) {
    if (isThaiConsonant(ch)) {
      const v = THAI_LETTERS[ch];
      parts.push({ char: ch, value: v });
      total += v;
    } else if (isThaiIgnore(ch)) {
      parts.push({ char: ch, value: 0 });
    }
  }
  // Need at least 1 consonant (value > 0)
  if (total === 0) return null;

  const value = reduceWithMaster(total);
  const isMaster = MASTER_NUMBERS.has(value);
  return {
    total,
    value,
    isMaster,
    masterReducedTo: isMaster ? reduceToDigit(value) : undefined,
    parts,
  };
}

// ---------- Public API ----------

export type ShopNameAnalysis = {
  shopName: string;
  hasEnglish: boolean;
  hasThai: boolean;
  /** "chaldean" | "thai" — which system to feature in the result */
  primarySystem: "chaldean" | "thai" | "pythagorean";
  /** The featured value used to look up NUMBER_MEANINGS */
  primaryValue: number;
  /** When the primary is a master number, this is the reduced 1–9 */
  primaryReducedTo?: number;
  chaldean: SystemBreakdown | null;
  pythagorean: SystemBreakdown | null;
  thai: SystemBreakdown | null;
};

export function analyseShopName(input: string): ShopNameAnalysis | null {
  const shopName = input.trim();
  if (shopName.length < 2) return null;

  // Detect script presence
  let hasEnglish = false;
  let hasThai = false;
  for (const ch of shopName) {
    if (isLatin(ch)) hasEnglish = true;
    else if (isThaiChar(ch)) hasThai = true;
    if (hasEnglish && hasThai) break;
  }

  const chaldean = hasEnglish ? analyseEnglish(shopName, CHALDEAN) : null;
  const pythagorean = hasEnglish
    ? analyseEnglish(shopName, PYTHAGOREAN)
    : null;
  const thai = hasThai ? analyseThai(shopName) : null;

  // Pick primary: English present → Chaldean; Thai-only → Thai; else first non-null
  let primarySystem: ShopNameAnalysis["primarySystem"];
  let primary: SystemBreakdown | null;

  if (chaldean) {
    primarySystem = "chaldean";
    primary = chaldean;
  } else if (thai) {
    primarySystem = "thai";
    primary = thai;
  } else if (pythagorean) {
    primarySystem = "pythagorean";
    primary = pythagorean;
  } else {
    return null;
  }

  return {
    shopName,
    hasEnglish,
    hasThai,
    primarySystem,
    primaryValue: primary.value,
    primaryReducedTo: primary.masterReducedTo,
    chaldean,
    pythagorean,
    thai,
  };
}

export const PRIMARY_SYSTEM_LABEL: Record<
  ShopNameAnalysis["primarySystem"],
  string
> = {
  chaldean: "Chaldean (สากล)",
  pythagorean: "Pythagorean (สากล)",
  thai: "เลขศาสตร์ไทย",
};
