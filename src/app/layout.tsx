import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/composite/navbar'
import { SITE_CONFIG } from '@/lib/constants'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  keywords: ['healthcare', 'integration', 'AI', 'automation', 'health technology'],
  authors: [{ name: 'Fethr' }],
  creator: 'Fethr',
  publisher: 'Fethr',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} font-inter antialiased`}>
        <div className="min-h-screen bg-primary-background">
          <Navbar />
          <main className="bg-primary-background">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}