"use client";

import { useState } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/ui/bottom-nav";

interface FeedbackItem {
  text: string;
  type: "strength" | "improvement";
}

export default function EssayGraderPage() {
  const [subject, setSubject] = useState("O-Level History");
  const [topic, setTopic] = useState("The Rise and Fall of the Mutapa State");
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackItem[] | null>(null);
  const [overallScore, setOverallScore] = useState<number | null>(null);

  function handleGrade() {
    if (!essay.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setFeedback([
        {
          text: "Strong thesis statement that directly addresses the question about the Mutapa State's political organisation.",
          type: "strength",
        },
        {
          text: "Add a citation regarding archaeological evidence from Great Zimbabwe and Khami to strengthen your argument about trade networks.",
          type: "improvement",
        },
        {
          text: "Good use of chronological structure to track the rise of Mutapa through the 15th century.",
          type: "strength",
        },
        {
          text: "The paragraph on Portuguese interference needs more specific dates and treaty references (e.g., the 1607 treaty).",
          type: "improvement",
        },
        {
          text: "Consider discussing the role of the mwene mutapa (ruler) in maintaining political control over tributary states.",
          type: "improvement",
        },
      ]);
      setOverallScore(62);
      setLoading(false);
    }, 2000);
  }

  return (
    <main className="min-h-dvh bg-rz-bg pb-24">
      <header className="px-5 pt-6 pb-4 flex items-center gap-3">
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
            ✍️ Essay Grader
          </h1>
          <p className="text-xs text-rz-text-muted">
            AI-powered structural feedback
          </p>
        </div>
      </header>

      <div className="px-5 space-y-4">
        {/* Subject & Topic */}
        <div className="grid grid-cols-1 gap-3 animate-slide-up">
          <div>
            <label className="block text-xs font-medium text-rz-text-muted mb-1.5">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl bg-rz-surface border border-rz-border px-4 py-3 text-sm text-rz-text focus:outline-none focus:ring-2 focus:ring-rz-primary/50"
            >
              <option>O-Level History</option>
              <option>O-Level Divinity</option>
              <option>O-Level English Language</option>
              <option>A-Level History</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-rz-text-muted mb-1.5">
              Topic / Question
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl bg-rz-surface border border-rz-border px-4 py-3 text-sm text-rz-text focus:outline-none focus:ring-2 focus:ring-rz-primary/50"
            />
          </div>
        </div>

        {/* Essay Input */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <label className="block text-xs font-medium text-rz-text-muted mb-1.5">
            Your Essay / Outline
          </label>
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            rows={10}
            placeholder="Type or paste your essay here..."
            className="w-full rounded-xl bg-rz-surface border border-rz-border px-4 py-3 text-sm text-rz-text placeholder:text-rz-text-dim/30 focus:outline-none focus:ring-2 focus:ring-rz-primary/50 resize-none"
          />
          <p className="text-[11px] text-rz-text-dim/40 mt-1">
            {essay.length} characters &middot; Minimum 100 recommended
          </p>
        </div>

        {/* Grade Button */}
        <button
          onClick={handleGrade}
          disabled={loading || essay.length < 10}
          className="w-full rounded-xl bg-rz-primary py-3.5 font-semibold text-rz-bg text-base hover:bg-rz-primary-dim active:scale-[0.98] transition-all disabled:opacity-40"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-rz-bg/30 border-t-rz-bg rounded-full animate-spin" />
              Analysing...
            </span>
          ) : (
            "Get AI Feedback"
          )}
        </button>

        {/* Feedback */}
        {feedback && (
          <div className="space-y-3 animate-slide-up">
            {/* Score */}
            <div className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-rz-text">
                  Overall Score
                </h3>
                <p className="text-xs text-rz-text-muted">
                  Based on structure, argument, and evidence
                </p>
              </div>
              <div className="text-2xl font-bold text-rz-gold">
                {overallScore}%
              </div>
            </div>

            {/* Feedback Items */}
            {feedback.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-4 border ${
                  item.type === "strength"
                    ? "bg-green-500/5 border-green-500/20"
                    : "bg-rz-gold/5 border-rz-gold/20"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">
                    {item.type === "strength" ? "✅" : "💡"}
                  </span>
                  <p className="text-sm text-rz-text leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
