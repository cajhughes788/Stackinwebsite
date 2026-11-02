import Link from "next/link";
import { SpotlightGrid } from "./spotlight-grid";
import { ArrowRight, BookCheck, HandCoins, Landmark, Smartphone } from "lucide-react";

const steps = [
  "Type the amount and tap Show QR.",
  "Your customer scans it and pays with card, Apple Pay, or Google Pay.",
  "Your screen flips to Paid, and it's already in your books.",
];

const points = [
  {
    icon: Smartphone,
    title: "No card reader needed",
    description: "Your customer's own phone is the terminal. Show a QR code or text them the link.",
  },
  {
    icon: HandCoins,
    title: "Tips built in",
    description: "Customers can pick 15%, 20%, 25%, or a custom tip right at checkout.",
  },
  {
    icon: Landmark,
    title: "Paid straight to you",
    description: "Money goes into your own connected Stripe account. 521 never holds it.",
  },
  {
    icon: BookCheck,
    title: "Booked automatically",
    description: "The payment, tip, and Stripe fee are recorded for you. No manual entry.",
  },
];

export function ChargeSection() {
  return (
    <section id="charge" className="scroll-mt-16 border-t border-border py-32 lg:py-48">
      <div className="mx-auto grid max-w-7xl gap-20 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-24 lg:px-8">
        <div>
          <span className="eyebrow section-label mb-8">03 / Charge</span>
          <h2 className="mb-6 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Take a card payment in seconds</span>
          </h2>
          <span className="brand-rule mb-6" />
          <p className="mb-10 max-w-md text-lg text-muted-foreground">
            Just show a QR code. Your customer pays on their own phone through Stripe&apos;s secure checkout.
          </p>
          <ol className="mb-10 max-w-md space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                <span className="font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <Link
            href="/features#charge"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            How Charge works
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <SpotlightGrid className="grid gap-px self-start overflow-hidden rounded-lg border border-border sm:grid-cols-2">
          {points.map((point) => (
            <div key={point.title} className="p-8">
              <point.icon className="mb-6 h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="mb-2 text-base font-medium text-foreground">{point.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </SpotlightGrid>
      </div>
    </section>
  );
}
