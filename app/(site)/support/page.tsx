import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SupportForm } from "@/components/support-form";
import { SUPPORT_EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { faqs } from "@/lib/support-faqs";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description:
    "Get help with 521: answers to common questions, or send our team a message about your account, billing, or bank connection.",
  path: "/support",
});



// The questions on this page as an FAQPage, so search and AI answers can quote them.
const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
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
