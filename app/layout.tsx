import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/auth-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Income Tracking Made Simple",
  description: 'Track everything in one place. Know exactly what you earn, save, and keep.',
  openGraph: {
    title: 'Income Tracking Made Simple',
    description: 'Track everything in one place. Know exactly what you earn, save, and keep.',
  },
  twitter: {
    card: 'summary',
    title: 'Income Tracking Made Simple',
    description: 'Track everything in one place. Know exactly what you earn, save, and keep.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', rel: 'shortcut icon', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
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
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
