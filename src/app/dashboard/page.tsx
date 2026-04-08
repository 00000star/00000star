"use client";

import Link from "next/link";
import { mockUser, mockSubjects } from "@/lib/mock-data";
import { BottomNav } from "@/components/ui/bottom-nav";
import { ProgressRing } from "@/components/ui/progress-ring";
import { XPBadge } from "@/components/ui/xp-badge";
import { useDeviceProfile } from "@/hooks/use-device";
import { useServiceWorker } from "@/hooks/use-service-worker";
import { saveUser, loadOnboarding } from "@/lib/store";
import { checkStreakReminder, scheduleReminder, loadNotifPrefs } from "@/lib/notifications";
import { getTotalReviewsDue, getWeakNodes } from "@/lib/spaced-repetition";
import { getLeague } from "@/lib/leaderboard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const user = mockUser;
  const { lowFidelity } = useDeviceProfile();
  useServiceWorker();

  const [streakAlert] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return checkStreakReminder(user.streak, user.lastActiveDate);
  });
  const [reviewsDue] = useState(() => {
    if (typeof window === "undefined") return 0;
    return getTotalReviewsDue();
  });
  const [weakNodeCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return getWeakNodes().length;
  });

  const onboarding = loadOnboarding();
  const dailyGoalTarget = onboarding?.dailyGoal ?? 5;
  const lessonsToday = 3;
  const dailyGoal = lessonsToday / dailyGoalTarget;
  const league = getLeague(user.xp);

  const examDate = onboarding?.examDate;
  const [daysUntilExam] = useState<number | null>(() => {
    if (typeof window === "undefined" || !examDate) return null;
    return Math.max(0, Math.ceil((new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  });

  useEffect(() => {
    saveUser(user);
    const prefs = loadNotifPrefs();
    if (prefs.enabled) {
      scheduleReminder(prefs);
    }
  }, [user]);

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
              Welcome, {onboarding?.name || user.name}!
            </h1>
            <p className="text-xs text-rz-text-muted">{user.level} Focus</p>
          </div>
        </div>
        <XPBadge xp={user.xp} />
      </header>

      <div className="px-5 space-y-4">
        {/* Streak Alert */}
        {streakAlert && (
          <div className="rounded-xl bg-rz-danger/10 border border-rz-danger/30 p-3 flex items-center gap-2 animate-slide-up">
            <span className="text-lg">🔥</span>
            <p className="text-xs text-rz-danger font-medium">{streakAlert}</p>
          </div>
        )}

        {lowFidelity && (
          <div className="rounded-xl bg-rz-gold/10 border border-rz-gold/30 p-3 flex items-center gap-2 animate-fade-in">
            <span className="text-sm">⚡</span>
            <p className="text-xs text-rz-gold">
              Low-fidelity mode — animations reduced to save battery.
            </p>
          </div>
        )}

        {/* Streak + Daily Goal + Exam Countdown */}
        <div className="grid grid-cols-3 gap-3 animate-slide-up">
          <div className="rounded-2xl bg-rz-surface border border-rz-border p-3 flex flex-col items-center">
            <div className="text-2xl mb-0.5">🔥</div>
            <span className="text-xl font-bold text-rz-gold">{user.streak}</span>
            <span className="text-[10px] text-rz-text-muted">Streak</span>
          </div>

          <div className="rounded-2xl bg-rz-surface border border-rz-border p-3 flex flex-col items-center">
            <ProgressRing progress={dailyGoal} size={48} strokeWidth={4}>
              <span className="text-[10px] font-bold text-rz-primary">
                {Math.round(dailyGoal * 100)}%
              </span>
            </ProgressRing>
            <span className="text-[10px] text-rz-text-muted mt-0.5">
              {lessonsToday}/{dailyGoalTarget}
            </span>
          </div>

          {daysUntilExam !== null ? (
            <div className="rounded-2xl bg-rz-surface border border-rz-border p-3 flex flex-col items-center">
              <div className="text-2xl mb-0.5">📅</div>
              <span className="text-xl font-bold text-rz-text">{daysUntilExam}</span>
              <span className="text-[10px] text-rz-text-muted">Days Left</span>
            </div>
          ) : (
            <Link href="/leaderboard" className="rounded-2xl bg-rz-surface border border-rz-border p-3 flex flex-col items-center hover:border-rz-gold/40 active:scale-[0.97] transition-all">
              <span className="text-2xl mb-0.5">{league.icon}</span>
              <span className="text-xs font-bold" style={{ color: league.color }}>{league.name}</span>
              <span className="text-[10px] text-rz-text-muted">League</span>
            </Link>
          )}
        </div>

        {/* Review Due Banner */}
        {reviewsDue > 0 && (
          <div className="rounded-2xl bg-rz-primary/10 border border-rz-primary/30 p-4 flex items-center gap-3 animate-slide-up active:scale-[0.98] transition-all">
            <span className="text-2xl">🧠</span>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-rz-primary">
                {reviewsDue} review{reviewsDue !== 1 ? "s" : ""} due
              </h3>
              <p className="text-xs text-rz-text-muted">
                {weakNodeCount > 0
                  ? `${weakNodeCount} weak topic${weakNodeCount !== 1 ? "s" : ""} need attention`
                  : "Revise questions you got wrong to lock them in"}
              </p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rz-primary">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        )}

        {/* Continue Learning */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-medium text-rz-text-muted mb-2">
            Continue Learning
          </h2>
          {mockSubjects
            .filter((s) => s.progress > 0 || s.nodes.some((n) => n.status === "active"))
            .map((subject) => {
              const activeNode = subject.nodes.find((n) => n.status === "active");
              return (
                <Link key={subject.id} href={`/path/${subject.id}`} className="block mb-3">
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
                      <ProgressRing progress={subject.progress} size={44} strokeWidth={4}>
                        <span className="text-[10px] font-bold text-rz-primary">
                          {Math.round(subject.progress * 100)}%
                        </span>
                      </ProgressRing>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-rz-border overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${subject.progress * 100}%`, backgroundColor: subject.color }}
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
            <Link href="/exam/exam_math_2024_p1" className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center gap-2 hover:border-rz-primary/40 active:scale-[0.98] transition-all">
              <span className="text-2xl">📝</span>
              <span className="text-xs font-medium text-rz-text-muted">Mock Exam</span>
            </Link>
            <Link href="/leaderboard" className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center gap-2 hover:border-rz-gold/40 active:scale-[0.98] transition-all">
              <span className="text-2xl">🏆</span>
              <span className="text-xs font-medium text-rz-text-muted">Leaderboard</span>
            </Link>
            <Link href="/essay" className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center gap-2 hover:border-rz-primary/40 active:scale-[0.98] transition-all">
              <span className="text-2xl">✍️</span>
              <span className="text-xs font-medium text-rz-text-muted">Essay Grader</span>
            </Link>
            <Link href="/sbp" className="rounded-2xl bg-rz-surface border border-rz-border p-4 flex flex-col items-center gap-2 hover:border-rz-primary/40 active:scale-[0.98] transition-all">
              <span className="text-2xl">📋</span>
              <span className="text-xs font-medium text-rz-text-muted">SBP Tracker</span>
            </Link>
          </div>
        </div>

        {/* Upgrade Banner */}
        {!user.premium && (
          <Link href="/pay" className="block animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="rounded-2xl bg-gradient-to-r from-rz-gold/20 to-rz-primary/20 border border-rz-gold/30 p-4 flex items-center gap-3 hover:border-rz-gold/50 active:scale-[0.98] transition-all">
              <span className="text-2xl">👑</span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-rz-gold">Unlock All Content</h3>
                <p className="text-xs text-rz-text-muted">Ask your parent to upgrade via WhatsApp</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rz-gold">
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
