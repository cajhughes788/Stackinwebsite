import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the StackIn plan that fits how you work.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
