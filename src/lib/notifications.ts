/**
 * Push notification registration and smart reminder scheduling.
 * Falls back to in-app reminders if Notification API is denied.
 */

const NOTIF_KEY = "ruzivo_notif_prefs";

export interface NotificationPrefs {
  enabled: boolean;
  reminderTime: string;
  streakAlerts: boolean;
  weeklyReport: boolean;
  lastNotified: string | null;
}

const DEFAULT_PREFS: NotificationPrefs = {
  enabled: false,
  reminderTime: "17:00",
  streakAlerts: true,
  weeklyReport: true,
  lastNotified: null,
};

export function loadNotifPrefs(): NotificationPrefs {
  if (typeof localStorage === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(NOTIF_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function saveNotifPrefs(prefs: NotificationPrefs): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(NOTIF_KEY, JSON.stringify(prefs));
}

export async function requestPermission(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

export function scheduleReminder(prefs: NotificationPrefs): void {
  if (!prefs.enabled) return;
  if (typeof window === "undefined") return;

  const [hours, minutes] = prefs.reminderTime.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  setTimeout(() => {
    showNotification(
      "Time to learn!",
      "Your daily lesson is waiting. Keep your streak alive! 🔥"
    );
    prefs.lastNotified = new Date().toISOString();
    saveNotifPrefs(prefs);
  }, Math.min(delay, 2147483647));
}

export function showNotification(title: string, body: string): void {
  if (typeof window === "undefined") return;
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  new Notification(title, {
    body,
    icon: "/icon-192.svg",
    badge: "/icon-192.svg",
    tag: "ruzivo-reminder",
  });
}

export function checkStreakReminder(
  streak: number,
  lastActiveDate: string
): string | null {
  const today = new Date().toISOString().split("T")[0];
  if (lastActiveDate === today) return null;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (lastActiveDate === yesterdayStr && streak > 0) {
    return `Your ${streak}-day streak is at risk! Complete a lesson to keep it alive. 🔥`;
  }
  if (lastActiveDate < yesterdayStr && streak > 0) {
    return `You lost your ${streak}-day streak. Start a new one today!`;
  }
  return null;
}
