import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";

// Self-hosted at build time (no request to Google). Fraunces and Inter are
// variable fonts (one file each); Plex Mono loads only the weights the reel uses.
const display = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Reel",
  description: "521 promo reel.",
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
  return <div className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</div>;
}
