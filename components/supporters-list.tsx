import { Heart } from "lucide-react"
import type { Donation } from "@/lib/db/schema"

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  const units: [number, string][] = [
    [60, "s"],
    [60, "m"],
    [24, "h"],
    [7, "d"],
  ]
  let value = seconds
  let unit = "s"
  for (const [step, label] of units) {
    if (value < step) {
      unit = label
      break
    }
    value = Math.floor(value / step)
    unit = label
  }
  return value <= 0 ? "just now" : `${value}${unit} ago`
}

export function SupportersList({ donations }: { donations: Donation[] }) {
  if (donations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
        <Heart className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No contributions yet. Be the first to help!
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col">
      {donations.map((donation, index) => (
        <li
          key={donation.id}
          className="flex items-center gap-3 border-border py-3"
          style={{ borderTopWidth: index === 0 ? 0 : 1 }}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
            {initials(donation.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground">{donation.name}</p>
            <p className="text-xs text-muted-foreground">{timeAgo(donation.createdAt)}</p>
          </div>
          <span className="font-semibold text-primary">
            ${Number(donation.amount).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  )
}
