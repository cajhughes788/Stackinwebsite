import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";

export type Highlight = { title: string; description: string };

// Building blocks for the Features page. Every section shares the same parts
// (header, top three points, "also included" list) but arranges them its own
// way, so the page doesn't read as one template repeated seven times.

/** A full-width band. Alternate `tone` so each topic reads as its own block. */
export function SectionShell({
  id,
  tone = "base",
  size = "lg",
  children,
}: {
  id: string;
  tone?: "base" | "raised";
  size?: "lg" | "sm";
  children: ReactNode;
}) {
  const bg = tone === "raised" ? "bg-surface" : "bg-background";
  const pad = size === "lg" ? "py-20 sm:py-24 lg:py-32" : "py-16 sm:py-20 lg:py-24";
  return (
    // scroll-mt clears the fixed navbar plus the section chips under it.
    <section id={id} className={`scroll-mt-32 ${bg} ${pad}`}>
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
      </Reveal>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className = "",
}: {
  label: string;
  title: string;
  description: string;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"} ${className}`}>
      <span className="eyebrow section-label mb-5">{label}</span>
      <h2 className="mb-4 text-3xl font-normal leading-[1.1] text-foreground sm:text-4xl lg:text-[2.75rem]">
        <span className="text-balance">{title}</span>
      </h2>
      <p className={`text-base text-muted-foreground sm:text-lg ${centered ? "mx-auto max-w-xl" : ""}`}>{description}</p>
    </div>
  );
}

/**
 * The three points that sell a section, numbered and given real size.
 * `layout="row"` lays them side by side on wide screens.
 */
export function Highlights({ items, layout = "stack" }: { items: Highlight[]; layout?: "stack" | "row" }) {
  return (
    <ol className={layout === "row" ? "grid gap-8 md:grid-cols-3 md:gap-10" : "space-y-8 sm:space-y-10"}>
      {items.map((item, index) => (
        <li key={item.title} className="flex gap-4 sm:gap-5">
          <span className="font-[family-name:var(--font-display)] text-sm font-medium tabular-nums leading-[1.9rem] text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="mb-2 text-xl font-normal leading-snug text-foreground sm:text-[1.35rem]">{item.title}</h3>
            <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Everything else, as a compact checklist of titles only. */
const checklistColumns = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

export function AlsoIncluded({
  items,
  columns = 3,
  className = "",
}: {
  items: string[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-white/[0.025] p-5 ring-1 ring-white/[0.06] sm:p-7 ${className}`}>
      <p className="eyebrow mb-4">Also included</p>
      <ul className={`grid gap-x-8 gap-y-3 ${checklistColumns[columns]}`}>
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-foreground/85">
            <Check className="mt-px h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A tinted panel with no border, for bento grids and small app fragments. */
export function Tile({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/[0.06] sm:p-6 ${className}`}>{children}</div>
  );
}
