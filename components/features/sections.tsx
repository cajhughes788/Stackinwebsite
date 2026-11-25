import type { ReactNode } from "react";
import { PhoneShot } from "@/components/phone-shot";
import { AlsoIncluded, Highlights, SectionHeader, SectionShell, Tile } from "./blocks";
import { SceneMark } from "./scene/journey-scene";

// The Features sections, in the order of a worker's week: a client books, you
// get paid on the spot or later, the money lands, you see what you made. The
// eight sections. Each keeps the same parts (top three points,
// then everything else as a checklist) but gets its own shape, so readers can
// tell where one topic ends and the next begins.

/* ------------------------------------------------------------------ Income */

const paymentTypes = ["Bank deposits", "Zelle", "Venmo", "Cash", "Card", "Apple Pay", "Checks", "POS"];

export function IncomeSection() {
  return (
    <SectionShell id="income" tone="raised">
      <SceneMark name="income-start" />
      <SectionHeader
        label="04 / Income"
        title="Every way you get paid"
        description="Bank deposits, Venmo, and cash come together in one ledger, sorted for you."
        say="Made 270 today, worked 9 to 5"
      />

      {/* Every payment type, pouring into one ledger. */}
      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
        {paymentTypes.map((type) => (
          <span
            key={type}
            data-scene-cue="8:0-0.6"
            className="scene-chip rounded-full bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-foreground/80 ring-1 ring-white/[0.08]"
          >
            {type}
          </span>
        ))}
      </div>


      {/* Room for the chips to fly into the scene and the streams to pour, while it runs. */}
      <div aria-hidden="true" className="scene-gap scene-gap-lg" />
      <SceneMark name="income-chips" only="desktop" />
      <div aria-hidden="true" className="scene-gap" />

      <div data-aside-grid="income" className="mt-14 grid items-center gap-14 lg:mt-20 lg:grid-cols-[auto_1fr] lg:gap-20">
        <div data-aside-phone className="relative mx-auto w-full max-w-[22rem] lg:w-[22rem]">
          {/* Phones: Payment streams stays in full view a while longer, then shrinks into
              the scene from its middle to its foot. */}
          <SceneMark name="income-chips" only="phone" className="absolute inset-x-0 top-0" />
          <SceneMark name="income-phone" className="absolute inset-x-0 top-full lg:top-1/2" />
        <PhoneShot
          shot={{
            src: "/images/app/payment-streams.webp",
            alt: "The 521 app showing a month of income split by Zelle, Venmo, cash, card, Apple Pay, and checks",
            width: 720,
            height: 1100,
          }}
          morph={{ morph: "income" }}
          className="mx-auto"
        />
        </div>
        <div className="aside-col">
          <Highlights
            items={[
              {
                title: "Automatic bank import",
                description: "Connect through Plaid and new deposits and charges show up on their own.",
              },
              {
                title: "Categorization that learns",
                description: "Confirm a transaction once and 521 remembers it next time.",
              },
              {
                title: "One ledger for every payment",
                description: "Cash, card, Venmo, Apple Pay, Zelle, and POS, side by side and already sorted.",
              },
            ]}
          />
          <AlsoIncluded
            columns={1}
            className="mt-10"
            items={["Venmo history by CSV upload", "Instant new-transaction alerts", "Recurring income and expenses"]}
          />
        </div>
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- Invoicing */

const invoiceSteps = [
  {
    step: "Create",
    title: "Branded invoices in a minute",
    description: "Add your logo, colors, payment details, and policies once. Every invoice looks like you.",
  },
  {
    step: "Send",
    title: "However your client likes",
    description: "Email it from 521, text it, or share a link or PDF.",
  },
  {
    step: "Get paid",
    title: "Card, bank, Venmo, or Zelle",
    description:
      "Clients pay through Stripe's secure checkout. Venmo, Zelle, and checks are spotted in your bank and confirmed with one tap.",
  },
  {
    step: "Booked",
    title: "Already in your books",
    description: "Each payment becomes income on the day it arrived. Stripe fees are logged as expenses.",
  },
];

export function InvoicingSection() {
  return (
    <SectionShell id="invoicing">
      <div data-aside-grid="invoicing" className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="aside-col">
          <SectionHeader
            align="left"
            label="03 / Invoicing"
            title="Invoicing, built into your books"
            description="From the first draft to the money landing, every step keeps your profit, goals, and tax numbers right."
            say="Invoice Jenna Morales 120 for a cut and color, due Friday"
            className="mb-10"
          />

          {/* The life of an invoice, as a timeline. */}
          <ol className="relative space-y-8 before:absolute before:bottom-3 before:left-[7px] before:top-3 before:w-px before:bg-gradient-to-b before:from-primary/60 before:to-border">
            {invoiceSteps.map((item) => (
              <li key={item.step} className="relative pl-9">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-primary bg-surface"
                />
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">{item.step}</p>
                <h3 className="mb-1.5 text-xl font-normal leading-snug text-foreground">{item.title}</h3>
                <p className="max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div data-aside-phone className="relative mx-auto w-full max-w-[22rem] lg:w-[22rem]">
          <PhoneShot
            shot={{
              src: "/images/app/invoices.webp",
              alt: "The 521 Invoices screen showing $14 waiting on clients, with one invoice overdue 8 days",
              width: 720,
              height: 888,
            }}
            cue={{ rect: [1.6, 83.1, 96.8, 16.6], at: "5:0-0.3" }}
            morph={{ morph: "invoicing" }}
            className="mx-auto"
          />
          {/* Phones: the same, for the Invoices screen. */}
          <SceneMark name="charge-end" only="phone" className="absolute inset-x-0 top-[15%]" />
          <SceneMark name="invoicing-row" className="absolute inset-x-0 top-full lg:top-1/2" />
        </div>
      </div>


      {/* Desktop: the stamp and the fold play over the card, with the text stepped aside. */}
      <div className="hidden lg:block">
        <SceneMark name="invoicing-end" />
      </div>
      <AlsoIncluded
        className="mt-14 lg:mt-20"
        items={[
          "Deposits with their own due date",
          "Optional tips at checkout",
          "Reminders before and after the due date",
          "An alert the moment a client pays",
          "Refunds and disputes tracked on the invoice",
          "Deposits never counted twice",
        ]}
      />
      {/* Phones: the copy sits over the middle of the scene, so the stamp landing
          and the invoice folding into a plane each get open space below the card. */}
      <div className="lg:hidden">
        <div aria-hidden="true" className="scene-gap" />
        <SceneMark name="invoicing-end" />
        <div aria-hidden="true" className="scene-gap scene-gap-xl" />
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------------ Charge */

const chargeSteps = [
  "Type the amount and tap Show QR.",
  "Your customer scans it and pays with card, Apple Pay, or Google Pay.",
  "Your screen flips to Paid, and it's already in your books.",
];

export function ChargeSection() {
  return (
    <SectionShell id="charge" tone="raised" endMark="charge-end" endMarkDesktopOnly>
      <SectionHeader
        label="02 / Charge"
        title="Take a payment on the spot"
        description="Show a QR code and your customer pays on their own phone. No card reader needed."
      />

      {/* Steps, phone, points: the phone sits in the middle of the story. */}
      <div data-aside-grid="charge" className="mt-14 grid items-center gap-14 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
        <ol className="aside-col aside-backed mx-auto w-full max-w-sm space-y-7 lg:mx-0">
          {chargeSteps.map((step, index) => (
            <li key={step} className="flex gap-5">
              <span className="font-[family-name:var(--font-display)] text-4xl font-light leading-none tabular-nums text-primary/70">
                {index + 1}
              </span>
              <p className="pt-1 text-base leading-relaxed text-foreground">{step}</p>
            </li>
          ))}
        </ol>

        <div data-aside-phone className="relative mx-auto w-full max-w-[22rem] lg:w-[22rem]">
          <PhoneShot
            shot={{
              src: "/images/app/charge.webp",
              alt: "The 521 Charge screen set to $45 for an early check-in, with Ask for a tip turned on",
              width: 720,
              height: 786,
            }}
            cue={{ rect: [1.7, 86.8, 96.7, 12.2], at: "2:0.45-0.75", round: true }}
            morph={{ morph: "charge", overlay: { src: "/images/app/charge-qr.webp", at: "2:0.62" } }}
            className="mx-auto"
          />
          {/* Phones: the QR lifts once the whole screenshot is on screen (booking-end here
              puts that at about its middle), and leaves by its foot. */}
          <SceneMark name="booking-end" only="phone" className="absolute inset-x-0 top-[15%]" />
          <SceneMark name="charge-qr" className="absolute inset-x-0 top-full lg:top-[45%]" />
        </div>

        <ul className="aside-col aside-backed mx-auto w-full max-w-sm space-y-6 lg:mx-0">
          {[
            ["Tips built in", "15%, 20%, 25%, or a custom tip. Turn it off for any charge."],
            ["Paid straight to you", "Money goes into your own Stripe account. 521 never holds it."],
            ["In your books automatically", "Recorded as income with the tip and Stripe fee included."],
          ].map(([title, description]) => (
            <li key={title} className="border-l-2 border-primary/50 pl-5">
              <h3 className="mb-1 text-lg font-normal text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>


      <AlsoIncluded
        className="mt-14 lg:mt-20"
        items={[
          "Send a payment link instead",
          "Turn it into an invoice if they'll pay later",
          "Watch it go from Waiting to Paid live",
        ]}
      />
    </SectionShell>
  );
}

/* ----------------------------------------------------------------- Booking */

function TileTitle({ title, description }: { title: string; description: string }) {
  return (
    <>
      <h3 className="mb-1.5 text-lg font-normal leading-snug text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </>
  );
}

/** A small piece of app UI that sits at the top of a tile. */
function Fragment({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 rounded-xl bg-background/70 p-3.5 text-[13px] ring-1 ring-white/[0.06]">{children}</div>
  );
}

export function BookingSection() {
  return (
    <SectionShell id="booking" endMark="booking-end" endMarkDesktopOnly>
      <SectionHeader
        label="01 / Booking"
        title="Booking that gets you paid"
        description="A booking page clients can use any time, with deposits, reminders, and one-tap checkout, all connected to your books."
        say="Book Jenna Thursday at 2 for a cut"
      />

      <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-[auto_1fr] lg:gap-14">
        <div data-aside-phone className="relative mx-auto w-full max-w-[22rem] lg:w-[22rem]">
          {/* The Sample Client appointment lifts off between these two marks. On phones
              it waits until the whole screenshot is on screen (from its middle to its foot). */}
          <SceneMark name="booking-lift" className="absolute inset-x-0 top-1/2 lg:top-0" />
          <SceneMark name="booking-start" className="absolute inset-x-0 top-full lg:top-[85%]" />
          <PhoneShot
            shot={{
              src: "/images/app/booking.webp",
              alt: "The 521 booking calendar with a haircut appointment on the day view",
              width: 720,
              height: 972,
            }}
            morph={{ morph: "booking", hole: { rect: [18.1, 81.1, 76.4, 12.3], color: "rgb(40, 49, 53)" } }}
            className="mx-auto"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Tile>
            <Fragment>
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-muted-foreground">app.the521app.com/book</span>
                <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Book now
                </span>
              </div>
            </Fragment>
            <TileTitle
              title="Your own booking page"
              description="Clients pick a service and an open time, any time. Share the link, a QR code, or a button on your site."
            />
          </Tile>

          <Tile>
            <Fragment>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Deposit paid</span>
                <span className="tabular-nums text-primary">$20.00</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Free to cancel until Thu, 5:00 PM</p>
            </Fragment>
            <TileTitle
              title="Deposits that protect your time"
              description="Cancel before your cutoff and it's refunded automatically. After it, you keep it."
            />
          </Tile>

          <Tile>
            <Fragment>
              <p className="text-foreground">Reminder: Haircut tomorrow, 2:00 PM</p>
              <p className="mt-1 text-xs text-muted-foreground">Deposit paid $20 · Balance due $25</p>
            </Fragment>
            <TileTitle
              title="Reminders that cut no-shows"
              description="Up to two emails, from a week to an hour before, with the deposit, balance, and cancel deadline."
            />
          </Tile>

          <Tile>
            <Fragment>
              <div className="space-y-1 tabular-nums">
                <div className="flex justify-between text-muted-foreground">
                  <span>Haircut</span>
                  <span>$45.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Deposit</span>
                  <span>−$20.00</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-1 text-foreground">
                  <span>Due</span>
                  <span>$25.00</span>
                </div>
              </div>
            </Fragment>
            <TileTitle
              title="Finish and get paid"
              description="The deposit is subtracted. Collect by QR code, cash, or invoice, and it's recorded as income."
            />
          </Tile>

          <AlsoIncluded
            columns={2}
            className="sm:col-span-2"
            items={[
              "Price, length, buffer, and deposit per service",
              "Weekly hours, days off, and booking rules",
              "Book now button for Squarespace, Wix, or Shopify",
              "Book clients yourself",
              "Clients cancel or reschedule on their own",
              "Double-booking blocked",
              "Push alerts for every booking change",
              "Calendar and list views",
              "Syncs with Google, Apple, and Outlook",
            ]}
          />
        </div>
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- Paychecks */

// Example numbers. They add up: 3,068.16 − 1,549.72 = 1,518.44, and Social
// Security (6.2%) and Medicare (1.45%) match the gross.
const withholding = [
  { label: "Federal income tax", amount: 512.4 },
  { label: "State income tax", amount: 168.75 },
  { label: "Social Security", amount: 190.23 },
  { label: "Medicare", amount: 44.49 },
  { label: "401(k)", amount: 633.85 },
];
const gross = 3068.16;
const takeHome = 1518.44;
const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function PayStub() {
  return (
    <Tile className="mx-auto w-full max-w-md shadow-raised">
      <div className="mb-5 flex items-baseline justify-between">
        <p className="eyebrow">Pay period</p>
        <p className="text-xs text-muted-foreground">Example</p>
      </div>

      <p className="text-sm text-muted-foreground">Gross pay</p>
      <p className="mb-5 font-[family-name:var(--font-display)] text-3xl tabular-nums text-foreground">{money(gross)}</p>

      {/* How the gross splits between withholding and take-home. */}
      <div className="mb-5 flex h-2 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden="true">
        <div className="bg-primary" style={{ width: `${(takeHome / gross) * 100}%` }} />
        {withholding.map((line, index) => (
          <div
            key={line.label}
            className="border-l border-surface"
            style={{ width: `${(line.amount / gross) * 100}%`, background: `rgb(236 235 230 / ${0.32 - index * 0.05})` }}
          />
        ))}
      </div>

      <dl className="space-y-2 text-sm tabular-nums">
        {withholding.map((line) => (
          <div key={line.label} className="flex justify-between">
            <dt className="text-muted-foreground">{line.label}</dt>
            <dd className="text-foreground/80">−{money(line.amount)}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-3">
          <dt className="text-foreground">Take-home</dt>
          <dd className="font-[family-name:var(--font-display)] text-2xl text-primary">{money(takeHome)}</dd>
        </div>
      </dl>

      <div className="mt-6 rounded-xl bg-background/70 p-3.5 ring-1 ring-white/[0.06]">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-muted-foreground">Hours this week</span>
          <span className="tabular-nums text-foreground">32 of 40</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-4/5 rounded-full bg-primary" />
        </div>
      </div>
    </Tile>
  );
}

export function PaychecksSection() {
  return (
    <SectionShell id="paychecks" tone="raised">
      <SceneMark name="paychecks-start" />
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            align="left"
            label="06 / Paychecks"
            title="Paychecks, explained"
            description="See what you earned, what was withheld, and what you actually take home."
            say="9 to 5, 40 in card tips"
            className="mb-10"
          />
          <Highlights
            items={[
              {
                title: "Net pay, line by line",
                description: "Federal, state, FICA, and 401(k) withholding, built from your real W-4 details.",
              },
              {
                title: "Shifts, hours, and tips",
                description: "Every shift and tip adds up to an accurate gross total, on weekly, biweekly, or custom pay periods.",
              },
              {
                title: "A weekly hours goal",
                description: "Set a target and watch your progress right on your earnings page.",
              },
            ]}
          />
        </div>
        <div className="relative">
          <PayStub />
          <SceneMark name="paychecks-stub" className="absolute inset-x-0 bottom-0" />
        </div>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------------------------------------- Business */

export function BusinessSection() {
  return (
    <SectionShell id="business" endMark="business-end">
      <SectionHeader
        label="05 / Business"
        title="Run your business with clarity"
        description="Expenses, receipts, and profit, organized for tax time and every day before it."
        say="Spent 42 on gas at Shell yesterday"
      />
      <SceneMark name="business-start" />

      <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
        {[
          ["Expenses with receipts", "Log and categorize expenses as they happen, with a photo of the receipt attached."],
          ["Profit and loss", "Monthly, quarterly, and yearly P&Ls, ready whenever you need them."],
          ["Mileage deductions", "Log business miles and 521 applies the IRS rate for you."],
        ].map(([title, description], index) => (
          <Tile key={title} className="flex gap-4 md:block">
            <span className="block font-[family-name:var(--font-display)] text-sm tabular-nums leading-7 text-primary md:mb-4 md:leading-normal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <TileTitle title={title} description={description} />
            </div>
          </Tile>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Plus custom categories, so your reports match how you work.
      </p>



      <div className="mt-14 lg:mt-20">
        <PhoneShot
          shot={{
            src: "/images/app/profit-and-loss.webp",
            alt: "The 521 Profit & Loss screen with a monthly statement and business income by payment app for tax time",
            width: 720,
            height: 850,
          }}
          className="mx-auto"
        />
      </div>
    </SectionShell>
  );
}

/* ---------------------------------------------------------------- Organize */

export function OrganizeSection() {
  return (
    <SectionShell id="organize" size="sm">
      <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <SceneMark name="organize-mid" className="absolute inset-x-0 top-1/2" />
        <div>
          <SectionHeader
            align="left"
            label="07 / Organization"
            title="Organized your way"
            description="Workspaces and reminders that keep everything current without extra effort."
            say="How much did I make this week?"
            sayLabel="Ask 521"
            className="mb-8"
          />
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {[
              ["Separate workspaces", "Each job or business in its own space."],
              ["W-2 and business together", "Paychecks and independent income side by side."],
              ["Location reminders", "A nudge when you arrive at or leave work."],
              ["Daily reminders", "A quick prompt to keep your numbers current."],
            ].map(([title, description]) => (
              <div key={title}>
                <dt className="mb-1 text-base text-foreground">{title}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <PhoneShot
          shot={{
            src: "/images/app/workspaces.webp",
            alt: "The 521 home screen totaling a business and a day job in one monthly income figure",
            width: 720,
            height: 490,
          }}
          className="mx-auto"
        />
      </div>

    </SectionShell>
  );
}
