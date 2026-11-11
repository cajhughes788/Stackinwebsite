import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SupportForm } from "@/components/support-form";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with 521: answers to common questions, or send our team a message about your account, billing, or bank connection.",
  alternates: {
    canonical: "/support",
  },
};

const faqs = [
  {
    question: "Is my bank login safe?",
    answer:
      "Yes. You connect your bank through Plaid, and your banking username and password go directly to Plaid or your bank. 521 never sees or stores them.",
  },
  {
    question: "Which payment sources does 521 bring together?",
    answer:
      "Connect your bank through Plaid to pull in deposits automatically, including paychecks, Zelle, and Apple Pay transfers that land in your account. You can import Venmo history with a CSV upload and log cash in the app.",
  },
  {
    question: "How do I disconnect my bank?",
    answer:
      "Disconnect a linked account from within the app at any time. Access is revoked immediately, even if you keep your 521 account.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Request deletion in the app or by emailing us. Without an active paid plan, your data is deleted promptly. With one, deletion happens when your current paid period ends.",
  },
  {
    question: "Which plan do I need?",
    answer:
      "Essential is free and covers paychecks: hours, net pay after taxes, and pay periods. Pro is for business income, with expenses, P&Ls, invoicing, Charge, and booking. Complete is everything in Pro plus your paychecks, so W-2 and business income sit side by side.",
  },
  {
    question: "Why do I import Venmo instead of connecting it?",
    answer:
      "Venmo payments that stay in your Venmo balance never reach your bank, so your bank connection can't see them. Download your Venmo statement as a CSV and upload it in 521 to bring that history in.",
  },
  {
    question: "How do I get paid by card through 521?",
    answer:
      "Connect your own Stripe account once in Invoice settings. Invoice payments, Charge payments, and booking deposits go straight into that account. 521 never holds your money, and Stripe's processing fees are recorded as business expenses for you.",
  },
  {
    question: "Is 521 on Android or the web?",
    answer:
      "521 is on iPhone and the web today, with the same account on both. Android is coming soon.",
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="eyebrow mb-6">Support</p>
            <h1 className="mb-6 text-4xl font-normal leading-[1.08] text-foreground sm:text-5xl">
              How can we help?
            </h1>
            <span className="brand-rule mx-auto mb-6" />
            <p className="text-lg text-muted-foreground">
              Find a quick answer below, or email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-foreground underline-offset-4 hover:underline">
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </div>

          <div className="mb-16 divide-y divide-border rounded-2xl border border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base text-foreground">
                  {faq.question}
                  <span className="text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>

          <SupportForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
