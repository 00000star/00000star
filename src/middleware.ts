import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth-jwt";

const PUBLIC_PATHS = new Set<string>(["/", "/offline"]);
const PUBLIC_PREFIXES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/paynow/result",
];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icon-") ||
    pathname === "/manifest.json" ||
    pathname === "/sw.js" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  let session = null as Awaited<ReturnType<typeof verifySessionToken>>;
  try {
    session = token ? await verifySessionToken(token) : null;
  } catch {
    session = null;
  }

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/onboarding",
    "/onboarding/:path*",
    "/pay",
    "/pay/:path*",
    "/lesson/:path*",
    "/path/:path*",
    "/exam/:path*",
    "/essay/:path*",
    "/leaderboard/:path*",
    "/offline/:path*",
    "/sbp/:path*",
    "/api/auth/me",
    "/api/auth/logout",
    "/api/user/:path*",
    "/api/pay/mobile",
    "/api/pay/verify",
  ],
};
