import { AuthProvider } from '@/components/auth-provider'

// Everything except the reel. The reel is embedded on the home page and never
// needs auth, so keeping AuthProvider here keeps Firebase out of its bundle.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AuthProvider>{children}</AuthProvider>
}
