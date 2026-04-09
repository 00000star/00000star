import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "nhaka_session";

function getSecret(): Uint8Array {
  const raw = process.env.AUTH_SECRET?.trim();
  if (!raw || raw.length < 32) {
    throw new Error(
      "AUTH_SECRET must be set and at least 32 characters (use openssl rand -hex 32)"
    );
  }
  return new TextEncoder().encode(raw);
}

function secretBytesOrNull(): Uint8Array | null {
  const raw = process.env.AUTH_SECRET?.trim();
  if (!raw || raw.length < 32) return null;
  return new TextEncoder().encode(raw);
}

export interface SessionPayload {
  sub: string;
  phone: string;
}

export async function signSession(payload: SessionPayload, maxAgeSec: number) {
  const token = await new SignJWT({ phone: payload.phone })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${maxAgeSec}s`)
    .sign(getSecret());

  return token;
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  const secret = secretBytesOrNull();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    const sub = payload.sub;
    const phone = payload.phone;
    if (typeof sub !== "string" || typeof phone !== "string") return null;
    return { sub, phone };
  } catch {
    return null;
  }
}
