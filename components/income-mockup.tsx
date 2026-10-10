import Image from "next/image";
import { ArrowUpRight, Banknote, Landmark, Smartphone } from "lucide-react";
import type { ReactNode } from "react";

// Illustrative numbers; the five streams add up to the total shown.
const streams: { name: string; detail: string; amount: string; share: number; mark: ReactNode }[] = [
  { name: "Direct deposit", detail: "Paycheck", amount: "$1,542.00", share: 44, mark: <Landmark className="h-4 w-4" /> },
  { name: "Venmo", detail: "Client payments", amount: "$756.20", share: 22, mark: "V" },
  { name: "Cash", detail: "Logged in app", amount: "$504.77", share: 14, mark: <Banknote className="h-4 w-4" /> },
  { name: "Zelle", detail: "Via your bank", amount: "$402.10", share: 12, mark: "Z" },
  { name: "Apple Cash", detail: "Via your bank", amount: "$277.10", share: 8, mark: <Smartphone className="h-4 w-4" /> },
];

export function IncomeMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]" aria-label="521 app showing total income across five payment streams" role="img">
      <div className="rounded-[2.75rem] border border-border bg-[#0c1416] p-2.5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
        <div className="overflow-hidden rounded-[2.25rem] bg-background px-5 pb-6 pt-4">
          {/* Status bar */}
          <div className="mb-5 flex items-center justify-between text-[11px] font-medium text-foreground/80">
            <span>9:41</span>
            <span className="h-5 w-20 rounded-full bg-[#0c1416]" />
            <span className="tracking-widest">•••</span>
          </div>

          <Image src="/images/521-logo.svg" alt="" width={147} height={77} className="mb-5 h-6 w-auto" />

          {/* Total */}
          <div className="mb-6 rounded-2xl border border-border bg-card px-4 py-4">
            <p className="text-xs text-muted-foreground">Total income · this month</p>
            <div className="mt-1 flex items-end justify-between">
              <p className="font-[family-name:var(--font-display)] text-3xl text-foreground">$3,482.17</p>
              <p className="mb-1 flex items-center gap-0.5 text-xs font-medium text-primary">
                <ArrowUpRight className="h-3.5 w-3.5" />
                12%
              </p>
            </div>
          </div>

          <p className="mb-3 text-xs font-medium text-muted-foreground">Payment streams</p>
          <ul className="space-y-3.5">
            {streams.map((stream) => (
              <li key={stream.name} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-semibold text-foreground">
                  {stream.mark}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm text-foreground">{stream.name}</p>
                    <p className="text-sm tabular-nums text-foreground">{stream.amount}</p>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11px] text-muted-foreground">{stream.detail}</p>
                    <p className="text-[11px] tabular-nums text-muted-foreground">{stream.share}%</p>
                  </div>
                  <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-secondary">
                    <span className="block h-full rounded-full bg-primary" style={{ width: `${stream.share}%` }} />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
