"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

// Card grid with a soft green light that follows the cursor. The grid's 1px
// gaps are its own background, so lighting that background makes the borders
// near the cursor glow too. Mouse only; touch and keyboard see plain cards.
export function SpotlightGrid({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const grid = ref.current;
    if (!grid || event.pointerType !== "mouse") return;
    const setAt = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--y", `${event.clientY - rect.top}px`);
    };
    setAt(grid);
    for (const card of grid.children) setAt(card as HTMLElement);
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={`spotlight-grid ${className}`}>
      {children}
    </div>
  );
}
