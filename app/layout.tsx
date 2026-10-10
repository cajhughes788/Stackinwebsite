import type { Metadata } from 'next'
import { Geist, IBM_Plex_Mono, Sora } from 'next/font/google'
import { UtmCapture } from '@/components/utm-capture'
import { APP_STORE_URL, COMPANY_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });

// Display face for headings; matches the geometric 521 wordmark.
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

// Monospace accents: section labels, numbers, and figures.
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '521 | All Your Income. One Place.',
    template: '%s | 521',
  },
  description:
    '521 brings every way you get paid into one clear view. Connect your bank, import Venmo, and see paychecks, transfers, and cash together, with net pay and profit built in.',
  applicationName: '521',
  keywords: [
    'income dashboard',
    'all payments in one place',
    'income tracking app',
    'Venmo Zelle direct deposit tracker',
    'net pay calculator',
    'freelancer income and expenses',
    'profit and loss app',
    'bank sync income tracker',
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
    url: SITE_URL,
    siteName: '521',
    title: '521 | All Your Income. One Place.',
    description:
      'Every way you get paid, in one clear view. Paychecks, Venmo, Zelle, and cash, together.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '521: All your income. One place.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '521 | All Your Income. One Place.',
    description:
      'Every way you get paid, in one clear view. Paychecks, Venmo, Zelle, and cash, together.',
    images: ['/og.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg?v=4', type: 'image/svg+xml' },
      { url: '/icon-192.png?v=4', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=4', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png?v=4', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/icon-192.png?v=4'],
  },
}

// Lets Google show 521 as an app, with its App Store listing.
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '521',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'iOS, Web',
  url: SITE_URL,
  downloadUrl: APP_STORE_URL,
  description: 'All your income in one place: paychecks, Venmo, Zelle, and cash, together.',
  publisher: { '@type': 'Organization', name: COMPANY_NAME },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body className={`${_geist.className} font-sans antialiased`}>
        {/* Marks JS as available so scroll reveals can start hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js = ''" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <UtmCapture />
        {children}
      </body>
    </html>
  )
}
