import { NextResponse } from "next/server";

import { getSessionFromCookies } from "@/lib/session";
import type { OnboardingData } from "@/lib/store";
import { updateOnboarding } from "@/lib/users";

export async function PATCH(request: Request) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const d = body as Partial<OnboardingData>;
  if (
    typeof d.name !== "string" ||
    (d.level !== "O-Level" && d.level !== "A-Level") ||
    !Array.isArray(d.subjects) ||
    typeof d.examDate !== "string" ||
    typeof d.dailyGoal !== "number" ||
    typeof d.reminderTime !== "string" ||
    d.completed !== true
  ) {
    return NextResponse.json({ error: "Invalid onboarding payload." }, { status: 400 });
  }

  const data: OnboardingData = {
    completed: true,
    name: d.name.slice(0, 120),
    level: d.level,
    subjects: d.subjects.map((s) => String(s).slice(0, 64)).slice(0, 32),
    examDate: d.examDate.slice(0, 32),
    dailyGoal: Math.min(50, Math.max(1, Math.floor(d.dailyGoal))),
    reminderTime: d.reminderTime.slice(0, 8),
  };

  try {
    await updateOnboarding(session.sub, data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("DATABASE_URL")) {
      return NextResponse.json(
        { error: "Server is not fully configured." },
        { status: 503 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}
