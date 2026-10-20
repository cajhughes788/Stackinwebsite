import Link from "next/link";
import { SpotlightGrid } from "./spotlight-grid";
import { KeyRound, Lock, EyeOff, Unplug } from "lucide-react";

// Every point here mirrors the Data security and third-party sections of the
// Privacy Policy (lib/legal.ts). Keep them in sync if either changes.
const points = [
  {
    icon: KeyRound,
    title: "Your bank login stays with your bank",
    description: "You connect through Plaid. 521 never sees or stores your banking username or password.",
  },
  {
    icon: Lock,
    title: "Encrypted everywhere",
    description: "Data is encrypted in transit and at rest, with an extra layer on your bank connection.",
  },
  {
    icon: EyeOff,
    title: "Never sold. Never used for ads.",
    description: "Your financial data isn't sold, shared with data brokers, or used for ad tracking.",
  },
  {
    icon: Unplug,
    title: "You stay in control",
    description: "Disconnect a bank account and access is revoked immediately. Delete your account anytime.",
  },
];

export function SecuritySection() {
  return (
    <section id="security" className="scroll-mt-16 border-t border-border py-32 lg:py-48">
      <div className="mx-auto grid max-w-7xl gap-20 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-24 lg:px-8">
        <div>
          <span className="eyebrow section-label mb-8">03 / Security</span>
          <h2 className="mb-6 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Built to be trusted with your money</span>
          </h2>
          <span className="brand-rule mb-6" />
          <p className="mb-6 max-w-md text-lg text-muted-foreground">
            521 reads your transactions to organize them. Payments for your plan, and the invoices your clients pay,
            are handled by Stripe, so we never store a full card number.
          </p>
          <Link href="/privacy" className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
            Read our privacy policy
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
