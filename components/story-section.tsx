import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Heart, CheckCircle2 } from "lucide-react"

const BENEFITS = [
  "Stay enrolled in my courses",
  "Continue developing valuable IT skills",
  "Move closer to graduating in 2027",
  "Focus fully on my education without financial stress",
]

export function StorySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Story</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        <div className="flex flex-col gap-3">
          <p className="text-pretty">
            Hi, my name is{" "}
            <span className="font-medium text-foreground">Sifiso Mokhele</span> from
            Johannesburg, South Africa, and I am currently pursuing a Bachelor of Applied
            Science in Information Technology through BYU Pathway Worldwide. This journey
            means a lot to me because it&apos;s helping me build skills that will shape my
            future and open doors in the IT field.
          </p>
          <p className="text-pretty">
            Right now, I&apos;m facing a small financial challenge that I can&apos;t
            overcome alone.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg bg-secondary p-4">
          <div className="flex items-center gap-2 text-foreground">
            <Target className="size-4 text-primary" />
            <h3 className="font-semibold">My Goal</h3>
          </div>
          <p className="text-pretty">
            I am raising{" "}
            <span className="font-medium text-foreground">$90</span> to pay for my BYU
            tuition so I can continue my studies without interruption.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-foreground">
            <Heart className="size-4 text-primary" />
            <h3 className="font-semibold">Why Your Help Matters</h3>
          </div>
          <p className="text-pretty">Your support will help me:</p>
          <ul className="flex flex-col gap-2">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-pretty">{benefit}</span>
              </li>
            ))}
          </ul>
          <p className="text-pretty font-medium text-foreground">
            Every contribution&mdash;no matter how small&mdash;means a lot to me.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
