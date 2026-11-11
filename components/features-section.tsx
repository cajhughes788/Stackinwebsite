import Link from "next/link";
import { OpenGrid } from "./open-grid";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Connect your bank once",
    description: "Paychecks, Zelle, and Apple Pay deposits arrive on their own through Plaid.",
  },
  {
    title: "Bring in Venmo",
    description: "Import your Venmo history so every payment lives in the same place.",
  },
  {
    title: "Sorted for you",
    description: "Confirm a transaction once and 521 remembers it next time.",
  },
  {
    title: "Know what you keep",
    description: "Net pay after taxes, plus profit and loss for your business.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-border py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center lg:mb-28">
          <span className="eyebrow section-label mb-8">01 / Platform</span>
          <h2 className="mb-6 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Every way you get paid, in one view</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            521 brings your deposits, transfers, and cash together, so you always know where you stand.
          </p>
        </div>
        <OpenGrid items={features} columns={4} />

        <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/features#paychecks"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Features for paychecks
            <ArrowRight className="h-4 w-4 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
          <Link
            href="/features#business"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Features for your business
            <ArrowRight className="h-4 w-4 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        </div>
      </div>
    </section>
  );
}
