import localFont from 'next/font/local'
import type { Metadata } from 'next'
import './globals.css'

// Load ABCFavorit fonts once globally
const ABCFavorit = localFont({
  src: [
    {
      path: './fonts/ABCFavorit-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/ABCFavorit-ExtendedBold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-abc-favorit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fethr - Integrate systems in minutes',
  description: 'Create beautiful, AI-optimized docs that automatically adapt to your users and drive conversion',
  keywords: ['documentation', 'AI', 'docs', 'intelligent', 'platform', 'integration', 'systems'],
  authors: [{ name: 'Fethr' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Fethr - Integrate systems in minutes',
    description: 'Create beautiful, AI-optimized docs that automatically adapt to your users and drive conversion',
    type: 'website',
    siteName: 'Fethr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fethr - Integrate systems in minutes',
    description: 'Create beautiful, AI-optimized docs that automatically adapt to your users and drive conversion',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ABCFavorit.variable}>
      <body className={`${ABCFavorit.className} min-h-screen bg-white antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}