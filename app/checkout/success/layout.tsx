import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Created",
  description: "Your StackIn account is ready. Refresh the app and log in with your new credentials.",
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
