// SEO Configuration for FUSED GAMING React TypeScript Boilerplate

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  author?: string;
  type?: 'website' | 'article';
}

export const defaultSEO: SEOConfig = {
  title: '🎮 FUSED GAMING - React TypeScript Boilerplate | Modern Web Development',
  description: 'Production-ready React TypeScript boilerplate with 5 beautiful themes, Vite, Tailwind CSS, comprehensive testing, and complete documentation. Built by Its Different Productions.',
  keywords: [
    'React',
    'TypeScript', 
    'Vite',
    'Tailwind CSS',
    'Boilerplate',
    'Gaming',
    'Web Development',
    'Frontend',
    'JavaScript',
    'Modern',
    'Production Ready',
    'FUSED GAMING',
    'Its Different Productions',
    'Themes',
    'Components',
    'Testing',
    'Vitest',
    'Framer Motion',
    'React Router'
  ],
  ogImage: '/og-image.svg',
  twitterCard: 'summary_large_image',
  author: 'Its Different Productions',
  type: 'website'
};

export const pageSEO: Record<string, Partial<SEOConfig>> = {
  home: {
    title: '🎮 FUSED GAMING - React TypeScript Boilerplate | Modern Web Development',
    description: 'Production-ready React TypeScript boilerplate with 5 beautiful themes, Vite, Tailwind CSS, comprehensive testing, and complete documentation. Start building amazing web applications today!',
    keywords: ['React boilerplate', 'TypeScript starter', 'Vite template', 'modern web development'],
    canonicalUrl: 'https://react-boilerplate-taupe.vercel.app/'
  },
  about: {
    title: 'About FUSED GAMING - Elegant Solutions to Complex UX Challenges',
    description: 'Learn about Its Different Productions and our approach to solving complex user experience challenges through elegant technical solutions. Discover the philosophy behind FUSED GAMING.',
    keywords: ['about', 'Its Different Productions', 'user experience', 'technical solutions', 'web development philosophy'],
    canonicalUrl: 'https://react-boilerplate-taupe.vercel.app/about'
  },
  themes: {
    title: 'Theme Showcase - 5 Beautiful Themes | FUSED GAMING',
    description: 'Explore 5 stunning themes: Dark, Violet, Emerald, Amber, and Aurora. Each theme is carefully crafted with consistent design tokens and accessibility in mind.',
    keywords: ['themes', 'dark mode', 'design system', 'UI themes', 'color schemes', 'accessibility'],
    canonicalUrl: 'https://react-boilerplate-taupe.vercel.app/themes'
  },
  contact: {
    title: 'Contact Us - Get Support | FUSED GAMING',
    description: 'Get in touch with Its Different Productions. Whether you need support, have questions, or want to collaborate, we\'re here to help.',
    keywords: ['contact', 'support', 'help', 'collaboration', 'Its Different Productions'],
    canonicalUrl: 'https://react-boilerplate-taupe.vercel.app/contact'
  }
};

export const socialLinks = {
  github: import.meta.env.VITE_SOCIAL_GITHUB || 'https://github.com/4eckd/react-boilerplate',
  twitter: import.meta.env.VITE_SOCIAL_TWITTER || 'https://twitter.com/itsdifferentpro',
  linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://linkedin.com/company/its-different-productions',
  discord: import.meta.env.VITE_SOCIAL_DISCORD,
  youtube: import.meta.env.VITE_SOCIAL_YOUTUBE,
  email: import.meta.env.VITE_COMPANY_EMAIL || 'hello@itsdifferentproductions.com'
};

export const companyInfo = {
  name: import.meta.env.VITE_COMPANY_NAME || 'Its Different Productions',
  url: import.meta.env.VITE_COMPANY_URL || 'https://itsdifferentproductions.com',
  email: import.meta.env.VITE_COMPANY_EMAIL || 'hello@itsdifferentproductions.com',
  description: 'Creating exceptional developer experiences and elegant solutions to complex user experience challenges'
};

export const projectInfo = {
  name: 'FUSED GAMING React TypeScript Boilerplate',
  version: '1.0.0',
  repository: 'https://github.com/4eckd/react-boilerplate',
  documentation: 'https://docs.react-boilerplate-taupe.vercel.app',
  demo: 'https://react-boilerplate-taupe.vercel.app',
  license: 'MIT'
};

// Helper function to generate page-specific SEO
export const getPageSEO = (page: keyof typeof pageSEO): SEOConfig => {
  const pageConfig = pageSEO[page] || {};
  return {
    ...defaultSEO,
    ...pageConfig,
    keywords: [...defaultSEO.keywords, ...(pageConfig.keywords || [])]
  };
};

// Helper function to generate structured data
export const generateStructuredData = (page: keyof typeof pageSEO = 'home') => {
  const seo = getPageSEO(page);
  
  return {
    '@context': 'https://schema.org',
    '@type': seo.type === 'article' ? 'TechArticle' : 'WebPage',
    name: seo.title,
    description: seo.description,
    url: seo.canonicalUrl,
    author: {
      '@type': 'Organization',
      name: companyInfo.name,
      url: companyInfo.url
    },
    publisher: {
      '@type': 'Organization',
      name: companyInfo.name,
      url: companyInfo.url
    },
    image: `${projectInfo.demo}${seo.ogImage}`,
    datePublished: '2025-06-17',
    dateModified: '2025-06-17'
  };
};
