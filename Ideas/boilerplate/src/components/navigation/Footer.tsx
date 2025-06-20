import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart, Youtube, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';

export interface FooterProps {
  logo?: React.ReactNode;
  companyName?: string;
  description?: string;
  links?: FooterSection[];
  socialLinks?: SocialLink[];
  showCopyright?: boolean;
  className?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

const getSocialLinks = (): SocialLink[] => {
  const links: SocialLink[] = [];

  if (import.meta.env.VITE_SOCIAL_GITHUB) {
    links.push({
      platform: 'GitHub',
      href: import.meta.env.VITE_SOCIAL_GITHUB,
      icon: <Github className="h-5 w-5" />,
    });
  }

  if (import.meta.env.VITE_SOCIAL_TWITTER) {
    links.push({
      platform: 'Twitter',
      href: import.meta.env.VITE_SOCIAL_TWITTER,
      icon: <Twitter className="h-5 w-5" />,
    });
  }

  if (import.meta.env.VITE_SOCIAL_LINKEDIN) {
    links.push({
      platform: 'LinkedIn',
      href: import.meta.env.VITE_SOCIAL_LINKEDIN,
      icon: <Linkedin className="h-5 w-5" />,
    });
  }

  if (import.meta.env.VITE_SOCIAL_DISCORD) {
    links.push({
      platform: 'Discord',
      href: import.meta.env.VITE_SOCIAL_DISCORD,
      icon: <MessageCircle className="h-5 w-5" />,
    });
  }

  if (import.meta.env.VITE_SOCIAL_YOUTUBE) {
    links.push({
      platform: 'YouTube',
      href: import.meta.env.VITE_SOCIAL_YOUTUBE,
      icon: <Youtube className="h-5 w-5" />,
    });
  }

  if (import.meta.env.VITE_COMPANY_EMAIL) {
    links.push({
      platform: 'Email',
      href: `mailto:${import.meta.env.VITE_COMPANY_EMAIL}`,
      icon: <Mail className="h-5 w-5" />,
    });
  }

  return links;
};

const defaultLinks: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Documentation', href: '/docs' },
      { label: 'API', href: '/api' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({
  logo,
  companyName = import.meta.env.VITE_COMPANY_NAME || 'FUSED GAMING',
  description = 'Building the future of gaming with cutting-edge technology and innovative solutions.',
  links = defaultLinks,
  socialLinks = getSocialLinks(),
  showCopyright = true,
  className,
}) => {
  const currentYear = new Date().getFullYear();

  const renderLogo = () => {
    if (logo) return logo;
    
    return (
      <Link to="/" className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">F</span>
        </div>
        <span className="font-bold text-xl text-foreground">{companyName}</span>
      </Link>
    );
  };

  return (
    <footer className={clsx('border-t border-border bg-background', className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {renderLogo()}
              <p className="text-muted-foreground text-sm max-w-md">
                {description}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.platform}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {links.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        {showCopyright && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © {currentYear} {companyName}. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>by Its Different Productions</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
