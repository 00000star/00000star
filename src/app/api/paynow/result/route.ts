import { NextResponse } from "next/server";

import { markOrderPaid } from "@/lib/payment-orders";
import { parsePaynowStatusUpdate } from "@/lib/paynow-server";

/**
 * Paynow server-to-server callback (result URL).
 * Paynow typically POSTs application/x-www-form-urlencoded or similar body.
 */
export async function POST(request: Request) {
  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return new NextResponse("bad request", { status: 400 });
  }

  if (!bodyText || bodyText.length === 0) {
    return new NextResponse("empty", { status: 400 });
  }

  try {
    const status = parsePaynowStatusUpdate(bodyText);
    const ref = status.reference ? String(status.reference) : "";
    const st = status.status ? String(status.status).toLowerCase() : "";
    const paynowRef = status.paynowReference
      ? String(status.paynowReference)
      : null;

    if (ref && (st === "paid" || st.includes("paid"))) {
      await markOrderPaid(ref, paynowRef);
    }
  } catch (e) {
    console.error("paynow result parse error", e);
    return new NextResponse("invalid", { status: 400 });
  }

  return new NextResponse("ok", { status: 200 });
}
