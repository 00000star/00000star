import { NextResponse } from "next/server";

import { initiateMobilePayment } from "@/lib/paynow-server";
import {
  PLAN_USD,
  type PlanId,
  generateReference,
  type PaymentMethod,
} from "@/lib/payments";

const ALLOWED_METHODS: PaymentMethod[] = ["ecocash", "innbucks"];

function normalizePhone(raw: string): string {
  return raw.replace(/\s+/g, "").trim();
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { plan, method, phone, studentId, reference: clientRef } = body as {
    plan?: string;
    method?: string;
    phone?: string;
    studentId?: string;
    reference?: string;
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
  const sid = (studentId && String(studentId).trim()) || "guest";
  const reference =
    clientRef && String(clientRef).trim().length > 0
      ? String(clientRef).trim().slice(0, 120)
      : generateReference(sid, plan);

  try {
    const result = await initiateMobilePayment({
      reference,
      amountUsd,
      phone: phoneNorm,
      method: method as "ecocash" | "innbucks",
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error ?? "Payment failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      reference,
      pollUrl: result.pollUrl,
      instructions: result.instructions,
      redirectUrl: result.redirectUrl,
      innbucks: result.innbucks,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Configuration error.";
    const missingCreds =
      message.includes("PAYNOW_INTEGRATION_ID") ||
      message.includes("PAYNOW_INTEGRATION_KEY");
    return NextResponse.json(
      {
        error: missingCreds
          ? "Payments are not configured on this server."
          : message,
      },
      { status: missingCreds ? 503 : 500 }
    );
  }
}
