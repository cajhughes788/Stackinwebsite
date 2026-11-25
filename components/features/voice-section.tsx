"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { SceneMark } from "./scene/journey-scene";
import { CalendarClock, FileText, Mic, Receipt, Sparkles, Wallet } from "lucide-react";

type Field = { label: string; value: string };
type Moment = {
  id: string;
  step: string;
  form: string;
  icon: ReactNode;
  said: string;
  fields?: Field[];
  answer?: { figure: string; caption: string };
  button?: string;
};

// The sentences come from the app's own voice test sheets
// (scripts/voice-*-cases.json in the app repo). The numbers are illustrative.
const moments: Moment[] = [
  {
    id: "shift",
    step: "Log a shift",
    form: "Add entry",
    icon: <Wallet className="h-4 w-4" />,
    said: "Worked the bar yesterday 4 to midnight, 85 in card tips and 30 cash",
    fields: [
      { label: "Date", value: "Yesterday" },
      { label: "Hours", value: "4:00 PM – 12:00 AM" },
      { label: "Card tips", value: "$85.00" },
      { label: "Cash tips", value: "$30.00" },
    ],
    button: "Add entry",
  },
  {
    id: "expense",
    step: "Add an expense",
    form: "Add expense",
    icon: <Receipt className="h-4 w-4" />,
    said: "Spent 42 on gas at Shell yesterday",
    fields: [
      { label: "Vendor", value: "Shell" },
      { label: "Amount", value: "$42.00" },
      { label: "Date", value: "Yesterday" },
      { label: "For", value: "Gas" },
    ],
    button: "Save expense",
  },
  {
    id: "invoice",
    step: "Send an invoice",
    form: "New invoice",
    icon: <FileText className="h-4 w-4" />,
    said: "Invoice Jenna Morales 120 for a cut and color, due Friday",
    fields: [
      { label: "Client", value: "Jenna Morales" },
      { label: "Cut and color", value: "$120.00" },
      { label: "Due", value: "Friday" },
    ],
    button: "Review invoice",
  },
  {
    id: "booking",
    step: "Book a client",
    form: "New appointment",
    icon: <CalendarClock className="h-4 w-4" />,
    said: "Book Jenna Thursday at 2 for a cut",
    fields: [
      { label: "Client", value: "Jenna" },
      { label: "Service", value: "Cut" },
      { label: "When", value: "Thursday, 2:00 PM" },
    ],
    button: "Book it",
  },
  {
    id: "ask",
    step: "Ask about your money",
    form: "Ask 521",
    icon: <Sparkles className="h-4 w-4" />,
    said: "How much did I make this week?",
    answer: { figure: "$1,284.50", caption: "made this week, worked out from your own entries" },
  },
];

const siriPhrases = ["Log my tips in 521", "Add an expense in 521", "Book in 521", "Ask 521"];

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// Each moment gets an equal share of the scroll: the words are "said" and the
// form fills over the first 70%, then the deck turns to the next card.
const SAY = 0.7;

function Waveform() {
  return (
    <span aria-hidden="true" className="voice-wave flex h-7 items-center gap-[3px] sm:h-10">
      {Array.from({ length: 28 }, (_, i) => (
        <span
          key={i}
          className="voice-bar block w-[3px] rounded-full bg-primary"
          style={{ animationDelay: `${((i * 37) % 23) * -0.06}s`, "--h": 0.35 + ((i * 53) % 10) / 15 } as CSSProperties}
        />
      ))}
    </span>
  );
}

function VoiceCard({ m }: { m: Moment }) {
  const fieldCount = m.fields?.length ?? 1;
  return (
    <div className="voice-card rounded-[1.6rem] border border-white/[0.09] bg-gradient-to-b from-[#1b2226] to-[#12171a] p-4 shadow-raised sm:p-6">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">{m.icon}</span>
          {m.form}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Mic className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <p
        className="voice-heard voice-field mb-5 rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-[13px] leading-snug text-muted-foreground"
        style={{ "--s": 0.58 } as CSSProperties}
      >
        <span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Heard</span>
        &ldquo;{m.said}&rdquo;
      </p>

      {m.fields ? (
        <dl className="space-y-2 sm:space-y-2.5">
          {m.fields.map((f, j) => (
            <div
              key={f.label}
              className="voice-field voice-row flex items-baseline justify-between gap-4 rounded-xl border border-white/[0.06] bg-background/60 px-3.5 py-2 sm:py-2.5"
              style={{ "--s": 0.42 + (j / fieldCount) * 0.45 } as CSSProperties}
            >
              <dt className="text-xs text-muted-foreground">{f.label}</dt>
              <dd className="whitespace-nowrap font-mono text-sm tabular-nums text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {m.answer ? (
        <div className="voice-field rounded-xl border border-primary/25 bg-primary/[0.07] px-4 py-5" style={{ "--s": 0.5 } as CSSProperties}>
          <p className="font-[family-name:var(--font-display)] text-4xl tabular-nums tracking-tight text-foreground">{m.answer.figure}</p>
          <p className="mt-1.5 text-sm text-muted-foreground">{m.answer.caption}</p>
        </div>
      ) : null}

      {m.button ? (
        <span
          aria-hidden="true"
          className="voice-field voice-row mt-4 flex h-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground sm:mt-5 sm:h-11"
          style={{ "--s": 0.92 } as CSSProperties}
        >
          {m.button}
        </span>
      ) : null}
    </div>
  );
}

// Voice: one sticky stage where each sentence is "said" word by word as you
// scroll, and the form it fills rises out of a 3D deck of cards. Without JS or
// with reduced motion, the five cards simply sit in a grid.
// Features page, 08 / Voice: the journey's voice orb sits behind the heading
// (its last marks are here), then the stage takes over.
export function VoiceSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const n = moments.length;

    const target = () => {
      const scrollable = track.offsetHeight - window.innerHeight;
      return scrollable > 0 ? clamp01(-track.getBoundingClientRect().top / scrollable) : 0;
    };
    let current = target();
    let lastActive = -1;
    let listening: boolean | null = null;

    const draw = (p: number) => {
      const seg = Math.min(p * n, n - 0.0001);
      const i0 = Math.floor(seg);
      const f = seg - i0;
      // The deck holds still while a card fills, then turns to the next one.
      const deck = i0 + (i0 < n - 1 ? easeInOut(clamp01((f - SAY) / (1 - SAY))) : 0);
      const active = Math.round(deck);

      moments.forEach((_, i) => {
        const local = i < i0 ? 1 : i > i0 ? 0 : clamp01(f / SAY);
        const d = i - deck;
        const ad = Math.abs(d);
        const card = cardRefs.current[i];
        if (card) {
          card.style.setProperty("--local", local.toFixed(3));
          // The next card rises into place as the last one lifts away.
          card.style.transform = `translate3d(0, ${d * 12}%, 0) scale(${(1 - Math.min(ad, 1) * 0.04).toFixed(3)})`;
          card.style.opacity = String(clamp01(1 - (ad - 0.15) * 1.25));
          card.style.zIndex = String(10 - Math.round(ad * 2));
        }
        const line = lineRefs.current[i];
        if (line) {
          line.style.setProperty("--local", local.toFixed(3));
          line.style.opacity = String(clamp01(1 - ad * 2.2));
        }
      });

      if (active !== lastActive) {
        stepRefs.current.forEach((el, i) => el?.classList.toggle("is-active", i === active));
        lastActive = active;
      }
      // The waveform is lively while words are still arriving, then settles.
      const nowListening = f < SAY * 0.6;
      if (nowListening !== listening) {
        track.classList.toggle("is-listening", nowListening);
        listening = nowListening;
      }
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

    draw(current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section id="voice" className="section-shell relative z-10 scroll-mt-32 pt-24 lg:pt-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow section-label mb-6">08 / Voice</span>
          <h2 className="mb-5 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl">
            <span className="text-balance">Just say it</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
            Tap the mic and talk the way you would to a friend. 521 fills in the entry, the expense, the invoice or
            the booking, and nothing saves until you check it and tap.
          </p>
          <SceneMark name="voice-start" />
        </div>
      </div>
      {/* The journey fades out here, before the stage. */}
      <SceneMark name="scene-end" />

      <div ref={trackRef} className="voice-track relative">
        <div className="voice-stage voice-under-tabs mx-auto grid max-w-6xl content-center items-center gap-5 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16 lg:px-8">
          {/* What's being said, word by word, over a live waveform. */}
          <div className="voice-said">
            <ol className="voice-steps mb-8 hidden gap-2 lg:flex lg:flex-col">
              {moments.map((m, i) => (
                <li
                  key={m.id}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="voice-step flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  <span className="voice-step-tick h-px w-5 bg-current" />
                  {m.step}
                </li>
              ))}
            </ol>
            <Waveform />
            <div className="voice-lines mt-3 grid sm:mt-6">
              {moments.map((m, i) => {
                const words = m.said.split(" ");
                return (
                  <div
                    key={m.id}
                    aria-hidden="true"
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    className="voice-line [grid-area:1/1]"
                  >
                    <p className="text-balance text-xl leading-snug text-foreground sm:text-3xl lg:text-[2.6rem] lg:leading-[1.15]">
                      &ldquo;
                      {words.map((w, k) => (
                        <span key={k} className="voice-word" style={{ "--w": k / words.length } as CSSProperties}>
                          {w}
                          {k < words.length - 1 ? " " : ""}
                        </span>
                      ))}
                      &rdquo;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The forms, as a deck of cards in depth. */}
          <div className="voice-deck-stage">
            <div className="voice-deck grid">
              {moments.map((m, i) => (
                <div
                  key={m.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="voice-slot [grid-area:1/1]"
                >
                  <VoiceCard m={m} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-36">
        <div className="mx-auto mt-4 max-w-3xl text-center">
          <p className="mb-5 text-sm text-muted-foreground">
            Or skip opening the app. Say it to Siri, or set it on the Action Button:
          </p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {siriPhrases.map((phrase) => (
              <li
                key={phrase}
                className="rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-2 text-sm text-foreground"
              >
                &ldquo;{phrase}&rdquo;
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            Siri and the Action Button need iOS 16 or later. Ask 521 works out every answer from your own numbers.
          </p>
        </div>
      </div>
    </section>
  );
}
