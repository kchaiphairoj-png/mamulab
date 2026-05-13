import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMembershipStatus, type MembershipStatus } from "@/lib/membership";

/**
 * Require an authenticated user with an active membership. Use at the top of
 * every premium server component. Returns the user + membership status when
 * authorized; otherwise redirects to /login or /member/billing.
 */
export async function requireActiveMember() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/member");

  const status = await getMembershipStatus(user.id);
  if (!status.isActive) redirect("/member/billing");

  return { user, status };
}

export type { MembershipStatus };
