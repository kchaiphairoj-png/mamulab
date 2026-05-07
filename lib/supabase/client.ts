// Browser-side Supabase client. Use inside "use client" components.
// Reads anon key from NEXT_PUBLIC_* env vars so it's safe to expose.

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient(url, anon);
}
