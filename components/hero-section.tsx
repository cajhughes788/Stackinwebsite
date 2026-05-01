"use client";

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
            <div className="mb-6 flex flex-col items-center gap-2 lg:items-start">
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

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-balance">Income tracking</span>
              <br />
              <span className="text-primary">made simple</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
              Track everything in one place. Know exactly what you earn, save, and keep.
            </p>
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
