"use client";

import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  label: string;
  title: string;
  description: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function FeatureSection({
  label,
  title,
  description,
  features,
  columns = 4,
}: FeatureSectionProps) {
  const gridCols = {
    2: "sm:grid-cols-2 max-w-2xl",
    3: "sm:grid-cols-2 lg:grid-cols-3 max-w-5xl",
    4: "sm:grid-cols-2 lg:grid-cols-4 max-w-7xl",
  };

  return (
    <section className="relative z-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            {label}
          </span>
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="text-balance">{title}</span>
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Feature Cards */}
        <div className={`mx-auto grid gap-4 ${gridCols[columns]}`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
            >
              {/* Icon */}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>

              {/* Hover Glow */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
