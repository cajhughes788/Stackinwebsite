"use client";

import { DollarSign, BarChart3, Briefcase, Zap } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Track every dollar",
    description: "Log income, tips, cash, and more with ease.",
  },
  {
    icon: BarChart3,
    title: "Know your real earnings",
    description: "See totals, trends, and breakdowns at a glance.",
  },
  {
    icon: Briefcase,
    title: "Built for real work",
    description: "Works for W-2 and independent income alike.",
  },
  {
    icon: Zap,
    title: "Simple and fast",
    description: "Enter data in seconds, not minutes.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Features
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="text-balance">Everything you need to track your income</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple tools designed for people who work hard and want to see where their money goes.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>

              {/* Hover Glow */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
