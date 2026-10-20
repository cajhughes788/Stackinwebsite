import { CheckCircle2, CreditCard, Landmark } from "lucide-react";

// Illustrative invoice; the line items add up to the total shown, and the
// deposit is the part already paid.
const lineItems = [
  { name: "Brand photography, half day", amount: "$650.00" },
  { name: "Retouching, 20 images", amount: "$300.00" },
  { name: "Travel", amount: "$50.00" },
];

// The client's view: a clean invoice page in the sender's own brand, paid
// through Stripe checkout. The tag underneath shows what 521 does with it.
export function InvoiceMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-[420px]"
      role="img"
      aria-label="A branded invoice page a client opens to pay by card or bank transfer"
    >
      <div className="overflow-hidden rounded-xl bg-[#f6f5f1] text-[#161b1e] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
        {/* The sender's brand color */}
        <div className="h-1.5 bg-[#c2603a]" />

        <div className="px-6 pb-6 pt-5 sm:px-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c2603a] font-[family-name:var(--font-display)] text-sm font-semibold text-white">
                RS
              </span>
              <div>
                <p className="text-sm font-medium">Rivera Studio</p>
                <p className="text-[11px] text-[#5d656b]">Invoice #1042</p>
              </div>
            </div>
            <span className="rounded-full bg-[#e3efe7] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#1f7a4a]">
              Deposit paid
            </span>
          </div>

          <ul className="mb-4 space-y-2 border-b border-[#dddbd3] pb-4">
            {lineItems.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-3 text-[13px]">
                <span className="text-[#3c4449]">{item.name}</span>
                <span className="font-mono tabular-nums">{item.amount}</span>
              </li>
            ))}
          </ul>

          <dl className="mb-5 space-y-1.5 text-[13px]">
            <div className="flex justify-between">
              <dt className="text-[#5d656b]">Total</dt>
              <dd className="font-mono tabular-nums">$1,000.00</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#5d656b]">Deposit paid · Oct 2</dt>
              <dd className="font-mono tabular-nums">−$250.00</dd>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <dt className="font-medium">Balance due · Oct 24</dt>
              <dd className="font-[family-name:var(--font-display)] text-2xl tabular-nums tracking-tight">$750.00</dd>
            </div>
          </dl>

          <div className="mb-3 grid grid-cols-2 gap-2">
            <span className="flex items-center justify-center gap-2 rounded-lg bg-[#161b1e] py-2.5 text-[13px] font-medium text-white">
              <CreditCard className="h-4 w-4" strokeWidth={1.75} />
              Pay by card
            </span>
            <span className="flex items-center justify-center gap-2 rounded-lg border border-[#cfccc2] py-2.5 text-[13px] font-medium">
              <Landmark className="h-4 w-4" strokeWidth={1.75} />
              Bank transfer
            </span>
          </div>
          <p className="text-center text-[10px] text-[#5d656b]">Secure checkout by Stripe · Add a tip when you pay</p>
        </div>
      </div>

      {/* What happens on the 521 side once it's paid */}
      <div className="mx-auto -mt-3 flex w-[88%] items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
        <div className="min-w-0">
          <p className="truncate text-sm text-foreground">Rivera Studio · $750.00 paid</p>
          <p className="truncate text-[11px] text-muted-foreground">Added to income · Stripe fee logged as an expense</p>
        </div>
      </div>
    </div>
  );
}
