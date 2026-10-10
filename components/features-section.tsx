import Link from "next/link";
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
    <section id="features" className="scroll-mt-16 border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="eyebrow mb-4 inline-block">Platform</span>
          <h2 className="mb-4 text-3xl font-normal text-foreground sm:text-4xl">
            <span className="text-balance">Every way you get paid, in one view</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            521 brings your deposits, transfers, and cash together, so you always know where you stand.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="bg-background p-8">
              <feature.icon className="mb-6 h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="mb-2 text-lg font-medium text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
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
