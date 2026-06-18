"use server"

export type Donation = {
  name: string
  amount: number
  transactionId: string
  date: string
}

let donations: Donation[] = []

export async function addDonation(
  donation: Donation
) {
  donations.unshift(donation)

  return { success: true }
}

export async function getDonations() {
  return donations
}