"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!phone || !pin) {
      setError("Enter your phone number and PIN");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }

  function handleOfflineLogin() {
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 bg-rz-bg">
      <div className="animate-fade-in flex flex-col items-center w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rz-primary to-rz-gold flex items-center justify-center mb-4 shadow-lg shadow-rz-primary/20">
            <span className="text-4xl font-black text-rz-bg tracking-tighter">
              R
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-rz-text">
            Ruzivo
          </h1>
          <p className="text-sm text-rz-text-muted mt-1">
            Master Your ZIMSEC Exams
          </p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-4">
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
              className="w-full rounded-xl bg-rz-surface border border-rz-border px-4 py-3 text-rz-text placeholder:text-rz-text-dim/40 focus:outline-none focus:ring-2 focus:ring-rz-primary/50 transition"
            />
          </div>
          <div>
            <label
              htmlFor="pin"
              className="block text-xs font-medium text-rz-text-muted mb-1.5"
            >
              PIN
            </label>
            <input
              id="pin"
              type="password"
              inputMode="numeric"
              maxLength={6}
              placeholder="••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="w-full mt-4">
          <button
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
