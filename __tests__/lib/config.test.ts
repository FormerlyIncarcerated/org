import { siteConfig } from '@/lib/config'

describe('Site Configuration', () => {
  it('has correct site name and description', () => {
    expect(siteConfig.name).toBe('Formerly Incarcerated Empowerment Platform')
    expect(siteConfig.description).toContain('Empowering formerly incarcerated individuals')
    expect(siteConfig.description).toContain('Web3 technology')
  })

  it('has correct URL configuration', () => {
    expect(siteConfig.url).toBe('https://formerlyincarcerated.org')
    expect(siteConfig.ogImage).toBe('/og-image.svg')
  })

  it('has all required social media links', () => {
    expect(siteConfig.links.twitter).toContain('twitter.com')
    expect(siteConfig.links.github).toContain('github.com')
    expect(siteConfig.links.linkedin).toContain('linkedin.com')
    expect(siteConfig.links.discord).toContain('discord.gg')
    expect(siteConfig.links.telegram).toContain('t.me')
    expect(siteConfig.links.email).toContain('@formerlyincarcerated.org')
  })

  it('has contact information', () => {
    expect(siteConfig.contact.email).toBe('contact@formerlyincarcerated.org')
    expect(siteConfig.contact.support).toBe('support@formerlyincarcerated.org')
    expect(siteConfig.contact.partnerships).toBe('partnerships@formerlyincarcerated.org')
  })

  it('has platform features defined', () => {
    expect(siteConfig.features).toBeInstanceOf(Array)
    expect(siteConfig.features.length).toBeGreaterThan(0)
    expect(siteConfig.features).toContain('Blockchain-powered opportunities')
    expect(siteConfig.features).toContain('Community-driven support systems')
  })

  it('has token utilities defined', () => {
    expect(siteConfig.tokenUtilities).toBeInstanceOf(Array)
    expect(siteConfig.tokenUtilities.length).toBeGreaterThan(0)
    
    const scgToken = siteConfig.tokenUtilities.find(token => 
      token.name.includes('Second Chance Governance Token')
    )
    expect(scgToken).toBeDefined()
    expect(scgToken?.description).toContain('vote on funding decisions')
    
    const skillNFT = siteConfig.tokenUtilities.find(token => 
      token.name.includes('Skill Verification NFTs')
    )
    expect(skillNFT).toBeDefined()
    expect(skillNFT?.description).toContain('vocational training')
  })

  it('has all token utility categories', () => {
    const tokenNames = siteConfig.tokenUtilities.map(token => token.name)
    
    expect(tokenNames).toContain('Second Chance Governance Token (SCG)')
    expect(tokenNames).toContain('Skill Verification NFTs')
    expect(tokenNames).toContain('Micro-Investment DAO')
    expect(tokenNames).toContain('Reentry Resource Access Token')
  })
})
