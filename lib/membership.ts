// Entitlement helpers — used by server components and API routes.
//
// Concepts:
//   "entitlement" = a row in public.memberships for a (user, product_code)
//                   that is currently `status='active'` AND not yet expired.
//
// A user may hold several entitlements concurrently (e.g. Library + Course +
// Inner Circle). Every helper below scopes to a `product_code` from
// lib/products.ts.
//
// Backwards compatibility:
//   `getMembershipStatus(userId)` is preserved as an alias for the Library
//   entitlement so existing Library code keeps working without edits.

import { createClient } from "@/lib/supabase/server";
import { getProduct, type ProductCode } from "@/lib/products";

export type EntitlementStatus = {
  /** True when an unexpired `status='active'` row exists. */
  isActive: boolean;
  /** When the entitlement expires (null when none). */
  expiresAt: Date | null;
  /** Whole days remaining (0 when inactive). */
  daysLeft: number | null;
  /** Product slug this status was queried for. */
  productCode: string;
};

/** Back-compat alias used by older code that only knew about the Library. */
export type MembershipStatus = EntitlementStatus & {
  /** Legacy field — duplicated from productCode for back-compat. */
  plan: string | null;
};

/** Get the active entitlement for one product. */
export async function getEntitlement(
  userId: string,
  productCode: ProductCode | string
): Promise<EntitlementStatus> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("memberships")
    .select("status, expires_at, product_code")
    .eq("user_id", userId)
    .eq("product_code", productCode)
    .order("expires_at", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();

  if (!data || !data.expires_at) {
    return {
      isActive: false,
      expiresAt: null,
      daysLeft: null,
      productCode: String(productCode),
    };
  }

  const expiresAt = new Date(data.expires_at);
  const now = new Date();
  const isActive = data.status === "active" && expiresAt > now;
  const daysLeft = isActive
    ? Math.max(0, Math.ceil((expiresAt.getTime() - now.getTime()) / 86400000))
    : 0;

  return {
    isActive,
    expiresAt,
    daysLeft,
    productCode: String(productCode),
  };
}

/** Get ALL active entitlements for a user. Returns a Set of product codes. */
export async function getActiveEntitlements(
  userId: string
): Promise<Set<string>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("memberships")
    .select("product_code, status, expires_at")
    .eq("user_id", userId)
    .eq("status", "active");

  const out = new Set<string>();
  if (!data) return out;
  const now = new Date();
  for (const row of data) {
    if (!row.expires_at) continue;
    if (new Date(row.expires_at) > now) out.add(row.product_code);
  }
  return out;
}

/**
 * BACK-COMPAT alias — returns the Library entitlement and the extra `plan`
 * field that old call-sites destructure. Keep using this for code that only
 * cares about the ฿599 Library tier.
 */
export async function getMembershipStatus(
  userId: string
): Promise<MembershipStatus> {
  const e = await getEntitlement(userId, "library");
  return { ...e, plan: e.isActive ? "library" : null };
}

/** Insert/upsert an entitlement after a successful payment. */
export async function grantEntitlement(
  supabase: Awaited<ReturnType<typeof createClient>>,
  args: { userId: string; productCode: string; startedAt: Date; expiresAt: Date }
) {
  const { userId, productCode, startedAt, expiresAt } = args;
  // If an active entitlement already exists, extend it — pay-to-extend semantics.
  // The unique partial index prevents duplicate active rows.
  const existing = await supabase
    .from("memberships")
    .select("id, expires_at")
    .eq("user_id", userId)
    .eq("product_code", productCode)
    .eq("status", "active")
    .maybeSingle();

  if (existing.data) {
    const currentEnd = new Date(existing.data.expires_at);
    const base = currentEnd > startedAt ? currentEnd : startedAt;
    const newEnd = new Date(
      base.getTime() + (expiresAt.getTime() - startedAt.getTime())
    );
    return await supabase
      .from("memberships")
      .update({
        expires_at: newEnd.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.data.id);
  }

  return await supabase.from("memberships").insert({
    user_id: userId,
    product_code: productCode,
    plan: productCode, // legacy column kept populated for any tooling that reads it
    status: "active",
    started_at: startedAt.toISOString(),
    expires_at: expiresAt.toISOString(),
  });
}

/** Convenience: compute (startedAt, expiresAt) from a product. */
export function durationWindow(productCode: string): {
  startedAt: Date;
  expiresAt: Date;
} | null {
  const product = getProduct(productCode);
  if (!product) return null;
  const startedAt = new Date();
  const expiresAt = new Date(
    startedAt.getTime() + product.durationDays * 86400000
  );
  return { startedAt, expiresAt };
}
