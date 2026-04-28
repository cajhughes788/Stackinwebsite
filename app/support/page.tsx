import type { Metadata } from "next";
import { Clock3, MessageCircleMore, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SupportForm } from "@/components/support-form";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with StackIn, report a problem, ask a question, or send feedback through our public support page.",
  alternates: {
    canonical: "/support",
  },
};

const supportHighlights = [
  {
    icon: MessageCircleMore,
    title: "One support pipeline",
    description:
      "Website submissions are packaged to flow into the same backend support path your app already uses.",
  },
  {
    icon: ShieldCheck,
    title: "Useful context included",
    description:
      "We attach page, browser, and device details so the team has enough signal to troubleshoot without a long back-and-forth.",
  },
  {
    icon: Clock3,
    title: "Best for general help",
    description:
      "Use this page for account questions, app issues, onboarding help, and product feedback when you’re not already inside the app.",
  },
] as const;

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-24 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute right-[8%] top-1/3 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-secondary/80 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              StackIn Support
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Help, questions, and feedback in one place
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              If you need help with StackIn and you’re not already in the app, use this page to send a message directly to the support team.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div className="space-y-4">
              {supportHighlights.map((highlight) => {
                const Icon = highlight.icon;

                return (
                  <div
                    key={highlight.title}
                    className="rounded-3xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">{highlight.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="rounded-3xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-foreground">Using the app right now?</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The in-app <span className="font-medium text-foreground">Need Help?</span> flow is still the best place for account-specific troubleshooting because it carries the richest context.
                </p>
              </div>
            </div>

            <SupportForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
