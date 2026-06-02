import { NextResponse } from "next/server";

import { getPaymentOrderByReference, markOrderPaid } from "@/lib/payment-orders";
import { pollTransactionStatus } from "@/lib/paynow-server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getSessionFromCookies } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const ip = clientIp(request);
  const rl = rateLimit(`payvf:${ip}`, 120, 60 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let body: { reference?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const reference =
    typeof body.reference === "string" ? body.reference.trim() : "";
  if (!reference) {
    return NextResponse.json({ error: "Missing reference." }, { status: 400 });
  }

  try {
    const order = await getPaymentOrderByReference(reference);
    if (!order || order.user_id !== session.sub) {
      return NextResponse.json({ error: "Unknown payment." }, { status: 404 });
    }

    if (order.status === "paid") {
      return NextResponse.json({ status: "paid", premium: true });
    }

    if (!order.poll_url) {
      return NextResponse.json({ status: "pending", premium: false });
    }

    const polled = await pollTransactionStatus(order.poll_url);
    if (polled === "paid") {
      await markOrderPaid(reference, null);
      return NextResponse.json({ status: "paid", premium: true });
    }
    if (polled === "failed") {
      return NextResponse.json({ status: "failed", premium: false });
    }

    return NextResponse.json({ status: "pending", premium: false });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("DATABASE_URL")) {
      return NextResponse.json(
        { error: "Server is not fully configured." },
        { status: 503 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
