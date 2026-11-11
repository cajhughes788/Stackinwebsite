"use client";

import { Reveal } from "@/components/reveal";
import { OpenGrid, type GridItem } from "@/components/open-grid";
import { PhoneShot, type Screenshot } from "@/components/phone-shot";

interface FeatureSectionProps {
  id?: string;
  label: string;
  title: string;
  description: string;
  features: GridItem[];
  /** Columns for the points when there is no screenshot beside them. */
  columns?: 2 | 3 | 4;
  /** A real screen from the app, shown beside the points. */
  screenshot?: Screenshot;
  /** Put the screenshot on the right instead of the left. */
  reverse?: boolean;
}

export function FeatureSection({
  id,
  label,
  title,
  description,
  features,
  columns = 4,
  screenshot,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-border py-20 lg:py-28">
      <Reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="eyebrow section-label mb-6">{label}</span>
            <h2 className="mb-4 text-3xl font-normal text-foreground sm:text-4xl">
              <span className="text-balance">{title}</span>
            </h2>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>

          {screenshot ? (
            <div className="grid items-start gap-14 lg:grid-cols-[auto_1fr] lg:gap-20">
              {/* The phone stays in view while a long list of points scrolls past it. */}
              <div className={`lg:sticky lg:top-28 ${reverse ? "lg:order-2" : ""}`}>
                <PhoneShot shot={screenshot} className="mx-auto" />
              </div>
              <OpenGrid items={features} columns={2} />
            </div>
          ) : (
            <OpenGrid items={features} columns={columns} />
          )}
        </div>
      </Reveal>
    </section>
  );
}
