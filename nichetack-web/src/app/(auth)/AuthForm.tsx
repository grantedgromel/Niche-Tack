"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  type AuthState,
  signInWithMagicLink,
  signInWithPassword,
  signUp,
} from "./actions";

const inputClass =
  "w-full rounded-xl border border-line bg-bg-elev px-4 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-ink-3";

function Notice({ state }: { state: AuthState | null }) {
  if (state?.error) {
    return <p className="mt-2 text-[12px] text-accent">{state.error}</p>;
  }
  if (state?.message) {
    return (
      <p className="mt-2 text-[12px]" style={{ color: "var(--positive)" }}>
        {state.message}
      </p>
    );
  }
  return null;
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const [pwState, pwAction, pwPending] = useActionState<
    AuthState | null,
    FormData
  >(isLogin ? signInWithPassword : signUp, null);
  const [magicState, magicAction, magicPending] = useActionState<
    AuthState | null,
    FormData
  >(signInWithMagicLink, null);

  return (
    <div className="w-full max-w-[380px]">
      <p className="eyebrow mb-2.5">nichetack</p>
      <h1 className="h-display text-[40px] leading-none">
        {isLogin ? (
          <>
            welcome <em className="h-it">back</em>.
          </>
        ) : (
          <>
            make a <em className="h-it">stash</em>.
          </>
        )}
      </h1>
      <p className="mt-2.5 text-[14px] leading-snug text-ink-2">
        {isLogin
          ? "Sign in to the things you've saved."
          : "Create an account — you'll start with a demo stash to explore."}
      </p>

      <form action={pwAction} className="mt-7 flex flex-col gap-2.5">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          className={inputClass}
        />
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={isLogin ? "current-password" : "new-password"}
          placeholder="Password"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={pwPending}
          className="btn mt-1 w-full py-3.5"
        >
          {pwPending
            ? "One moment…"
            : isLogin
              ? "Sign in"
              : "Create account"}
        </button>
      </form>
      <Notice state={pwState} />

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          or
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form action={magicAction} className="flex flex-col gap-2.5">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={magicPending}
          className="btn ghost w-full py-3.5"
        >
          {magicPending ? "Sending…" : "Email me a sign-in link"}
        </button>
      </form>
      <Notice state={magicState} />

      <p className="mt-7 text-center text-[13px] text-ink-3">
        {isLogin ? (
          <>
            New to Nichetack?{" "}
            <Link href="/signup" className="link-quiet underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="link-quiet underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
