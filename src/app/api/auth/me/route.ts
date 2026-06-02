import { NextResponse } from "next/server";

import { getSessionFromCookies } from "@/lib/session";
import { findUserById } from "@/lib/users";

export async function GET() {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const row = await findUserById(session.sub);
    if (!row) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: row.id,
        phone: row.phone,
        name: row.name,
        level: row.level,
        premium: row.premium,
        xp: row.xp,
        streak: row.streak,
        lastActiveDate: row.last_active_date,
        onboarding: row.onboarding,
        createdAt: row.created_at.toISOString().slice(0, 10),
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("DATABASE_URL")) {
      return NextResponse.json(
        { error: "Server is not fully configured." },
        { status: 503 }
      );
    }
    throw e;
  }
}
