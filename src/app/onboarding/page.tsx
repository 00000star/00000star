"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveOnboarding } from "@/lib/store";
import { requestPermission, saveNotifPrefs } from "@/lib/notifications";
import { mockSubjects } from "@/lib/mock-data";

const STEPS = ["name", "level", "subjects", "goal", "exam", "notifications"] as const;
type Step = (typeof STEPS)[number];

const GOALS = [
  { value: 3, label: "Casual", desc: "3 lessons/day", emoji: "🌱" },
  { value: 5, label: "Regular", desc: "5 lessons/day", emoji: "📚" },
  { value: 10, label: "Serious", desc: "10 lessons/day", emoji: "🔥" },
  { value: 15, label: "Intense", desc: "15 lessons/day", emoji: "💪" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [level, setLevel] = useState<"O-Level" | "A-Level">("O-Level");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [dailyGoal, setDailyGoal] = useState(5);
  const [examDate, setExamDate] = useState("2026-11-01");
  const [reminderTime, setReminderTime] = useState("17:00");

  const [now] = useState(() => Date.now());
  const stepIdx = STEPS.indexOf(step);
  const progress = (stepIdx + 1) / STEPS.length;

  function next() {
    const nextIdx = stepIdx + 1;
    if (nextIdx < STEPS.length) {
      setStep(STEPS[nextIdx]);
    }
  }

  function back() {
    if (stepIdx > 0) setStep(STEPS[stepIdx - 1]);
  }

  function toggleSubject(id: string) {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function finish() {
    saveOnboarding({
      completed: true,
      name,
      level,
      subjects: selectedSubjects,
      examDate,
      dailyGoal,
      reminderTime,
    });

    const granted = await requestPermission();
    saveNotifPrefs({
      enabled: granted,
      reminderTime,
      streakAlerts: true,
      weeklyReport: true,
      lastNotified: null,
    });

    router.push("/dashboard");
  }

  return (
    <main className="min-h-dvh bg-rz-bg flex flex-col">
      {/* Progress */}
      <header className="px-5 pt-6 pb-2">
        <div className="h-1.5 rounded-full bg-rz-border overflow-hidden">
          <div
            className="h-full rounded-full bg-rz-primary transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {stepIdx > 0 && (
            <button onClick={back} className="text-xs text-rz-text-muted">
              Back
            </button>
          )}
          <span className="text-xs text-rz-text-dim ml-auto">
            {stepIdx + 1}/{STEPS.length}
          </span>
        </div>
      </header>

      <div className="flex-1 px-5 py-6 flex flex-col">
        {/* Step: Name */}
        {step === "name" && (
          <div className="flex-1 flex flex-col animate-slide-up">
            <h1 className="text-2xl font-bold text-rz-text mb-2">
              What&apos;s your name?
            </h1>
            <p className="text-sm text-rz-text-muted mb-6">
              We&apos;ll personalise your learning experience.
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tatenda"
              autoFocus
              className="w-full rounded-xl bg-rz-surface border border-rz-border px-4 py-3.5 text-lg text-rz-text placeholder:text-rz-text-dim/30 focus:outline-none focus:ring-2 focus:ring-rz-primary/50"
            />
          </div>
        )}

        {/* Step: Level */}
        {step === "level" && (
          <div className="flex-1 flex flex-col animate-slide-up">
            <h1 className="text-2xl font-bold text-rz-text mb-2">
              What level are you?
            </h1>
            <p className="text-sm text-rz-text-muted mb-6">
              This adjusts your content difficulty and UI style.
            </p>
            <div className="space-y-3">
              {(["O-Level", "A-Level"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`w-full rounded-xl border-2 p-5 text-left transition-all active:scale-[0.98] ${
                    level === l
                      ? "border-rz-primary bg-rz-primary/10"
                      : "border-rz-border bg-rz-surface"
                  }`}
                >
                  <h3 className="text-base font-semibold text-rz-text">{l}</h3>
                  <p className="text-xs text-rz-text-muted mt-1">
                    {l === "O-Level"
                      ? "Form 3–4 · Full gamification with XP, streaks & mascots"
                      : "Form 5–6 · Focus Mode with Pomodoro timers & deep analytics"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Subject Selection */}
        {step === "subjects" && (
          <div className="flex-1 flex flex-col animate-slide-up">
            <h1 className="text-2xl font-bold text-rz-text mb-2">
              Pick your subjects
            </h1>
            <p className="text-sm text-rz-text-muted mb-6">
              Select the subjects you&apos;re writing this session. You can change later.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {mockSubjects.map((s) => {
                const active = selectedSubjects.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSubject(s.id)}
                    className={`rounded-xl border-2 p-4 text-left transition-all active:scale-[0.97] ${
                      active
                        ? "border-rz-primary bg-rz-primary/10"
                        : "border-rz-border bg-rz-surface"
                    }`}
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className="text-sm font-semibold text-rz-text mt-2">
                      {s.name}
                    </h3>
                    <p className="text-[11px] text-rz-text-dim">
                      {s.nodes.length} topics
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step: Daily Goal */}
        {step === "goal" && (
          <div className="flex-1 flex flex-col animate-slide-up">
            <h1 className="text-2xl font-bold text-rz-text mb-2">
              Set your daily goal
            </h1>
            <p className="text-sm text-rz-text-muted mb-6">
              How many lessons per day? Start small — you can increase later.
            </p>
            <div className="space-y-3">
              {GOALS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setDailyGoal(g.value)}
                  className={`w-full rounded-xl border-2 p-4 flex items-center gap-4 transition-all active:scale-[0.98] ${
                    dailyGoal === g.value
                      ? "border-rz-gold bg-rz-gold/10"
                      : "border-rz-border bg-rz-surface"
                  }`}
                >
                  <span className="text-2xl">{g.emoji}</span>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-rz-text">
                      {g.label}
                    </h3>
                    <p className="text-xs text-rz-text-dim">{g.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Exam Date */}
        {step === "exam" && (
          <div className="flex-1 flex flex-col animate-slide-up">
            <h1 className="text-2xl font-bold text-rz-text mb-2">
              When is your exam?
            </h1>
            <p className="text-sm text-rz-text-muted mb-6">
              We&apos;ll create a countdown and pace your revision.
            </p>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full rounded-xl bg-rz-surface border border-rz-border px-4 py-3.5 text-rz-text focus:outline-none focus:ring-2 focus:ring-rz-primary/50"
            />
            <div className="mt-4 rounded-xl bg-rz-surface border border-rz-border p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-sm font-semibold text-rz-text">
                    {Math.max(
                      0,
                      Math.ceil(
                        (new Date(examDate).getTime() - now) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}{" "}
                    days until exam
                  </p>
                  <p className="text-xs text-rz-text-muted">
                    ZIMSEC Nov {new Date(examDate).getFullYear()} Session
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step: Notifications */}
        {step === "notifications" && (
          <div className="flex-1 flex flex-col animate-slide-up">
            <h1 className="text-2xl font-bold text-rz-text mb-2">
              Stay on track
            </h1>
            <p className="text-sm text-rz-text-muted mb-6">
              Get daily reminders so you never break your streak.
            </p>
            <div className="space-y-4">
              <div className="rounded-xl bg-rz-surface border border-rz-border p-4">
                <label className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-rz-text">
                      Daily Reminder
                    </h3>
                    <p className="text-xs text-rz-text-muted">
                      We&apos;ll nudge you to study
                    </p>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-rz-primary flex items-center justify-end px-0.5">
                    <div className="w-5 h-5 rounded-full bg-white" />
                  </div>
                </label>
              </div>
              <div>
                <label className="block text-xs font-medium text-rz-text-muted mb-1.5">
                  Reminder Time
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full rounded-xl bg-rz-surface border border-rz-border px-4 py-3 text-rz-text focus:outline-none focus:ring-2 focus:ring-rz-primary/50"
                />
              </div>
              <div className="rounded-xl bg-rz-surface border border-rz-border p-4">
                <label className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-rz-text">
                      Streak Alerts
                    </h3>
                    <p className="text-xs text-rz-text-muted">
                      Warning when your streak is at risk
                    </p>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-rz-primary flex items-center justify-end px-0.5">
                    <div className="w-5 h-5 rounded-full bg-white" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-8 pt-2">
        {step === "notifications" ? (
          <button
            onClick={finish}
            className="w-full rounded-xl bg-rz-gold py-3.5 font-semibold text-rz-bg text-base hover:bg-rz-gold-dim active:scale-[0.98] transition-all"
          >
            Start Learning
          </button>
        ) : (
          <button
            onClick={next}
            disabled={
              (step === "name" && !name.trim()) ||
              (step === "subjects" && selectedSubjects.length === 0)
            }
            className="w-full rounded-xl bg-rz-primary py-3.5 font-semibold text-rz-bg text-base hover:bg-rz-primary-dim active:scale-[0.98] transition-all disabled:opacity-40"
          >
            Continue
          </button>
        )}
      </div>
    </main>
  );
}
