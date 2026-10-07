import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  variable: '--font-devanagari',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

const SITE_URL = 'https://shreepadmacharitabletrust.org'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Shree Padm Charitable Trust — Building a Child Beggar-Free Bhavnagar',
    template: '%s | Shree Padm Charitable Trust',
  },
  description:
    'Shree Padm Charitable Trust (S.P.C. Seva Trust) works in Bhavnagar, Gujarat to move children away from begging and toward education, dignity and opportunity. Support our mission for a Child Beggar-Free Bhavnagar.',
  keywords: [
    'Shree Padm Charitable Trust',
    'Shree Padm Charitable Trust Bhavnagar',
    'S.P.C. Seva Trust',
    'NGO in Bhavnagar',
    'child welfare NGO Bhavnagar',
    'child education NGO Bhavnagar',
    'child begging awareness Bhavnagar',
    'child education Gujarat',
    'child welfare Gujarat',
  ],
  authors: [{ name: 'Shree Padm Charitable Trust' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Shree Padm Charitable Trust',
    title: 'Shree Padm Charitable Trust — Building a Child Beggar-Free Bhavnagar',
    description:
      'Helping children in Bhavnagar move from the streets toward education, dignity and opportunity.',
    images: [{ url: '/images/hero.png', width: 1200, height: 630, alt: 'Children learning with the support of Shree Padm Charitable Trust' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shree Padm Charitable Trust — Building a Child Beggar-Free Bhavnagar',
    description:
      'Helping children in Bhavnagar move from the streets toward education, dignity and opportunity.',
    images: ['/images/hero.png'],
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f2e9',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Shree Padm Charitable Trust',
    alternateName: 'S.P.C. Seva Trust',
    description:
      'Charitable organization in Bhavnagar, Gujarat working toward a Child Beggar-Free Bhavnagar by connecting vulnerable children with education, guidance, dignity and opportunity.',
    url: SITE_URL,
    areaServed: { '@type': 'City', name: 'Bhavnagar' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bhavnagar',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    sameAs: ['https://www.instagram.com/shree.padma.charitable.trust/'],
  }

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${devanagari.variable} bg-background`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
