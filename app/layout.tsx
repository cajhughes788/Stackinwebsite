import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Income Tracking Made Simple",
  description: 'Track everything in one place. Know exactly what you earn, save, and keep.',
  applicationName: 'StackIn',
  openGraph: {
    title: 'Income Tracking Made Simple',
    siteName: 'StackIn',
    description: 'Track everything in one place. Know exactly what you earn, save, and keep.',
  },
  twitter: {
    card: 'summary',
    title: 'Income Tracking Made Simple',
    description: 'Track everything in one place. Know exactly what you earn, save, and keep.',
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
