import type { Metadata } from 'next'
import { Geist, Sora } from 'next/font/google'
import { UtmCapture } from '@/components/utm-capture'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });

// Display face for headings; matches the geometric 521 wordmark.
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  metadataBase: new URL('https://stackin-app.com'),
  title: {
    default: '521 | Income Tracking App for Hourly Workers, Tips, and Gig Income',
    template: '%s | 521',
  },
  description:
    '521 is an income tracking app for hourly workers, freelancers, and gig workers. Track paychecks, tips, cash, and self-employed income in one place.',
  applicationName: '521',
  keywords: [
    'income tracking app',
    'tip tracker',
    'gig income tracker',
    'paycheck tracker',
    'self-employed income tracker',
    'hourly worker app',
    'freelancer income tracker',
    'cash tip tracker',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://stackin-app.com',
    siteName: '521',
    title: '521 | Income Tracking App for Hourly Workers, Tips, and Gig Income',
    description:
      'All your income. One place. Track paychecks, tips, cash, and gig income with 521.',
  },
  twitter: {
    card: 'summary',
    title: '521 | Income Tracking App for Hourly Workers, Tips, and Gig Income',
    description:
      'All your income. One place. Track paychecks, tips, cash, and gig income with 521.',
  },
  icons: {
    icon: [
      { url: '/icon.svg?v=3', type: 'image/svg+xml' },
      { url: '/icon-192.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png?v=3', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/icon-192.png?v=3'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={sora.variable}>
      <body className={`${_geist.className} font-sans antialiased`}>
        <UtmCapture />
        {children}
      </body>
    </html>
  )
}
