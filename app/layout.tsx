import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: {
    default: 'FormerlyIncarcerated.org - Empowering Second Chances Through Web3',
    template: '%s | FormerlyIncarcerated.org'
  },
  description: 'Revolutionary Web3 platform breaking barriers and creating unprecedented opportunities for formerly incarcerated individuals. Join our community-driven ecosystem for reentry support, job placement, financial services, and blockchain-based empowerment.',
  keywords: [
    'formerly incarcerated',
    'reentry support',
    'second chances',
    'Web3 empowerment',
    'blockchain opportunities',
    'criminal justice reform',
    'employment assistance',
    'financial inclusion',
    'community support',
    'decentralized job marketplace',
    'skill verification',
    'peer-to-peer lending',
    'social impact',
    'rehabilitation',
    'economic empowerment',
    'digital inclusion',
    'smart contracts',
    'DeFi for good',
    'social justice',
    'reintegration'
  ],
  authors: [{ name: 'FormerlyIncarcerated.org Team' }],
  creator: 'FormerlyIncarcerated.org',
  publisher: 'FormerlyIncarcerated.org',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://formerlyincarcerated.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://formerlyincarcerated.org',
    title: 'FormerlyIncarcerated.org - Empowering Second Chances Through Web3',
    description: 'Revolutionary Web3 platform breaking barriers and creating unprecedented opportunities for formerly incarcerated individuals. Join our community-driven ecosystem for reentry support and blockchain-based empowerment.',
    siteName: 'FormerlyIncarcerated.org',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FormerlyIncarcerated.org - Empowering Second Chances Through Web3',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormerlyIncarcerated.org - Empowering Second Chances Through Web3',
    description: 'Revolutionary Web3 platform breaking barriers and creating opportunities for formerly incarcerated individuals.',
    images: ['/og-image.png'],
    creator: '@FormerlyIncarc',
    site: '@FormerlyIncarc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Social Impact',
  classification: 'Social Justice, Web3, Blockchain, Reentry Support',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative z-10 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 mb-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
