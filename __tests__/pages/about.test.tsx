import { render, screen } from '@testing-library/react'
import AboutPage from '@/app/about/page'

describe('About Page', () => {
  it('renders the main heading', () => {
    render(<AboutPage />)
    expect(screen.getByText('Breaking Barriers, Building Futures')).toBeInTheDocument()
  })

  it('renders the mission statement', () => {
    render(<AboutPage />)
    expect(screen.getByText(/revolutionizing reentry support through Web3 technology/)).toBeInTheDocument()
  })

  it('renders statistics section', () => {
    render(<AboutPage />)
    
    expect(screen.getByText('70M+')).toBeInTheDocument()
    expect(screen.getByText('Americans with Criminal Records')).toBeInTheDocument()
    expect(screen.getByText('27%')).toBeInTheDocument()
    expect(screen.getByText('Unemployment Rate')).toBeInTheDocument()
    expect(screen.getByText('68%')).toBeInTheDocument()
    expect(screen.getByText('Recidivism Rate')).toBeInTheDocument()
    expect(screen.getByText('$87B')).toBeInTheDocument()
    expect(screen.getByText('Economic Impact')).toBeInTheDocument()
  })

  it('renders mission section', () => {
    render(<AboutPage />)
    
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    expect(screen.getByText(/empower formerly incarcerated individuals through innovative Web3 technology/)).toBeInTheDocument()
  })

  it('renders challenge and solution sections', () => {
    render(<AboutPage />)
    
    expect(screen.getByText('The Challenge')).toBeInTheDocument()
    expect(screen.getByText(/Over 70 million Americans have criminal records/)).toBeInTheDocument()
    
    expect(screen.getByText('Our Solution')).toBeInTheDocument()
    expect(screen.getByText(/comprehensive Web3 ecosystem/)).toBeInTheDocument()
  })

  it('renders values section', () => {
    render(<AboutPage />)
    
    expect(screen.getByText('Our Values')).toBeInTheDocument()
    expect(screen.getByText('Dignity & Respect')).toBeInTheDocument()
    expect(screen.getByText('Innovation')).toBeInTheDocument()
    expect(screen.getByText('Trust & Transparency')).toBeInTheDocument()
    expect(screen.getByText('Community Impact')).toBeInTheDocument()
  })

  it('renders call to action section', () => {
    render(<AboutPage />)
    
    expect(screen.getByText('Join Our Movement')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Get Involved' })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: 'Learn About Our Programs' })).toHaveAttribute('href', '/programs')
  })

  it('renders challenge statistics', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/27% unemployment rate/)).toBeInTheDocument()
    expect(screen.getByText(/68% recidivism rate/)).toBeInTheDocument()
    expect(screen.getByText(/\$87 billion annual economic impact/)).toBeInTheDocument()
    expect(screen.getByText(/Limited access to traditional financial services/)).toBeInTheDocument()
  })

  it('renders solution features', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/Decentralized job marketplace with anonymous screening/)).toBeInTheDocument()
    expect(screen.getByText(/Skill verification through blockchain credentials/)).toBeInTheDocument()
    expect(screen.getByText(/Community-funded micro-investment opportunities/)).toBeInTheDocument()
    expect(screen.getByText(/Peer-to-peer lending and financial services/)).toBeInTheDocument()
  })
})
