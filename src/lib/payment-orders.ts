import { getSql } from "@/lib/db";
import type { PlanId } from "@/lib/payments";

export interface PaymentOrderRow {
  id: string;
  reference: string;
  user_id: string;
  plan: string;
  amount_usd: string;
  status: string;
  poll_url: string | null;
  paynow_reference: string | null;
}

export async function createPendingPaymentOrder(
  userId: string,
  reference: string,
  plan: PlanId,
  amountUsd: number
): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO payment_orders (reference, user_id, plan, amount_usd, status, poll_url)
    VALUES (${reference}, ${userId}::uuid, ${plan}, ${amountUsd}, 'pending', NULL)
  `;
}

export async function setPaymentOrderPollUrl(
  reference: string,
  pollUrl: string | null
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE payment_orders SET poll_url = ${pollUrl}, updated_at = now()
    WHERE reference = ${reference}
  `;
}

export async function markPaymentOrderFailed(reference: string): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE payment_orders SET status = 'failed', updated_at = now()
    WHERE reference = ${reference} AND status = 'pending'
  `;
}

export async function getPaymentOrderByReference(
  reference: string
): Promise<PaymentOrderRow | null> {
  const sql = getSql();
  const rows = await sql<PaymentOrderRow[]>`
    SELECT id, reference, user_id::text AS user_id, plan,
           amount_usd::text AS amount_usd, status, poll_url, paynow_reference
    FROM payment_orders WHERE reference = ${reference} LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function markOrderPaid(
  reference: string,
  paynowReference: string | null
): Promise<boolean> {
  const sql = getSql();
  const rows = await sql<{ user_id: string }[]>`
    UPDATE payment_orders
    SET status = 'paid',
        paynow_reference = ${paynowReference},
        updated_at = now()
    WHERE reference = ${reference} AND status = 'pending'
    RETURNING user_id::text AS user_id
  `;
  const row = rows[0];
  if (!row) return false;
  await sql`
    UPDATE users SET premium = true, updated_at = now()
    WHERE id = ${row.user_id}::uuid
  `;
  return true;
}
