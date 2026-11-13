"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhoneShot, type Screenshot } from "./phone-shot";
import { Highlights, type Highlight } from "./features/blocks";

type Tool = {
  id: string;
  tab: string;
  title: string;
  description: string;
  points: Highlight[];
  link: { href: string; label: string };
  shot: Screenshot;
};

// Invoicing, Charge, and Booking are one idea (getting paid by clients), so the
// homepage shows them as tabs over one phone instead of three full sections.
const tools: Tool[] = [
  {
    id: "invoice",
    tab: "Invoice",
    title: "Invoices that keep your books right",
    description: "Bill clients and get paid by card, bank transfer, Venmo, or Zelle. Every payment lands in your books.",
    points: [
      {
        title: "Branded in under a minute",
        description: "Your logo, colors, payment details, and policies. Email it, text it, or share a link or PDF.",
      },
      {
        title: "Venmo, Zelle, or check? Covered.",
        description: "521 spots the payment when it lands in your connected bank. Confirm it with one tap.",
      },
      {
        title: "Reminders that do the chasing",
        description: "Friendly nudges before and after the due date, and an alert the moment a client pays.",
      },
    ],
    link: { href: "/features#invoicing", label: "Everything invoicing can do" },
    shot: {
      src: "/images/app/invoices.webp",
      alt: "The 521 Invoices screen showing $14 waiting on clients, with one invoice overdue 8 days",
      width: 720,
      height: 888,
    },
  },
  {
    id: "charge",
    tab: "Charge",
    title: "Take a card payment in seconds",
    description: "Show a QR code and your customer pays on their own phone through Stripe's secure checkout.",
    points: [
      {
        title: "No card reader needed",
        description: "Your customer's phone is the terminal. Show a QR code or text them the link.",
      },
      {
        title: "Tips built in",
        description: "Customers pick 15%, 20%, 25%, or a custom tip right at checkout.",
      },
      {
        title: "Paid straight to you",
        description: "Money goes into your own Stripe account, recorded with the tip and fee. 521 never holds it.",
      },
    ],
    link: { href: "/features#charge", label: "How Charge works" },
    shot: {
      src: "/images/app/charge.webp",
      alt: "The 521 Charge screen set to $45 for an early check-in, with Ask for a tip turned on",
      width: 720,
      height: 786,
    },
  },
  {
    id: "book",
    tab: "Book",
    title: "Appointments that pay, start to finish",
    description: "Booking, deposits, reminders, and checkout, connected to your website, your calendar, and your books.",
    points: [
      {
        title: "Your own booking page",
        description: "Clients pick a service and an open time, any time. No back-and-forth.",
      },
      {
        title: "Deposits that protect your time",
        description: "Require a deposit to confirm. Refunds follow your cancellation policy automatically.",
      },
      {
        title: "Finish and get paid in one tap",
        description: "The deposit is subtracted, the balance is collected, and it's already in your books.",
      },
    ],
    link: { href: "/features#booking", label: "Everything booking can do" },
    shot: {
      src: "/images/app/booking.webp",
      alt: "The 521 booking calendar with a haircut appointment on the day view",
      width: 720,
      height: 972,
    },
  },
];

export function GetPaidSection() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tool = tools[active];

  // Arrow keys move between tabs, as screen reader users expect.
  function onKeyDown(event: KeyboardEvent) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + tools.length) % tools.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="get-paid" className="scroll-mt-16 bg-surface py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow section-label mb-6">01 / Get paid</span>
          <h2 className="mb-5 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl">
            <span className="text-balance">Get paid, your way</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
            Send an invoice, take a payment on the spot, or let clients book and pay a deposit. Every dollar lands in
            your books.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Ways to get paid"
          onKeyDown={onKeyDown}
          className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/[0.07]"
        >
          {tools.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls="get-paid-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={`rounded-full py-2.5 text-sm font-medium transition-colors ${
                  selected
                    ? "bg-primary text-primary-foreground shadow-[0_6px_20px_-8px_rgb(47_168_102_/_0.7)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.tab}
              </button>
            );
          })}
        </div>

        <div
          id="get-paid-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tool.id}`}
          className="mt-10 grid items-center gap-12 lg:mt-16 lg:grid-cols-[auto_1fr] lg:gap-20"
        >
          {/* All three phones share one spot and cross-fade, so the layout never jumps.
              On phones the copy comes first, so a tab tap changes what's right below it. */}
          <div className="order-2 grid lg:order-1">
            {tools.map((item, index) => (
              <div
                key={item.id}
                aria-hidden={index !== active}
                className={`[grid-area:1/1] transition-opacity duration-500 ${
                  index === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <PhoneShot shot={item.shot} className="mx-auto" />
              </div>
            ))}
          </div>

          {/* Keyed so the copy fades in fresh on each switch. */}
          <div key={tool.id} className="order-1 animate-in fade-in slide-in-from-bottom-2 duration-500 lg:order-2">
            <h3 className="mb-3 text-2xl font-normal leading-tight text-foreground sm:text-3xl">{tool.title}</h3>
            <p className="mb-10 max-w-lg text-base text-muted-foreground">{tool.description}</p>
            <Highlights items={tool.points} />
            <Link
              href={tool.link.href}
              className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
            >
              {tool.link.label}
              <ArrowRight className="h-4 w-4 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
