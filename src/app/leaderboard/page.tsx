"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUser } from "@/lib/mock-data";
import { BottomNav } from "@/components/ui/bottom-nav";
import {
  generateMockLeaderboard,
  getLeague,
  getXPToNextLeague,
  LEAGUES,
} from "@/lib/leaderboard";

type Tab = "weekly" | "all-time";

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>("weekly");
  const entries = generateMockLeaderboard(mockUser.xp);
  const league = getLeague(mockUser.xp);
  const nextLeague = getXPToNextLeague(mockUser.xp);
  const currentUser = entries.find((e) => e.isCurrentUser);

  return (
    <main className="min-h-dvh bg-rz-bg pb-24">
      <header className="px-5 pt-6 pb-4 flex items-center gap-3">
        <Link
          href="/dashboard"
          className="w-9 h-9 rounded-full bg-rz-surface border border-rz-border flex items-center justify-center text-rz-text-muted"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-rz-text">
            🏆 Leaderboard
          </h1>
          <p className="text-xs text-rz-text-muted">
            Compete with students across Zimbabwe
          </p>
        </div>
      </header>

      <div className="px-5 space-y-4">
        {/* Current League */}
        <div className="rounded-2xl bg-rz-surface border border-rz-border p-4 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{league.icon}</span>
              <div>
                <h2 className="text-base font-bold text-rz-text">
                  {league.name} League
                </h2>
                {nextLeague && (
                  <p className="text-xs text-rz-text-muted">
                    {nextLeague.remaining.toLocaleString()} XP to {nextLeague.next.name}
                  </p>
                )}
              </div>
            </div>
            {currentUser && (
              <div className="text-right">
                <span className="text-2xl font-bold text-rz-gold">
                  #{currentUser.rank}
                </span>
                <p className="text-[11px] text-rz-text-dim">Your rank</p>
              </div>
            )}
          </div>
          {/* League progress */}
          {nextLeague && (
            <div className="w-full h-2 rounded-full bg-rz-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    ((mockUser.xp - getLeague(mockUser.xp).minXP) /
                      (nextLeague.next.minXP - getLeague(mockUser.xp).minXP)) *
                      100,
                    100
                  )}%`,
                  backgroundColor: league.color,
                }}
              />
            </div>
          )}
          {/* League chips */}
          <div className="flex gap-2 mt-3">
            {LEAGUES.map((l) => (
              <div
                key={l.type}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium ${
                  l.type === league.type
                    ? "bg-rz-gold/20 text-rz-gold"
                    : "bg-rz-border/50 text-rz-text-dim/50"
                }`}
              >
                <span>{l.icon}</span>
                {l.name}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-rz-surface border border-rz-border p-1 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          {(["weekly", "all-time"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t
                  ? "bg-rz-primary text-rz-bg"
                  : "text-rz-text-muted"
              }`}
            >
              {t === "weekly" ? "This Week" : "All Time"}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-3 py-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {[entries[1], entries[0], entries[2]].map((e, i) => {
            if (!e) return null;
            const podiumHeight = i === 1 ? "h-24" : i === 0 ? "h-20" : "h-16";
            const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
            const medalColor = rank === 1 ? "text-rz-gold" : rank === 2 ? "text-gray-300" : "text-amber-600";
            return (
              <div key={e.id} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-1 ${
                    e.isCurrentUser
                      ? "bg-gradient-to-br from-rz-primary to-rz-gold text-rz-bg ring-2 ring-rz-gold"
                      : "bg-rz-surface border border-rz-border text-rz-text-muted"
                  }`}
                >
                  {e.avatar}
                </div>
                <p className={`text-xs font-medium ${e.isCurrentUser ? "text-rz-primary" : "text-rz-text"} truncate max-w-[80px]`}>
                  {e.name}
                </p>
                <p className="text-[10px] text-rz-text-dim">{e.xp.toLocaleString()} XP</p>
                <div
                  className={`${podiumHeight} w-20 rounded-t-xl mt-1 flex items-start justify-center pt-2 ${
                    rank === 1 ? "bg-rz-gold/20" : rank === 2 ? "bg-gray-500/10" : "bg-amber-700/10"
                  }`}
                >
                  <span className={`text-lg font-bold ${medalColor}`}>
                    #{rank}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Rankings */}
        <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          {entries.slice(3).map((entry) => (
            <div
              key={entry.id}
              className={`rounded-xl p-3 flex items-center gap-3 ${
                entry.isCurrentUser
                  ? "bg-rz-primary/10 border border-rz-primary/30"
                  : "bg-rz-surface border border-rz-border"
              }`}
            >
              <span className="text-sm font-bold text-rz-text-dim w-7 text-center">
                {entry.rank}
              </span>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  entry.isCurrentUser
                    ? "bg-gradient-to-br from-rz-primary to-rz-gold text-rz-bg"
                    : "bg-rz-border text-rz-text-muted"
                }`}
              >
                {entry.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${entry.isCurrentUser ? "text-rz-primary" : "text-rz-text"}`}>
                  {entry.name}
                  {entry.isCurrentUser && (
                    <span className="text-[10px] ml-1 text-rz-primary">(you)</span>
                  )}
                </p>
                <p className="text-[11px] text-rz-text-dim">{entry.school}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-rz-gold">
                  {entry.xp.toLocaleString()}
                </p>
                <p className="text-[10px] text-rz-text-dim">
                  {entry.streak}🔥
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
