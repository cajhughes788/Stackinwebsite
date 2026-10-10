import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Bank sync, Venmo import, net pay breakdowns, expenses, receipts, and P&Ls. See how 521 brings every way you get paid into one place.",
  alternates: {
    canonical: "/features",
  },
}

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
