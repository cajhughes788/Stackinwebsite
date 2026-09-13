import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reel",
  description: "StackIn promo reel.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/reel",
  },
};

export default function ReelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
