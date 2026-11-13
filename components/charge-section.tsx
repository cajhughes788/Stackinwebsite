import Link from "next/link";
import { PhoneShot } from "./phone-shot";
import { ArrowRight } from "lucide-react";

const steps = [
  "Type the amount and tap Show QR.",
  "Your customer scans it and pays with card, Apple Pay, or Google Pay.",
  "Your screen flips to Paid, and it's already in your books.",
];

const points = [
  {
    title: "No card reader needed",
    description: "Your customer's own phone is the terminal. Show a QR code or text them the link.",
  },
  {
    title: "Tips built in",
    description: "Customers can pick 15%, 20%, 25%, or a custom tip right at checkout.",
  },
  {
    title: "Paid straight to you",
    description: "Money goes into your own connected Stripe account. 521 never holds it.",
  },
  {
    title: "Booked automatically",
    description: "The payment, tip, and Stripe fee are recorded for you. No manual entry.",
  },
];

const shot = {
  src: "/images/app/charge.webp",
  alt: "The 521 Charge screen set to $45 for an early check-in, with Ask for a tip turned on",
  width: 720,
  height: 786,
};

// Centered phone with the steps on one side and the points on the other, so
// this section reads differently from the split sections around it.
export function ChargeSection() {
  return (
    <section id="charge" className="scroll-mt-16 py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          <span className="eyebrow section-label mb-8">03 / Charge</span>
          <h2 className="mb-6 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Take a card payment in seconds</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Just show a QR code. Your customer pays on their own phone through Stripe&apos;s secure checkout.
          </p>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
          <ol className="mx-auto max-w-sm space-y-8 lg:mx-0 lg:justify-self-end">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-5">
                <span className="font-[family-name:var(--font-display)] text-3xl font-light leading-none tabular-nums text-foreground/30">
                  {index + 1}
                </span>
                <p className="pt-1 text-base leading-relaxed text-foreground">{step}</p>
              </li>
            ))}
          </ol>

          <PhoneShot shot={shot} className="mx-auto" />

          <ul className="mx-auto max-w-sm space-y-7 lg:mx-0">
            {points.map((point) => (
              <li key={point.title} className="border-l border-border pl-5">
                <h3 className="mb-1 text-base font-medium text-foreground">{point.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/features#charge"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            How Charge works
            <ArrowRight className="h-4 w-4 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        </div>
      </div>
    </section>
  );
}
