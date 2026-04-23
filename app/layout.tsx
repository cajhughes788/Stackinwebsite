import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/auth-provider'
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
      { url: '/icon-192.png', sizes: '183x88', type: 'image/png' },
      { url: '/icon-512.png', sizes: '484x232', type: 'image/png' },
    ],
    apple: [{ url: '/icon-192.png', sizes: '183x88', type: 'image/png' }],
    shortcut: ['/icon-192.png'],
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
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
