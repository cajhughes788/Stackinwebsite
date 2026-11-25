"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturesHero } from "@/components/features/features-hero";
import { FeaturesCTA } from "@/components/features/features-cta";
import { SectionNav } from "@/components/features/section-nav";
import { JourneyScene, SceneMark } from "@/components/features/scene/journey-scene";
import {
  BookingSection,
  BusinessSection,
  ChargeSection,
  FeaturesVoiceSection,
  IncomeSection,
  InvoicingSection,
  OrganizeSection,
  PaychecksSection,
} from "@/components/features/sections";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* The journey plays behind everything below (docs/features-journey.md). */}
      <JourneyScene />
      <Navbar />
      <FeaturesHero />
      <SectionNav />
      {/* The order of a worker's week (docs/features-journey.md). */}
      <BookingSection />
      <ChargeSection />
      <InvoicingSection />
      <IncomeSection />
      <BusinessSection />
      <PaychecksSection />
      <OrganizeSection />
      <FeaturesVoiceSection />
      <SceneMark name="scene-end" />
      <FeaturesCTA />
      <Footer />
    </main>
  );
}
