import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Handle docs subdomain routing (docs.formerlyincarcerated.org or docs.localhost)
  if (hostname.startsWith('docs.')) {
    // Extract the base domain and port
    const baseDomain = hostname.replace(/^docs\./, '')

    // In development, rewrite to docs site port
    if (process.env.NODE_ENV === 'development') {
      const docsPort = process.env.DOCS_PORT || '3001'

      // Check if we're on localhost
      if (baseDomain.includes('localhost')) {
        try {
          // For now, redirect to the main docs route to avoid 500 errors
          console.log(`Docs subdomain request: docs.${baseDomain}${pathname}`)
          console.warn(`Docs subdomain proxy disabled to prevent 500 errors. Start docs site with: cd docs-site && npm run start -- --port ${docsPort}`)

          // Redirect to main domain docs route instead of proxying
          const mainUrl = new URL(`/docs${pathname}${search}`, request.url)
          return NextResponse.rewrite(mainUrl)
        } catch (error) {
          console.warn('Failed to handle docs subdomain:', error)
          // Return 404 if docs site is not available
          return new NextResponse('Documentation site not available', { status: 404 })
        }
      }
    }

    // In production, handle docs.formerlyincarcerated.org
    if (hostname === 'docs.formerlyincarcerated.org' || hostname.includes('formerlyincarcerated.org')) {
      try {
        // In production, this should proxy to your Docusaurus deployment
        // For now, we'll rewrite to the docs route on the main domain
        const mainUrl = new URL(`/docs${pathname}`, request.url)
        return NextResponse.rewrite(mainUrl)
      } catch (error) {
        console.warn('Failed to handle docs subdomain:', error)
        // Return custom 404 for docs subdomain
        return new NextResponse('Documentation page not found', { status: 404 })
      }
    }

    // Fallback for other docs subdomains
    const mainUrl = new URL(`/docs${pathname}`, request.url)
    return NextResponse.rewrite(mainUrl)
  }

  // Handle /docs routes on main domain
  if (pathname.startsWith('/docs')) {
    // In development, check if docs site is available before proxying
    if (process.env.NODE_ENV === 'development') {
      const docsPort = process.env.DOCS_PORT || '3001'

      // Check if docs site is available by making a quick health check
      try {
        const docsPath = pathname.replace('/docs', '') || '/'
        const docsUrl = new URL(`http://localhost:${docsPort}${docsPath}${search}`)

        // Only rewrite if we can confirm the docs site is running
        // For now, let's fall back to Next.js routes to avoid 500 errors
        console.log(`Docs site request: ${docsUrl.toString()}`)
        console.warn('Docs site proxy disabled to prevent 500 errors. Start docs site with: cd docs-site && npm run start -- --port 3001')

        // Let Next.js handle the route (will show our custom docs pages)
        return NextResponse.next()
      } catch (error) {
        // If docs site is not available, continue to Next.js docs route
        console.warn('Docs site not available, falling back to Next.js route:', error)
        // Let Next.js handle the route (will show our custom docs pages)
        return NextResponse.next()
      }
    }

    // In production, let Next.js handle docs routes (will redirect to external docs)
    return NextResponse.next()
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
