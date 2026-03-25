"use client";

import { Button } from "@/components/ui/button";
import { DollarBackground } from "./dollar-background";
import { AppPreview } from "./app-preview";

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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">
                Now available on iOS & Android
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-balance">Income tracking</span>
              <br />
              <span className="text-primary">made simple</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
              Track everything in one place. Know exactly what you earn, save, and keep.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
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

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-background bg-secondary"
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">10,000+</p>
                <p className="text-xs text-muted-foreground">Active users</p>
              </div>
            </div>
          </div>

          {/* App Preview */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg">
            <AppPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
