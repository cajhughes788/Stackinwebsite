"use client";

import { ShieldCheck, Zap, Cloud } from "lucide-react";
import { DollarBackground } from "./dollar-background";
import { ReelPreview } from "./reel-preview";

const pillars = [
  { icon: ShieldCheck, title: "Reliable", copy: "Your income. Always accessible." },
  { icon: Zap, title: "Simple", copy: "No clutter. No confusion." },
  { icon: Cloud, title: "Optimized", copy: "Smarter tracking. Better decisions." },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Animated Dollar Sign Background */}
      <DollarBackground />

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-12 py-20 lg:flex-row lg:gap-16">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="brand-aura mb-10 text-sm font-medium uppercase tracking-[0.3em] text-foreground sm:text-lg lg:mb-12 lg:text-xl">
              All your income. One place.
            </p>

            <h1 className="mb-6 flex flex-col gap-2 text-4xl font-normal leading-[1.08] text-foreground sm:gap-3 sm:text-5xl lg:text-6xl">
              <span className="text-balance">Simpler tracking.</span>
              <span className="text-balance">Smarter decisions.</span>
            </h1>

            <span className="brand-rule mx-auto mb-10 lg:mx-0" />

            <ul className="mx-auto grid max-w-xl grid-cols-3 divide-x divide-border lg:mx-0">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="flex flex-col items-center gap-2 px-2 text-center">
                  <pillar.icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground">
                    {pillar.title}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground">{pillar.copy}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-2 lg:items-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  Now available on iOS and web
                </span>
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Coming soon to Android
              </p>
            </div>
          </div>

          {/* App Preview */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg">
            <ReelPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
