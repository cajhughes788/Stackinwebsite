import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LegalTermsContent } from "@/components/legal-content";
import { TERMS_PAGE_DESCRIPTION, TERMS_PAGE_TITLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: TERMS_PAGE_TITLE,
  description: TERMS_PAGE_DESCRIPTION,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card/50 p-8 shadow-sm sm:p-12">
          <LegalTermsContent />
        </div>
      </section>
      <Footer />
    </main>
  );
}
