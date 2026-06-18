import Image from "next/image"
import { GraduationCap } from "lucide-react"
import { getDonations } from "@/app/actions/donations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FundraiserProgress } from "@/components/fundraiser-progress"
import { DonationForm } from "@/components/donation-form"
import { SupportersList } from "@/components/supporters-list"
import { CopyPaypal } from "@/components/copy-paypal"
import { VerificationSection } from "@/components/verification-section"
import { StorySection } from "@/components/story-section"

const GOAL = 90
const PAYPAL_EMAIL = process.env.PAYPAL_EMAIL ?? "tebza27@gmail.com"

export default async function FundraiserPage() {
  const donations = await getDonations()
  const total = donations.reduce((sum, d) => sum + Number(d.amount), 0)

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Card className="overflow-hidden pt-0">
        <div className="relative h-52 w-full sm:h-64">
          <Image
            src="/graduation-hero.png"
            alt="A smiling graduate on a college campus"
            fill
            priority
            className="object-cover"
          />
        </div>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-center">
            <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              <GraduationCap className="size-3.5" />
              BYU Tuition Fund
            </span>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Help Sifiso Stay in School
            </h1>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Every dollar brings Sifiso closer to finishing the semester at BYU. Your
              contribution, big or small, makes a real difference.
            </p>
          </div>

          <FundraiserProgress total={total} goal={GOAL} supporterCount={donations.length} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <StorySection />
        <VerificationSection />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Make a contribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <DonationForm />
            <div className="flex items-center justify-between gap-3 rounded-lg bg-muted px-4 py-3 text-sm">
              <div className="min-w-0">
                <p className="font-medium text-foreground">Prefer PayPal?</p>
                <p className="truncate text-muted-foreground">{PAYPAL_EMAIL}</p>
              </div>
              <CopyPaypal email={PAYPAL_EMAIL} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supporters</CardTitle>
          </CardHeader>
          <CardContent>
            <SupportersList donations={donations} />
          </CardContent>
        </Card>
      </div>

      <p className="pb-4 text-center text-xs text-muted-foreground">
        Thank you for supporting Sifiso&apos;s education.
      </p>
    </main>
  )
}
