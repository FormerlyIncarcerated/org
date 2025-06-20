# 🚀 Documentation Deployment Guide

This guide explains how to deploy the FUSED GAMING documentation to Vercel.

## 📋 Prerequisites

- GitHub repository: https://github.com/4eckd/react-boilerplate
- Vercel account: https://vercel.com
- Documentation files in `/docs` directory

## 🌐 Target Deployment

**Subdomain**: `docs.react-boilerplate-taupe.vercel.app`

## 📁 Deployment Structure

```
docs/
├── index.html              # Main documentation app
├── index.md               # Homepage content
├── package.json           # Project configuration
├── vercel.json            # Vercel deployment config
├── DEPLOYMENT.md          # This file
├── project/               # Project documentation
│   ├── getting-started.md
│   └── faq.md
├── technical/             # Technical documentation
│   ├── architecture.md
│   ├── theming.md
│   ├── components.md
│   ├── testing.md
│   └── deployment.md
└── legal/                 # Legal documentation
    ├── privacy_policy.md
    └── terms_of_service.md
```

## 🚀 Deployment Steps

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Navigate to docs directory**:
   ```bash
   cd docs
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

5. **Configure custom domain** (if needed):
   ```bash
   vercel domains add docs.react-boilerplate-taupe.vercel.app
   ```

### Method 2: Vercel Dashboard

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "New Project"**
3. **Import from GitHub**: Select `4eckd/react-boilerplate`
4. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: `docs`
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: Leave empty
5. **Deploy**

### Method 3: GitHub Integration

1. **Connect Repository** to Vercel
2. **Set up automatic deployments** from `docs/` directory
3. **Configure subdomain** in Vercel settings

## ⚙️ Configuration Files

### vercel.json
```json
{
  "version": 2,
  "name": "fused-gaming-docs",
  "builds": [
    {
      "src": "**/*.md",
      "use": "@vercel/static"
    },
    {
      "src": "**/*.html", 
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/index.html"
    },
    {
      "src": "/(.+)",
      "dest": "/$1.html"
    }
  ],
  "cleanUrls": true,
  "trailingSlash": false
}
```

## 🎨 Features

### Documentation App Features
- **📱 Responsive Design**: Works on all devices
- **🎨 Dark Theme**: Gaming-inspired dark theme
- **🔍 Syntax Highlighting**: Code blocks with proper highlighting
- **📖 Markdown Rendering**: Real-time markdown to HTML conversion
- **🧭 Navigation**: Sidebar navigation with sections
- **🔗 Deep Linking**: Direct links to documentation sections

### Content Sections
- **Getting Started**: Installation and setup guides
- **Technical**: Architecture, theming, components, testing
- **Legal**: Privacy policy and terms of service

## 🔧 Local Development

To test the documentation locally:

```bash
# Navigate to docs directory
cd docs

# Start local server (Python)
python -m http.server 3000

# Or use Node.js
npx serve . -p 3000

# Open browser
open http://localhost:3000
```

## 📝 Content Updates

To update documentation:

1. **Edit markdown files** in respective directories
2. **Commit changes** to GitHub
3. **Automatic deployment** will trigger (if GitHub integration is set up)
4. **Manual deployment**: Run `vercel --prod` from docs directory

## 🌐 Custom Domain Setup

If you want to use a custom domain:

1. **Add domain in Vercel dashboard**
2. **Configure DNS records**:
   - Type: CNAME
   - Name: docs
   - Value: cname.vercel-dns.com
3. **Verify domain** in Vercel

## 📊 Analytics & Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Automatic error reporting
- **Performance Metrics**: Core Web Vitals tracking

## 🔒 Security

- **HTTPS**: Automatic SSL certificate
- **Content Security Policy**: Configured for security
- **Static Site**: No server-side vulnerabilities

## 🎯 SEO Optimization

- **Meta Tags**: Proper title and description
- **Open Graph**: Social media sharing optimization
- **Sitemap**: Automatic sitemap generation
- **Clean URLs**: SEO-friendly URL structure

## 📞 Support

For deployment issues:
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Issues**: https://github.com/4eckd/react-boilerplate/issues
- **Vercel Support**: https://vercel.com/support
