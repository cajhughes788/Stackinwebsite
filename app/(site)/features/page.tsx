"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturesHero } from "@/components/features/features-hero";
import { FeaturesCTA } from "@/components/features/features-cta";
import { SectionNav } from "@/components/features/section-nav";
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
      <Navbar />
      <FeaturesHero />
      <SectionNav />
      <IncomeSection />
      <InvoicingSection />
      <ChargeSection />
      <BookingSection />
      <PaychecksSection />
      <BusinessSection />
      <OrganizeSection />
      <FeaturesCTA />
      <Footer />
    </main>
  );
}
