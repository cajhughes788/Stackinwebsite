import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { GetPaidSection } from "@/components/get-paid-section";
import { TrustStrip } from "@/components/trust-strip";
import { VoiceSection } from "@/components/voice-section";
import { PricingSection } from "@/components/pricing-section";
import { FeaturesCTA } from "@/components/features/features-cta";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

// Hero, one tabbed section for the ways clients pay you, voice (a sticky
// stage, so it sits outside Reveal), a trust strip, then pricing.
// The full feature detail lives on /features.
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Reveal>
        <GetPaidSection />
      </Reveal>
      <VoiceSection />
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
