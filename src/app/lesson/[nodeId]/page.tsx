"use client";

import { use, useState } from "react";
import Link from "next/link";
import { mockLessons } from "@/lib/mock-data";
import { Latex } from "@/components/ui/latex";
import { appendEvent } from "@/lib/store";

export default function LessonPage({
  params,
}: {
  params: Promise<{ nodeId: string }>;
}) {
  const { nodeId } = use(params);
  const lessons = mockLessons[nodeId] ?? mockLessons["n3"];
  const lesson = lessons[0];

  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);
  const totalQuestions = lessons.length;
  const progress = (questionIdx + 1) / totalQuestions;

  const currentLesson = lessons[questionIdx] ?? lesson;
  const isCorrect = selected === currentLesson.correctIndex;

  function handleCheck() {
    if (selected === null) return;
    setChecked(true);
    appendEvent({
      type: "lesson_answered",
      payload: {
        nodeId,
        lessonId: currentLesson.id,
        selected,
        correct: selected === currentLesson.correctIndex,
      },
    });
  }

  function handleNext() {
    setSelected(null);
    setChecked(false);
    if (questionIdx < totalQuestions - 1) {
      setQuestionIdx((q) => q + 1);
    }
  }

  const subjectId = nodeId.startsWith("p")
    ? "phys-o"
    : nodeId.startsWith("h")
    ? "hist-o"
    : nodeId.startsWith("c")
    ? "chem-o"
    : "math-o";

  return (
    <main className="min-h-dvh bg-rz-bg flex flex-col">
      {/* Top Bar */}
      <header className="px-5 pt-4 pb-2 flex items-center gap-3">
        <Link
          href={`/path/${subjectId}`}
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Link>
        <div className="flex-1 h-2.5 rounded-full bg-rz-border overflow-hidden">
          <div
            className="h-full rounded-full bg-rz-primary transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="text-xs text-rz-text-muted font-medium">
          {questionIdx + 1}/{totalQuestions}
        </span>
      </header>

      {/* Question Area */}
      <div className="flex-1 px-5 py-6 flex flex-col">
        <div className="animate-slide-up">
          <p className="text-sm text-rz-text-muted mb-2">
            {currentLesson.title}
          </p>
          <h2 className="text-lg font-semibold text-rz-text mb-1">
            {currentLesson.questionText}
          </h2>
          {currentLesson.questionLatex && (
            <div className="my-4 p-4 rounded-xl bg-rz-surface border border-rz-border flex justify-center">
              <Latex math={currentLesson.questionLatex} display className="text-xl text-rz-text" />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="mt-4 space-y-3 flex-1">
          {currentLesson.options.map((option, idx) => {
            let optionStyle = "border-rz-border bg-rz-surface";
            if (checked && idx === currentLesson.correctIndex) {
              optionStyle = "border-green-500 bg-green-500/10";
            } else if (checked && idx === selected && !isCorrect) {
              optionStyle = "border-rz-danger bg-rz-danger/10";
            } else if (selected === idx) {
              optionStyle = "border-rz-gold bg-rz-gold/10";
            }

            return (
              <button
                key={idx}
                onClick={() => !checked && setSelected(idx)}
                disabled={checked}
                className={`w-full rounded-xl border-2 ${optionStyle} p-4 text-left transition-all active:scale-[0.98] disabled:cursor-default`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 text-sm font-bold ${
                      selected === idx
                        ? "border-rz-gold text-rz-gold"
                        : "border-rz-border text-rz-text-dim"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span
                    className={`text-sm ${
                      selected === idx
                        ? "text-rz-text font-medium"
                        : "text-rz-text-muted"
                    }`}
                  >
                    {option.latex ? (
                      <Latex math={option.latex} />
                    ) : (
                      option.text
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {checked && (
          <div
            className={`mt-4 p-4 rounded-xl animate-slide-up ${
              isCorrect
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-rz-danger/10 border border-rz-danger/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">
                {isCorrect ? "🎉" : "💡"}
              </span>
              <span
                className={`font-semibold text-sm ${
                  isCorrect ? "text-green-400" : "text-rz-danger"
                }`}
              >
                {isCorrect
                  ? `Correct! +${currentLesson.xpReward} XP`
                  : "Not quite!"}
              </span>
            </div>
            <p className="text-xs text-rz-text-muted">
              {currentLesson.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="px-5 pb-8 pt-2">
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
            className="w-full rounded-xl bg-rz-primary py-3.5 font-semibold text-rz-bg text-base hover:bg-rz-primary-dim active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check
          </button>
        ) : (
          <button
            onClick={
              questionIdx < totalQuestions - 1
                ? handleNext
                : () => window.location.assign(`/path/${subjectId}`)
            }
            className="w-full rounded-xl bg-rz-gold py-3.5 font-semibold text-rz-bg text-base hover:bg-rz-gold-dim active:scale-[0.98] transition-all"
          >
            {questionIdx < totalQuestions - 1 ? "Continue" : "Finish Lesson"}
          </button>
        )}
      </div>
    </main>
  );
}
