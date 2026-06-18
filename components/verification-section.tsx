import Image from "next/image"
import { BadgeCheck, CircleAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PROGRAM_FACTS = [
  { label: "Program", value: "Bachelor of Applied Science in Information Technology – System Administration" },
  { label: "Campus", value: "Ensign College (BYU Pathway Worldwide)" },
  { label: "Enrollment ID", value: "MO26013747" },
  { label: "Status", value: "Active" },
  { label: "Start Date", value: "March 2, 2026" },
  { label: "Expected Graduation", value: "July 5, 2027" },
]

const PROOF_IMAGES = [
  {
    src: "/proof-financial-hold.png",
    alt: "BYU Pathway portal showing a Financial Hold for an outstanding balance on Sifiso's account",
    caption: "Financial hold on the account due to an outstanding tuition balance.",
  },
  {
    src: "/proof-program-details.png",
    alt: "BYU Pathway program details page confirming Sifiso's active enrollment",
    caption: "Official program details confirming active enrollment.",
  },
  {
    src: "/proof-degree-audit.png",
    alt: "BYU Pathway Degree Progress Audit page for Sifiso's program",
    caption: "Degree Progress Audit showing coursework in progress.",
  },
]

export function VerificationSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeCheck className="size-5 text-primary" />
          Verified Need
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="relative mx-auto size-24 shrink-0 overflow-hidden rounded-full border-2 border-accent sm:mx-0">
            <Image
              src="/sifiso-portrait.jpeg"
              alt="Portrait of Sifiso, the student raising funds"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            This is Sifiso, an active BYU Pathway Worldwide student at Ensign College. His account
            is currently on a financial hold for an outstanding balance, which blocks his progress.
            The screenshots below come straight from his official student portal as proof of this
            need.
          </p>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3">
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Financial Hold – Outstanding Balance</p>
            <p className="text-muted-foreground">
              Sifiso cannot move forward in his program until this balance is cleared.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {PROGRAM_FACTS.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-0.5">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="text-sm font-medium text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-foreground">Proof from the official student portal</p>
          <div className="grid grid-cols-1 gap-4">
            {PROOF_IMAGES.map((img) => (
              <figure key={img.src} className="flex flex-col gap-2">
                <div className="overflow-hidden rounded-lg border border-border">
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    width={1200}
                    height={600}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <figcaption className="text-xs text-muted-foreground">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
