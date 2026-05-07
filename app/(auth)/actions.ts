"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string } | undefined;

function thaiAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
  if (m.includes("user already registered"))
    return "อีเมลนี้สมัครไว้แล้ว ลอง login แทน";
  if (m.includes("password should be at least"))
    return "รหัสผ่านอย่างน้อย 6 ตัวอักษร";
  if (m.includes("invalid email")) return "รูปแบบอีเมลไม่ถูกต้อง";
  if (m.includes("email not confirmed"))
    return "กรุณายืนยันอีเมลก่อน Login (เช็คกล่อง inbox)";
  return msg;
}

export async function signIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/member");

  if (!email || !password) return { error: "กรอกอีเมลและรหัสผ่าน" };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: thaiAuthError(error.message) };

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (!email || !password || !fullName)
    return { error: "กรอกข้อมูลให้ครบ" };
  if (password.length < 6)
    return { error: "รหัสผ่านอย่างน้อย 6 ตัวอักษร" };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) return { error: thaiAuthError(error.message) };

  redirect("/login?registered=1");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
