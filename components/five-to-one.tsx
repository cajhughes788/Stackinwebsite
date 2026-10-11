"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Original glyphs (not brand logos) on one 24px grid: heavy strokes, square
// ends and hard corners to match the weight of the 521 wordmark.
const Glyph = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.25}
    strokeLinecap="square"
    strokeLinejoin="miter"
    className="h-5 w-5 sm:h-6 sm:w-6"
  >
    {children}
  </svg>
);

// Bank: pediment, columns, base.
const BankGlyph = (
  <Glyph>
    <path d="M3 9 12 4l9 5H3Z" />
    <path d="M6 12v5M10 12v5M14 12v5M18 12v5M3 20h18" />
  </Glyph>
);
// Peer-to-peer (Venmo): money passing both ways.
const PeerGlyph = (
  <Glyph>
    <path d="M4 8h15M15 4l4 4-4 4" />
    <path d="M20 16H5M9 12l-4 4 4 4" />
  </Glyph>
);
// Cash: a bill.
const CashGlyph = (
  <Glyph>
    <path d="M2.5 6.5h19v11h-19z" />
    <path d="M10 10h4v4h-4z" />
  </Glyph>
);
// Instant bank transfer (Zelle): a bolt.
const InstantGlyph = (
  <Glyph>
    <path d="M13.5 2.5 5 13.5h6.5l-1 8 8.5-11H12.5l1-8Z" />
  </Glyph>
);
// Phone wallet (Apple Cash): a phone holding a card.
const WalletGlyph = (
  <Glyph>
    <path d="M6.5 2.5h11v19h-11z" />
    <path d="M9.5 9h5v4h-5zM11 18h2" />
  </Glyph>
);

// The five streams from the app mockup, placed around FIVE (degrees, 90 = straight up).
const streams: { label: string; mark: ReactNode; angle: number }[] = [
  { label: "Bank", mark: BankGlyph, angle: 195 },
  { label: "Venmo", mark: PeerGlyph, angle: 140 },
  { label: "Cash", mark: CashGlyph, angle: 90 },
  { label: "Zelle®", mark: InstantGlyph, angle: 40 },
  { label: "Apple Cash", mark: WalletGlyph, angle: -15 },
];

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Opening statement: FIVE income streams TO ONE app. While the screen is pinned,
// scrolling pulls the five stream icons out of orbit around FIVE and merges them
// into ONE. Without JS or with reduced motion, it is a static statement.
export function FiveToOne() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fiveRef = useRef<HTMLSpanElement>(null);
  const oneRef = useRef<HTMLSpanElement>(null);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const five = fiveRef.current;
    const one = oneRef.current;
    if (!track || !five || !one || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Centers of FIVE and ONE inside the stage. Offsets ignore transforms, so the
    // intro animation does not skew the measurement.
    let geo = { fx: 0, fy: 0, rx: 0, ry: 0, ox: 0, oy: 0 };
    const measure = () => {
      // Wide orbit: well clear of FIVE, but inside the screen edge on phones.
      const gapX = Math.min(Math.max(window.innerWidth * 0.12, 28), 180);
      const gapY = Math.min(Math.max(window.innerHeight * 0.08, 56), 110);
      geo = {
        fx: five.offsetLeft + five.offsetWidth / 2,
        fy: five.offsetTop + five.offsetHeight / 2,
        rx: Math.min(five.offsetWidth / 2 + gapX, window.innerWidth / 2 - 48),
        ry: five.offsetHeight / 2 + gapY,
        ox: one.offsetLeft + one.offsetWidth / 2,
        oy: one.offsetTop + one.offsetHeight / 2,
      };
    };

    let frame = 0;
    const render = () => {
      frame = 0;
      const scrollable = track.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? clamp01(-track.getBoundingClientRect().top / scrollable) : 0;

      track.style.setProperty("--fade", String(clamp01(p / 0.55)));
      track.style.setProperty("--merge", String(easeInOut(clamp01((p - 0.55) / 0.35))));
      track.style.setProperty("--cue", String(1 - clamp01(p * 10)));

      iconRefs.current.forEach((icon, i) => {
        if (!icon) return;
        const t = easeInOut(clamp01((p - 0.06 - i * 0.05) / 0.6));
        const rad = (streams[i].angle * Math.PI) / 180;
        const sx = geo.fx + Math.cos(rad) * geo.rx;
        const sy = geo.fy - Math.sin(rad) * geo.ry;
        const x = sx + (geo.ox - sx) * t;
        const y = sy + (geo.oy - sy) * t;
        icon.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${1 - 0.6 * t})`;
        icon.style.opacity = String(1 - clamp01((t - 0.8) / 0.2));
        // Labels read at rest, then fade as soon as the icon starts to travel.
        icon.style.setProperty("--label", String(1 - clamp01(t / 0.2)));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const word =
    "brand-aura font-display text-[5.5rem] font-normal leading-none tracking-[-0.03em] sm:text-[8rem] lg:text-[10rem]";

  return (
    <div ref={trackRef} className="statement-track relative">
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <p className="relative flex flex-col items-center" aria-label="Five income streams to one app">
          <span ref={fiveRef} aria-hidden="true" className="block" style={{ opacity: "calc(1 - var(--fade, 0) * 0.65)" }}>
            <span className={`statement-in block ${word}`}>FIVE</span>
          </span>
          <span aria-hidden="true" className="mt-5 block" style={{ opacity: "calc(1 - var(--fade, 0) * 0.5)" }}>
            <span className="statement-in eyebrow block text-[0.7rem] sm:text-xs" style={{ animationDelay: "0.25s" }}>
              Income streams
            </span>
          </span>
          <span aria-hidden="true" className="statement-in brand-aura my-8 font-display text-3xl font-light leading-none tracking-[0.08em] sm:my-10 sm:text-5xl" style={{ animationDelay: "0.6s" }}>
            TO
          </span>
          <span
            ref={oneRef}
            aria-hidden="true"
            className="block"
            style={{
              transform: "scale(calc(1 + var(--merge, 0) * 0.05))",
              filter: "drop-shadow(0 0 calc(var(--merge, 0) * 36px) rgb(47 168 102 / calc(var(--merge, 0) * 0.55)))",
            }}
          >
            <span className={`statement-in block ${word}`} style={{ animationDelay: "0.95s" }}>
              ONE
            </span>
          </span>
          <span aria-hidden="true" className="statement-in eyebrow mt-5 block text-[0.7rem] sm:text-xs" style={{ animationDelay: "1.2s" }}>
            App
          </span>

          {streams.map((stream, i) => (
            <span
              key={stream.label}
              ref={(el) => {
                iconRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="stream-orbit pointer-events-none absolute left-0 top-0"
            >
              <span className="orbit-float block" style={{ animationDelay: `${i * -0.7}s` }}>
                <span className="statement-in flex flex-col items-center gap-2.5" style={{ animationDelay: `${1.4 + i * 0.1}s` }}>
                  <span className="orbit-chip flex h-12 w-12 items-center justify-center rounded-[0.85rem] text-foreground sm:h-16 sm:w-16 sm:rounded-[1.1rem]">
                    {stream.mark}
                  </span>
                  <span
                    className="whitespace-nowrap font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/60 sm:text-[0.65rem] sm:tracking-[0.22em]"
                    style={{ opacity: "var(--label, 1)" }}
                  >
                    {stream.label}
                  </span>
                </span>
              </span>
            </span>
          ))}
        </p>

        <span
          aria-hidden="true"
          className="absolute bottom-8 hidden [@media(min-height:820px)]:block"
          style={{ opacity: "var(--cue, 1)" }}
        >
          <span
            className="statement-in flex flex-col items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground"
            style={{ animationDelay: "1.9s" }}
          >
            Scroll
            <span className="scroll-cue h-10 w-px bg-gradient-to-b from-muted-foreground to-transparent" />
          </span>
        </span>
      </div>
    </div>
  );
}
