/**
 * SM-2-inspired spaced repetition engine.
 * Tracks per-question performance and schedules reviews at expanding intervals.
 */

export interface ReviewCard {
  questionId: string;
  nodeId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: string;
  lastAnswer: "correct" | "incorrect";
}

const SR_KEY = "nhaka_sr_cards";

export function loadCards(): ReviewCard[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SR_KEY) ?? "[]") as ReviewCard[];
  } catch {
    return [];
  }
}

function saveCards(cards: ReviewCard[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(SR_KEY, JSON.stringify(cards));
}

export function recordAnswer(
  questionId: string,
  nodeId: string,
  correct: boolean
): void {
  const cards = loadCards();
  const idx = cards.findIndex((c) => c.questionId === questionId);
  const now = new Date().toISOString();

  if (idx === -1) {
    cards.push({
      questionId,
      nodeId,
      easeFactor: correct ? 2.5 : 1.3,
      interval: correct ? 1 : 0,
      repetitions: correct ? 1 : 0,
      nextReview: correct
        ? addDays(now, 1)
        : now,
      lastAnswer: correct ? "correct" : "incorrect",
    });
  } else {
    const card = cards[idx];
    if (correct) {
      card.repetitions += 1;
      if (card.repetitions === 1) {
        card.interval = 1;
      } else if (card.repetitions === 2) {
        card.interval = 3;
      } else {
        card.interval = Math.round(card.interval * card.easeFactor);
      }
      card.easeFactor = Math.max(
        1.3,
        card.easeFactor + 0.1 - 0.08 + 0.02
      );
      card.nextReview = addDays(now, card.interval);
      card.lastAnswer = "correct";
    } else {
      card.repetitions = 0;
      card.interval = 0;
      card.easeFactor = Math.max(1.3, card.easeFactor - 0.2);
      card.nextReview = now;
      card.lastAnswer = "incorrect";
    }
  }

  saveCards(cards);
}

export function getDueCards(nodeId?: string): ReviewCard[] {
  const cards = loadCards();
  const now = new Date().toISOString();
  return cards.filter(
    (c) =>
      c.nextReview <= now &&
      (!nodeId || c.nodeId === nodeId)
  );
}

export function getWeakNodes(): { nodeId: string; incorrectCount: number }[] {
  const cards = loadCards();
  const nodeMap: Record<string, number> = {};
  for (const card of cards) {
    if (card.lastAnswer === "incorrect") {
      nodeMap[card.nodeId] = (nodeMap[card.nodeId] ?? 0) + 1;
    }
  }
  return Object.entries(nodeMap)
    .map(([nodeId, incorrectCount]) => ({ nodeId, incorrectCount }))
    .sort((a, b) => b.incorrectCount - a.incorrectCount);
}

export function getNodeAccuracy(nodeId: string): number {
  const cards = loadCards().filter((c) => c.nodeId === nodeId);
  if (cards.length === 0) return 0;
  const correct = cards.filter((c) => c.lastAnswer === "correct").length;
  return Math.round((correct / cards.length) * 100);
}

export function getTotalReviewsDue(): number {
  return getDueCards().length;
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}
