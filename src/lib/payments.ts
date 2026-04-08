/**
 * Paynow Zimbabwe payment integration.
 *
 * Supports: EcoCash, InnBucks, OneMoney, O'mari, Visa/MC, ZimSwitch
 * Merchant EcoCash: 0785378845
 *
 * In production, payment initiation MUST happen server-side to protect
 * the integration key. This client-side module handles the UI flow;
 * actual API calls should go through /api/pay route.
 */

export type PaymentMethod = "ecocash" | "innbucks" | "onemoney" | "vmc";

export interface PaymentRequest {
  plan: "monthly" | "termly" | "yearly";
  amount: number;
  currency: "USD" | "ZWL";
  method: PaymentMethod;
  phone: string;
  studentId: string;
  reference: string;
}

export interface PaymentResult {
  success: boolean;
  pollUrl?: string;
  redirectUrl?: string;
  authCode?: string;
  error?: string;
}

export const MERCHANT_CONFIG = {
  number: "0785378845",
  resultUrl: "https://nhaka.co.zw/api/paynow/result",
  returnUrl: "https://nhaka.co.zw/pay/success",
} as const;

/**
 * Generate a unique payment reference.
 */
export function generateReference(studentId: string, plan: string): string {
  const ts = Date.now().toString(36);
  return `nhaka_${studentId}_${plan}_${ts}`;
}

/**
 * Generate a WhatsApp deep link for parent billing.
 * The message includes the merchant EcoCash number and a payment link.
 */
export function generateWhatsAppLink(
  studentName: string,
  plan: { label: string; usd: number; id: string },
  studentId: string
): string {
  const ref = generateReference(studentId, plan.id);
  const message = [
    `Hi! I'm ${studentName}'s parent.`,
    `I'd like to upgrade their Nhaka account to the ${plan.label} plan ($${plan.usd} USD).`,
    ``,
    `Please send $${plan.usd} to:`,
    `EcoCash: ${MERCHANT_CONFIG.number}`,
    `Reference: ${ref}`,
    ``,
    `Or pay online: https://nhaka.co.zw/checkout/${plan.id}?ref=${ref}`,
  ].join("\n");

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/**
 * Server-side payment initiation (stub).
 *
 * In production, this would be an API route that calls:
 *   const { Paynow } = require("paynow");
 *   const paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
 *   paynow.resultUrl = MERCHANT_CONFIG.resultUrl;
 *   paynow.returnUrl = MERCHANT_CONFIG.returnUrl;
 *   const payment = paynow.createPayment(reference, email);
 *   payment.add("Nhaka Premium", amount);
 *   const response = await paynow.sendMobile(payment, phone, method);
 */
export async function initiatePayment(
  _request: PaymentRequest
): Promise<PaymentResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        pollUrl: "https://paynow.co.zw/poll/mock",
        authCode: _request.method === "innbucks" ? "INB-" + Math.random().toString(36).slice(2, 8).toUpperCase() : undefined,
      });
    }, 2000);
  });
}
