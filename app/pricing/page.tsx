import { AppFlowShell } from "@/components/app-flow-shell";
import { PricingSection } from "@/components/pricing-section";

export default function PricingPage() {
  return (
    <AppFlowShell contentClassName="max-w-5xl">
      <PricingSection presentation="app" />
    </AppFlowShell>
  );
}
