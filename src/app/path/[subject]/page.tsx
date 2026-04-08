"use client";

import { use } from "react";
import Link from "next/link";
import { mockSubjects, mockUser } from "@/lib/mock-data";
import { BottomNav } from "@/components/ui/bottom-nav";
import { XPBadge } from "@/components/ui/xp-badge";

export default function SubjectPathPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = use(params);
  const subject = mockSubjects.find((s) => s.id === subjectId) ?? mockSubjects[0];

  return (
    <main className="min-h-dvh bg-rz-bg pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-9 h-9 rounded-full bg-rz-surface border border-rz-border flex items-center justify-center text-rz-text-muted hover:bg-rz-surface-light transition"
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
            <h1 className="text-lg font-semibold text-rz-text flex items-center gap-2">
              <span>{subject.icon}</span>
              {subject.name}
            </h1>
            <p className="text-xs text-rz-text-muted">{subject.level}</p>
          </div>
        </div>
        <XPBadge xp={mockUser.xp} size="sm" />
      </header>

      {/* Progression Path */}
      <div className="px-5 py-4">
        <div className="relative flex flex-col items-center">
          {subject.nodes.map((node, idx) => {
            const isLast = idx === subject.nodes.length - 1;
            const nodeColor =
              node.status === "completed"
                ? "bg-rz-primary"
                : node.status === "active"
                ? "bg-rz-gold"
                : "bg-rz-border";
            const borderColor =
              node.status === "completed"
                ? "border-rz-primary"
                : node.status === "active"
                ? "border-rz-gold"
                : "border-rz-border";
            const textColor =
              node.status === "locked"
                ? "text-rz-text-dim/40"
                : "text-rz-text";

            const offset = idx % 2 === 0 ? "-translate-x-8" : "translate-x-8";

            return (
              <div key={node.id} className="flex flex-col items-center">
                {/* Connector */}
                {idx > 0 && (
                  <div
                    className={`w-0.5 h-8 ${
                      node.status !== "locked"
                        ? "bg-rz-primary/50"
                        : "bg-rz-border/50"
                    }`}
                  />
                )}

                {/* Node */}
                <div className={`${offset} animate-slide-up`} style={{ animationDelay: `${idx * 0.08}s` }}>
                  {node.status === "active" ? (
                    <Link href={`/lesson/${node.id}`}>
                      <div
                        className={`w-[220px] rounded-2xl border-2 ${borderColor} bg-rz-surface p-4 animate-pulse-glow cursor-pointer active:scale-[0.97] transition-transform`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-full ${nodeColor} flex items-center justify-center text-rz-bg font-bold text-lg shrink-0`}
                          >
                            {node.order}
                          </div>
                          <div className="min-w-0">
                            <h3 className={`font-semibold text-sm ${textColor} truncate`}>
                              {node.title}
                            </h3>
                            <p className="text-[11px] text-rz-text-muted truncate">
                              {node.description}
                            </p>
                            <p className="text-[10px] text-rz-gold mt-1">
                              {node.completedLessons}/{node.lessonCount} lessons
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className={`w-[220px] rounded-2xl border ${borderColor} bg-rz-surface p-4 ${
                        node.status === "locked"
                          ? "opacity-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full ${nodeColor} flex items-center justify-center shrink-0`}
                        >
                          {node.status === "completed" ? (
                            <div className="flex flex-col items-center">
                              <span className="text-rz-bg font-bold text-sm">
                                {node.order}
                              </span>
                              <div className="flex gap-0.5 -mt-0.5">
                                {Array.from({ length: node.stars }).map(
                                  (_, i) => (
                                    <svg
                                      key={i}
                                      width="8"
                                      height="8"
                                      viewBox="0 0 24 24"
                                      fill="#0a1a0f"
                                    >
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                  )
                                )}
                              </div>
                            </div>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-rz-text-dim/40"
                            >
                              <rect
                                x="3"
                                y="11"
                                width="18"
                                height="11"
                                rx="2"
                              />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className={`font-semibold text-sm ${textColor} truncate`}>
                            {node.title}
                          </h3>
                          <p
                            className={`text-[11px] ${
                              node.status === "locked"
                                ? "text-rz-text-dim/30"
                                : "text-rz-text-muted"
                            } truncate`}
                          >
                            {node.description}
                          </p>
                          {node.status === "completed" && (
                            <p className="text-[10px] text-rz-primary mt-1">
                              +{node.xpReward} XP earned
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mock Exam unlock after last completed */}
                {isLast && (
                  <div className="flex flex-col items-center mt-2">
                    <div className="w-0.5 h-8 bg-rz-border/30" />
                    <div className="rounded-2xl border border-dashed border-rz-gold/40 bg-rz-surface p-4 w-[220px] flex items-center gap-3 opacity-60">
                      <div className="w-12 h-12 rounded-full bg-rz-gold/20 flex items-center justify-center">
                        <span className="text-xl">🏆</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-rz-gold">
                          Mock Exam
                        </h3>
                        <p className="text-[11px] text-rz-text-dim">
                          Complete all nodes to unlock
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
