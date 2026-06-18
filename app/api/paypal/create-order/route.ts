import { NextResponse } from "next/server"
import { getPayPalAccessToken } from "@/lib/paypal"

export async function POST(req: Request) {
  const { amount } = await req.json()

  const accessToken =
    await getPayPalAccessToken()

  const response = await fetch(
    "https://api-m.paypal.com/v2/checkout/orders",
    {
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
              currency_code: "USD",
              value: Number(amount).toFixed(2),
            },
          },
        ],
      }),
    }
  )

  const order = await response.json()

  return NextResponse.json(order)
}