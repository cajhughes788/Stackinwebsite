import type { LucideIcon } from "lucide-react";

export type Point = { icon: LucideIcon; title: string; description: string };

// Feature points as an open list beside a screenshot: lighter than the boxed
// card grid, so sections that sit next to a phone don't read as another grid.
export function PointList({ points }: { points: Point[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {points.map((point) => (
        <li key={point.title} className="flex gap-5 py-6">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-border bg-card">
            <point.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </span>
          <div>
            <h3 className="mb-1 text-base font-medium text-foreground">{point.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
