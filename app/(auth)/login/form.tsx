"use client";

import { useActionState } from "react";
import { signIn, type AuthState } from "../actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signIn,
    undefined
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-gold-light/80"
        >
          อีเมล
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-gold-light/80"
        >
          รหัสผ่าน
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30"
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-midnight-deep shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
      </button>
    </form>
  );
}
