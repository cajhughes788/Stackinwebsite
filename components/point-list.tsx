import type { LucideIcon } from "lucide-react";

export type Point = { icon: LucideIcon; title: string; description: string };

// Feature points as an open list beside a screenshot. No icons: the phone
// carries the visual weight, and the titles read cleaner on their own.
// (Points keep their icon field so the same data still drives the card grids.)
export function PointList({ points }: { points: Point[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {points.map((point) => (
        <li key={point.title} className="grid gap-1.5 py-6">
          <h3 className="text-[1.05rem] font-medium leading-snug text-foreground">{point.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
        </li>
      ))}
    </ul>
  );
}
