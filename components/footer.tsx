import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Mail, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt={siteConfig.name}
                width={180}
                height={68}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building second chances through Web3 technology and community support.
            </p>
            <div className="flex space-x-4">
              <Link href={siteConfig.links.twitter} className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href={siteConfig.links.github} className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href={siteConfig.links.linkedin} className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href={siteConfig.links.discord} className="text-muted-foreground hover:text-primary">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/proposals" className="text-muted-foreground hover:text-primary">
                  Proposals
                </Link>
              </li>
              <li>
                <Link href="/survey" className="text-muted-foreground hover:text-primary">
                  Community Survey
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
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
                <Link href="/docs" className="text-muted-foreground hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="text-muted-foreground hover:text-primary">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted-foreground hover:text-primary">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
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
                <Link href={`mailto:${siteConfig.contact.email}`} className="text-muted-foreground hover:text-primary flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>General Inquiries</span>
                </Link>
              </li>
              <li>
                <Link href={`mailto:${siteConfig.contact.support}`} className="text-muted-foreground hover:text-primary flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Support</span>
                </Link>
              </li>
              <li>
                <Link href={`mailto:${siteConfig.contact.partnerships}`} className="text-muted-foreground hover:text-primary flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Partnerships</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
