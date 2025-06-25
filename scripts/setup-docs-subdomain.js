#!/usr/bin/env node

/**
 * Docs Subdomain Setup Script
 * 
 * This script handles the setup and configuration for the docs.formerlyincarcerated.org subdomain
 * including Vercel deployment configuration, DNS setup instructions, and routing configuration.
 */

const fs = require('fs');
const path = require('path');

class DocsSubdomainSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.docsPath = path.join(this.projectRoot, 'docs-site');
    this.mainVercelConfig = path.join(this.projectRoot, 'vercel.json');
    this.docsVercelConfig = path.join(this.docsPath, 'vercel.json');
  }

  /**
   * Main setup function
   */
  async setup() {
    console.log('🚀 Setting up docs subdomain configuration...\n');

    try {
      // 1. Verify docs-site exists
      this.verifyDocsDirectory();

      // 2. Create/update Vercel configurations
      this.setupVercelConfigurations();

      // 3. Create DNS setup instructions
      this.createDNSInstructions();

      // 4. Create deployment script
      this.createDeploymentScript();

      // 5. Update package.json scripts
      this.updatePackageScripts();

      console.log('✅ Docs subdomain setup completed successfully!\n');
      this.printNextSteps();

    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Verify that docs-site directory exists
   */
  verifyDocsDirectory() {
    if (!fs.existsSync(this.docsPath)) {
      throw new Error('docs-site directory not found. Please ensure it exists.');
    }
    console.log('✓ docs-site directory found');
  }

  /**
   * Setup Vercel configurations for both main app and docs
   */
  setupVercelConfigurations() {
    // Main app vercel.json - updated for subdomain routing
    const mainConfig = {
      version: 2,
      builds: [
        {
          src: "package.json",
          use: "@vercel/next"
        }
      ],
      routes: [
        {
          src: "/(.*)",
          dest: "/$1"
        }
      ],
      headers: [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff"
            },
            {
              key: "X-Frame-Options",
              value: "DENY"
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block"
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin"
            },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=()"
            }
          ]
        }
      ],
      functions: {
        "app/api/**/*.ts": {
          runtime: "nodejs18.x"
        }
      },
      regions: ["iad1"],
      framework: "nextjs"
    };

    // Docs-specific vercel.json
    const docsConfig = {
      version: 2,
      name: "formerlyincarcerated-docs",
      builds: [
        {
          src: "package.json",
          use: "@vercel/static-build",
          config: {
            distDir: "build"
          }
        }
      ],
      routes: [
        {
          handle: "filesystem"
        },
        {
          src: "/(.*)",
          dest: "/index.html"
        }
      ],
      headers: [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff"
            },
            {
              key: "X-Frame-Options",
              value: "SAMEORIGIN"
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block"
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin"
            },
            {
              key: "Content-Security-Policy",
              value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;"
            }
          ]
        },
        {
          source: "/static/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable"
            }
          ]
        }
      ],
      cleanUrls: true,
      trailingSlash: false
    };

    // Write configurations
    fs.writeFileSync(this.mainVercelConfig, JSON.stringify(mainConfig, null, 2));
    fs.writeFileSync(this.docsVercelConfig, JSON.stringify(docsConfig, null, 2));

    console.log('✓ Vercel configurations updated');
  }

  /**
   * Create DNS setup instructions
   */
  createDNSInstructions() {
    const instructions = `# DNS Setup Instructions for docs.formerlyincarcerated.org

## Cloudflare DNS Configuration

To set up the docs subdomain using Cloudflare DNS, follow these steps:

### 1. Access Cloudflare Dashboard
- Log in to your Cloudflare account
- Select the \`formerlyincarcerated.org\` domain

### 2. Add DNS Record
Add a new CNAME record with the following configuration:

\`\`\`
Type: CNAME
Name: docs
Target: cname.vercel-dns.com
TTL: Auto
Proxy Status: Proxied (orange cloud)
\`\`\`

### 3. Vercel Project Configuration

#### For Main App (formerlyincarcerated.org):
- Domain: \`formerlyincarcerated.org\`
- Domain: \`www.formerlyincarcerated.org\`

#### For Docs App (docs.formerlyincarcerated.org):
- Domain: \`docs.formerlyincarcerated.org\`

### 4. Verification Steps
1. Deploy both projects to Vercel
2. Add the custom domains in Vercel dashboard
3. Wait for DNS propagation (usually 5-10 minutes)
4. Test the subdomain: https://docs.formerlyincarcerated.org

### 5. SSL Certificate
Cloudflare will automatically handle SSL certificates for the subdomain.
Ensure SSL/TLS encryption mode is set to "Full (strict)" in Cloudflare.

## Alternative: Direct Vercel DNS
If not using Cloudflare proxy:
\`\`\`
Type: CNAME
Name: docs
Target: [your-vercel-project].vercel.app
\`\`\`

## Troubleshooting
- Check DNS propagation: https://dnschecker.org
- Verify Vercel domain configuration
- Ensure both projects are deployed successfully
`;

    fs.writeFileSync(path.join(this.projectRoot, 'docs', 'DNS_SETUP.md'), instructions);
    console.log('✓ DNS setup instructions created');
  }

  /**
   * Create deployment script for docs
   */
  createDeploymentScript() {
    const deployScript = `#!/bin/bash

# Docs Deployment Script
# This script handles the deployment of the documentation site to Vercel

set -e

echo "🚀 Starting docs deployment..."

# Check if we're in the right directory
if [ ! -f "docs-site/package.json" ]; then
    echo "❌ Error: docs-site/package.json not found. Please run from project root."
    exit 1
fi

# Navigate to docs directory
cd docs-site

echo "📦 Installing dependencies..."
bun install

echo "🔨 Building documentation..."
bun run build

echo "🚀 Deploying to Vercel..."
if [ "$1" = "--production" ]; then
    echo "Deploying to production..."
    vercel --prod
else
    echo "Deploying to preview..."
    vercel
fi

echo "✅ Deployment completed!"
echo "📖 Documentation available at: https://docs.formerlyincarcerated.org"
`;

    const scriptPath = path.join(this.projectRoot, 'scripts', 'deploy-docs.sh');
    fs.writeFileSync(scriptPath, deployScript);

    // Make script executable on Unix systems
    try {
      fs.chmodSync(scriptPath, '755');
    } catch (error) {
      // Ignore chmod errors on Windows
    }

    console.log('✓ Deployment script created');
  }

  /**
   * Update package.json scripts
   */
  updatePackageScripts() {
    const packageJsonPath = path.join(this.projectRoot, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      console.log('⚠️  package.json not found, skipping script updates');
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Add docs-related scripts
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts['docs:setup'] = 'node scripts/setup-docs-subdomain.js';
    packageJson.scripts['docs:build'] = 'cd docs-site && bun run build';
    packageJson.scripts['docs:dev'] = 'cd docs-site && bun run start';
    packageJson.scripts['docs:deploy'] = 'bash scripts/deploy-docs.sh';
    packageJson.scripts['docs:deploy:prod'] = 'bash scripts/deploy-docs.sh --production';
    packageJson.scripts['docs:clean'] = 'cd docs-site && rm -rf build .docusaurus node_modules/.cache';

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✓ Package.json scripts updated');
  }

  /**
   * Print next steps for the user
   */
  printNextSteps() {
    console.log(`
📋 Next Steps:

1. 🖥️  Local Development Setup:
   - Run: npm run docs:hosts (setup local subdomain)
   - Run: npm run dev:docs (start both servers)
   - Test: http://docs.localhost:3000

2. 🌐 DNS Configuration:
   - Follow instructions in docs/DNS_SETUP.md
   - Add CNAME record in Cloudflare: docs -> cname.vercel-dns.com

3. 🚀 Deploy Documentation:
   - Run: bun run docs:deploy:prod
   - Or use: bash scripts/deploy-docs.sh --production

4. ⚙️  Vercel Configuration:
   - Create separate Vercel project for docs-site
   - Add custom domain: docs.formerlyincarcerated.org
   - Set environment variables if needed

5. 🔍 Search Integration:
   - Configure Algolia DocSearch for the docs site
   - Update search index configuration

6. 📝 Available Scripts:
   - npm run docs:setup     # Run this setup script
   - npm run docs:hosts     # Setup local subdomain routing
   - npm run docs:hosts:check # Check hosts file status
   - npm run dev:docs       # Start both main app and docs
   - npm run dev:verbose    # Start with detailed logs
   - npm run docs:build     # Build documentation
   - npm run docs:dev       # Start docs development server
   - npm run docs:deploy    # Deploy to preview
   - npm run docs:deploy:prod # Deploy to production
   - npm run docs:clean     # Clean build artifacts

🔗 Resources:
- DNS Setup: docs/DNS_SETUP.md
- Local Hosts: scripts/setup-local-hosts.js
- Deployment: scripts/deploy-docs.sh
- Middleware: middleware.ts
- Vercel Docs: https://vercel.com/docs/concepts/projects/custom-domains
`);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  const setup = new DocsSubdomainSetup();
  setup.setup().catch(console.error);
}

module.exports = DocsSubdomainSetup;
