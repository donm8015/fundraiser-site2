"use client"

import { useState, useEffect } from "react"
import Script from "next/script"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { addDonation } from "@/app/actions/donations"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

declare global {
  interface Window {
    paypal: any
  }
}

export function DonationForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")

  // ✅ Force render after script loads
const renderButtons = () => {
  if (!window.paypal) return

  const container = document.getElementById("paypal-button")
  if (!container) return

  container.innerHTML = ""

  window.paypal.Buttons({
    createOrder: async () => {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      })

      const order = await response.json()
      return order.id
    }, // ✅ COMMA HERE

    onApprove: async (data: any) => {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: data.orderID,
          donorName: name,
        }),
      })

      const result = await response.json()

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success("Thank you for your donation!")
      router.refresh()
    },
  }).render("#paypal-button") // ✅ CLOSE + RENDER
}

  // ✅ Force retry when user types
  useEffect(() => {
    setTimeout(() => {
      renderButtons()
    }, 500)
  }, [name, amount])

  return (
    <div className="flex flex-col gap-4">

      {/* ✅ PAYPAL SCRIPT */}
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=AYox6gTBsCeaw9y9C3IRGzroo4HQCkuJRiAQDsJkcMcbvYhwDnk4CkVMWEvQNNv18gPpx-PZzNlNDsg1&currency=USD`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ PayPal script loaded")
          setTimeout(renderButtons, 500)
        }}
      />

      {/* NAME */}
      <div className="flex flex-col gap-2">
        <Label>Your name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* AMOUNT */}
      <div className="flex flex-col gap-2">
        <Label>Amount (USD)</Label>
        <Input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* ✅ PAYPAL BUTTON RENDER TARGET */}
      <div
        id="paypal-button"
        style={{
        minHeight: "60px",
        border: "2px solid red",
      }}
    />
      <div id="paypal-button"></div>

      <p className="text-sm text-muted-foreground">
        Secure payment via PayPal
      </p>

    </div>
  )
}
