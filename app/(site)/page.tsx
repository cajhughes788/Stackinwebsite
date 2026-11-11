import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { InvoicingSection } from "@/components/invoicing-section";
import { ChargeSection } from "@/components/charge-section";
import { BookingSection } from "@/components/booking-section";
import { SecuritySection } from "@/components/security-section";
import { PricingSection } from "@/components/pricing-section";
import { FeaturesCTA } from "@/components/features/features-cta";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Reveal>
        <FeaturesSection />
      </Reveal>
      <Reveal>
        <InvoicingSection />
      </Reveal>
      <Reveal>
        <ChargeSection />
      </Reveal>
      <Reveal>
        <BookingSection />
      </Reveal>
      <Reveal>
        <SecuritySection />
      </Reveal>
      <Reveal>
        <PricingSection />
      </Reveal>
      <FeaturesCTA />
      <Footer />
    </main>
  );
}
