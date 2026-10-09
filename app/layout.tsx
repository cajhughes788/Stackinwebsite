import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { UtmCapture } from '@/components/utm-capture'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://stackin-app.com'),
  title: {
    default: 'StackIn | Income Tracking App for Hourly Workers, Tips, and Gig Income',
    template: '%s | StackIn',
  },
  description:
    'StackIn is an income tracking app for hourly workers, freelancers, and gig workers. Track paychecks, tips, cash, and self-employed income in one place.',
  applicationName: 'StackIn',
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
    siteName: 'StackIn',
    title: 'StackIn | Income Tracking App for Hourly Workers, Tips, and Gig Income',
    description:
      'Track paychecks, tips, cash, and gig income in one place with StackIn.',
  },
  twitter: {
    card: 'summary',
    title: 'StackIn | Income Tracking App for Hourly Workers, Tips, and Gig Income',
    description:
      'Track paychecks, tips, cash, and gig income in one place with StackIn.',
  },
  icons: {
    icon: [
      { url: '/icon.svg?v=2', type: 'image/svg+xml' },
      { url: '/icon-192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=2', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png?v=2', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/icon-192.png?v=2'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.className} font-sans antialiased`}>
        <UtmCapture />
        {children}
      </body>
    </html>
  )
}
