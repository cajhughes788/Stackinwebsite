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
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">
            Full Feature Overview
          </span>
        </span>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          <span className="text-balance">Everything you need to</span>
          <br />
          <span className="text-primary">track your income</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
          {"From hourly wages to side income, StackIn keeps it all organized in one place."}
        </p>
      </div>
    </section>
  );
}
