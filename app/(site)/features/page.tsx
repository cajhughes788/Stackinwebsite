"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturesHero } from "@/components/features/features-hero";
import { FeatureSection } from "@/components/features/feature-section";
import { FeaturesCTA } from "@/components/features/features-cta";

const incomeFeatures = [
  {
    title: "Automatic bank import",
    description: "Connect through Plaid and new deposits and charges show up on their own.",
  },
  {
    title: "Categorization that learns",
    description: "Confirm a transaction once and 521 remembers it next time.",
  },
  {
    title: "Instant alerts",
    description: "Get notified the moment a new transaction comes in.",
  },
  {
    title: "Venmo import",
    description: "Bring in your Venmo history with a CSV upload.",
  },
  {
    title: "Every payment type",
    description: "Cash, card, Venmo, Apple Pay, Zelle, and POS, all in one ledger.",
  },
  {
    title: "Recurring transactions",
    description: "Mark income or expenses as repeating and 521 logs them for you.",
  },
];

const invoicingFeatures = [
  {
    title: "Branded invoices in a minute",
    description: "Add your logo, colors, payment details, and policies once. Every invoice looks like you.",
  },
  {
    title: "Send it your way",
    description: "Email it from 521, text it, or share a link or PDF.",
  },
  {
    title: "Card or bank transfer",
    description: "Clients open a clean invoice page and pay through Stripe's secure checkout.",
  },
  {
    title: "Deposits and tips",
    description: "Ask for a deposit up front with its own due date, and offer an optional tip at the end.",
  },
  {
    title: "Venmo, Zelle, and checks, matched",
    description: "521 recognizes an invoice payment when it lands in your connected bank. Confirm it with one tap.",
  },
  {
    title: "Booked automatically",
    description: "Every payment becomes income, dated the day the money actually arrived.",
  },
  {
    title: "Fees and deposits, handled",
    description: "Stripe fees are recorded as business expenses, and a deposit that pays an invoice is never counted twice.",
  },
  {
    title: "Reminders and paid alerts",
    description: "Friendly reminders before and after the due date, and a notification the moment a client pays.",
  },
  {
    title: "Refunds and disputes, tracked",
    description: "Refunds, deposits, and card disputes are recorded right on the invoice.",
  },
];

const chargeFeatures = [
  {
    title: "Show a QR code, get paid",
    description: "Type an amount, tap Show QR, and your customer pays on their own phone. No card reader needed.",
  },
  {
    title: "Card, Apple Pay, or Google Pay",
    description: "Customers pay through Stripe's secure checkout, right from their phone.",
  },
  {
    title: "Tips built in",
    description: "Customers can choose 15%, 20%, 25%, or a custom tip. Turn it off for any charge.",
  },
  {
    title: "Watch it land",
    description: "Your screen goes from Waiting for payment to Paid the moment they pay, with the amount and tip.",
  },
  {
    title: "Or send a link",
    description: "Text or share the payment link instead of showing the QR code.",
  },
  {
    title: "They'll pay later? Make it an invoice",
    description: "Turn the charge into an invoice with the same link, a due date, and automatic reminders if it's late.",
  },
  {
    title: "Paid straight to you",
    description: "Money goes into your own connected Stripe account, and 521 never holds it. Set it up once in Invoice settings.",
  },
  {
    title: "In your books automatically",
    description: "Every charge is recorded as income, with the tip and Stripe fee included. No manual entry.",
  },
];

const bookingFeatures = [
  {
    title: "Services your way",
    description: "Set a price, length, buffer time, and optional deposit for each service, and choose which ones clients can book online.",
  },
  {
    title: "Hours, days off, and rules",
    description: "Weekly hours with more than one block per day, days off, minimum notice, how far ahead clients can book, and slot length.",
  },
  {
    title: "Your booking link and QR code",
    description: "Your own page at app.the521app.com/book, plus a printable QR code. Shared links show your logo.",
  },
  {
    title: "A Book now button for your site",
    description: "Pick the text and color, copy the code, and follow the steps for Squarespace, Wix, or Shopify. See which bookings came from your site.",
  },
  {
    title: "Book clients yourself",
    description: "Pick the client, service, and time. They get a confirmation link by email, or a text ready to send from your phone.",
  },
  {
    title: "Deposits with automatic refunds",
    description: "Clients pay a deposit by card to confirm. Cancel before your cutoff and it's refunded automatically. After it, you keep it.",
  },
  {
    title: "Reminders that cut no-shows",
    description: "Up to two email reminders, from a week to an hour before, showing the deposit paid, balance due, and free-cancel deadline.",
  },
  {
    title: "Cancel and reschedule, handled",
    description: "Clients can cancel or move their appointment from their own page. You can change any time, and double-booking is blocked.",
  },
  {
    title: "Notified at every step",
    description: "A push notification for every new booking, confirmation, cancellation, and reschedule. Clients are emailed automatically too.",
  },
  {
    title: "Finish & get paid",
    description: "Add extras or a discount, and the deposit is subtracted. Collect by QR code, cash, or invoice, and it's recorded as income.",
  },
  {
    title: "Calendar and list views",
    description: "A week strip and day timeline show your appointments. Tap an empty time to book it.",
  },
  {
    title: "Works with your calendar",
    description: "Block busy times from up to three Google, Apple, or Outlook calendars, and subscribe to your 521 appointments there.",
  },
];

const paycheckFeatures = [
  {
    title: "Net pay, line by line",
    description: "Federal, state, FICA, and 401(k) withholding, built from your real W-4 details.",
  },
  {
    title: "Shifts, hours, and tips",
    description: "Every shift and tip adds up to an accurate gross total.",
  },
  {
    title: "Your pay schedule",
    description: "Weekly, biweekly, or custom pay periods that match your employer.",
  },
  {
    title: "Weekly hours goal",
    description: "Set a target and track your progress right on your earnings page.",
  },
];

const businessFeatures = [
  {
    title: "Expense tracking",
    description: "Log and categorize business expenses as they happen.",
  },
  {
    title: "Receipts attached",
    description: "Snap a photo of each receipt so proof is always on hand.",
  },
  {
    title: "Profit and loss",
    description: "Monthly, quarterly, and yearly P&Ls, ready when you need them.",
  },
  {
    title: "Mileage deductions",
    description: "Log business miles and 521 applies the IRS rate.",
  },
  {
    title: "Custom categories",
    description: "Create your own categories so your reports match how you work.",
  },
];

const organizeFeatures = [
  {
    title: "Separate workspaces",
    description: "Keep each job or business in its own space.",
  },
  {
    title: "Paychecks and business, together",
    description: "Track W-2 and independent income side by side in one account.",
  },
  {
    title: "Location reminders",
    description: "A nudge when you arrive at or leave work.",
  },
  {
    title: "Daily reminders",
    description: "A daily prompt to keep your numbers current.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FeaturesHero />
      
      <FeatureSection
        id="income"
        label="01 / Income"
        title="Every way you get paid"
        description="Bank deposits, Venmo, and cash come together in one ledger, sorted for you."
        features={incomeFeatures}
        columns={3}
        screenshot={{ src: "/images/app/payment-streams.webp", alt: "The 521 app showing a month of income split by Zelle, Venmo, cash, card, Apple Pay, and checks", width: 720, height: 1100 }}
      />

      <FeatureSection
        id="invoicing"
        label="02 / Invoicing"
        title="Invoicing, built into your books"
        description="Bill clients, get paid, and keep your profit, goals, and tax numbers accurate without any spreadsheet work."
        features={invoicingFeatures}
        columns={3}
        screenshot={{ src: "/images/app/invoices.webp", alt: "The 521 Invoices screen showing $14 waiting on clients, with one invoice overdue 8 days", width: 720, height: 888 }}
        reverse
      />

      <FeatureSection
        id="charge"
        label="03 / Charge"
        title="Take a payment on the spot"
        description="Show a QR code and your customer pays on their own phone. It lands in your books with the tip and fee included."
        features={chargeFeatures}
        columns={4}
        screenshot={{ src: "/images/app/charge.webp", alt: "The 521 Charge screen set to $45 for an early check-in, with Ask for a tip turned on", width: 720, height: 786 }}
      />

      <FeatureSection
        id="booking"
        label="04 / Booking"
        title="Booking that gets you paid"
        description="A booking page clients can use any time, with deposits, automatic reminders, and one-tap checkout, all connected to your books."
        features={bookingFeatures}
        columns={3}
        screenshot={{ src: "/images/app/booking.webp", alt: "The 521 booking calendar with a haircut appointment on the day view", width: 720, height: 972 }}
        reverse
      />

      <FeatureSection
        id="paychecks"
        label="05 / Paychecks"
        title="Paychecks, explained"
        description="See what you earned, what was withheld, and what you actually take home."
        features={paycheckFeatures}
        columns={4}
        screenshot={{ src: "/images/app/paycheck.webp", alt: "A 521 pay period showing $3,068.16 gross pay and about $1,518.44 take-home", width: 720, height: 340 }}
      />

      <FeatureSection
        id="business"
        label="06 / Business"
        title="Run your business with clarity"
        description="Expenses, receipts, and profit, organized for tax time and every day before it."
        features={businessFeatures}
        columns={3}
        screenshot={{ src: "/images/app/profit-and-loss.webp", alt: "The 521 Profit & Loss screen with a monthly statement and business income by payment app for tax time", width: 720, height: 850 }}
        reverse
      />

      <FeatureSection
        id="organize"
        label="07 / Organization"
        title="Organized your way"
        description="Workspaces and reminders that keep everything current without extra effort."
        features={organizeFeatures}
        columns={4}
        screenshot={{ src: "/images/app/workspaces.webp", alt: "The 521 home screen totaling a business and a day job in one monthly income figure", width: 720, height: 490 }}
      />

      <FeaturesCTA />
      <Footer />
    </main>
  );
}
