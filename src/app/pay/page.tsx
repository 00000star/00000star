"use client";

import { useState } from "react";
import Link from "next/link";

const PLANS = [
  {
    id: "monthly",
    label: "Monthly",
    usd: 2.99,
    zwl: 19435,
    period: "/month",
    popular: false,
  },
  {
    id: "termly",
    label: "Per Term",
    usd: 6.99,
    zwl: 45435,
    period: "/term",
    popular: true,
  },
  {
    id: "yearly",
    label: "Full Year",
    usd: 14.99,
    zwl: 97435,
    period: "/year",
    popular: false,
  },
] as const;

export default function PayPage() {
  const [selectedPlan, setSelectedPlan] = useState("termly");
  const [sent, setSent] = useState(false);

  const plan = PLANS.find((p) => p.id === selectedPlan)!;

  function handleWhatsApp() {
    const message = encodeURIComponent(
      `Hi! I'm ${mockStudentName}'s parent. I'd like to upgrade their Ruzivo account to the ${plan.label} plan ($${plan.usd} USD). Here is my payment link: https://pay.ruzivo.co.zw/checkout/${plan.id}?student=u_001`
    );
    const url = `https://wa.me/?text=${message}`;
    window.open(url, "_blank");
    setSent(true);
  }

  const mockStudentName = "Tatenda";

  return (
    <main className="min-h-dvh bg-rz-bg px-5 py-6">
      <header className="flex items-center gap-3 mb-6">
        <Link
          href="/dashboard"
          className="w-9 h-9 rounded-full bg-rz-surface border border-rz-border flex items-center justify-center text-rz-text-muted"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-rz-text">
            👑 Upgrade to Premium
          </h1>
          <p className="text-xs text-rz-text-muted">
            Unlock all content &amp; mock exams
          </p>
        </div>
      </header>

      {/* Benefits */}
      <div className="rounded-2xl bg-rz-surface border border-rz-border p-4 mb-5 animate-slide-up">
        <h2 className="text-sm font-semibold text-rz-gold mb-3">
          Premium includes:
        </h2>
        <ul className="space-y-2">
          {[
            "All O-Level & A-Level subjects",
            "Full past paper archive (2015–2025)",
            "Unlimited mock exams with grading",
            "AI Essay Grader (unlimited submissions)",
            "Priority offline content downloads",
            "No ads, ever",
          ].map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm text-rz-text">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Plan Selection */}
      <div className="space-y-3 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {PLANS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlan(p.id)}
            className={`w-full rounded-xl border-2 p-4 text-left transition-all active:scale-[0.98] relative ${
              selectedPlan === p.id
                ? "border-rz-gold bg-rz-gold/5"
                : "border-rz-border bg-rz-surface"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-rz-gold text-rz-bg text-[10px] font-bold">
                BEST VALUE
              </span>
            )}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-rz-text">
                  {p.label}
                </h3>
                <p className="text-[11px] text-rz-text-dim">
                  ZWL {p.zwl.toLocaleString()}{p.period}
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-rz-gold">
                  ${p.usd}
                </span>
                <span className="text-xs text-rz-text-dim">{p.period}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* WhatsApp Flow */}
      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        {!sent ? (
          <>
            <button
              onClick={handleWhatsApp}
              className="w-full rounded-xl bg-[#25D366] py-3.5 font-semibold text-white text-base flex items-center justify-center gap-2 hover:bg-[#20bd5a] active:scale-[0.98] transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ask Parent via WhatsApp
            </button>
            <p className="text-[11px] text-rz-text-dim/50 text-center mt-3">
              A pre-filled message with a payment link will be generated.
              <br />
              Your parent pays via EcoCash — your account unlocks instantly.
            </p>
          </>
        ) : (
          <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-4 text-center">
            <span className="text-3xl block mb-2">✅</span>
            <h3 className="text-sm font-semibold text-green-400 mb-1">
              WhatsApp Message Prepared
            </h3>
            <p className="text-xs text-rz-text-muted">
              Once your parent completes payment via EcoCash, your account will
              be upgraded automatically.
            </p>
            <Link
              href="/dashboard"
              className="mt-4 inline-block px-6 py-2.5 rounded-xl bg-rz-primary text-sm font-semibold text-rz-bg hover:bg-rz-primary-dim active:scale-[0.98] transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
