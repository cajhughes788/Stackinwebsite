"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturesHero } from "@/components/features/features-hero";
import { FeatureSection } from "@/components/features/feature-section";
import { FeaturesCTA } from "@/components/features/features-cta";
import {
  Landmark,
  Sparkles,
  BellRing,
  Upload,
  CreditCard,
  Repeat,
  Calculator,
  Clock,
  CalendarDays,
  Target,
  Receipt,
  Camera,
  PieChart,
  Car,
  FolderTree,
  Briefcase,
  Layers,
  MapPin,
  Bell,
  Palette,
  Send,
  Wallet,
  HandCoins,
  ScanSearch,
  BookCheck,
  Percent,
  RotateCcw,
  QrCode,
  BellDot,
  ReceiptText,
  Settings2,
  CalendarRange,
  Link2,
  Globe,
  CalendarPlus,
  ShieldCheck,
  RefreshCw,
  CalendarSync,
} from "lucide-react";

const incomeFeatures = [
  {
    icon: Landmark,
    title: "Automatic bank import",
    description: "Connect through Plaid and new deposits and charges show up on their own.",
  },
  {
    icon: Sparkles,
    title: "Categorization that learns",
    description: "Confirm a transaction once and 521 remembers it next time.",
  },
  {
    icon: BellRing,
    title: "Instant alerts",
    description: "Get notified the moment a new transaction comes in.",
  },
  {
    icon: Upload,
    title: "Venmo import",
    description: "Bring in your Venmo history with a CSV upload.",
  },
  {
    icon: CreditCard,
    title: "Every payment type",
    description: "Cash, card, Venmo, Apple Pay, Zelle, and POS, all in one ledger.",
  },
  {
    icon: Repeat,
    title: "Recurring transactions",
    description: "Mark income or expenses as repeating and 521 logs them for you.",
  },
];

const invoicingFeatures = [
  {
    icon: Palette,
    title: "Branded invoices in a minute",
    description: "Add your logo, colors, payment details, and policies once. Every invoice looks like you.",
  },
  {
    icon: Send,
    title: "Send it your way",
    description: "Email it from 521, text it, or share a link or PDF.",
  },
  {
    icon: Wallet,
    title: "Card or bank transfer",
    description: "Clients open a clean invoice page and pay through Stripe's secure checkout.",
  },
  {
    icon: HandCoins,
    title: "Deposits and tips",
    description: "Ask for a deposit up front with its own due date, and offer an optional tip at the end.",
  },
  {
    icon: ScanSearch,
    title: "Venmo, Zelle, and checks, matched",
    description: "521 recognizes an invoice payment when it lands in your connected bank. Confirm it with one tap.",
  },
  {
    icon: BookCheck,
    title: "Booked automatically",
    description: "Every payment becomes income, dated the day the money actually arrived.",
  },
  {
    icon: Percent,
    title: "Fees and deposits, handled",
    description: "Stripe fees are recorded as business expenses, and a deposit that pays an invoice is never counted twice.",
  },
  {
    icon: BellRing,
    title: "Reminders and paid alerts",
    description: "Friendly reminders before and after the due date, and a notification the moment a client pays.",
  },
  {
    icon: RotateCcw,
    title: "Refunds and disputes, tracked",
    description: "Refunds, deposits, and card disputes are recorded right on the invoice.",
  },
];

const chargeFeatures = [
  {
    icon: QrCode,
    title: "Show a QR code, get paid",
    description: "Type an amount, tap Show QR, and your customer pays on their own phone. No card reader needed.",
  },
  {
    icon: Wallet,
    title: "Card, Apple Pay, or Google Pay",
    description: "Customers pay through Stripe's secure checkout, right from their phone.",
  },
  {
    icon: HandCoins,
    title: "Tips built in",
    description: "Customers can choose 15%, 20%, 25%, or a custom tip. Turn it off for any charge.",
  },
  {
    icon: BellDot,
    title: "Watch it land",
    description: "Your screen goes from Waiting for payment to Paid the moment they pay, with the amount and tip.",
  },
  {
    icon: Send,
    title: "Or send a link",
    description: "Text or share the payment link instead of showing the QR code.",
  },
  {
    icon: ReceiptText,
    title: "They'll pay later? Make it an invoice",
    description: "Turn the charge into an invoice with the same link, a due date, and automatic reminders if it's late.",
  },
  {
    icon: Landmark,
    title: "Paid straight to you",
    description: "Money goes into your own connected Stripe account, and 521 never holds it. Set it up once in Invoice settings.",
  },
  {
    icon: BookCheck,
    title: "In your books automatically",
    description: "Every charge is recorded as income, with the tip and Stripe fee included. No manual entry.",
  },
];

const bookingFeatures = [
  {
    icon: Settings2,
    title: "Services your way",
    description: "Set a price, length, buffer time, and optional deposit for each service, and choose which ones clients can book online.",
  },
  {
    icon: CalendarRange,
    title: "Hours, days off, and rules",
    description: "Weekly hours with more than one block per day, days off, minimum notice, how far ahead clients can book, and slot length.",
  },
  {
    icon: Link2,
    title: "Your booking link and QR code",
    description: "Your own page at app.the521app.com/book, plus a printable QR code. Shared links show your logo.",
  },
  {
    icon: Globe,
    title: "A Book now button for your site",
    description: "Pick the text and color, copy the code, and follow the steps for Squarespace, Wix, or Shopify. See which bookings came from your site.",
  },
  {
    icon: CalendarPlus,
    title: "Book clients yourself",
    description: "Pick the client, service, and time. They get a confirmation link by email, or a text ready to send from your phone.",
  },
  {
    icon: ShieldCheck,
    title: "Deposits with automatic refunds",
    description: "Clients pay a deposit by card to confirm. Cancel before your cutoff and it's refunded automatically. After it, you keep it.",
  },
  {
    icon: BellRing,
    title: "Reminders that cut no-shows",
    description: "Up to two email reminders, from a week to an hour before, showing the deposit paid, balance due, and free-cancel deadline.",
  },
  {
    icon: RefreshCw,
    title: "Cancel and reschedule, handled",
    description: "Clients can cancel or move their appointment from their own page. You can change any time, and double-booking is blocked.",
  },
  {
    icon: BellDot,
    title: "Notified at every step",
    description: "A push notification for every new booking, confirmation, cancellation, and reschedule. Clients are emailed automatically too.",
  },
  {
    icon: BookCheck,
    title: "Finish & get paid",
    description: "Add extras or a discount, and the deposit is subtracted. Collect by QR code, cash, or invoice, and it's recorded as income.",
  },
  {
    icon: CalendarDays,
    title: "Calendar and list views",
    description: "A week strip and day timeline show your appointments. Tap an empty time to book it.",
  },
  {
    icon: CalendarSync,
    title: "Works with your calendar",
    description: "Block busy times from up to three Google, Apple, or Outlook calendars, and subscribe to your 521 appointments there.",
  },
];

const paycheckFeatures = [
  {
    icon: Calculator,
    title: "Net pay, line by line",
    description: "Federal, state, FICA, and 401(k) withholding, built from your real W-4 details.",
  },
  {
    icon: Clock,
    title: "Shifts, hours, and tips",
    description: "Every shift and tip adds up to an accurate gross total.",
  },
  {
    icon: CalendarDays,
    title: "Your pay schedule",
    description: "Weekly, biweekly, or custom pay periods that match your employer.",
  },
  {
    icon: Target,
    title: "Weekly hours goal",
    description: "Set a target and track your progress right on your earnings page.",
  },
];

const businessFeatures = [
  {
    icon: Receipt,
    title: "Expense tracking",
    description: "Log and categorize business expenses as they happen.",
  },
  {
    icon: Camera,
    title: "Receipts attached",
    description: "Snap a photo of each receipt so proof is always on hand.",
  },
  {
    icon: PieChart,
    title: "Profit and loss",
    description: "Monthly, quarterly, and yearly P&Ls, ready when you need them.",
  },
  {
    icon: Car,
    title: "Mileage deductions",
    description: "Log business miles and 521 applies the IRS rate.",
  },
  {
    icon: FolderTree,
    title: "Custom categories",
    description: "Create your own categories so your reports match how you work.",
  },
];

const organizeFeatures = [
  {
    icon: Briefcase,
    title: "Separate workspaces",
    description: "Keep each job or business in its own space.",
  },
  {
    icon: Layers,
    title: "Paychecks and business, together",
    description: "Track W-2 and independent income side by side in one account.",
  },
  {
    icon: MapPin,
    title: "Location reminders",
    description: "A nudge when you arrive at or leave work.",
  },
  {
    icon: Bell,
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
        screenshot={{ src: "/images/app/payment-streams.png", alt: "The 521 app showing a month of income split by Zelle, Venmo, cash, card, Apple Pay, and checks", width: 720, height: 1100 }}
      />

      <FeatureSection
        id="invoicing"
        label="02 / Invoicing"
        title="Invoicing, built into your books"
        description="Bill clients, get paid, and keep your profit, goals, and tax numbers accurate without any spreadsheet work."
        features={invoicingFeatures}
        columns={3}
        screenshot={{ src: "/images/app/invoices.png", alt: "The 521 Invoices screen showing $14 waiting on clients, with one invoice overdue 8 days", width: 720, height: 888 }}
      />

      <FeatureSection
        id="charge"
        label="03 / Charge"
        title="Take a payment on the spot"
        description="Show a QR code and your customer pays on their own phone. It lands in your books with the tip and fee included."
        features={chargeFeatures}
        columns={4}
        screenshot={{ src: "/images/app/charge.png", alt: "The 521 Charge screen set to $45 for an early check-in, with Ask for a tip turned on", width: 720, height: 786 }}
      />

      <FeatureSection
        id="booking"
        label="04 / Booking"
        title="Booking that gets you paid"
        description="A booking page clients can use any time, with deposits, automatic reminders, and one-tap checkout, all connected to your books."
        features={bookingFeatures}
        columns={3}
        screenshot={{ src: "/images/app/booking.png", alt: "The 521 booking calendar with a haircut appointment on the day view", width: 720, height: 972 }}
      />

      <FeatureSection
        id="paychecks"
        label="05 / Paychecks"
        title="Paychecks, explained"
        description="See what you earned, what was withheld, and what you actually take home."
        features={paycheckFeatures}
        columns={4}
        screenshot={{ src: "/images/app/paycheck.png", alt: "A 521 pay period showing $3,068.16 gross pay and about $1,518.44 take-home", width: 720, height: 340 }}
      />

      <FeatureSection
        id="business"
        label="06 / Business"
        title="Run your business with clarity"
        description="Expenses, receipts, and profit, organized for tax time and every day before it."
        features={businessFeatures}
        columns={3}
        screenshot={{ src: "/images/app/profit-and-loss.png", alt: "The 521 Profit & Loss screen with a monthly statement and business income by payment app for tax time", width: 720, height: 850 }}
      />

      <FeatureSection
        id="organize"
        label="07 / Organization"
        title="Organized your way"
        description="Workspaces and reminders that keep everything current without extra effort."
        features={organizeFeatures}
        columns={4}
        screenshot={{ src: "/images/app/workspaces.png", alt: "The 521 home screen totaling a business and a day job in one monthly income figure", width: 720, height: 490 }}
      />

      <FeaturesCTA />
      <Footer />
    </main>
  );
}
