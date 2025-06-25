'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, ExternalLink, Loader2 } from 'lucide-react'

interface DocsPageProps {
  params: {
    slug?: string[]
  }
}

export default function DocsPage({ params }: DocsPageProps) {
  const router = useRouter()
  const slug = params.slug || []
  const path = slug.join('/')

  useEffect(() => {
    // Redirect to the actual docs site
    const docsUrl = `https://docs.formerlyincarcerated.org/${path}`
    
    // Small delay to show loading state, then redirect
    const timer = setTimeout(() => {
      window.location.href = docsUrl
    }, 1500)

    return () => clearTimeout(timer)
  }, [path])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/30">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        {/* Loading Header */}
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 border-2 border-primary/20">
              <BookOpen className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Redirecting to Documentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Taking you to our comprehensive documentation site...
          </p>
          
          {/* Loading Indicator */}
          <div className="flex justify-center items-center gap-2 text-primary">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading documentation</span>
          </div>
        </div>

        {/* Manual Link */}
        <div className="pt-8 border-t border-theme space-y-4">
          <p className="text-sm text-muted-foreground">
            If you're not redirected automatically:
          </p>
          
          <Button asChild size="lg" className="gap-2">
            <Link 
              href={`https://docs.formerlyincarcerated.org/${path}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5" />
              Open Documentation
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-4">
          <p className="text-xs text-muted-foreground">
            Our documentation is hosted separately for optimal performance and accessibility.
          </p>
        </div>
      </div>
    </div>
  )
}
