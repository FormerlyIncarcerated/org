let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async rewrites() {
    // Temporarily disable rewrites to prevent 500 errors when docs site isn't running
    // To enable docs proxying, start the docs site with: cd docs-site && npm start -- --port 3001
    return []

    // Uncomment the following when docs site is running on port 3001:
    /*
    return [
      // Development: docs.localhost subdomain routing
      {
        source: '/:path*',
        destination: 'http://localhost:3001/:path*',
        has: [
          {
            type: 'host',
            value: 'docs.localhost:3000',
          },
        ],
      },
      // Development: docs.localhost without port
      {
        source: '/:path*',
        destination: 'http://localhost:3001/:path*',
        has: [
          {
            type: 'host',
            value: 'docs.localhost',
          },
        ],
      },
      // Production: docs.formerlyincarcerated.org subdomain routing
      {
        source: '/:path*',
        destination: 'https://docs.formerlyincarcerated.org/:path*', // In production, this would be your Docusaurus deployment URL
        has: [
          {
            type: 'host',
            value: 'docs.formerlyincarcerated.org',
          },
        ],
      },
      // Fallback for /docs routes on main domain - proxy to docs site
      {
        source: '/docs/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ]
    */
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
