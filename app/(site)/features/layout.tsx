import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Features",
  description:
    "Booking with deposits, QR card payments, invoices, bank sync, Venmo import, net pay, expenses and P&Ls: how 521 puts every way you get paid in one place.",
  path: "/features",
});

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
