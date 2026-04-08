"use client";

import { useState, useEffect } from "react";
import { detectDeviceProfile, getBatteryLevel, shouldUseLowFidelity } from "@/lib/device";
import type { DeviceProfile } from "@/lib/types";

export function useDeviceProfile() {
  const [profile, setProfile] = useState<DeviceProfile>(() =>
    detectDeviceProfile()
  );

  useEffect(() => {
    const detected = detectDeviceProfile();

    getBatteryLevel().then((batteryPct) => {
      const updated = { ...detected, batteryPct };
      updated.lowEnd = updated.ramGB <= 2 || batteryPct < 20;
      setProfile(updated);
    });
  }, []);

  return {
    profile,
    lowFidelity: shouldUseLowFidelity(profile),
  };
}
