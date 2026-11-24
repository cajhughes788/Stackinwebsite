"use client";

import Image from "next/image";
import { ArrowUpRight, Banknote, Landmark, Smartphone } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useDepth } from "./use-depth";

// Illustrative numbers; the five streams add up to the total shown.
const streams: { name: string; detail: string; amount: string; share: number; mark: ReactNode }[] = [
  { name: "Direct deposit", detail: "Paycheck", amount: "$1,542.00", share: 44, mark: <Landmark className="h-4 w-4" /> },
  { name: "Venmo", detail: "Client payments", amount: "$756.20", share: 22, mark: "V" },
  { name: "Cash", detail: "Logged in app", amount: "$504.77", share: 14, mark: <Banknote className="h-4 w-4" /> },
  { name: "Zelle", detail: "Via your bank", amount: "$402.10", share: 12, mark: "Z" },
  { name: "Apple Pay", detail: "Via your bank", amount: "$277.10", share: 8, mark: <Smartphone className="h-4 w-4" /> },
];

const TOTAL = 3482.17;
const formatUsd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

// Odometer: each digit is a strip of 0-9 twice that rolls to its digit once
// the mockup is in view (CSS keyed on `.is-playing`). Without JS it renders
// the final value. Right-hand digits spin a touch longer, like a real counter.
function Odometer({ value }: { value: string }) {
  const digits = value.replace(/\D/g, "").length;
  let seen = 0;
  return (
    <span className="inline-flex" aria-label={value}>
      {value.split("").map((char, i) => {
        if (!/\d/.test(char)) return <span key={i} aria-hidden="true">{char}</span>;
        const fromRight = digits - ++seen;
        return (
          <span key={i} aria-hidden="true" className="inline-block h-[1em] overflow-hidden leading-none">
            <span
              className="odo-col flex flex-col"
              style={{
                ["--to" as string]: `${-(10 + Number(char)) * 5}%`,
                transitionDuration: `${1.3 + fromRight * 0.12}s`,
              }}
            >
              {Array.from({ length: 20 }, (_, n) => (
                <span key={n} className="h-[1em]">{n % 10}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

// Layers behind the screen that give the phone its thickness (see .phone-slab).
const SLABS = 8;

export function IncomeMockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  // The phone turns to face you as it scrolls in, leans away as it leaves, and
  // on a mouse leans toward the pointer.
  useDepth(rootRef, { pointer: true });

  // Start the count and the stream animations when the phone scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-playing");
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="mockup phone-stage relative mx-auto w-full max-w-[340px]" aria-label="521 app showing total income across five payment streams" role="img">
      <div aria-hidden="true" className="phone-floor" />
      <div className="phone-3d">
        {Array.from({ length: SLABS }, (_, i) => (
          <span key={i} aria-hidden="true" className={i === SLABS - 1 ? "phone-slab phone-back" : "phone-slab"} style={{ "--z": i + 1 } as CSSProperties} />
        ))}
      <div className="preserve-3d relative rounded-[2.75rem] border border-border bg-[#0e1214] p-2.5 shadow-raised">
        <div className="preserve-3d rounded-[2.25rem] bg-background px-5 pb-6 pt-4">
          {/* Status bar */}
          <div className="mb-5 flex items-center justify-between text-[11px] font-medium text-foreground/80">
            <span>9:41</span>
            <span className="h-5 w-20 rounded-full bg-[#0e1214]" />
            <span className="tracking-widest">•••</span>
          </div>

          <Image src="/images/521-logo.svg" alt="" width={147} height={77} className="depth-1 mb-5 h-6 w-auto" />

          {/* Total */}
          <div className="depth-3 mb-6 rounded-xl border border-border bg-card px-4 py-4 shadow-[0_18px_30px_-18px_rgb(0_0_0_/_0.9)]">
            <p className="text-xs text-muted-foreground">Total income · this month</p>
            <div className="mt-1 flex items-end justify-between">
              <p className="font-[family-name:var(--font-display)] text-3xl leading-none tabular-nums tracking-tight text-foreground">
                <Odometer value={formatUsd(TOTAL)} />
              </p>
              <p className="mb-1 flex items-center gap-0.5 text-xs font-medium text-primary">
                <ArrowUpRight className="h-3.5 w-3.5" />
                12%
              </p>
            </div>
          </div>

          <p className="mb-3 text-xs font-medium text-muted-foreground">Payment streams</p>
          <ul className="depth-2 space-y-3.5">
            {streams.map((stream, index) => (
              <li
                key={stream.name}
                className="stream-in flex items-center gap-3"
                style={{ animationDelay: `${300 + index * 140}ms` }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-semibold text-foreground">
                  {stream.mark}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm text-foreground">{stream.name}</p>
                    <p className="font-mono text-[13px] tabular-nums text-foreground">{stream.amount}</p>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11px] text-muted-foreground">{stream.detail}</p>
                    <p className="font-mono text-[10px] tabular-nums text-muted-foreground">{stream.share}%</p>
                  </div>
                  <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-secondary">
                    <span
                      className="bar-grow block h-full rounded-full bg-primary"
                      style={{ width: `${stream.share}%`, animationDelay: `${500 + index * 140}ms` }}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

        {/* A payment arriving, floating in front of the glass. */}
        <div aria-hidden="true" className="phone-toast">
          <div className="toast-in">
            <div className="toast-bob flex items-center gap-3 rounded-2xl border border-white/10 bg-[#161c1f] py-2.5 pl-2.5 pr-4 shadow-raised">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">V</span>
              <span className="leading-tight">
                <span className="block text-[11px] text-muted-foreground">Venmo · just now</span>
                <span className="block font-mono text-sm tabular-nums text-foreground">+$45.00</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
