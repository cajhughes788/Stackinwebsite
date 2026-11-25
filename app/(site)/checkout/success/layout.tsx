import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Account Created",
  description: "Your checkout is complete. Download the mobile app or access the 521 web version.",
  path: "/checkout/success",
  index: false,
});

export default function CheckoutSuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
