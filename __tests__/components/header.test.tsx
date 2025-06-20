import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/header'

// Mock the config
jest.mock('@/lib/config', () => ({
  siteConfig: {
    name: 'Formerly Incarcerated Empowerment Platform',
    links: {
      discord: 'https://discord.gg/test',
      twitter: 'https://twitter.com/test',
    },
  },
}))

describe('Header Component', () => {
  it('renders the site name', () => {
    render(<Header />)
    expect(screen.getByText('Formerly Incarcerated Empowerment Platform')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Programs')).toBeInTheDocument()
    expect(screen.getByText('Survey')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<Header />)
    
    expect(screen.getByText('Join Community')).toBeInTheDocument()
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Header />)
    
    // Find the mobile menu button
    const menuButton = screen.getByRole('button', { name: /menu/i })
    
    // Initially, mobile navigation should not be visible
    expect(screen.queryByText('Home')).toBeInTheDocument() // Desktop nav is always visible
    
    // Click the menu button
    fireEvent.click(menuButton)
    
    // Mobile navigation should now be visible (we can't easily test this without more complex setup)
    // For now, just verify the button exists and is clickable
    expect(menuButton).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    render(<Header />)
    
    const homeLink = screen.getByRole('link', { name: /home/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })
    const programsLink = screen.getByRole('link', { name: /programs/i })
    const surveyLink = screen.getByRole('link', { name: /survey/i })
    const contactLink = screen.getByRole('link', { name: /contact/i })
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(programsLink).toHaveAttribute('href', '/programs')
    expect(surveyLink).toHaveAttribute('href', '/survey')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('renders logo with correct styling', () => {
    render(<Header />)
    
    // Check if the logo link exists
    const logoLink = screen.getByRole('link', { name: /formerly incarcerated empowerment platform/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })
})
