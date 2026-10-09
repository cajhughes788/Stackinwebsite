"use client";

import { DollarBackground } from "@/components/dollar-background";

export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Animated Dollar Sign Background */}
      <DollarBackground />

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="eyebrow mb-6">Full feature overview</p>

        <h1 className="mb-6 text-4xl font-normal leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
          <span className="text-balance">Everything you need to</span>
          <br />
          <span className="text-balance">track your income</span>
        </h1>

        <span className="brand-rule mx-auto mb-6" />

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
          {"From hourly wages to side income, 521 keeps it all organized in one place."}
        </p>
      </div>
    </section>
  );
}
