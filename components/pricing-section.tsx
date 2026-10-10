"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { ProcessingOverlay } from "@/components/processing-overlay";
import type { AppSource } from "@/lib/app-source";
import { getAppSource, withAppSource } from "@/lib/app-source";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

// `tier` is the billing ID sent to checkout; only the display names changed.
const plans = [
  {
    name: "Essential",
    tier: "w2_basic",
    price: "Free",
    period: "",
    description: "Your paychecks, tracked and explained",
    features: [
      "Track paychecks and hours",
      "Net pay after federal, state, and FICA",
      "Custom pay periods",
      "Earnings reports",
      "Export and share paystub summaries",
    ],
    cta: "Get started",
    recommended: false,
  },
  {
    name: "Pro",
    tier: "independent_basic",
    price: "$12.99",
    period: "/month",
    description: "For freelancers and business owners",
    features: [
      "Every income stream in one place",
      "Expense tracking with receipt uploads",
      "Advanced analytics",
      "Monthly, quarterly, and yearly P&Ls",
    ],
    cta: "Choose Pro",
    recommended: false,
  },
  {
    name: "Complete",
    tier: "hybrid_plus",
    price: "$13.99",
    period: "/month",
    description: "Paychecks and business income, side by side",
    features: [
      "Everything in Essential and Pro",
      "Unlimited income sources",
      "Custom categories",
    ],
    cta: "Choose Complete",
    recommended: true,
  },
];

type PricingSectionProps = {
  source?: AppSource | null;
};

export function PricingSection({ source = null }: PricingSectionProps) {
  return (
    <Suspense fallback={<PricingSectionContent source={source} />}>
      <PricingSectionWithSearchParams fallbackSource={source} />
    </Suspense>
  );
}

function PricingSectionWithSearchParams({
  fallbackSource,
}: {
  fallbackSource: AppSource | null;
}) {
  const searchParams = useSearchParams();
  const source = getAppSource(searchParams.get("source")) ?? fallbackSource;

  return <PricingSectionContent source={source} />;
}

function PricingSectionContent({ source }: { source: AppSource | null }) {
  const router = useRouter();
  const { user, authLoading } = useAuth();
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleCheckout(tier: string) {
    setError("");

    if (authLoading) {
      return;
    }

    if (!user) {
      const nextPath = withAppSource("/#pricing", source);
      const signupParams = new URLSearchParams({
        next: nextPath,
        // Lets the signup record which plan the person was going for.
        plan: tier,
      });

      if (source) {
        signupParams.set("source", source);
      }

      router.push(`/signup?${signupParams.toString()}`);
      return;
    }

    const checkoutEndpoint = process.env.NEXT_PUBLIC_API_CREATE_CHECKOUT_SESSION;
    if (!checkoutEndpoint) {
      setError("Checkout is not configured yet.");
      return;
    }

    try {
      setActiveTier(tier);
      const idToken = await user.getIdToken();
      const payload = source ? { tier, source } : { tier };

      const response = await fetch(checkoutEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.ok || !data.url) {
        throw new Error(data?.error ?? "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Unable to start checkout."));
      setActiveTier(null);
    }
  }

  return (
    <section id="pricing" className="scroll-mt-16 border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProcessingOverlay
          open={activeTier !== null}
          label="Redirecting to payment..."
          fullscreen
        />
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="eyebrow mb-4 inline-block">03 / Pricing</span>
          <h2 className="mb-4 text-3xl font-normal text-foreground sm:text-4xl">
            <span className="text-balance">Simple, transparent pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start with your paychecks. Add your business when you&apos;re ready. No hidden fees.
          </p>
          {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
        </div>

        {/* Pricing Cards */}
        <div className="grid items-start gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={`relative rounded-lg border bg-card p-8 ${
                plan.recommended ? "border-primary" : "border-border"
              }`}
            >
              {plan.recommended ? (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                  Recommended
                </span>
              ) : null}

              <div className="mb-6">
                <h3 className="text-xl font-medium text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-foreground">{plan.price}</span>
                <span className="font-mono text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <Button
                onClick={() => handleCheckout(plan.tier)}
                disabled={authLoading || activeTier === plan.tier}
                variant={plan.recommended ? "default" : "outline"}
                className={`mb-8 h-11 w-full ${
                  plan.recommended ? "" : "border-border text-foreground hover:bg-secondary"
                }`}
              >
                {activeTier === plan.tier ? "Redirecting to payment..." : plan.cta}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Already subscribed? W-2 is now Essential, Independent is now Pro, and Hybrid is now Complete.
        </p>
      </div>
    </section>
  );
}
