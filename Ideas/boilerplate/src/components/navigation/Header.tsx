import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { clsx } from 'clsx';

export interface HeaderProps {
  logo?: React.ReactNode;
  navigation?: NavigationItem[];
  showThemeToggle?: boolean;
  className?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

const defaultNavigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Themes', href: '/themes' },
  { label: 'Contact', href: '/contact' },
];

export const Header: React.FC<HeaderProps> = ({
  logo,
  navigation = defaultNavigation,
  showThemeToggle = true,
  className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const renderLogo = () => {
    if (logo) return logo;
    
    return (
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-primary-sm group-hover:shadow-primary group-hover:glow-red transition-all duration-300 group-hover:scale-110">
          <span className="text-primary-foreground font-bold text-lg">F</span>
        </div>
        <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">FUSED</span>
      </Link>
    );
  };

  return (
    <header className={clsx('sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg', className)}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {renderLogo()}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={clsx(
                    'flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActiveRoute(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://docs.react-boilerplate-taupe.vercel.app', '_blank')}
              leftIcon={<BookOpen className="h-4 w-4" />}
              rightIcon={<ExternalLink className="h-3 w-3" />}
              className="hover:shadow-primary border-primary/20 hover:border-primary/40"
            >
              Docs
            </Button>
            {showThemeToggle && <ThemeToggle />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="h-10 w-10 p-0"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <nav className="py-4 space-y-2">
                {navigation.map((item) => (
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.label}</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActiveRoute(item.href)
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                    >
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.label}</span>
                    </Link>
                  )
                ))}

                {/* Mobile Documentation Link */}
                <a
                  href="https://docs.react-boilerplate-taupe.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent border-t border-border pt-4 mt-4"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Documentation</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
                
                {showThemeToggle && (
                  <div className="pt-2 border-t border-border">
                    <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Theme
                    </p>
                    <div className="px-3 py-2">
                      <ThemeToggle variant="compact" showLabel={false} />
                    </div>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
