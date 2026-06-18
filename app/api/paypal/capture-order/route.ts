import { NextResponse } from "next/server"
import { getPayPalAccessToken } from "@/lib/paypal"
import { addDonation } from "@/app/actions/donations"

export async function POST(req: Request) {
  const {
    orderId,
    donorName,
  } = await req.json()

  const accessToken =
    await getPayPalAccessToken()

  const captureResponse = await fetch(
    `https://api-m.paypal.com/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  )

  const capture =
    await captureResponse.json()

  if (capture.status !== "COMPLETED") {
    return NextResponse.json(
      { error: "Payment not completed" },
      { status: 400 }
    )
  }

  const paidAmount = Number(
    capture.purchase_units[0].payments
      .captures[0].amount.value
  )

  const transactionId =
    capture.purchase_units[0].payments
      .captures[0].id

  await addDonation({
    name: donorName,
    amount: paidAmount,
    transactionId,
    date: new Date().toISOString(),
  })

  return NextResponse.json({
    success: true,
  })
}