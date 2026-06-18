import { Progress } from "@/components/ui/progress"

type FundraiserProgressProps = {
  total: number
  goal: number
  supporterCount: number
}

export function FundraiserProgress({ total, goal, supporterCount }: FundraiserProgressProps) {
  const percent = Math.min((total / goal) * 100, 100)
  const remaining = Math.max(goal - total, 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            ${total.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            raised of ${goal.toLocaleString()} goal
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-primary">{Math.round(percent)}%</p>
          <p className="text-sm text-muted-foreground">funded</p>
        </div>
      </div>

      <Progress value={percent} className="h-3" />

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted-foreground">
          {supporterCount} {supporterCount === 1 ? "supporter" : "supporters"}
        </span>
        <span className="font-medium text-foreground">
          {remaining > 0 ? `$${remaining.toLocaleString()} to go` : "Goal reached. Thank you!"}
        </span>
      </div>
    </div>
  )
}
