// Structured data for SEO

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Formerly Incarcerated Empowerment Platform",
  "alternateName": "FI Empowerment",
  "url": "https://formerlyincarcerated.org",
  "logo": "https://formerlyincarcerated.org/logo.svg",
  "description": "Empowering formerly incarcerated individuals through Web3 technology, blockchain-based opportunities, and community-driven support systems.",
  "foundingDate": "2025",
  "sameAs": [
    "https://twitter.com/FormerlyIncEmp",
    "https://github.com/formerly-incarcerated-empowerment",
    "https://linkedin.com/company/formerly-incarcerated-empowerment"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "customer service",
    "email": "contact@formerlyincarcerated.org",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
}

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Formerly Incarcerated Empowerment Platform",
  "url": "https://formerlyincarcerated.org",
  "description": "Web3-powered platform breaking barriers and creating opportunities for formerly incarcerated individuals.",
  "publisher": {
    "@type": "Organization",
    "name": "Formerly Incarcerated Empowerment Platform"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://formerlyincarcerated.org/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export const nonprofitStructuredData = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Formerly Incarcerated Empowerment Platform",
  "url": "https://formerlyincarcerated.org",
  "description": "Supporting formerly incarcerated individuals through innovative Web3 technology and community-driven programs.",
  "mission": "To empower formerly incarcerated individuals through innovative Web3 technology, creating sustainable pathways to economic independence, community integration, and personal growth.",
  "foundingDate": "2025",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "knowsAbout": [
    "Criminal Justice Reform",
    "Reentry Support",
    "Web3 Technology",
    "Blockchain",
    "Community Empowerment",
    "Economic Independence"
  ]
}

export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Formerly Incarcerated Empowerment Platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are a Web3-powered platform designed to break barriers and create opportunities for formerly incarcerated individuals through blockchain technology, community support, and innovative programs."
      }
    },
    {
      "@type": "Question",
      "name": "How does Web3 technology help formerly incarcerated individuals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Web3 technology enables anonymous skill-based hiring, decentralized funding opportunities, community governance, and alternative credit systems that bypass traditional discrimination barriers."
      }
    },
    {
      "@type": "Question",
      "name": "Who can participate in the platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our platform serves formerly incarcerated individuals, their families, advocates, service providers, employers, and community members who support second chances and criminal justice reform."
      }
    }
  ]
}
