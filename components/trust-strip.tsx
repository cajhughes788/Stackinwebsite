import Link from "next/link";
import { Landmark, Lock, ShieldCheck, UserCheck } from "lucide-react";

// Every point here mirrors the Data security and third-party sections of the
// Privacy Policy (lib/legal.ts). Keep them in sync if either changes.
const points = [
  {
    icon: Landmark,
    title: "Your bank login stays with your bank",
    description: "You connect through Plaid. 521 never sees or stores your banking username or password.",
  },
  {
    icon: Lock,
    title: "Encrypted everywhere",
    description: "Encrypted in transit and at rest, with an extra layer on your bank connection.",
  },
  {
    icon: ShieldCheck,
    title: "Never sold. Never used for ads.",
    description: "Your financial data isn't sold, shared with data brokers, or used for ad tracking.",
  },
  {
    icon: UserCheck,
    title: "You stay in control",
    description: "Disconnect a bank and access is revoked immediately. Delete your account anytime.",
  },
];

// Security as a compact strip right before pricing, where people decide
// whether to trust 521 with their money. Card payments are handled by Stripe.
export function TrustStrip() {
  return (
    <section id="security" className="scroll-mt-16 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow section-label mb-4">02 / Security</span>
            <h2 className="text-2xl font-normal leading-tight text-foreground sm:text-3xl">
              Built to be trusted with your money
            </h2>
          </div>
          <Link
            href="/privacy"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Read our privacy policy
          </Link>
        </div>

        <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex gap-4 lg:block">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 lg:mb-4">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
              </span>
              <div>
                <h3 className="mb-1 text-base font-normal leading-snug text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
