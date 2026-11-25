"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturesHero } from "@/components/features/features-hero";
import { FeaturesCTA } from "@/components/features/features-cta";
import { SectionNav } from "@/components/features/section-nav";
import { VoiceSection } from "@/components/features/voice-section";
import { JourneyScene, SceneMark } from "@/components/features/scene/journey-scene";
import {
  BookingSection,
  BusinessSection,
  ChargeSection,
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
      <VoiceSection />
      {/* The close of the page is solid black: it rises over the scene, so the voice
          orb is gone from "All your income. One place." down. */}
      <div className="relative z-10 bg-background">
        <FeaturesCTA />
        <Footer />
      </div>
      {/* The journey ends at the foot of the page, so it never finishes early. */}
      <SceneMark name="scene-end" />
    </main>
  );
}
