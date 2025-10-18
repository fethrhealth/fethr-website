import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/composite/navbar'
import { SITE_CONFIG } from '@/lib/constants'
import { Analytics } from '@/components/analytics'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  keywords: ['healthcare', 'integration', 'AI', 'automation', 'health technology', 'EHR', 'FHIR', 'HL7', 'interoperability'],
  authors: [{ name: 'Fethr' }],
  creator: 'Fethr',
  publisher: 'Fethr',
  robots: 'index, follow',
  metadataBase: new URL(SITE_CONFIG.url),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: 'Fethr Health',
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: 'Fethr Health - Intelligent Healthcare Automation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: '@fethrhealth',
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
        <Analytics />
      </body>
    </html>
  )
}