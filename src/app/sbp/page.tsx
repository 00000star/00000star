"use client";

import { useState } from "react";
import Link from "next/link";
import { mockSBPProjects } from "@/lib/mock-data";
import { BottomNav } from "@/components/ui/bottom-nav";
import { ProgressRing } from "@/components/ui/progress-ring";
import type { SBPStage, SBPTask } from "@/lib/types";

const STAGES: { key: SBPStage; label: string; color: string }[] = [
  { key: "ideation", label: "Ideation", color: "text-blue-400" },
  { key: "drafting", label: "Drafting", color: "text-purple-400" },
  { key: "data-collection", label: "Data Collection", color: "text-rz-gold" },
  { key: "final-submission", label: "Final Submission", color: "text-rz-primary" },
];

export default function SBPPage() {
  const project = mockSBPProjects[0];
  const [tasks, setTasks] = useState<SBPTask[]>(project.tasks);

  function toggleTask(taskId: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = completedCount / tasks.length;

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
            📋 SBP Tracker
          </h1>
          <p className="text-xs text-rz-text-muted">
            School-Based Project Portfolio
          </p>
        </div>
      </header>

      <div className="px-5 space-y-4">
        {/* Project Overview */}
        <div className="rounded-2xl bg-rz-surface border border-rz-border p-4 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-rz-text truncate">
                {project.title}
              </h2>
              <p className="text-xs text-rz-text-muted">
                {project.subject} &middot; Due{" "}
                {new Date(project.dueDate).toLocaleDateString("en-ZW", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <ProgressRing progress={progress} size={56} strokeWidth={5}>
              <span className="text-xs font-bold text-rz-primary">
                {Math.round(progress * 100)}%
              </span>
            </ProgressRing>
          </div>
          <div className="w-full h-1.5 rounded-full bg-rz-border overflow-hidden">
            <div
              className="h-full rounded-full bg-rz-primary transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-rz-text-dim mt-2">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>

        {/* Kanban Columns */}
        {STAGES.map((stage, sIdx) => {
          const stageTasks = tasks.filter((t) => t.stage === stage.key);
          const stageCompleted = stageTasks.filter((t) => t.completed).length;
          return (
            <div
              key={stage.key}
              className="animate-slide-up"
              style={{ animationDelay: `${sIdx * 0.08}s` }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3
                  className={`text-sm font-semibold ${stage.color}`}
                >
                  {stage.label}
                </h3>
                <span className="text-[11px] text-rz-text-dim">
                  {stageCompleted}/{stageTasks.length}
                </span>
              </div>
              <div className="space-y-2">
                {stageTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="w-full rounded-xl bg-rz-surface border border-rz-border p-3 flex items-center gap-3 hover:border-rz-primary/30 active:scale-[0.98] transition-all text-left"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                        task.completed
                          ? "bg-rz-primary border-rz-primary"
                          : "border-rz-border"
                      }`}
                    >
                      {task.completed && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm ${
                          task.completed
                            ? "text-rz-text-dim line-through"
                            : "text-rz-text"
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.notes && (
                        <p className="text-[11px] text-rz-text-dim mt-0.5">
                          {task.notes}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </main>
  );
}
