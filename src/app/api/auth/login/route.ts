import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { clientIp, rateLimit } from "@/lib/rate-limit";
import { setSessionCookie, signSession } from "@/lib/session";
import { findUserByPhone } from "@/lib/users";

function normalizePhone(raw: string): string {
  return raw.replace(/\s+/g, "").trim();
}

const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = rateLimit(`login:${ip}`, 30, 15 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many sign-in attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let body: { phone?: string; pin?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const phone = body.phone ? normalizePhone(body.phone) : "";
  const pin = typeof body.pin === "string" ? body.pin : "";

  if (!phone || !pin) {
    return NextResponse.json(
      { error: "Enter phone number and PIN." },
      { status: 400 }
    );
  }

  try {
    const user = await findUserByPhone(phone);
    const ok = user && (await bcrypt.compare(pin, user.pin_hash));
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid phone number or PIN." },
        { status: 401 }
      );
    }

    const token = await signSession(
      { sub: user!.id, phone: user!.phone },
      SESSION_MAX_AGE
    );
    await setSessionCookie(token, SESSION_MAX_AGE);

    return NextResponse.json({ ok: true, userId: user!.id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    if (msg.includes("DATABASE_URL") || msg.includes("AUTH_SECRET")) {
      return NextResponse.json(
        { error: "Server is not fully configured." },
        { status: 503 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Sign-in failed." }, { status: 500 });
  }
}
