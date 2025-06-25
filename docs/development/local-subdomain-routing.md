# Local Subdomain Routing for Development

## Overview

This guide explains how to set up local subdomain routing for the documentation site during development. This allows you to test the `docs.localhost:3000` subdomain locally before deploying to production.

## Quick Start

1. **Setup local subdomain routing:**
   ```bash
   npm run docs:hosts
   ```

2. **Start development servers:**
   ```bash
   npm run dev:docs
   ```

3. **Test the setup:**
   - Main app: http://localhost:3000
   - Docs direct: http://localhost:3001
   - Docs subdomain: http://docs.localhost:3000
   - **Navigation link**: Look for "Docs Local" in the navigation menu (development only)

## Architecture

### Components

1. **Next.js Middleware** (`middleware.ts`)
   - Handles subdomain detection
   - Routes `docs.localhost` requests to docs site
   - Provides fallback routing

2. **Development Script** (`scripts/dev-with-docs.js`)
   - Starts both main app (port 3000) and docs site (port 3001)
   - Manages process lifecycle
   - Provides graceful shutdown

3. **Hosts File Setup** (`scripts/setup-local-hosts.js`)
   - Guides users through hosts file modification
   - Platform-specific instructions
   - Status checking

4. **Next.js Configuration** (`next.config.mjs`)
   - Defines rewrite rules for subdomain routing
   - Sets up security headers
   - Handles fallback routes

### Routing Flow

```
docs.localhost:3000
       ↓
   middleware.ts (detects subdomain)
       ↓
   Rewrite to localhost:3001
       ↓
   Docs site (Docusaurus)
```

## Setup Instructions

### 1. Hosts File Configuration

The hosts file maps `docs.localhost` to `127.0.0.1` (localhost).

#### Automatic Setup
```bash
npm run docs:hosts
```

#### Manual Setup

**Windows:**
1. Open Command Prompt as Administrator
2. Edit: `C:\Windows\System32\drivers\etc\hosts`
3. Add: `127.0.0.1 docs.localhost`

**macOS/Linux:**
1. Open Terminal
2. Run: `sudo nano /etc/hosts`
3. Add: `127.0.0.1 docs.localhost`

### 2. Development Servers

#### Start Both Servers
```bash
npm run dev:docs
```

This starts:
- Main Next.js app on port 3000
- Docs site on port 3001
- Automatic process management

#### Start Individual Servers
```bash
# Main app only
npm run dev

# Docs only
cd docs-site && npm run start -- --port 3001
```

### 3. Verification

Check that everything is working:

```bash
# Check hosts file
npm run docs:hosts:check

# Test URLs
curl -H "Host: docs.localhost" http://localhost:3000
curl http://localhost:3001
```

## Configuration Options

### Environment Variables

```bash
# Custom ports
PORT=3002 DOCS_PORT=3003 npm run dev:docs

# Verbose logging
VERBOSE=1 npm run dev:docs

# Or use the verbose script
npm run dev:verbose
```

### Middleware Configuration

The middleware can be customized in `middleware.ts`:

```typescript
export const config = {
  matcher: [
    // Customize which routes are processed
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### Next.js Rewrites

Custom rewrite rules in `next.config.mjs`:

```javascript
async rewrites() {
  return [
    {
      source: '/docs/:path*',
      destination: 'http://localhost:3001/:path*',
      has: [{ type: 'host', value: 'docs.localhost' }],
    },
  ]
}
```

## Troubleshooting

### Common Issues

#### 1. "Site can't be reached"
- **Cause:** Hosts file not configured or DNS cache
- **Solution:**
  ```bash
  # Check hosts file
  npm run docs:hosts:check
  
  # Clear DNS cache
  # Windows:
  ipconfig /flushdns
  
  # macOS:
  sudo dscacheutil -flushcache
  
  # Linux:
  sudo systemctl restart systemd-resolved
  ```

#### 2. Shows main app instead of docs
- **Cause:** Middleware not working or docs site not running
- **Solution:**
  ```bash
  # Check if docs site is running
  curl http://localhost:3001
  
  # Restart development servers
  npm run dev:docs
  
  # Check middleware logs
  VERBOSE=1 npm run dev:docs
  ```

#### 3. Port conflicts
- **Cause:** Ports 3000 or 3001 already in use
- **Solution:**
  ```bash
  # Use different ports
  PORT=3002 DOCS_PORT=3003 npm run dev:docs
  
  # Find what's using the ports
  # Windows:
  netstat -ano | findstr :3000
  
  # macOS/Linux:
  lsof -i :3000
  ```

#### 4. Permission denied editing hosts file
- **Cause:** Insufficient privileges
- **Solution:**
  - Windows: Run Command Prompt as Administrator
  - macOS/Linux: Use `sudo` with the command

### Debug Commands

```bash
# Test subdomain routing
curl -H "Host: docs.localhost" http://localhost:3000

# Check if docs site is accessible
curl http://localhost:3001

# Test with browser headers
curl -H "Host: docs.localhost" -H "User-Agent: Mozilla/5.0" http://localhost:3000

# Check hosts file content
# Windows:
type C:\Windows\System32\drivers\etc\hosts | findstr docs

# macOS/Linux:
grep docs /etc/hosts
```

## Production Deployment

### Vercel Configuration

For production, the subdomain routing is handled by:

1. **DNS Records:** CNAME `docs` → `cname.vercel-dns.com`
2. **Vercel Projects:** Separate projects for main app and docs
3. **Custom Domains:** `docs.formerlyincarcerated.org`

### Environment Differences

| Environment | Main App | Docs Site | Subdomain |
|-------------|----------|-----------|-----------|
| Development | localhost:3000 | localhost:3001 | docs.localhost:3000 |
| Production | formerlyincarcerated.org | docs.formerlyincarcerated.org | docs.formerlyincarcerated.org |

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev:docs` | Start both main app and docs site |
| `npm run dev:verbose` | Start with detailed logging |
| `npm run docs:hosts` | Setup local subdomain routing |
| `npm run docs:hosts:check` | Check hosts file status |
| `npm run docs:setup` | Complete docs subdomain setup |
| `npm run docs:build` | Build documentation |
| `npm run docs:deploy` | Deploy to preview |
| `npm run docs:deploy:prod` | Deploy to production |

## Advanced Configuration

### Custom Subdomain

To use a different subdomain (e.g., `documentation.localhost`):

1. Update hosts file: `127.0.0.1 documentation.localhost`
2. Modify middleware.ts: `hostname.startsWith('documentation.')`
3. Update rewrite rules in next.config.mjs

### HTTPS Support

For local HTTPS development:

1. Generate SSL certificates
2. Configure Next.js with HTTPS
3. Update hosts file for HTTPS
4. Modify middleware for HTTPS detection

### Multiple Subdomains

To support multiple subdomains:

1. Add entries to hosts file
2. Extend middleware logic
3. Configure additional rewrite rules
4. Update development scripts
