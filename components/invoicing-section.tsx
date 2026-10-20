import Link from "next/link";
import { SpotlightGrid } from "./spotlight-grid";
import { InvoiceMockup } from "./invoice-mockup";
import { ArrowRight, BellRing, BookCheck, Palette, ScanSearch } from "lucide-react";

const points = [
  {
    icon: Palette,
    title: "Branded in under a minute",
    description: "Your logo, colors, payment details, and policies. Email it, text it, or share a link or PDF.",
  },
  {
    icon: ScanSearch,
    title: "Venmo, Zelle, or check? Covered.",
    description: "521 spots the payment when it lands in your connected bank. Confirm it with one tap.",
  },
  {
    icon: BookCheck,
    title: "Your books stay right",
    description: "Payments become income on the day the money arrived. Stripe fees are logged as expenses, never counted twice.",
  },
  {
    icon: BellRing,
    title: "Reminders that do the chasing",
    description: "Friendly nudges before and after the due date, and an alert the moment a client pays.",
  },
];

export function InvoicingSection() {
  return (
    <section id="invoicing" className="scroll-mt-16 border-t border-border py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center lg:mb-28">
          <span className="eyebrow section-label mb-8">02 / Invoicing</span>
          <h2 className="mb-6 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Invoicing, built into your books</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Bill clients, get paid, and keep your books right, all in one place. No more juggling payment apps, notes,
            and a separate invoicing tool.
          </p>
        </div>

        <div className="grid items-center gap-20 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <InvoiceMockup />

          <SpotlightGrid className="grid gap-px overflow-hidden rounded-lg border border-border sm:grid-cols-2">
            {points.map((point) => (
              <div key={point.title} className="p-8">
                <point.icon className="mb-6 h-6 w-6 text-primary" strokeWidth={1.5} />
                <h3 className="mb-2 text-base font-medium text-foreground">{point.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
              </div>
            ))}
          </SpotlightGrid>
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/features#invoicing"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Everything invoicing can do
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
