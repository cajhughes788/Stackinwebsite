import type { Metadata } from "next";
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

        <div className="relative mx-auto max-w-3xl">
          <div className="mt-6">
            <SupportForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
