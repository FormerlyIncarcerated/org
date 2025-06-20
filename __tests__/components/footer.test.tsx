import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'

// Mock the config
jest.mock('@/lib/config', () => ({
  siteConfig: {
    name: 'Formerly Incarcerated Empowerment Platform',
    links: {
      twitter: 'https://twitter.com/test',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/test',
      discord: 'https://discord.gg/test',
    },
    contact: {
      email: 'contact@test.com',
      support: 'support@test.com',
      partnerships: 'partnerships@test.com',
    },
  },
}))

describe('Footer Component', () => {
  it('renders the brand section', () => {
    render(<Footer />)
    
    expect(screen.getByText('FI Empowerment')).toBeInTheDocument()
    expect(screen.getByText(/Building second chances through Web3 technology/)).toBeInTheDocument()
  })

  it('renders platform navigation links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Platform')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Programs' })).toHaveAttribute('href', '/programs')
    expect(screen.getByRole('link', { name: 'Community Survey' })).toHaveAttribute('href', '/survey')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })

  it('renders resources section', () => {
    render(<Footer />)
    
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs')
    expect(screen.getByRole('link', { name: 'Whitepaper' })).toHaveAttribute('href', '/whitepaper')
    expect(screen.getByRole('link', { name: 'Roadmap' })).toHaveAttribute('href', '/roadmap')
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/faq')
  })

  it('renders contact information', () => {
    render(<Footer />)
    
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('General Inquiries')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
    expect(screen.getByText('Partnerships')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Footer />)
    
    // Check for social media links (they should have the correct href attributes)
    const socialLinks = screen.getAllByRole('link')
    const twitterLink = socialLinks.find(link => link.getAttribute('href')?.includes('twitter'))
    const githubLink = socialLinks.find(link => link.getAttribute('href')?.includes('github'))
    const linkedinLink = socialLinks.find(link => link.getAttribute('href')?.includes('linkedin'))
    const discordLink = socialLinks.find(link => link.getAttribute('href')?.includes('discord'))
    
    expect(twitterLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
    expect(linkedinLink).toBeInTheDocument()
    expect(discordLink).toBeInTheDocument()
  })

  it('renders copyright information', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })

  it('renders legal links', () => {
    render(<Footer />)
    
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms')
    expect(screen.getByRole('link', { name: 'Cookie Policy' })).toHaveAttribute('href', '/cookies')
  })

  it('renders community section', () => {
    render(<Footer />)
    
    expect(screen.getByText('Join Our Community')).toBeInTheDocument()
    expect(screen.getByText(/safe space for formerly incarcerated individuals/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Join Discord/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Take Survey/ })).toBeInTheDocument()
  })
})
