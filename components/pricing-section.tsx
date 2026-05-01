"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { ProcessingOverlay } from "@/components/processing-overlay";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

function DollarWaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create dollar sign grid
    const cols = window.innerWidth < 768 ? 12 : 20;
    const rows = 8;
    const dollarSigns: HTMLSpanElement[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const span = document.createElement("span");
        span.textContent = "$";
        span.className = "dollar-sign";
        span.style.cssText = `
          position: absolute;
          left: ${(col / cols) * 100}%;
          top: ${(row / rows) * 100}%;
          font-size: ${window.innerWidth < 768 ? "1.5rem" : "2rem"};
          font-weight: 600;
          color: var(--primary);
          opacity: 0;
          transform: translateY(0);
          animation: dollarWave 4s ease-in-out infinite;
          animation-delay: ${(col * 0.15) + (row * 0.1)}s;
        `;
        container.appendChild(span);
        dollarSigns.push(span);
      }
    }

    return () => {
      dollarSigns.forEach((span) => span.remove());
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes dollarWave {
          0%, 100% {
            opacity: 0.06;
            transform: translateY(0) translateX(0);
          }
          25% {
            opacity: 0.1;
            transform: translateY(-8px) translateX(4px);
          }
          50% {
            opacity: 0.06;
            transform: translateY(0) translateX(8px);
          }
          75% {
            opacity: 0.1;
            transform: translateY(8px) translateX(4px);
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden blur-[0.5px]"
        aria-hidden="true"
      />
    </>
  );
}

const plans = [
  {
    name: "W-2",
    tier: "w2_basic",
    price: "$1.99",
    period: "/month",
    description: "Perfect for traditional employees",
    features: [
      "Track paycheck income",
      "Basic earnings reports",
      "Customizable pay stubs",
      "Share, export, and print pay stubs",
      "Access to net income at all times",
    ],
    cta: "Get Started",
  },
  {
    name: "Independent",
    tier: "independent_basic",
    price: "$12.99",
    period: "/month",
    description: "For freelancers and gig workers",
    features: [
      "Track multiple income streams",
      "Track expenses",
      "Upload receipts",
      "Advanced analytics",
      "Generate tax-ready monthly, quarterly, and yearly P&Ls",
    ],
    cta: "Get Started",
  },
  {
    name: "Hybrid",
    tier: "hybrid_plus",
    price: "$13.99",
    period: "/month",
    description: "For W-2 and independent workers",
    features: [
      "Includes all Independent functionality",
      "Includes all W-2 functionality",
      "Track unlimited income sources",
      "Custom categories",
    ],
    cta: "Get Started",
  },
];

export function PricingSection() {
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
      router.push(`/signup?next=${encodeURIComponent("/#pricing")}`);
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

      const response = await fetch(checkoutEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ tier }),
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
    <section id="pricing" className="relative overflow-hidden py-24 lg:py-32">
      {/* Animated Dollar Wave Background */}
      <DollarWaveBackground />
      
      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProcessingOverlay
          open={activeTier !== null}
          label="Redirecting to payment..."
          fullscreen
        />
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Pricing
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="text-balance">Choose your plan</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple pricing for every type of worker. No hidden fees.
          </p>
          {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-primary/60 bg-card/80 p-8 shadow-lg shadow-primary/10 transition-all duration-300 hover:border-primary hover:shadow-primary/20"
            >
              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() => handleCheckout(plan.tier)}
                disabled={authLoading || activeTier === plan.tier}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {activeTier === plan.tier ? "Redirecting to payment..." : plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
