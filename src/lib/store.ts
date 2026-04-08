import type { User, SyncEvent } from "./types";

const STORAGE_KEYS = {
  user: "nhaka_user",
  events: "nhaka_events",
  offlineData: "nhaka_offline",
  onboarding: "nhaka_onboarding",
} as const;

export interface OnboardingData {
  completed: boolean;
  name: string;
  level: "O-Level" | "A-Level";
  subjects: string[];
  examDate: string;
  dailyGoal: number;
  reminderTime: string;
}

export function saveOnboarding(data: OnboardingData): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.onboarding, JSON.stringify(data));
}

export function loadOnboarding(): OnboardingData | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.onboarding);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OnboardingData;
  } catch {
    return null;
  }
}

export function isOnboarded(): boolean {
  return loadOnboarding()?.completed === true;
}

export function saveUser(user: User): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

export function loadUser(): User | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.user);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function appendEvent(event: Omit<SyncEvent, "id" | "timestamp" | "synced">): void {
  if (typeof localStorage === "undefined") return;
  const events = loadEvents();
  const newEvent: SyncEvent = {
    ...event,
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    synced: false,
  };
  events.push(newEvent);
  localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
}

export function loadEvents(): SyncEvent[] {
  if (typeof localStorage === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEYS.events);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SyncEvent[];
  } catch {
    return [];
  }
}

export function getUnsyncedEvents(): SyncEvent[] {
  return loadEvents().filter((e) => !e.synced);
}

export function markEventsSynced(ids: string[]): void {
  const events = loadEvents();
  const idSet = new Set(ids);
  for (const event of events) {
    if (idSet.has(event.id)) {
      event.synced = true;
    }
  }
  localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
}

export function getStorageUsageMB(): number {
  if (typeof localStorage === "undefined") return 0;
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      total += (localStorage.getItem(key) ?? "").length;
    }
  }
  return Number((total / (1024 * 1024)).toFixed(1));
}
