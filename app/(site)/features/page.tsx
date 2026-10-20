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
      />

      <FeatureSection
        id="invoicing"
        label="02 / Invoicing"
        title="Invoicing, built into your books"
        description="Bill clients, get paid, and keep your profit, goals, and tax numbers accurate without any spreadsheet work."
        features={invoicingFeatures}
        columns={3}
      />

      <FeatureSection
        id="paychecks"
        label="03 / Paychecks"
        title="Paychecks, explained"
        description="See what you earned, what was withheld, and what you actually take home."
        features={paycheckFeatures}
        columns={4}
      />

      <FeatureSection
        id="business"
        label="04 / Business"
        title="Run your business with clarity"
        description="Expenses, receipts, and profit, organized for tax time and every day before it."
        features={businessFeatures}
        columns={3}
      />

      <FeatureSection
        id="organize"
        label="05 / Organization"
        title="Organized your way"
        description="Workspaces and reminders that keep everything current without extra effort."
        features={organizeFeatures}
        columns={4}
      />

      <FeaturesCTA />
      <Footer />
    </main>
  );
}
