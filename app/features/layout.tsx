import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features for Paychecks, Tips, and Gig Income",
  description:
    "Explore StackIn features for tracking hourly pay, tips, self-employed income, expenses, and profit across multiple jobs or workspaces.",
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
