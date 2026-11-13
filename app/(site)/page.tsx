import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { GetPaidSection } from "@/components/get-paid-section";
import { TrustStrip } from "@/components/trust-strip";
import { PricingSection } from "@/components/pricing-section";
import { FeaturesCTA } from "@/components/features/features-cta";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

// Hero, one tabbed section for the ways clients pay you, a trust strip, then
// pricing. The full feature detail lives on /features.
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Reveal>
        <GetPaidSection />
      </Reveal>
      <Reveal>
        <TrustStrip />
      </Reveal>
      <Reveal>
        <PricingSection />
      </Reveal>
      <FeaturesCTA />
      <Footer />
    </main>
  );
}
