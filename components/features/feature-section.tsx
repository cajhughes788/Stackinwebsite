"use client";

import { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";

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

  // The last card stretches across any empty cells in its row, so the
  // hairline grid never shows a blank filled gap.
  const lastSmSpan = features.length % 2 === 1 ? "sm:col-span-2" : "";
  const lgRemainder = columns === 2 ? 0 : features.length % columns;
  const lgSpans: Record<number, string> = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
  };
  const lastLgSpan = columns === 2 ? "" : lgSpans[lgRemainder ? columns - lgRemainder + 1 : 1];

  return (
    <section id={id} className="scroll-mt-16 border-t border-border py-20 lg:py-28">
      <Reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow mb-4 inline-block">{label}</span>
            <h2 className="mb-4 text-3xl font-normal text-foreground sm:text-4xl">
              <span className="text-balance">{title}</span>
            </h2>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>

          <div
            className={`mx-auto grid gap-px overflow-hidden rounded-lg border border-border bg-border ${gridCols[columns]}`}
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-background p-8 ${
                  index === features.length - 1 ? `${lastSmSpan} ${lastLgSpan}` : ""
                }`}
              >
                <feature.icon className="mb-6 h-6 w-6 text-primary" strokeWidth={1.5} />
                <h3 className="mb-2 text-base font-medium text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
