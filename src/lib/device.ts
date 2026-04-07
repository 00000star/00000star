import type { DeviceProfile } from "./types";

export function detectDeviceProfile(): DeviceProfile {
  if (typeof window === "undefined") {
    return { ramGB: 4, batteryPct: 100, lowEnd: false, darkMode: true };
  }

  const nav = navigator as Navigator & { deviceMemory?: number };
  const ramGB = nav.deviceMemory ?? 4;

  const darkMode =
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;

  return {
    ramGB,
    batteryPct: 100,
    lowEnd: ramGB <= 2,
    darkMode,
  };
}

export async function getBatteryLevel(): Promise<number> {
  if (typeof navigator === "undefined") return 100;
  try {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{ level: number; charging: boolean }>;
    };
    if (nav.getBattery) {
      const battery = await nav.getBattery();
      return Math.round(battery.level * 100);
    }
  } catch {
    // Battery API not available
  }
  return 100;
}

export function shouldUseLowFidelity(profile: DeviceProfile): boolean {
  return profile.lowEnd || profile.batteryPct < 20;
}
