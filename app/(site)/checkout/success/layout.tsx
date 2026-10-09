import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Created",
  description: "Your checkout is complete. Download the mobile app or access the StackIn web version.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/checkout/success",
  },
};

export default function CheckoutSuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
