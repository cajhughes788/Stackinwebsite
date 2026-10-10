import Link from "next/link";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IncomeMockup } from "./income-mockup";
import { ReelTour } from "./reel-tour";
import { APP_STORE_URL } from "@/lib/site";

const pillars = [
  { icon: ShieldCheck, title: "Reliable", copy: "Your income. Always accessible." },
  { icon: Sparkles, title: "Simple", copy: "No clutter. No confusion." },
  { icon: Lock, title: "Private", copy: "Encrypted. Never sold." },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-16 py-20 lg:flex-row lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <p className="brand-aura mb-10 text-sm font-medium uppercase tracking-[0.3em] text-foreground sm:text-lg lg:mb-12 lg:text-xl">
              All your income. One place.
            </p>

            <h1 className="mb-6 flex flex-col gap-2 text-[2.3rem] font-normal leading-[1.02] text-foreground sm:gap-3 sm:text-6xl lg:text-7xl">
              <span className="text-balance">Simpler tracking.</span>
              <span className="text-balance">Smarter decisions.</span>
            </h1>

            <span className="brand-rule mx-auto mb-8 lg:mx-0" />

            <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Paychecks, Venmo, Zelle, and cash, together in one clear view.
            </p>

            <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="h-12 px-7 text-base">
                <Link href="/signup">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-border px-7 text-base text-foreground hover:bg-secondary">
                <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
                  Download for iPhone
                </a>
              </Button>
            </div>
            <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              On iPhone and the web. Android coming soon.
            </p>

            <ul className="mx-auto grid max-w-xl grid-cols-3 divide-x divide-border lg:mx-0">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="flex flex-col items-center gap-2 px-2 text-center">
                  <pillar.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                  <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-foreground">
                    {pillar.title}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground">{pillar.copy}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-1 flex-col items-center gap-8">
            <IncomeMockup />
            <ReelTour />
          </div>
        </div>
      </div>
    </section>
  );
}
