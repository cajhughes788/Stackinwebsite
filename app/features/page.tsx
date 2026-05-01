"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturesHero } from "@/components/features/features-hero";
import { FeatureSection } from "@/components/features/feature-section";
import { FeaturesCTA } from "@/components/features/features-cta";
import {
  DollarSign,
  CreditCard,
  Zap,
  Clock,
  Calculator,
  CalendarDays,
  BarChart3,
  Wallet,
  Receipt,
  PieChart,
  FolderTree,
  Briefcase,
  Tag,
  Layers,
  Users,
  MapPin,
  Bell,
  Camera,
} from "lucide-react";

const everydayFeatures = [
  {
    icon: DollarSign,
    title: "Log income daily",
    description: "Track hourly pay, tips, and earnings in seconds",
  },
  {
    icon: CreditCard,
    title: "Multiple payment types",
    description: "Cash, credit card, Venmo, Apple Cash, Zelle, POS",
  },
  {
    icon: Zap,
    title: "Fast entry flow",
    description: "Minimal inputs, optimized for speed",
  },
];

const w2Features = [
  {
    icon: Clock,
    title: "Hourly + tip tracking",
    description: "Track shifts, tips, and total earnings",
  },
  {
    icon: Calculator,
    title: "Net paycheck calculator",
    description: "Estimate take-home pay automatically",
  },
  {
    icon: CalendarDays,
    title: "Custom pay periods",
    description: "Define your own pay schedule",
  },
  {
    icon: BarChart3,
    title: "Income breakdowns",
    description: "Clear gross totals by pay period",
  },
];

const independentFeatures = [
  {
    icon: Wallet,
    title: "Track all income streams",
    description: "Cash, card, and digital payments",
  },
  {
    icon: Receipt,
    title: "Expense tracking",
    description: "Log and categorize business expenses",
  },
  {
    icon: Camera,
    title: "Upload receipts",
    description: "Track all your receipts and build expenses from these receipts",
  },
  {
    icon: PieChart,
    title: "Profit and loss reports",
    description: "Monthly, quarterly, and yearly profit and loss summaries",
  },
  {
    icon: FolderTree,
    title: "Organized categories",
    description: "Understand where your money goes",
  },
];

const workspaceFeatures = [
  {
    icon: Briefcase,
    title: "Multiple workspaces",
    description: "Separate jobs or businesses",
  },
  {
    icon: Tag,
    title: "Custom names",
    description: "Label each workspace clearly",
  },
  {
    icon: Layers,
    title: "Flexible use cases",
    description: "W-2 multiple jobs or independent income streams",
  },
  {
    icon: Users,
    title: "Hybrid support",
    description: "Combine W-2 and independent tracking in one account",
  },
];

const reminderFeatures = [
  {
    icon: MapPin,
    title: "Location-based reminders",
    description: "Get prompted when you arrive at work",
  },
  {
    icon: Bell,
    title: "Time-based reminders",
    description: "Never forget to track your income",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FeaturesHero />
      
      <div className="relative">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <FeatureSection
          label="Daily Tracking"
          title="Everyday Income Tracking"
          description="Simple tools to track your earnings every day, no matter how you get paid."
          features={everydayFeatures}
          columns={3}
        />

        <FeatureSection
          label="W-2 Tools"
          title="Built for hourly workers"
          description="Track shifts, calculate net pay, and stay on top of your earnings."
          features={w2Features}
          columns={4}
        />

        <FeatureSection
          label="Independent Tools"
          title="Made for the self-employed"
          description="Track income, expenses, and profit with tools designed for independent work."
          features={independentFeatures}
          columns={4}
        />

        <FeatureSection
          label="Workspaces"
          title="Organize by job or business"
          description="Keep your income streams separate and organized with custom workspaces."
          features={workspaceFeatures}
          columns={4}
        />

        <FeatureSection
          label="Reminders"
          title="Never forget to track"
          description="Smart reminders that help you stay consistent with tracking."
          features={reminderFeatures}
          columns={2}
        />
      </div>

      <FeaturesCTA />
      <Footer />
    </main>
  );
}
