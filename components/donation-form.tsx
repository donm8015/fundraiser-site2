"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

declare global {
  interface Window {
    paypal: any
  }
}

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const paypalCurrency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY ?? "USD"

export function DonationForm() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const buttonLoaded = useRef(false)

  const amountValue = Number(amount)
  const hasValidAmount = amountValue >= 1

  const renderPayPalButton = () => {
    if (!window.paypal) {
      return
    }

    const container = document.getElementById("paypal-button-container")
    if (!container) return

    container.innerHTML = ""
    buttonLoaded.current = false

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "pay",
        },
        createOrder: async () => {
          setIsLoading(true)

          if (!hasValidAmount) {
            toast.error("Enter an amount of at least $1.")
            setIsLoading(false)
            throw new Error("Invalid amount")
          }

          const response = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: amountValue,
            }),
          })

          const order = await response.json()

          if (!response.ok || order.error) {
            toast.error(order.error ?? "Unable to create PayPal order.")
            setIsLoading(false)
            throw new Error(order.error || "Create order failed")
          }

          return order.id
        },
        onApprove: async (data: any) => {
          try {
            const response = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: data.orderID,
                donorName: name || "Anonymous",
              }),
            })

            const result = await response.json()

            if (!response.ok || result.error) {
              toast.error(result.error ?? "Payment capture failed.")
              return
            }

            toast.success("Thank you for your donation!")
            setName("")
            setAmount("")
            window.location.reload()
          } catch (error) {
            toast.error("Failed to process payment")
          } finally {
            setIsLoading(false)
          }
        },
        onError: () => {
          toast.error("An error occurred with PayPal.")
          setIsLoading(false)
        },
      })
      .render(container)
      .then(() => {
        buttonLoaded.current = true
      })
      .catch(() => {
        buttonLoaded.current = false
      })
  }

  useEffect(() => {
    if (!paypalClientId) {
      toast.error("PayPal client ID not configured.")
      return
    }

    const existingScript = document.getElementById("paypal-sdk")
    if (existingScript) {
      if (window.paypal) {
        renderPayPalButton()
      }
      return
    }

    const script = document.createElement("script")
    script.id = "paypal-sdk"
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=${paypalCurrency}`
    script.async = true
    script.onload = () => {
      renderPayPalButton()
    }
    script.onerror = () => {
      toast.error("Unable to load the PayPal SDK.")
    }

    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    if (window.paypal && hasValidAmount && !buttonLoaded.current) {
      renderPayPalButton()
    }
  }, [amount, name, hasValidAmount])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="donor-name">Your name</Label>
        <Input
          id="donor-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="donation-amount">Amount (USD)</Label>
        <Input
          id="donation-amount"
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter donation amount"
        />
      </div>

      <div className="rounded-lg border border-border p-4">
        <div className="mb-2 text-sm font-medium text-foreground">
          Pay with PayPal
        </div>
        <div id="paypal-button-container" className="min-h-[90px]" />
      </div>

      <p className="text-sm text-muted-foreground">
        Secure payment via PayPal. Donation amounts are processed in USD.
      </p>
    </div>
  )
}
