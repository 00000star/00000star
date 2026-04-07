"use client";

import Link from "next/link";
import { mockUser, mockSubjects } from "@/lib/mock-data";
import { BottomNav } from "@/components/ui/bottom-nav";
import { ProgressRing } from "@/components/ui/progress-ring";
import { XPBadge } from "@/components/ui/xp-badge";

export default function DashboardPage() {
  const user = mockUser;
  const dailyGoal = 0.6;
  const lessonsToday = 3;
  const goalTarget = 5;

  return (
    <main className="min-h-dvh bg-rz-bg pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rz-primary to-rz-gold flex items-center justify-center text-lg font-bold text-rz-bg">
            {user.avatar}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-rz-text">
              Welcome, {user.name}!
            </h1>
            <p className="text-xs text-rz-text-muted">{user.level} Focus</p>
          </div>
        </div>
        <XPBadge xp={user.xp} />
      </header>

      <div className="px-5 space-y-4">
        {/* Streak + Daily Goal Row */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up">
          {/* Streak */}
          <div className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center">
            <div className="text-3xl mb-1">🔥</div>
            <span className="text-2xl font-bold text-rz-gold">
              {user.streak}
            </span>
            <span className="text-xs text-rz-text-muted">Day Streak</span>
          </div>

          {/* Daily Goal */}
          <div className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center">
            <ProgressRing progress={dailyGoal} size={64} strokeWidth={5}>
              <span className="text-sm font-bold text-rz-primary">
                {Math.round(dailyGoal * 100)}%
              </span>
            </ProgressRing>
            <span className="text-xs text-rz-text-muted mt-1">
              {lessonsToday}/{goalTarget} lessons
            </span>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-medium text-rz-text-muted mb-2">
            Continue Learning
          </h2>
          {mockSubjects
            .filter((s) => s.progress > 0)
            .map((subject) => {
              const activeNode = subject.nodes.find(
                (n) => n.status === "active"
              );
              return (
                <Link
                  key={subject.id}
                  href={`/path/${subject.id}`}
                  className="block mb-3"
                >
                  <div className="rounded-2xl bg-rz-surface border border-rz-border p-4 hover:border-rz-primary/40 active:scale-[0.98] transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-semibold text-rz-text text-sm">
                            {subject.level} {subject.name}
                          </h3>
                          {activeNode && (
                            <p className="text-xs text-rz-text-dim">
                              Next: {activeNode.title}
                            </p>
                          )}
                        </div>
                      </div>
                      <ProgressRing
                        progress={subject.progress}
                        size={44}
                        strokeWidth={4}
                      >
                        <span className="text-[10px] font-bold text-rz-primary">
                          {Math.round(subject.progress * 100)}%
                        </span>
                      </ProgressRing>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-rz-border overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${subject.progress * 100}%`,
                          backgroundColor: subject.color,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* Quick Actions */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-sm font-medium text-rz-text-muted mb-2">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/exam/exam_math_2024_p1"
              className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center gap-2 hover:border-rz-primary/40 active:scale-[0.98] transition-all"
            >
              <span className="text-2xl">📝</span>
              <span className="text-xs font-medium text-rz-text-muted">
                Mock Exam
              </span>
            </Link>
            <Link
              href="/essay"
              className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center gap-2 hover:border-rz-primary/40 active:scale-[0.98] transition-all"
            >
              <span className="text-2xl">✍️</span>
              <span className="text-xs font-medium text-rz-text-muted">
                Essay Grader
              </span>
            </Link>
            <Link
              href="/sbp"
              className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center gap-2 hover:border-rz-primary/40 active:scale-[0.98] transition-all"
            >
              <span className="text-2xl">📋</span>
              <span className="text-xs font-medium text-rz-text-muted">
                SBP Tracker
              </span>
            </Link>
            <Link
              href="/offline"
              className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center gap-2 hover:border-rz-primary/40 active:scale-[0.98] transition-all"
            >
              <span className="text-2xl">📶</span>
              <span className="text-xs font-medium text-rz-text-muted">
                Offline Data
              </span>
            </Link>
          </div>
        </div>

        {/* Upgrade Banner (non-premium) */}
        {!user.premium && (
          <Link
            href="/pay"
            className="block animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="rounded-2xl bg-gradient-to-r from-rz-gold/20 to-rz-primary/20 border border-rz-gold/30 p-4 flex items-center gap-3 hover:border-rz-gold/50 active:scale-[0.98] transition-all">
              <span className="text-2xl">👑</span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-rz-gold">
                  Unlock All Content
                </h3>
                <p className="text-xs text-rz-text-muted">
                  Ask your parent to upgrade via WhatsApp
                </p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-rz-gold"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </Link>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
