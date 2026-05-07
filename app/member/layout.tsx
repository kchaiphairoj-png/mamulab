import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Container from "@/components/Container";
import { signOut } from "../(auth)/actions";

export const metadata = {
  title: "พื้นที่สมาชิก | MAMULAB",
};

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/member");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return (
    <main className="min-h-screen bg-midnight-deep">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-midnight-deep/85 backdrop-blur">
        <Container className="flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-display text-xl text-gold-gradient transition hover:opacity-80"
            >
              MAMULAB
            </Link>
            <nav className="hidden items-center gap-5 text-sm text-white/75 md:flex">
              <Link
                href="/member"
                className="transition hover:text-gold-light"
              >
                Dashboard
              </Link>
              <Link
                href="/member/articles"
                className="transition hover:text-gold-light"
              >
                บทความเชิงลึก
              </Link>
              <Link
                href="/member/billing"
                className="transition hover:text-gold-light"
              >
                สมาชิก / ชำระเงิน
              </Link>
              {profile?.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-gold-light transition hover:text-gold"
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-white/65 sm:inline">
              {profile?.full_name ?? user.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/75 transition hover:border-gold/40 hover:text-gold-light"
              >
                ออกจากระบบ
              </button>
            </form>
          </div>
        </Container>
      </header>

      <Container className="py-10 md:py-14">{children}</Container>
    </main>
  );
}
