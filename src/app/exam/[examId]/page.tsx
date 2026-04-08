"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { mockExam } from "@/lib/mock-data";
import { Latex } from "@/components/ui/latex";
import { appendEvent } from "@/lib/store";

export default function ExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = use(params);
  const exam = examId === mockExam.id ? mockExam : mockExam;

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0) {
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  const question = exam.questions[currentQ];
  const isLow = timeLeft < 300;

  function selectAnswer(idx: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: idx }));
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  }

  function handleSubmit() {
    setSubmitted(true);
    appendEvent({
      type: "exam_submitted",
      payload: { examId, answers, flagged: Array.from(flagged) },
    });
  }

  if (submitted) {
    const correct = exam.questions.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const totalMarks = exam.questions.reduce((a, q) => a + q.marks, 0);
    const earned = exam.questions
      .filter((q) => answers[q.id] === q.correctIndex)
      .reduce((a, q) => a + q.marks, 0);

    return (
      <main className="min-h-dvh bg-rz-bg flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm animate-slide-up">
          <div className="text-center mb-6">
            <span className="text-5xl mb-4 block">📊</span>
            <h1 className="text-xl font-bold text-rz-text">Exam Complete</h1>
            <p className="text-sm text-rz-text-muted mt-1">
              {exam.title} ({exam.year})
            </p>
          </div>
          <div className="rounded-2xl bg-rz-surface border border-rz-border p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-rz-text-muted">Questions Correct</span>
              <span className="font-semibold text-rz-primary">
                {correct}/{exam.questions.length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-rz-text-muted">Marks Earned</span>
              <span className="font-semibold text-rz-gold">
                {earned}/{totalMarks}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-rz-text-muted">Percentage</span>
              <span className="font-bold text-lg text-rz-text">
                {totalMarks > 0 ? Math.round((earned / totalMarks) * 100) : 0}%
              </span>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="mt-6 block w-full rounded-xl bg-rz-primary py-3 text-center font-semibold text-rz-bg hover:bg-rz-primary-dim active:scale-[0.98] transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-rz-bg flex flex-col">
      {/* Header */}
      <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-rz-border">
        <div>
          <h1 className="text-sm font-semibold text-rz-text">{exam.title}</h1>
          <p className="text-[11px] text-rz-text-muted">
            Q{question.questionNumber} of {exam.questions.length} &middot;{" "}
            {question.marks} mark{question.marks > 1 ? "s" : ""}
          </p>
        </div>
        <div
          className={`px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${
            isLow
              ? "bg-rz-danger/20 text-rz-danger animate-pulse"
              : "bg-rz-surface text-rz-text"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </header>

      {/* Question */}
      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <div className="animate-fade-in">
          <p className="text-base text-rz-text leading-relaxed">
            {question.text}
          </p>

          {question.latex && (
            <div className="my-4 p-4 rounded-xl bg-rz-surface border border-rz-border flex justify-center">
              <Latex math={question.latex} display className="text-lg text-rz-text" />
            </div>
          )}

          {question.diagramSvg && (
            <div
              className="my-4 p-4 rounded-xl bg-white/5 border border-rz-border flex justify-center"
              dangerouslySetInnerHTML={{ __html: question.diagramSvg }}
            />
          )}

          {/* Options */}
          <div className="mt-6 space-y-3">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all active:scale-[0.98] ${
                  answers[question.id] === idx
                    ? "border-rz-primary bg-rz-primary/10"
                    : "border-rz-border bg-rz-surface hover:border-rz-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                      answers[question.id] === idx
                        ? "border-rz-primary bg-rz-primary text-rz-bg"
                        : "border-rz-border text-rz-text-dim"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-sm text-rz-text">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="px-5 pb-8 pt-3 border-t border-rz-border flex items-center gap-3">
        <button
          onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
          disabled={currentQ === 0}
          className="flex-1 rounded-xl border border-rz-border py-3 text-sm font-medium text-rz-text-muted hover:bg-rz-surface active:scale-[0.98] transition-all disabled:opacity-30"
        >
          Previous
        </button>
        <button
          onClick={toggleFlag}
          className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
            flagged.has(question.id)
              ? "border-rz-gold bg-rz-gold/10 text-rz-gold"
              : "border-rz-border text-rz-text-dim hover:bg-rz-surface"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={flagged.has(question.id) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
        </button>
        {currentQ < exam.questions.length - 1 ? (
          <button
            onClick={() =>
              setCurrentQ((q) => Math.min(exam.questions.length - 1, q + 1))
            }
            className="flex-1 rounded-xl bg-rz-primary py-3 text-sm font-semibold text-rz-bg hover:bg-rz-primary-dim active:scale-[0.98] transition-all"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-rz-gold py-3 text-sm font-semibold text-rz-bg hover:bg-rz-gold-dim active:scale-[0.98] transition-all"
          >
            Submit
          </button>
        )}
      </div>
    </main>
  );
}
