import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the StackIn terms of use.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card/50 p-8 shadow-sm sm:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
            Terms
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
            Terms of Use
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            These terms govern your access to and use of StackIn and the StackIn website.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground sm:text-base">
            <section>
              <h2 className="text-xl font-semibold text-foreground">Use of the service</h2>
              <p className="mt-3">
                You may use StackIn only in compliance with applicable laws and these terms. You
                are responsible for maintaining the confidentiality of your account and for activity
                that occurs under it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Subscriptions and billing</h2>
              <p className="mt-3">
                Paid features may require a subscription. Pricing, billing intervals, and plan
                details are described on the website or in the app and may change over time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Acceptable use</h2>
              <p className="mt-3">
                You agree not to misuse the service, interfere with its operation, attempt
                unauthorized access, or use StackIn to violate the rights of others.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Intellectual property</h2>
              <p className="mt-3">
                StackIn and its content, branding, and software are owned by StackIn or its
                licensors and are protected by applicable intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Disclaimer</h2>
              <p className="mt-3">
                StackIn is provided on an as-is and as-available basis. We do not guarantee that
                the service will be uninterrupted, error-free, or suitable for every use case.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3">
                If you have questions about these terms, contact StackIn through the support
                channel listed in the app or on the website.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
