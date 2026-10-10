"use client";

import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  id?: string;
  label: string;
  title: string;
  description: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function FeatureSection({
  id,
  label,
  title,
  description,
  features,
  columns = 4,
}: FeatureSectionProps) {
  const gridCols = {
    2: "sm:grid-cols-2 max-w-3xl",
    3: "sm:grid-cols-2 lg:grid-cols-3 max-w-6xl",
    4: "sm:grid-cols-2 lg:grid-cols-4 max-w-7xl",
  };

  return (
    <section id={id} className="scroll-mt-16 border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-4 inline-block">{label}</span>
          <h2 className="mb-4 text-3xl font-normal text-foreground sm:text-4xl">
            <span className="text-balance">{title}</span>
          </h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div
          className={`mx-auto grid gap-px overflow-hidden rounded-2xl border border-border bg-border ${gridCols[columns]}`}
        >
          {features.map((feature) => (
            <div key={feature.title} className="bg-background p-8">
              <feature.icon className="mb-6 h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="mb-2 text-base font-medium text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
