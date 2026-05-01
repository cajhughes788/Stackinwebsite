"use client";

import { Button } from "@/components/ui/button";

export function FeaturesCTA() {
  return (
    <section className="relative py-24 lg:py-32">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* CTA Card */}
        <div className="rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm sm:p-12 lg:p-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="text-balance">Start tracking your income today</span>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
            {"Use StackIn to understand your real earnings."}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary"
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
