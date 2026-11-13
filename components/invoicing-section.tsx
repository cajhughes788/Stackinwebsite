import Link from "next/link";
import { PhoneShot } from "./phone-shot";
import { PointList } from "./point-list";
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

const shot = {
  src: "/images/app/invoices.webp",
  alt: "The 521 Invoices screen showing $14 waiting on clients, with one invoice overdue 8 days",
  width: 720,
  height: 888,
};

export function InvoicingSection() {
  return (
    <section id="invoicing" className="scroll-mt-16 bg-surface py-32 lg:py-48">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:gap-24 lg:px-8">
        {/* Text first in the markup so phones read the heading before the screenshot. */}
        <div className="lg:order-2">
          <span className="eyebrow section-label mb-8">02 / Invoicing</span>
          <h2 className="mb-6 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Invoicing, built into your books</span>
          </h2>
          <p className="mb-10 max-w-xl text-lg text-muted-foreground">
            Bill clients, get paid, and keep your books right, all in one place. No more juggling payment apps, notes,
            and a separate invoicing tool.
          </p>
          <PointList points={points} />
          <Link
            href="/features#invoicing"
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Everything invoicing can do
            <ArrowRight className="h-4 w-4 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        </div>
        <PhoneShot shot={shot} className="mx-auto lg:order-1" />
      </div>
    </section>
  );
}
