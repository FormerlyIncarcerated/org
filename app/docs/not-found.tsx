import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Home, Search, ArrowLeft } from 'lucide-react'

export default function DocsNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/30">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        {/* 404 Header */}
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 border-2 border-primary/20">
              <BookOpen className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-primary/20 select-none">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Documentation Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The documentation page you're looking for doesn't exist or has been moved. 
            Our documentation is constantly evolving to serve you better.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="https://docs.formerlyincarcerated.org" target="_blank" rel="noopener noreferrer">
              <BookOpen className="w-5 h-5" />
              Browse Documentation
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-5 h-5" />
              Main Site
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-theme space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Popular Documentation Sections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
            <Link 
              href="https://docs.formerlyincarcerated.org/docs/getting-started" 
              className="text-sm text-primary hover:underline p-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Getting Started Guide
            </Link>
            <Link 
              href="https://docs.formerlyincarcerated.org/docs/technical" 
              className="text-sm text-primary hover:underline p-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Technical Documentation
            </Link>
            <Link 
              href="https://docs.formerlyincarcerated.org/blog" 
              className="text-sm text-primary hover:underline p-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog & Updates
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-primary hover:underline p-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="pt-4">
          <p className="text-sm text-muted-foreground">
            Can't find what you're looking for?{' '}
            <Link 
              href="/contact" 
              className="text-primary hover:underline font-medium"
            >
              Let us know
            </Link>{' '}
            and we'll help you find the right documentation.
          </p>
        </div>
      </div>
    </div>
  )
}
