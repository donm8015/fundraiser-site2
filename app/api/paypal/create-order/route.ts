import { NextResponse } from "next/server"
import { getPayPalAccessToken } from "@/lib/paypal"

export async function POST(req: Request) {
  const { amount } = await req.json()
  const value = Number(amount)

  if (Number.isNaN(value) || value < 1) {
    return NextResponse.json(
      { error: "Please enter a donation amount of at least $1." },
      { status: 400 }
    )
  }

  const accessToken = await getPayPalAccessToken()
  const currency = process.env.PAYPAL_CURRENCY ?? "USD"
  const host =
    process.env.PAYPAL_ENV === "live"
      ? "api-m.paypal.com"
      : "api-m.sandbox.paypal.com"

  const response = await fetch(`https://${host}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: value.toFixed(2),
          },
        },
      ],
    }),
  })

  const order = await response.json()

  if (!response.ok) {
    return NextResponse.json(
      { error: order?.message ?? "Unable to create PayPal order." },
      { status: response.status }
    )
  }

  return NextResponse.json(order)
}
