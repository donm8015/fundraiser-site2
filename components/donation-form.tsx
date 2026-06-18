"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

declare global {
  interface Window {
    paypal: any
  }
}

export function DonationForm() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const renderPayPalButton = () => {
    if (!window.paypal) {
      console.log("PayPal SDK not loaded yet")
      return
    }

    const container = document.getElementById("paypal-button-container")
    if (!container) return

    container.innerHTML = ""

    window.paypal.Buttons({
      createOrder: async () => {
        setIsLoading(true)
        try {
          const response = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: Number(amount),
            }),
          })

          const order = await response.json()
          if (order.error) {
            toast.error(order.error)
            setIsLoading(false)
            return
          }
          return order.id
        } catch (error) {
          toast.error("Failed to create order")
          setIsLoading(false)
          throw error
        }
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
              donorName: name,
            }),
          })

          const result = await response.json()

          if (result.error) {
            toast.error(result.error)
            return
          }

          toast.success("Thank you for your donation!")
          setName("")
          setAmount("")
          window.location.reload()
        } catch (error) {
          toast.error("Failed to process payment")
          throw error
        } finally {
          setIsLoading(false)
        }
      },

      onError: () => {
        toast.error("An error occurred with PayPal")
        setIsLoading(false)
      },
    }).render("#paypal-button-container")
  }

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.paypal.com/sdk/js?client-id=AYox6gTBsCeaw9y9C3IRGzroo4HQCkuJRiAQDsJkcMcbvYhwDnk4CkVMWEvQNNv18gPpx-PZzNlNDsg1&currency=USD"
    script.async = true
    script.onload = () => {
      console.log("PayPal SDK loaded")
      setTimeout(renderPayPalButton, 100)
    }
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    if (amount && name && window.paypal) {
      renderPayPalButton()
    }
  }, [name, amount])

  return (
    <div className="flex flex-col gap-4">
      {/* NAME */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="donor-name">Your name</Label>
        <Input
          id="donor-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      {/* AMOUNT */}
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

      {/* PAYPAL BUTTON CONTAINER */}
      <div id="paypal-button-container" className="min-h-12" />

      <p className="text-sm text-muted-foreground">
        Secure payment via PayPal
      </p>
    </div>
  )
}
