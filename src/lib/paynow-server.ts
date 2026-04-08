import { InitResponse, Paynow } from "paynow";

import { MERCHANT_CONFIG } from "@/lib/payments";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v.trim();
}

function paynowAuthEmailForReference(reference: string): string {
  const safe = reference.replace(/[^\w]/g, "_").slice(0, 60) || "txn";
  return `pay.${safe}@nhaka.co.zw`;
}

/**
 * Server-only Paynow client. Credentials must never be exposed to the browser.
 */
export function createPaynowClient(): Paynow {
  const integrationId = requireEnv("PAYNOW_INTEGRATION_ID");
  const integrationKey = requireEnv("PAYNOW_INTEGRATION_KEY");
  const resultUrl =
    process.env.PAYNOW_RESULT_URL?.trim() || MERCHANT_CONFIG.resultUrl;
  const returnUrl =
    process.env.PAYNOW_RETURN_URL?.trim() || MERCHANT_CONFIG.returnUrl;

  return new Paynow(integrationId, integrationKey, resultUrl, returnUrl);
}

export type MobilePayMethod = "ecocash" | "innbucks";

export interface InitiateMobilePaymentInput {
  reference: string;
  amountUsd: number;
  phone: string;
  method: MobilePayMethod;
  /** Paynow requires an email on mobile init; optional override. */
  authEmail?: string;
  lineTitle?: string;
}

export interface InitiateMobilePaymentResult {
  success: boolean;
  pollUrl?: string;
  instructions?: string;
  redirectUrl?: string;
  error?: string;
  innbucks?: {
    authorizationCode?: string;
    deepLinkUrl?: string;
    qrCode?: string;
    expiresAt?: string;
  };
}

export async function initiateMobilePayment(
  input: InitiateMobilePaymentInput
): Promise<InitiateMobilePaymentResult> {
  const paynow = createPaynowClient();
  const authEmail =
    input.authEmail?.trim() ||
    paynowAuthEmailForReference(input.reference);

  if (!paynow.isValidEmail(authEmail)) {
    return { success: false, error: "Invalid email for payment initiation." };
  }

  const payment = paynow.createPayment(input.reference, authEmail);
  payment.add(input.lineTitle ?? "Nhaka Premium", input.amountUsd);

  const methodParam =
    input.method === "innbucks" ? "innbucks" : input.method;

  const raw = await paynow.sendMobile(
    payment,
    input.phone.trim(),
    methodParam
  );

  if (!raw) {
    return {
      success: false,
      error: "No response from payment gateway. Try again shortly.",
    };
  }

  const response = raw as InitResponse;

  if (!response.success) {
    return {
      success: false,
      error: String(response.error ?? "Payment initiation failed."),
    };
  }

  const out: InitiateMobilePaymentResult = {
    success: true,
    pollUrl: response.pollUrl ? String(response.pollUrl) : undefined,
    instructions: response.instructions
      ? String(response.instructions)
      : undefined,
    redirectUrl: response.redirectUrl
      ? String(response.redirectUrl)
      : undefined,
  };

  if (response.isInnbucks && response.innbucks_info?.[0]) {
    const info = response.innbucks_info[0] as Record<string, string>;
    out.innbucks = {
      authorizationCode: info.authorizationcode,
      deepLinkUrl: info.deep_link_url,
      qrCode: info.qr_code,
      expiresAt: info.expires_at,
    };
  }

  return out;
}
