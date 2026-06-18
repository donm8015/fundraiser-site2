import { NextResponse } from "next/server"
import { getPayPalAccessToken } from "@/lib/paypal"
import { addDonation } from "@/app/actions/donations"

export async function POST(req: Request) {
  const { orderId, donorName } = await req.json()

  if (!orderId || typeof orderId !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid PayPal order ID." },
      { status: 400 }
    )
  }

  const accessToken = await getPayPalAccessToken()
  const host =
    process.env.PAYPAL_ENV === "live"
      ? "api-m.paypal.com"
      : "api-m.sandbox.paypal.com"

  const captureResponse = await fetch(
    `https://${host}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  )

  const capture = await captureResponse.json()

  if (!captureResponse.ok) {
    return NextResponse.json(
      { error: capture?.message ?? "Unable to capture PayPal payment." },
      { status: captureResponse.status }
    )
  }

  if (capture.status !== "COMPLETED") {
    return NextResponse.json(
      { error: "Payment not completed." },
      { status: 400 }
    )
  }

  const paidAmount = Number(
    capture.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value
  )
  const transactionId =
    capture.purchase_units?.[0]?.payments?.captures?.[0]?.id

  if (Number.isNaN(paidAmount) || !transactionId) {
    return NextResponse.json(
      { error: "Unable to read payment details from PayPal." },
      { status: 500 }
    )
  }

  await addDonation({
    name: donorName || "Anonymous",
    amount: paidAmount,
    transactionId,
    date: new Date().toISOString(),
  })

  return NextResponse.json({ success: true })
}
