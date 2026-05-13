// Payment configuration — pricing + bank account.
// All values are env-driven so they can be changed in Vercel without re-deploy.

export const PAYMENT = {
  price: Number(process.env.MEMBERSHIP_PRICE ?? 599),
  durationDays: Number(process.env.MEMBERSHIP_DURATION_DAYS ?? 365),
  bank: {
    name:
      process.env.NEXT_PUBLIC_PAYMENT_BANK_NAME ?? "ธนาคารกรุงเทพ",
    short: process.env.NEXT_PUBLIC_PAYMENT_BANK_SHORT ?? "BBL",
    accountNumber:
      process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NUMBER ?? "0000000000",
    accountName:
      process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME ?? "MAMULAB",
  },
} as const;

/** Format bank account number for display: 168-8-20437-9 style */
export function formatAccountNumber(num: string): string {
  const digits = num.replace(/\D/g, "");
  if (digits.length !== 10) return num;
  return `${digits.slice(0, 3)}-${digits.slice(3, 4)}-${digits.slice(
    4,
    9
  )}-${digits.slice(9)}`;
}

/** Format Thai Baht: 199 → "199.00" */
export function formatBaht(amount: number): string {
  return amount.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
