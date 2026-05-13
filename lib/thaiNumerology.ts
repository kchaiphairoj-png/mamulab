/**
 * Thai numerology — map each Thai character to a 1-9 value and reduce.
 *
 * Mapping used: the common "เลขศาสตร์" sequential table that cycles 1-9
 * through Thai consonants (44 chars) and vowels. There are multiple schools;
 * this one is the most cited in Thai shop-name calculators.
 *
 * This is an inspirational tool, not a guarantee. UI must disclose that.
 */

const CONSONANT_VALUES: Record<string, number> = {
  // 1-9 cycle through 44 consonants
  ก: 1, ข: 2, ฃ: 2, ค: 3, ฅ: 3, ฆ: 4, ง: 5,
  จ: 6, ฉ: 7, ช: 8, ซ: 9,
  ฌ: 1, ญ: 2, ฎ: 3, ฏ: 4, ฐ: 5, ฑ: 6, ฒ: 7, ณ: 8, ด: 9,
  ต: 1, ถ: 2, ท: 3, ธ: 4, น: 5, บ: 6, ป: 7, ผ: 8, ฝ: 9,
  พ: 1, ฟ: 2, ภ: 3, ม: 4, ย: 5, ร: 6, ล: 7, ว: 8, ศ: 9,
  ษ: 1, ส: 2, ห: 3, ฬ: 4, อ: 5, ฮ: 6,
};

const VOWEL_VALUES: Record<string, number> = {
  ะ: 1, า: 2,
  "ิ": 3, "ี": 4, "ึ": 5, "ื": 6,
  "ุ": 7, "ู": 8,
  เ: 9, แ: 1, โ: 2, ใ: 3, ไ: 4,
  ำ: 5,
};

const TONE_VALUES: Record<string, number> = {
  "่": 1, "้": 2, "๊": 3, "๋": 4,
};

export type CharContribution = {
  char: string;
  value: number;
  type: "consonant" | "vowel" | "tone" | "ignored";
};

export type ThaiNumerologyResult = {
  /** Total sum across all known characters */
  total: number;
  /** Root number 1-9 (recursive digit sum) */
  root: number;
  /** Each character's contribution, in order */
  parts: CharContribution[];
};

export function calculateThaiNumerology(text: string): ThaiNumerologyResult {
  const parts: CharContribution[] = [];
  let total = 0;

  for (const ch of text) {
    if (CONSONANT_VALUES[ch] !== undefined) {
      const v = CONSONANT_VALUES[ch];
      parts.push({ char: ch, value: v, type: "consonant" });
      total += v;
    } else if (VOWEL_VALUES[ch] !== undefined) {
      const v = VOWEL_VALUES[ch];
      parts.push({ char: ch, value: v, type: "vowel" });
      total += v;
    } else if (TONE_VALUES[ch] !== undefined) {
      const v = TONE_VALUES[ch];
      parts.push({ char: ch, value: v, type: "tone" });
      total += v;
    } else if (ch.trim() === "") {
      // skip whitespace silently
    } else {
      parts.push({ char: ch, value: 0, type: "ignored" });
    }
  }

  return { total, root: digitalRoot(total), parts };
}

function digitalRoot(n: number): number {
  let v = Math.abs(n);
  while (v >= 10) {
    let s = 0;
    while (v > 0) {
      s += v % 10;
      v = Math.floor(v / 10);
    }
    v = s;
  }
  return v || 9;
}

export type RootInsight = {
  number: number;
  planet: string;
  vibe: string;
  bestFor: string[];
  watchOut: string[];
  recommendation: string;
};

export const SHOP_NAME_INSIGHTS: Record<number, RootInsight> = {
  1: {
    number: 1,
    planet: "ดวงอาทิตย์",
    vibe: "ผู้นำ · เด่นชัด · ที่หนึ่ง",
    bestFor: [
      "แบรนด์ใหม่ที่ต้องการ ‘เด่น’ ในตลาด",
      "สินค้าพรีเมียม / Limited / Premium service",
      "เจ้าของที่ชอบยืนหน้ากล้อง โชว์ตัว",
    ],
    watchOut: [
      "อาจดูเป็นทางการเกินไปสำหรับสินค้าน่ารัก",
      "ลูกค้าจะคาดหวัง ‘คุณภาพระดับที่ 1’ ต้องส่งมอบให้ได้",
    ],
    recommendation:
      "ถ้าธุรกิจคุณคือ ‘คนแรกที่ทำเรื่องนี้ในตลาด’ — เลข 1 คือพลังที่ถูกต้อง",
  },
  2: {
    number: 2,
    planet: "ดวงจันทร์",
    vibe: "เสน่ห์ · นุ่มนวล · ความสัมพันธ์",
    bestFor: [
      "เครื่องสำอาง / สกินแคร์ / น้ำหอม",
      "สินค้าแม่และเด็ก",
      "Subscription / Membership ที่เน้นชุมชน",
    ],
    watchOut: [
      "อาจดู ‘soft’ เกินไปสำหรับสินค้าที่ต้องการแสดงพลัง",
      "ระวังลูกค้าทักมา ‘คุย’ มากกว่า ‘ซื้อ’",
    ],
    recommendation:
      "ดีมากสำหรับแบรนด์ที่ขายโดยอาศัยความผูกพันระยะยาวกับลูกค้า",
  },
  3: {
    number: 3,
    planet: "พฤหัสบดี",
    vibe: "ปัญญา · การสื่อสาร · ความรู้",
    bestFor: [
      "คอร์ส / E-book / Workshop",
      "Consulting / Coaching",
      "ของฝากความรู้ / หนังสือ / เครื่องเขียน",
    ],
    watchOut: [
      "อาจดู ‘ทางวิชาการ’ จนลูกค้าคิดว่าแพง",
      "ต้องระวังพูดเยอะจนคนหาย",
    ],
    recommendation:
      "เหมาะสุดถ้าคุณขายความรู้เป็นสินทรัพย์หลัก",
  },
  4: {
    number: 4,
    planet: "ราหู",
    vibe: "เปลี่ยนแปลง · ทดลอง · นอกกรอบ",
    bestFor: [
      "Tech / Startup / Digital product",
      "สินค้าที่ pivot เปลี่ยน niche บ่อย",
      "Underground / niche / nerd brand",
    ],
    watchOut: [
      "พลังไม่นิ่ง อาจรู้สึก ‘ไม่ปลอดภัย’ สำหรับลูกค้ากระแสหลัก",
      "ต้องดูแลภาพลักษณ์ให้ดู ‘ตั้งใจไม่ตามใคร’ ไม่ใช่ ‘สะเปะสะปะ’",
    ],
    recommendation:
      "เลือกเลข 4 ถ้าธุรกิจคุณยินดี ‘แตกต่าง’ และดึงลูกค้าที่ใช่",
  },
  5: {
    number: 5,
    planet: "พุธ",
    vibe: "เร็ว · เทรนด์ · การสื่อสาร",
    bestFor: [
      "Flash sale / สินค้าตามกระแส",
      "Influencer brand / TikTok-first",
      "ของกินของเล่นตัดสินใจไว",
    ],
    watchOut: [
      "พลังหวือหวา · ต้องรีบขาย ก่อนเทรนด์เปลี่ยน",
      "อาจดู ‘ฉาบฉวย’ สำหรับสินค้าที่ลูกค้าต้องการความน่าเชื่อระยะยาว",
    ],
    recommendation:
      "เลือกเลข 5 ถ้าสินค้าของคุณ ‘เร็ว ขายเร็ว เลิกเร็ว’ ได้",
  },
  6: {
    number: 6,
    planet: "ศุกร์",
    vibe: "สวย · รื่นรมย์ · ลักชัวรี่",
    bestFor: [
      "แฟชั่น / ความงาม / เครื่องประดับ",
      "ของแต่งบ้าน / เฟอร์นิเจอร์",
      "ร้านอาหาร / คาเฟ่",
    ],
    watchOut: [
      "อาจดู ‘บริโภคนิยม’ มากเกินไป",
      "ราคาสูงต้องสมเหตุสมผลกับคุณค่าที่เห็น",
    ],
    recommendation:
      "เลข 6 คือเลขที่แม่ค้าออนไลน์ไทยใช้มากที่สุด — ถูกต้องตามตลาด",
  },
  7: {
    number: 7,
    planet: "เกตุ",
    vibe: "ลึก · ภายใน · จิตวิญญาณ",
    bestFor: [
      "Wellness / สมาธิ / โยคะ / สุขภาพจิต",
      "สินค้าจิตวิญญาณ (เครื่องราง · หิน · บูชา)",
      "ที่ปรึกษาสายลึก",
    ],
    watchOut: [
      "พลังเงียบ — ต้องตั้งใจการตลาดให้ลูกค้าเจอ",
      "อาจดู ‘เข้าใจยาก’ สำหรับลูกค้าทั่วไป",
    ],
    recommendation:
      "เหมาะกับ niche ที่ลูกค้ามาด้วยตัวเอง ไม่ใช่ความ scale",
  },
  8: {
    number: 8,
    planet: "เสาร์",
    vibe: "อำนาจ · เงินใหญ่ · มั่นคง",
    bestFor: [
      "อสังหา / Investment / Finance",
      "B2B / High-ticket service",
      "สินค้าทอง / ของสะสมราคาสูง",
    ],
    watchOut: [
      "พลังหนัก — ใช้กับสินค้าราคาต่ำจะ ‘บีบ’ ความรู้สึกลูกค้า",
      "ต้องมีโครงสร้างธุรกิจที่จริงจัง รองรับพลังนี้",
    ],
    recommendation:
      "เลข 8 ดีที่สุดสำหรับธุรกิจที่ขายของหรือบริการ ‘ราคาสูง คุ้มในระยะยาว’",
  },
  9: {
    number: 9,
    planet: "อังคาร",
    vibe: "จบรอบ · ครบ · ที่สุด",
    bestFor: [
      "All-in-one / bundle / master class",
      "สินค้าที่เป็น ‘คำตอบสุดท้าย’ ของปัญหา",
      "Brand ที่อายุยืน เน้นความ ‘ครบ’",
    ],
    watchOut: [
      "อาจดูเหมือน ‘ปลายทาง’ ทำให้ลูกค้ารู้สึกเป็นทางเลือกสุดท้าย",
      "ระวังคำว่า ‘แค่ของรอบนี้’ ที่ฟังดูเหมือนของเหลือ",
    ],
    recommendation:
      "ดีมากสำหรับธุรกิจที่ขายของระดับ ‘สูงสุดในหมวด’",
  },
};
