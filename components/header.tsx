"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Users, Heart, FileText, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import ThemeSelector from "@/components/theme-selector"
import { WalletConnect } from "@/components/wallet-connect"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Heart },
    { name: "About", href: "/about", icon: Users },
    { name: "Proposals", href: "/proposals", icon: FileText },
    { name: "Survey", href: "/survey", icon: MessageCircle },
    { name: "Contact", href: "/contact", icon: MessageCircle },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt={siteConfig.name}
            width={240}
            height={90}
            className="h-12 w-auto md:h-14"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6 ml-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeSelector />
          <Button variant="outline" size="sm" className="hidden md:inline-flex border-2 border-primary/50 dark:border-secondary/50 text-primary dark:text-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 hover:border-primary dark:hover:border-secondary backdrop-blur-sm bg-background/50 dark:bg-background/50 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
            Join Community
          </Button>
          <WalletConnect compact />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="outline" size="sm" className="border-2 border-primary/50 dark:border-secondary/50 text-primary dark:text-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 hover:border-primary dark:hover:border-secondary backdrop-blur-sm bg-background/50 dark:bg-background/50 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                Join Community
              </Button>
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
