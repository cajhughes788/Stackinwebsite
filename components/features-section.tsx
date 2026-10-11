import Link from "next/link";
import { SpotlightGrid } from "./spotlight-grid";
import { Landmark, Upload, Sparkles, PieChart, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Landmark,
    title: "Connect your bank once",
    description: "Paychecks, Zelle, and Apple Cash deposits arrive on their own through Plaid.",
  },
  {
    icon: Upload,
    title: "Bring in Venmo",
    description: "Import your Venmo history so every payment lives in the same place.",
  },
  {
    icon: Sparkles,
    title: "Sorted for you",
    description: "Confirm a transaction once and 521 remembers it next time.",
  },
  {
    icon: PieChart,
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

        <SpotlightGrid className="grid gap-px overflow-hidden rounded-lg border border-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="p-8">
              <feature.icon className="mb-6 h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="mb-2 text-lg font-medium text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </SpotlightGrid>

        <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/features#paychecks"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Features for paychecks
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/features#business"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Features for your business
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
