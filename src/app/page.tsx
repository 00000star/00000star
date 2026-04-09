"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isOnboarded } from "@/lib/store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";

  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"signin" | "register">("signin");

  async function postAuth(url: string) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ phone, pin }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone || !pin) {
      setError("Enter your phone number and PIN");
      return;
    }
    setLoading(true);
    setError("");
    const ok =
      mode === "register"
        ? await postAuth("/api/auth/register")
        : await postAuth("/api/auth/login");
    setLoading(false);
    if (!ok) return;

    try {
      const me = await fetch("/api/auth/me", { credentials: "include" });
      if (me.ok) {
        const j = (await me.json()) as {
          user?: { onboarding?: { completed?: boolean } | null };
        };
        if (j.user?.onboarding?.completed) {
          router.push(nextPath.startsWith("/") ? nextPath : "/dashboard");
        } else {
          router.push("/onboarding");
        }
        return;
      }
    } catch {
      /* fall through */
    }

    if (!isOnboarded()) {
      router.push("/onboarding");
    } else {
      router.push(nextPath.startsWith("/") ? nextPath : "/dashboard");
    }
  }

  function handleOfflineLogin() {
    if (!isOnboarded()) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 bg-rz-bg">
      <div className="animate-fade-in flex flex-col items-center w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rz-primary to-rz-gold flex items-center justify-center mb-4 shadow-lg shadow-rz-primary/20">
            <span className="text-4xl font-black text-rz-bg tracking-tighter">
              N
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-rz-text">
            Nhaka
          </h1>
          <p className="text-sm text-rz-text-muted mt-1">
            Own Your ZIMSEC Success
          </p>
        </div>

        <div className="flex rounded-xl bg-rz-surface border border-rz-border p-1 w-full mb-4">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError("");
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              mode === "signin"
                ? "bg-rz-primary text-rz-bg"
                : "text-rz-text-muted"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              mode === "register"
                ? "bg-rz-primary text-rz-bg"
                : "text-rz-text-muted"
            }`}
          >
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-medium text-rz-text-muted mb-1.5"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+263 77 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className="w-full rounded-xl bg-rz-surface border border-rz-border px-4 py-3 text-rz-text placeholder:text-rz-text-dim/40 focus:outline-none focus:ring-2 focus:ring-rz-primary/50 transition"
            />
          </div>
          <div>
            <label
              htmlFor="pin"
              className="block text-xs font-medium text-rz-text-muted mb-1.5"
            >
              PIN (4–8 digits)
            </label>
            <input
              id="pin"
              type="password"
              inputMode="numeric"
              maxLength={8}
              minLength={4}
              placeholder="••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
              className="w-full rounded-xl bg-rz-surface border border-rz-border px-4 py-3 text-rz-text placeholder:text-rz-text-dim/40 focus:outline-none focus:ring-2 focus:ring-rz-primary/50 transition"
            />
          </div>

          {error && (
            <p className="text-xs text-rz-danger animate-slide-up">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-rz-gold py-3.5 font-semibold text-rz-bg text-base hover:bg-rz-gold-dim active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-rz-bg/30 border-t-rz-bg rounded-full animate-spin" />
                {mode === "register" ? "Creating account…" : "Signing in…"}
              </span>
            ) : mode === "register" ? (
              "Create account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="w-full mt-4">
          <button
            type="button"
            onClick={handleOfflineLogin}
            className="w-full rounded-xl border border-rz-border py-3 text-sm font-medium text-rz-text-muted hover:bg-rz-surface active:scale-[0.98] transition-all"
          >
            Continue Offline (Cached Profile)
          </button>
        </div>

        <p className="mt-8 text-[11px] text-rz-text-dim/50 text-center">
          By signing in you agree to our Terms of Service.
          <br />
          Data usage: ~50KB per lesson.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh items-center justify-center bg-rz-bg">
          <span className="w-8 h-8 border-2 border-rz-primary/30 border-t-rz-primary rounded-full animate-spin" />
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
