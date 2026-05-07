// Server-side Supabase client for Server Components, Route Handlers, Server Actions.
// Reads/writes auth cookies through Next's cookies() so server-rendered pages
// know who is logged in.

import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(toSet) {
        try {
          toSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options as CookieOptions);
          });
        } catch {
          // Called from a Server Component — cookies are read-only there.
          // The middleware refreshes them; safe to ignore.
        }
      },
    },
  });
}
