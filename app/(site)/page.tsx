import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { SecuritySection } from "@/components/security-section";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <PricingSection />
      <Footer />
    </main>
  );
}
