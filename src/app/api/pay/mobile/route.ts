import { NextResponse } from "next/server";

import {
  createPendingPaymentOrder,
  markPaymentOrderFailed,
  setPaymentOrderPollUrl,
} from "@/lib/payment-orders";
import { initiateMobilePayment } from "@/lib/paynow-server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  PLAN_USD,
  type PlanId,
  generateReference,
  type PaymentMethod,
} from "@/lib/payments";
import { getSessionFromCookies } from "@/lib/session";

const ALLOWED_METHODS: PaymentMethod[] = ["ecocash", "innbucks"];

function normalizePhone(raw: string): string {
  return raw.replace(/\s+/g, "").trim();
}

export async function POST(request: Request) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const ip = clientIp(request);
  const rlIp = rateLimit(`paymob:${ip}`, 20, 60 * 60 * 1000);
  if (!rlIp.ok) {
    return NextResponse.json(
      { error: "Too many payment attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rlIp.retryAfterSec) } }
    );
  }
  const rlUser = rateLimit(`paymob:user:${session.sub}`, 15, 60 * 60 * 1000);
  if (!rlUser.ok) {
    return NextResponse.json(
      { error: "Too many payment attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rlUser.retryAfterSec) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { plan, method, phone } = body as {
    plan?: string;
    method?: string;
    phone?: string;
  };

  if (!plan || !(plan in PLAN_USD)) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  if (!method || !ALLOWED_METHODS.includes(method as PaymentMethod)) {
    return NextResponse.json({ error: "Invalid payment method." }, { status: 400 });
  }

  const phoneNorm = phone ? normalizePhone(phone) : "";
  if (!phoneNorm || phoneNorm.length < 9) {
    return NextResponse.json(
      { error: "Enter a valid mobile number." },
      { status: 400 }
    );
  }

  const amountUsd = PLAN_USD[plan as PlanId];
  const reference = generateReference(session.sub, plan);

  try {
    try {
      await createPendingPaymentOrder(
        session.sub,
        reference,
        plan as PlanId,
        amountUsd
      );
    } catch (dup) {
      const code =
        dup && typeof dup === "object" && "code" in dup
          ? String((dup as { code: string }).code)
          : "";
      if (code === "23505") {
        return NextResponse.json(
          { error: "Duplicate payment request. Wait a moment and try again." },
          { status: 409 }
        );
      }
      throw dup;
    }

    let result;
    try {
      result = await initiateMobilePayment({
        reference,
        amountUsd,
        phone: phoneNorm,
        method: method as "ecocash" | "innbucks",
      });
    } catch (initErr) {
      await markPaymentOrderFailed(reference);
      throw initErr;
    }

    if (!result.success) {
      await markPaymentOrderFailed(reference);
      return NextResponse.json(
        { error: result.error ?? "Payment failed." },
        { status: 502 }
      );
    }

    await setPaymentOrderPollUrl(reference, result.pollUrl ?? null);

    return NextResponse.json({
      reference,
      instructions: result.instructions,
      redirectUrl: result.redirectUrl,
      innbucks: result.innbucks,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Configuration error.";
    const missingCreds =
      message.includes("PAYNOW_INTEGRATION_ID") ||
      message.includes("PAYNOW_INTEGRATION_KEY");
    const missingDb = message.includes("DATABASE_URL");
    return NextResponse.json(
      {
        error: missingCreds
          ? "Payments are not configured on this server."
          : missingDb
            ? "Payment records require a database."
            : message,
      },
      { status: missingCreds || missingDb ? 503 : 500 }
    );
  }
}
