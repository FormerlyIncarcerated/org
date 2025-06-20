// Site configuration for Formerly Incarcerated Empowerment Platform

export const siteConfig = {
  name: "F.Inc. - Formerly Incarcerated.org",
  description: "Empowering formerly incarcerated individuals through Web3 technology, blockchain-based opportunities, and community-driven support systems. Building second chances and breaking barriers.",
  url: "https://formerlyincarcerated.org",
  ogImage: "/og-image.svg",
  
  // Social media links
  links: {
    twitter: "https://twitter.com/FormerlyIncEmp",
    github: "https://github.com/formerly-incarcerated-empowerment",
    linkedin: "https://linkedin.com/company/formerly-incarcerated-empowerment",
    discord: "https://discord.gg/formerly-incarcerated-empowerment",
    telegram: "https://t.me/formerly_incarcerated_empowerment",
    email: "contact@formerlyincarcerated.org",
  },
  
  // Contact information
  contact: {
    email: "contact@formerlyincarcerated.org",
    support: "support@formerlyincarcerated.org",
    partnerships: "partnerships@formerlyincarcerated.org",
  },
  
  // Platform features
  features: [
    "Blockchain-powered opportunities",
    "Community-driven support systems", 
    "Skill verification & certification NFTs",
    "Decentralized job marketplace",
    "Micro-investment DAO platform",
    "Peer-to-peer lending protocol",
    "Real estate investment syndication",
    "Legal aid & advocacy fund"
  ],
  
  // Web3 utility tokens (from the ideas document)
  tokenUtilities: [
    {
      name: "Second Chance Governance Token (SCG)",
      description: "Stake tokens to vote on funding decisions for formerly incarcerated entrepreneurs"
    },
    {
      name: "Skill Verification NFTs", 
      description: "Mint NFTs for completed vocational training, certifications, and skill assessments"
    },
    {
      name: "Micro-Investment DAO",
      description: "Pool tokens to collectively invest in formerly incarcerated-owned businesses"
    },
    {
      name: "Reentry Resource Access Token",
      description: "Exchange tokens for housing assistance, legal aid, mental health services"
    }
  ]
}

export type SiteConfig = typeof siteConfig
