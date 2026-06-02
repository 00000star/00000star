import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { clientIp, rateLimit } from "@/lib/rate-limit";
import { setSessionCookie, signSession } from "@/lib/session";
import { createUser, findUserByPhone } from "@/lib/users";

function normalizePhone(raw: string): string {
  return raw.replace(/\s+/g, "").trim();
}

const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = rateLimit(`reg:${ip}`, 10, 60 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
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

  if (!phone || phone.length < 9) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }
  if (pin.length < 4 || pin.length > 8 || !/^\d+$/.test(pin)) {
    return NextResponse.json(
      { error: "PIN must be 4–8 digits." },
      { status: 400 }
    );
  }

  try {
    const existing = await findUserByPhone(phone);
    if (existing) {
      return NextResponse.json(
        { error: "That number is already registered. Sign in instead." },
        { status: 409 }
      );
    }

    const pinHash = await bcrypt.hash(pin, 12);
    const user = await createUser(phone, pinHash);
    const token = await signSession(
      { sub: user.id, phone: user.phone },
      SESSION_MAX_AGE
    );
    await setSessionCookie(token, SESSION_MAX_AGE);

    return NextResponse.json({ ok: true, userId: user.id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    if (msg.includes("DATABASE_URL") || msg.includes("AUTH_SECRET")) {
      return NextResponse.json(
        { error: "Server is not fully configured." },
        { status: 503 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Could not create account." }, { status: 500 });
  }
}
