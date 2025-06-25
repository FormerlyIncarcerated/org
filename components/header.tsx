"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Users, Heart, FileText, MessageCircle, BookOpen, Github, Plus, Zap, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import ThemeSelector from "@/components/theme-selector"
import { WalletConnect } from "@/components/wallet-connect"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Heart },
    { name: "About", href: "/about", icon: Users },
    { name: "Web3", href: "/web3", icon: Zap },
    { name: "Proposals", href: "/proposals", icon: FileText },
    { name: "Contact", href: "/contact", icon: MessageCircle },
    { name: "Docs", href: siteConfig.links.docs, icon: BookOpen, external: true },
    // Add local docs link for development
    ...(process.env.NODE_ENV === 'development' ? [
      { name: "Docs Local", href: "http://docs.localhost:3000", icon: Monitor, external: true, dev: true },
    ] : []),
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center">
        {/* Enhanced logo with better theme integration */}
        <Link href="/" className="flex items-center group">
          <div className="relative p-2 rounded-lg border-theme-hover bg-card/80 backdrop-blur-sm hover:shadow-theme transition-all duration-300">
            <Image
              src="/logo.svg"
              alt={siteConfig.name}
              width={120}
              height={45}
              className="h-8 w-auto"
              style={{
                filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(200deg) brightness(104%) contrast(97%)'
              }}
              priority
            />
          </div>
        </Link>

        {/* Enhanced desktop navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-4 ml-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 px-4 py-2 rounded-lg border-theme-hover hover:bg-primary/8 focus-visible-ring group ${
                item.dev ? 'bg-orange-500/10 border-orange-500/20 text-orange-600 hover:text-orange-700 hover:bg-orange-500/20' : ''
              }`}
              {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <item.icon className={`h-4 w-4 transition-colors ${
                item.dev ? 'text-orange-600 group-hover:text-orange-700' : 'text-muted-foreground group-hover:text-primary'
              }`} />
              <span className="flex items-center gap-1">
                {item.name}
                {item.dev && <span className="text-xs bg-orange-500 text-white px-1 rounded">DEV</span>}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeSelector />

          {/* Enhanced GitHub Link */}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary border-theme-hover hover:bg-primary/8 transition-all duration-200 focus-visible-ring">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>

          {/* Enhanced Survey CTA */}
          <Link href="/survey">
            <Button variant="outline" size="sm" className="hidden md:inline-flex border-theme-strong text-primary hover:bg-primary/12 hover:border-primary backdrop-blur-md bg-card/80 shadow-theme hover-glow font-semibold focus-visible-ring">
              <Plus className="h-4 w-4 mr-2 text-primary stroke-2" />
              Survey
            </Button>
          </Link>
          <WalletConnect compact />

          {/* Mobile menu button - themeable with CSS custom properties */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
          </button>
        </div>
      </div>

      {/* Enhanced mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-theme bg-card/95 backdrop-blur-md shadow-theme">
          <div className="space-y-2 px-4 pb-4 pt-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/8 border-theme-hover transition-all duration-200 focus-visible-ring group ${
                  item.dev ? 'bg-orange-500/10 border-orange-500/20 text-orange-600 hover:text-orange-700 hover:bg-orange-500/20' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <item.icon className={`h-4 w-4 transition-colors ${
                  item.dev ? 'text-orange-600 group-hover:text-orange-700' : 'text-muted-foreground group-hover:text-primary'
                }`} />
                <span className="flex items-center gap-2">
                  {item.name}
                  {item.dev && <span className="text-xs bg-orange-500 text-white px-1 rounded">DEV</span>}
                </span>
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-theme mt-4">
              <Link href="/survey" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full border-theme-strong text-primary hover:bg-primary/12 hover:border-primary backdrop-blur-md bg-card/80 shadow-theme hover-glow font-semibold focus-visible-ring">
                  <Plus className="h-4 w-4 mr-2 text-primary stroke-2" />
                  Survey
                </Button>
              </Link>
              <div className="w-full">
                <WalletConnect compact />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
