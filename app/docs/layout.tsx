import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Documentation | FormerlyIncarcerated.org',
    template: '%s | Documentation | FormerlyIncarcerated.org'
  },
  description: 'Comprehensive documentation for FormerlyIncarcerated.org platform, Web3 technologies, and community resources.',
  openGraph: {
    title: 'Documentation | FormerlyIncarcerated.org',
    description: 'Comprehensive documentation for FormerlyIncarcerated.org platform, Web3 technologies, and community resources.',
    type: 'website',
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="docs-layout">
      {children}
    </div>
  )
}
