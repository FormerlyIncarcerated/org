import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Handle docs subdomain routing
  if (hostname.startsWith('docs.')) {
    // Extract the base domain and port
    const baseDomain = hostname.replace(/^docs\./, '')

    // In development, rewrite to docs site port
    if (process.env.NODE_ENV === 'development') {
      const docsPort = process.env.DOCS_PORT || '3001'

      // Check if we're on localhost
      if (baseDomain.includes('localhost')) {
        // Use rewrite instead of redirect to keep the subdomain in the URL
        const docsUrl = new URL(`http://localhost:${docsPort}${pathname}${search}`)
        return NextResponse.rewrite(docsUrl)
      }
    }

    // In production, this would be handled by Vercel/DNS
    // For now, rewrite to the docs route on the main domain
    const mainUrl = new URL(`/docs${pathname}`, request.url)
    return NextResponse.rewrite(mainUrl)
  }

  // Handle /docs routes on main domain
  if (pathname.startsWith('/docs')) {
    // In development, proxy to docs site if it's running
    if (process.env.NODE_ENV === 'development') {
      const docsPort = process.env.DOCS_PORT || '3001'
      
      try {
        // Rewrite to docs site
        const docsPath = pathname.replace('/docs', '') || '/'
        const docsUrl = new URL(`http://localhost:${docsPort}${docsPath}${search}`)
        
        return NextResponse.rewrite(docsUrl)
      } catch (error) {
        // If docs site is not available, continue to Next.js docs route
        console.warn('Docs site not available, falling back to Next.js route')
      }
    }
  }

  // Continue with normal request processing
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
