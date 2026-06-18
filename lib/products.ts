/**
 * MAMULAB products registry.
 *
 * Every paid offer in the value ladder lives here. The DB only tracks
 * `payments.product_code` and `memberships.product_code` — title, price, and
 * duration come from this file so the UI and entitlement logic stay in sync
 * without a separate DB table to maintain.
 *
 * Naming: product codes are short kebab-case slugs. Use them everywhere
 * (DB rows, API form payloads, paywall checks). Adding a new tier =
 * append a row here + run no migrations.
 */

export type ProductType = "library" | "course" | "membership" | "addon";

export type Product = {
  code: string;
  title: string;
  subtitle: string;
  type: ProductType;
  /** Price in THB (integer baht) */
  price: number;
  /** How many days of access a single payment grants */
  durationDays: number;
  /**
   * When true, the verifier should enforce that the slip amount equals
   * `price`. Honor-system stays the default for low-ticket where the cost
   * of a stricter verification API outweighs the leakage.
   */
  enforceAmount: boolean;
  /** When false the product is hidden from sales pages (still honors past purchases). */
  active: boolean;
};

export const PRODUCTS = {
  // The existing tripwire — keeps current behaviour. enforceAmount stays off
  // because we never enforced it; flipping it on now would break legitimate
  // honor-system payers mid-cycle.
  library: {
    code: "library",
    title: "MAMULAB Library",
    subtitle: "คลังเนื้อหาเชิงลึก · 1 ปี",
    type: "library",
    price: 599,
    durationDays: 365,
    enforceAmount: false,
    active: true,
  },

  // Phase 1 — flagship high-ticket course.
  "course-live-commerce": {
    code: "course-live-commerce",
    title: "Muketing for Live Commerce",
    subtitle: "คอร์สปั้นยอด Live ด้วยเลขศาสตร์ + กลยุทธ์การขายจริง",
    type: "course",
    price: 6900,
    durationDays: 365,
    enforceAmount: true,
    active: true,
  },

  // Phase 2 — recurring membership tier above Library.
  "inner-circle-monthly": {
    code: "inner-circle-monthly",
    title: "Inner Circle · รายเดือน",
    subtitle: "Live Q&A เดือนละครั้ง + คอนเทนต์เฉพาะสมาชิก",
    type: "membership",
    price: 1990,
    durationDays: 30,
    enforceAmount: true,
    active: true,
  },
  "inner-circle-annual": {
    code: "inner-circle-annual",
    title: "Inner Circle · รายปี",
    subtitle: "Inner Circle 12 เดือน · ประหยัด ฿3,980",
    type: "membership",
    price: 19900,
    durationDays: 365,
    enforceAmount: true,
    active: true,
  },
} as const satisfies Record<string, Product>;

export type ProductCode = keyof typeof PRODUCTS;

export function getProduct(code: string): Product | null {
  return (PRODUCTS as Record<string, Product>)[code] ?? null;
}

export function isProductCode(code: string): code is ProductCode {
  return code in PRODUCTS;
}

/** Format a price for display: 6900 → "฿6,900" */
export function formatPrice(price: number): string {
  return `฿${price.toLocaleString("th-TH")}`;
}

/** A product is considered "membership-like" for navigation/labelling purposes
 *  when it grants ongoing access (library, membership, course all qualify). */
export function isAccessProduct(p: Product): boolean {
  return p.type !== "addon";
}
