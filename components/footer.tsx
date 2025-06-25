import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Mail, MessageCircle, BookOpen, ExternalLink } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-theme bg-gradient-to-br from-background via-background/95 to-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand with matching header theme styling */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative p-2 rounded-lg border-theme-hover bg-card/80 backdrop-blur-sm hover:shadow-theme transition-all duration-300">
                <Image
                  src="/logo.svg"
                  alt={siteConfig.name}
                  width={120}
                  height={45}
                  className="h-6 w-auto"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(200deg) brightness(104%) contrast(97%)'
                  }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Building second chances through Web3 technology and community support.
            </p>
            <div className="flex space-x-3">
              <Link
                href={siteConfig.links.twitter}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary border-theme-hover hover:bg-primary/8 transition-all duration-200 focus-visible-ring hover-glow"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href={siteConfig.links.github}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary border-theme-hover hover:bg-primary/8 transition-all duration-200 focus-visible-ring hover-glow"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href={siteConfig.links.linkedin}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary border-theme-hover hover:bg-primary/8 transition-all duration-200 focus-visible-ring hover-glow"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href={siteConfig.links.discord}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary border-theme-hover hover:bg-primary/8 transition-all duration-200 focus-visible-ring hover-glow"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/proposals" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Proposals
                </Link>
              </li>
              <li>
                <Link href="/survey" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Community Survey
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={siteConfig.links.docs}
                  className="text-muted-foreground hover:text-primary flex items-center space-x-2 transition-colors duration-200 hover:underline group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Documentation</span>
                  <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.links.github}
                  className="text-muted-foreground hover:text-primary flex items-center space-x-2 transition-colors duration-200 hover:underline group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`mailto:${siteConfig.contact.email}`} className="text-muted-foreground hover:text-primary flex items-center space-x-2 transition-colors duration-200 hover:underline group">
                  <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>General Inquiries</span>
                </Link>
              </li>
              <li>
                <Link href={`mailto:${siteConfig.contact.support}`} className="text-muted-foreground hover:text-primary flex items-center space-x-2 transition-colors duration-200 hover:underline group">
                  <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Support</span>
                </Link>
              </li>
              <li>
                <Link href={`mailto:${siteConfig.contact.partnerships}`} className="text-muted-foreground hover:text-primary flex items-center space-x-2 transition-colors duration-200 hover:underline group">
                  <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Partnerships</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-theme pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors duration-200 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors duration-200 hover:underline">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors duration-200 hover:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
