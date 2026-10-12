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
    className="h-6 w-6 sm:h-7 sm:w-7"
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

// The five streams from the app mockup, scattered toward the screen edges.
// x/y are fractions of the pinned screen; depth < 1 starts an icon smaller,
// dimmer, and softly blurred, as if further away, and it sharpens as it travels.
const streams: { label: string; mark: ReactNode; x: number; y: number; depth: number }[] = [
  { label: "Bank", mark: BankGlyph, x: 0.13, y: 0.24, depth: 1 },
  { label: "Venmo", mark: PeerGlyph, x: 0.86, y: 0.17, depth: 1 },
  { label: "Cash", mark: CashGlyph, x: 0.09, y: 0.62, depth: 1 },
  { label: "Zelle®", mark: InstantGlyph, x: 0.89, y: 0.55, depth: 1 },
  { label: "Apple Cash", mark: WalletGlyph, x: 0.8, y: 0.86, depth: 1 },
];

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Opening statement: FIVE income streams TO ONE app. While the screen is pinned,
// scrolling pulls the five stream icons in from the screen edges and merges them
// into ONE. Without JS or with reduced motion, it is a static statement.
export function FiveToOne() {
  const trackRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLParagraphElement>(null);
  const oneRef = useRef<HTMLSpanElement>(null);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const screen = screenRef.current;
    const stage = stageRef.current;
    const one = oneRef.current;
    if (!track || !screen || !stage || !one || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Everything in stage coordinates. Offsets ignore transforms, so the intro
    // animation does not skew the measurement.
    let geo = { starts: [] as { x: number; y: number }[], ox: 0, oy: 0 };
    const measure = () => {
      const w = screen.clientWidth;
      const h = screen.clientHeight;
      const margin = Math.min(64, w * 0.13); // keeps chip and label on screen
      geo = {
        starts: streams.map((s) => ({
          x: Math.min(Math.max(s.x * w, margin), w - margin) - stage.offsetLeft,
          y: s.y * h - stage.offsetTop,
        })),
        ox: one.offsetLeft + one.offsetWidth / 2,
        oy: one.offsetTop + one.offsetHeight / 2,
      };
    };

    // Scroll sets a target; the drawn progress eases toward it each frame, so
    // wheel steps glide instead of jumping.
    const target = () => {
      const scrollable = track.offsetHeight - window.innerHeight;
      return scrollable > 0 ? clamp01(-track.getBoundingClientRect().top / scrollable) : 0;
    };
    let current = target();

    const draw = (p: number) => {
      track.style.setProperty("--fade", String(clamp01(p / 0.6)));
      // Icons leave at 4% and the last lands at 92%. ONE lights up along the
      // way, and --merge adds the final bloom, finishing as the pin releases.
      track.style.setProperty("--glow", String(clamp01((p - 0.04) / 0.88)));
      track.style.setProperty("--merge", String(easeInOut(clamp01((p - 0.62) / 0.36))));
      track.style.setProperty("--cue", String(1 - clamp01(p * 10)));

      iconRefs.current.forEach((icon, i) => {
        if (!icon) return;
        const t = easeInOut(clamp01((p - 0.04 - i * 0.05) / 0.68));
        const { x: sx, y: sy } = geo.starts[i];
        const depth = streams[i].depth;
        const x = sx + (geo.ox - sx) * t;
        const y = sy + (geo.oy - sy) * t;
        // Far icons come into focus over the first half of the trip.
        const near = depth + (1 - depth) * clamp01(t * 2);
        const scale = near * (1 - 0.6 * t);
        icon.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
        icon.style.opacity = String(1 - clamp01((t - 0.8) / 0.2));
        // Depth (blur and dimming) applies to the chip only, and the label is
        // scaled back up, so every name stays crisp and the same size at rest.
        icon.style.setProperty("--near", near.toFixed(3));
        icon.style.setProperty("--chip-blur", near < 1 ? `${((1 - near) * 4).toFixed(2)}px` : "0px");
        // Labels read at rest, then fade as soon as the icon starts to travel.
        icon.style.setProperty("--label", String(1 - clamp01(t / 0.2)));
      });
    };

    let frame = 0;
    const tick = () => {
      const goal = target();
      current += (goal - current) * 0.16;
      if (Math.abs(goal - current) < 0.0005) current = goal;
      draw(current);
      frame = current === goal ? 0 : requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      draw(current);
      schedule();
    };

    measure();
    draw(current);
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
    "font-statement text-[3rem] font-bold leading-none tracking-[-0.02em] sm:text-[4.25rem] lg:text-[5.5rem]";

  return (
    <div ref={trackRef} className="statement-track relative">
      <div ref={screenRef} className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <p ref={stageRef} className="relative flex flex-col items-center" aria-label="Five income streams to one app">
          <span aria-hidden="true" className="block will-change-[opacity]" style={{ opacity: "calc(1 - var(--fade, 0) * 0.65)" }}>
            <span className={`statement-in brand-aura block ${word}`}>FIVE</span>
          </span>
          <span aria-hidden="true" className="mt-5 block" style={{ opacity: "calc(1 - var(--fade, 0) * 0.5)" }}>
            <span className="statement-in eyebrow block text-[0.7rem] sm:text-xs" style={{ animationDelay: "0.25s" }}>
              Income streams
            </span>
          </span>
          <span aria-hidden="true" className="statement-in brand-aura my-8 font-statement text-2xl font-medium leading-none tracking-[0.04em] sm:my-10 sm:text-4xl" style={{ animationDelay: "0.6s" }}>
            TO
          </span>
          {/* ONE: a plain layer plus two glow copies whose opacity follows the
              scroll. Fading opacity is cheap; redrawing shadows every frame is not. */}
          <span
            ref={oneRef}
            aria-hidden="true"
            className="block will-change-transform"
            style={{ transform: "scale(calc(1 + var(--merge, 0) * 0.05))" }}
          >
            <span className={`statement-in relative block ${word}`} style={{ animationDelay: "0.95s" }}>
              ONE
              <span className="one-glow absolute inset-0">ONE</span>
              <span className="one-bloom absolute inset-0">ONE</span>
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
              className="stream-orbit pointer-events-none absolute left-0 top-0 will-change-transform"
            >
              <span className="orbit-float block" style={{ animationDelay: `${i * -0.7}s` }}>
                <span className="statement-in flex flex-col items-center gap-2.5" style={{ animationDelay: `${1.4 + i * 0.1}s` }}>
                  <span
                    className="orbit-chip flex h-14 w-14 items-center justify-center rounded-[0.95rem] text-primary sm:h-[4.5rem] sm:w-[4.5rem] sm:rounded-[1.25rem]"
                    style={{ filter: "blur(var(--chip-blur, 0px))", opacity: "calc(0.4 + 0.6 * var(--near, 1))" }}
                  >
                    {stream.mark}
                  </span>
                  <span
                    className="origin-top whitespace-nowrap font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/60 sm:text-[0.65rem] sm:tracking-[0.22em]"
                    style={{ opacity: "var(--label, 1)", transform: "scale(calc(1 / var(--near, 1)))" }}
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
