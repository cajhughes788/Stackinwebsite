import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the StackIn privacy policy.",
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card/50 p-8 shadow-sm sm:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
            Privacy
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            This page explains how StackIn collects, uses, and protects information when you use
            our website and services.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground sm:text-base">
            <section>
              <h2 className="text-xl font-semibold text-foreground">Information we collect</h2>
              <p className="mt-3">
                We may collect information you provide directly, such as your email address, phone
                number, account details, subscription details, and any information you submit while
                using StackIn.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">How we use information</h2>
              <p className="mt-3">
                We use information to provide and improve StackIn, create and manage accounts,
                process subscriptions, communicate with you, respond to support requests, and help
                keep the service secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Sharing</h2>
              <p className="mt-3">
                We may share information with service providers that help us operate the service,
                such as hosting, analytics, authentication, and payment providers. We may also
                disclose information when required by law or to protect our rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Data retention</h2>
              <p className="mt-3">
                We keep information for as long as needed to provide the service, comply with legal
                obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Your choices</h2>
              <p className="mt-3">
                You can contact us to request updates or deletion of your account information,
                subject to any legal or operational requirements that require us to retain certain
                records.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3">
                If you have questions about this policy, contact StackIn through the support
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
