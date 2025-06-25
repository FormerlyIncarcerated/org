import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, BookOpen, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/30">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        {/* 404 Header */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to a new location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/docs" target="_blank" rel="noopener noreferrer">
              <BookOpen className="w-5 h-5" />
              Visit Documentation
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-8 border-t border-theme">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please{' '}
            <Link 
              href="/contact" 
              className="text-primary hover:underline font-medium"
            >
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
