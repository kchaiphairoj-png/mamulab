// Membership status helpers — used by server components.

import { createClient } from "@/lib/supabase/server";

export type MembershipStatus = {
  isActive: boolean;
  expiresAt: Date | null;
  daysLeft: number | null;
  plan: string | null;
};

export async function getMembershipStatus(
  userId: string
): Promise<MembershipStatus> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("memberships")
    .select("plan, status, expires_at")
    .eq("user_id", userId)
    .order("expires_at", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();

  if (!data || !data.expires_at) {
    return { isActive: false, expiresAt: null, daysLeft: null, plan: null };
  }

  const expiresAt = new Date(data.expires_at);
  const now = new Date();
  const isActive = data.status === "active" && expiresAt > now;
  const daysLeft = isActive
    ? Math.max(
        0,
        Math.ceil((expiresAt.getTime() - now.getTime()) / 86400000)
      )
    : 0;

  return { isActive, expiresAt, daysLeft, plan: data.plan };
}
