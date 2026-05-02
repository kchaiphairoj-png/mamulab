// =====================================================================
// Numerology data + helpers for the Birth Date Insight widget.
// All copy is editable here. See README at bottom for customization.
// =====================================================================

export type RootNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type ColorSwatch = {
  name: string; // Thai-friendly display name
  hex: string;
};

export type NumerologyProfile = {
  root: RootNumber;
  planet: { en: string; th: string };
  colors: ColorSwatch[];
  identity: string;
  todayAdvice: string;
  styling: string;
  uncommonTip: string;
  cta: {
    label: string;
    angle: string; // module / course angle, mapped via PRODUCT_MAP
    productKey: ProductKey;
  };
};

// Map "course / module" keys to actual links/metadata.
// Edit URLs here when real course pages are ready.
export type ProductKey =
  | "decode-shopfront"
  | "follow-up-system"
  | "content-system"
  | "positioning"
  | "live-script"
  | "brand-aesthetic"
  | "loyalty-funnel"
  | "scale-system"
  | "launch-playbook";

export const PRODUCT_MAP: Record<
  ProductKey,
  { label: string; href: string; tagline: string }
> = {
  "decode-shopfront": {
    label: "Decode พลังหน้าร้าน",
    href: "/#lead-magnet",
    tagline: "ถอดรหัสเลข ชื่อ สี ของหน้าร้านออนไลน์ของคุณ",
  },
  "follow-up-system": {
    label: "ระบบ Follow-up",
    href: "/#lead-magnet",
    tagline: "เปลี่ยนบทสนทนาเป็นการปิดการขายต่อเนื่อง",
  },
  "content-system": {
    label: "Content System",
    href: "/#lead-magnet",
    tagline: "ระบบคอนเทนต์ที่สอนแล้วขายในโพสต์เดียว",
  },
  positioning: {
    label: "Positioning ที่ฉีก",
    href: "/#lead-magnet",
    tagline: "สร้างจุดยืนที่ลูกค้าจำได้ตั้งแต่ครั้งแรก",
  },
  "live-script": {
    label: "Live Script Mastery",
    href: "/#lead-magnet",
    tagline: "สคริปต์ live ที่ไม่ฝืน แต่ปิดการขายได้ทุกรอบ",
  },
  "brand-aesthetic": {
    label: "Brand Aesthetic",
    href: "/#lead-magnet",
    tagline: "feed ที่สร้าง desire ก่อนคำพูด",
  },
  "loyalty-funnel": {
    label: "Loyalty Funnel",
    href: "/#lead-magnet",
    tagline: "ระบบที่ทำให้ลูกค้าเก่ากลับมาซื้อซ้ำ",
  },
  "scale-system": {
    label: "Scale System",
    href: "/#lead-magnet",
    tagline: "ขยายธุรกิจโดยไม่ต้อง burnout",
  },
  "launch-playbook": {
    label: "Launch Playbook",
    href: "/#lead-magnet",
    tagline: "วิธี launch ที่กระแทกตลาดในรอบเดียว",
  },
};

// =====================================================================
// PROFILES — 1 ถึง 9
// แก้ identity / advice / colors / cta ที่นี่เพื่อปรับโทนได้ทั้งหมด
// =====================================================================
export const PROFILES: Record<RootNumber, NumerologyProfile> = {
  1: {
    root: 1,
    planet: { en: "Sun", th: "อาทิตย์" },
    colors: [
      { name: "ส้มทอง", hex: "#f59e42" },
      { name: "ทอง", hex: "#d4a657" },
      { name: "แดงสด", hex: "#f87171" },
    ],
    identity:
      "ผู้นำที่มีพลังเริ่มต้น — ออกตัวก่อนใคร และดึงคนอื่นตามได้เป็นธรรมชาติ",
    todayAdvice:
      "วันนี้เหมาะ ‘ออกหน้าเอง’ — โพสต์ที่มีหน้าคุณหรือเสียงคุณ จะทำยอดสูงกว่าโพสต์ภาพสินค้าล้วน",
    styling:
      "เพิ่มสีส้ม ทอง หรือแดงสด 1 จุด (ต่างหู เครื่องประดับ หรือฉากหลัง live) — ดูดสายตาให้คนหยุดที่หน้าคุณ",
    uncommonTip:
      "ก่อน live 30 นาที พูดประโยคขายของออกเสียงดังคนเดียว 1 รอบเต็ม — เสียงคุณจะมีน้ำหนักของ ‘คำสั่งซื้อ’ มากขึ้น",
    cta: {
      label: "Module ที่เหมาะกับจังหวะของคุณ",
      angle: "ใช้พลังตัวเลขผู้นำให้เป็นข้อได้เปรียบ",
      productKey: "decode-shopfront",
    },
  },
  2: {
    root: 2,
    planet: { en: "Moon", th: "จันทร์" },
    colors: [
      { name: "ขาว", hex: "#fafafa" },
      { name: "เงิน", hex: "#c0c0c0" },
      { name: "ครีม", hex: "#f5f0e1" },
    ],
    identity:
      "นักสังเกตและสร้างสายสัมพันธ์ — คุณขายเก่งที่สุดผ่านบทสนทนาแบบหนึ่งต่อหนึ่ง",
    todayAdvice:
      "วันนี้ ‘ขายผ่าน DM/แชท’ จะเวิร์กกว่าโพสต์ดัง ๆ — ตอบ DM ภายใน 10 นาทีแรกจะปิดการขายได้สูงขึ้นชัดเจน",
    styling:
      "ใส่ขาว เงิน หรือครีม 1 ชิ้น — ทำให้คนรู้สึกไว้ใจคุณเร็วขึ้นในเวลาเดียวกัน",
    uncommonTip:
      "เปิด live ในช่วงที่อารมณ์คุณ ‘ดี’ ไม่จำเป็นต้องเป็นเวลา prime — คนดูจะรู้สึกได้ และอยู่นานขึ้น",
    cta: {
      label: "Module ที่เหมาะกับจังหวะของคุณ",
      angle: "เปลี่ยนบทสนทนาเป็นยอดขายต่อเนื่อง",
      productKey: "follow-up-system",
    },
  },
  3: {
    root: 3,
    planet: { en: "Jupiter", th: "พฤหัสบดี" },
    colors: [
      { name: "เหลือง", hex: "#facc15" },
      { name: "หญ้าฝรั่น", hex: "#f59e0b" },
    ],
    identity:
      "ครูและนักสื่อสาร — ลูกค้าซื้อเพราะคุณ ‘สอน’ พวกเขาให้เข้าใจสิ่งที่ขาย",
    todayAdvice:
      "วันนี้คอนเทนต์แบบ how-to / educational จะวิ่งดี — โพสต์ที่ ‘สอน’ ได้ engagement สูงกว่าโพสต์ที่ ‘ขาย’ ตรง ๆ",
    styling:
      "เหลืองหรือหญ้าฝรั่น 1 จุด — สื่อพลังครู คนจะเชื่อคำพูดคุณมากขึ้น",
    uncommonTip:
      "ลองเขียน caption แบบเล่าเรื่อง 1 ย่อหน้า ก่อนเข้าเซลล์ — conversion เพิ่มขึ้นชัดเจน",
    cta: {
      label: "Module ที่เหมาะกับจังหวะของคุณ",
      angle: "ระบบคอนเทนต์ที่สอนแล้วปิดการขายในโพสต์เดียว",
      productKey: "content-system",
    },
  },
  4: {
    root: 4,
    planet: { en: "Rahu", th: "ราหู" },
    colors: [
      { name: "เทา", hex: "#6b7280" },
      { name: "เทาน้ำเงิน", hex: "#475569" },
    ],
    identity:
      "นักทดลองและกล้าต่าง — คุณขายเก่งด้วยมุมที่คนอื่นไม่กล้าจับ",
    todayAdvice:
      "วันนี้ลองทำสิ่งที่ ‘ฉีก’ จากเดิม — เปลี่ยน thumbnail / hook / format โพสต์ จะได้ผลลัพธ์ที่ไม่คาดคิด",
    styling:
      "เทาหรือเทาน้ำเงิน 1 จุด — ดูพรีเมียมและแยกออกจากฝูงโดยไม่ต้องตะโกน",
    uncommonTip:
      "วันนี้เลี่ยงโพสต์ตามเทรนด์ — สร้างเทรนด์ของตัวเองดีกว่า แม้คนเห็นน้อยช่วงแรก",
    cta: {
      label: "Module ที่เหมาะกับจังหวะของคุณ",
      angle: "สร้างจุดยืนที่ลูกค้าจำได้ตั้งแต่ครั้งแรก",
      productKey: "positioning",
    },
  },
  5: {
    root: 5,
    planet: { en: "Mercury", th: "พุธ" },
    colors: [
      { name: "เขียว", hex: "#34d399" },
      { name: "ฟ้าอ่อน", hex: "#93c5fd" },
    ],
    identity:
      "นักขายและนักสื่อสารเร็ว — คุณขายเก่งเพราะพูดเก่งและคิดทันท่วงที",
    todayAdvice:
      "วันที่ดีสำหรับ live — การพูดของคุณจะคล่องเป็นพิเศษ ลองเพิ่ม live สั้น ๆ 1 รอบ",
    styling:
      "เขียวหรือฟ้าอ่อน 1 จุด — สื่อความสด ฉลาด คนจะเชื่อคำแนะนำของคุณมากขึ้น",
    uncommonTip:
      "ก่อนตอบ DM ลูกค้า ให้ลุกไปดื่มน้ำสักแก้ว — คำตอบจะ ‘เฉียบ’ ขึ้น และปิดการขายง่ายขึ้น",
    cta: {
      label: "Module ที่เหมาะกับจังหวะของคุณ",
      angle: "สคริปต์ live ที่ไม่ฝืน แต่ปิดการขายได้ทุกรอบ",
      productKey: "live-script",
    },
  },
  6: {
    root: 6,
    planet: { en: "Venus", th: "ศุกร์" },
    colors: [
      { name: "ชมพู", hex: "#f9a8d4" },
      { name: "ฟ้าพาสเทล", hex: "#bfdbfe" },
    ],
    identity:
      "นักสร้างความงาม — ลูกค้าซื้อเพราะ ‘เสน่ห์’ ของแบรนด์คุณ ไม่ใช่ราคา",
    todayAdvice:
      "วันนี้ลงทุนกับ ‘รูปสวย’ หรือภาพ aesthetic จะได้ผลตอบรับสูงกว่าเนื้อหายาว ๆ",
    styling:
      "ชมพูหรือฟ้าพาสเทล 1 จุด — เพิ่มเสน่ห์ของ feed และความ ‘อยากตาม’",
    uncommonTip:
      "วางสินค้าเก่าใหม่อีกครั้งบน background สะอาดขึ้น — ขายได้ทันทีโดยไม่ต้องสต็อกเพิ่ม",
    cta: {
      label: "Module ที่เหมาะกับจังหวะของคุณ",
      angle: "feed ที่สร้าง desire ก่อนคำพูด",
      productKey: "brand-aesthetic",
    },
  },
  7: {
    root: 7,
    planet: { en: "Ketu", th: "เกตุ" },
    colors: [
      { name: "น้ำตาลควัน", hex: "#78716c" },
      { name: "off-white", hex: "#fafaf9" },
    ],
    identity:
      "แบรนด์เฉพาะกลุ่มที่ลึกซึ้ง — ลูกค้าน้อยแต่ภักดี และยินดีจ่ายแพงกว่า",
    todayAdvice:
      "วันที่เหมาะ ‘deep work’ — หยุดโพสต์ทั่วไป 1 วัน ใช้เวลาเขียน sales letter จริงใจ 1 ฉบับให้ลูกค้าเก่า",
    styling:
      "น้ำตาลควันหรือ off-white 1 จุด — สื่อความลึก น่าเชื่อถือ ไม่ฉูดฉาด",
    uncommonTip:
      "วันนี้ตอบ DM ลูกค้า ‘เก่า’ ก่อนรับลูกค้าใหม่ — ROI สูงกว่าหลายเท่าและทำให้ลูกค้ารู้สึกพิเศษ",
    cta: {
      label: "Module ที่เหมาะกับจังหวะของคุณ",
      angle: "ระบบที่ทำให้ลูกค้ากลับมาซื้อซ้ำโดยไม่ต้องตามตื๊อ",
      productKey: "loyalty-funnel",
    },
  },
  8: {
    root: 8,
    planet: { en: "Saturn", th: "เสาร์" },
    colors: [
      { name: "น้ำเงินเข้ม", hex: "#1e3a8a" },
      { name: "ดำ", hex: "#0a0a0a" },
    ],
    identity:
      "นักสร้างระบบ — ยอดของคุณมาช้ากว่าคนอื่น แต่ยั่งยืนและซ้อนกันเป็นชั้น ๆ",
    todayAdvice:
      "วันนี้เหมาะตั้งราคาใหม่ / ปรับแพ็กเกจ — เลขลงท้าย 8 หรือ 0 มีพลังการเงินที่ ‘นิ่ง’ และดึงลูกค้าระดับพรีเมียม",
    styling:
      "น้ำเงินเข้มหรือดำ 1 จุด — สื่อความมั่นคงและพรีเมียมแบบไม่ต้องอธิบาย",
    uncommonTip:
      "วันนี้เคลียร์ระบบหลังบ้าน 1 อย่าง (สต็อก / ออเดอร์ / spreadsheet) จะปลดล็อกยอดของสัปดาห์ที่เหลือ",
    cta: {
      label: "Module ที่เหมาะกับจังหวะของคุณ",
      angle: "ขยายธุรกิจโดยไม่ต้อง burnout",
      productKey: "scale-system",
    },
  },
  9: {
    root: 9,
    planet: { en: "Mars", th: "อังคาร" },
    colors: [
      { name: "แดง", hex: "#ef4444" },
      { name: "maroon", hex: "#7f1d1d" },
    ],
    identity:
      "นักสู้และผู้ปิดการขาย — คุณแรงและเด็ดขาด เหมาะกับการ launch มากกว่าการสร้างไปเรื่อย ๆ",
    todayAdvice:
      "วันที่เหมาะ launch / โพสต์ปิดการขายแบบเด็ดขาด — เนื้อหาที่มี urgency จะวิ่งแรงเป็นพิเศษ",
    styling:
      "แดงหรือ maroon 1 จุด — เพิ่มน้ำหนักของคำสั่งซื้อในข้อความและภาพ",
    uncommonTip:
      "วันนี้ลดราคาของ ‘แพงสุด’ ในร้าน 1 ชิ้นเป็นเคสเทส — จะได้ insight สำหรับสินค้า premium ตัวต่อไป",
    cta: {
      label: "Module ที่เหมาะกับจังหวะของคุณ",
      angle: "วิธี launch ที่กระแทกตลาดในรอบเดียว",
      productKey: "launch-playbook",
    },
  },
};

// =====================================================================
// HELPERS
// =====================================================================

/** Parse YYYY-MM-DD (input[type=date]) to Date. Returns null if invalid. */
export function parseBirthDate(input: string): Date | null {
  if (!input) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== mo - 1 ||
    date.getUTCDate() !== d
  ) {
    return null;
  }
  // Reasonable range: 1900 ≤ year ≤ today
  const now = new Date();
  if (y < 1900 || date.getTime() > now.getTime()) return null;
  return date;
}

/** Reduce any positive integer to its 1-9 root (Pythagorean style). */
export function digitalRoot(n: number): RootNumber {
  if (n <= 0) return 1;
  let x = n;
  while (x > 9) {
    x = String(x)
      .split("")
      .reduce((s, c) => s + Number(c), 0);
  }
  return (x as RootNumber) || 1;
}

/** Sum every digit in YYYYMMDD then reduce to 1-9. */
export function calculateRootNumber(date: Date): RootNumber {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const all = `${y}${String(m).padStart(2, "0")}${String(d).padStart(2, "0")}`;
  const sum = all.split("").reduce((s, c) => s + Number(c), 0);
  return digitalRoot(sum);
}

export function getNumerologyProfile(root: RootNumber): NumerologyProfile {
  return PROFILES[root];
}

/** Format Buddhist Era date string for display, e.g. "12 มกราคม 2568" */
export function formatThaiDate(date: Date): string {
  const months = [
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
  const d = date.getUTCDate();
  const m = months[date.getUTCMonth()];
  const y = date.getUTCFullYear() + 543;
  return `${d} ${m} ${y}`;
}
