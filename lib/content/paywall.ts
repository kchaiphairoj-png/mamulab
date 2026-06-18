import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getEntitlement,
  getMembershipStatus,
  type EntitlementStatus,
  type MembershipStatus,
} from "@/lib/membership";
import type { ProductCode } from "@/lib/products";

/**
 * Generic paywall — require an authenticated user with an active entitlement
 * for the given product. Redirects:
 *   - not signed in   → /login?next=...
 *   - not entitled    → /unlock/<productCode>  (Phase 1 will create that page;
 *                        for now /member/billing handles the Library case)
 */
export async function requireEntitlement(
  productCode: ProductCode | string,
  options: { unlockPath?: string; nextPath?: string } = {}
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const next = options.nextPath ?? "/member";
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);

  const entitlement = await getEntitlement(user.id, productCode);
  if (!entitlement.isActive) {
    const unlock =
      options.unlockPath ??
      (productCode === "library"
        ? "/member/billing"
        : `/unlock/${productCode}`);
    redirect(unlock);
  }

  return { user, entitlement };
}

/**
 * BACK-COMPAT alias used by existing Library pages
 * (member/articles, member/tools, member/weekly).
 * Keep using this where the page is part of the Library tier.
 */
export async function requireActiveMember(): Promise<{
  user: Awaited<ReturnType<typeof createSupabaseUserOrThrow>>;
  status: MembershipStatus;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/member");

  const status = await getMembershipStatus(user.id);
  if (!status.isActive) redirect("/member/billing");

  return { user, status };
}

// Helper so TS can describe what `requireActiveMember` returns without
// duplicating the Supabase user type import.
async function createSupabaseUserOrThrow() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("unreachable: redirected above");
  return user;
}

export type { EntitlementStatus, MembershipStatus };
