"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "income", label: "Income" },
  { id: "invoicing", label: "Invoicing" },
  { id: "charge", label: "Charge" },
  { id: "booking", label: "Booking" },
  { id: "paychecks", label: "Paychecks" },
  { id: "business", label: "Business" },
  { id: "organize", label: "Organization" },
];

// Chips that stick under the navbar and light up for the section in view, so a
// long page always says where you are. Scrolls sideways on phones.
export function SectionNav() {
  const [active, setActive] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the screen decides which section is "in view".
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Keep the active chip visible in the sideways-scrolling row (without moving the page).
  useEffect(() => {
    const row = rowRef.current;
    const chip = row?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!row || !chip) return;
    const left = chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2;
    row.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Feature sections"
      className="sticky top-16 z-40 border-y border-white/[0.06] bg-background/85 backdrop-blur-xl"
    >
      <div
        ref={rowRef}
        className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:justify-center sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {sections.map(({ id, label }, index) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              data-id={id}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                isActive
                  ? "bg-primary/15 text-foreground ring-1 ring-primary/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={`mr-1.5 tabular-nums ${isActive ? "text-primary" : "text-foreground/30"}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
