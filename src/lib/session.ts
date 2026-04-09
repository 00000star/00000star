import { cookies } from "next/headers";

import {
  SESSION_COOKIE_NAME,
  signSession,
  verifySessionToken,
  type SessionPayload,
} from "@/lib/auth-jwt";

export type { SessionPayload };
export { signSession, verifySessionToken };

export async function setSessionCookie(token: string, maxAgeSec: number) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSec,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE_NAME);
}

export async function getSessionFromCookies(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export { SESSION_COOKIE_NAME };
