# Documentation Subdomain Setup Guide

## 🌐 Setting up docs.formerlyincarcerated.org

This guide walks you through setting up the documentation subdomain using Cloudflare DNS and Vercel deployment.

---

## 📋 **Prerequisites**

- ✅ Cloudflare account with formerlyincarcerated.org domain
- ✅ Vercel account connected to GitHub
- ✅ GitHub repository access
- ✅ Domain verification completed

---

## 🔧 **1. Cloudflare DNS Configuration**

### **Step 1: Add CNAME Record**

1. **Login to Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Select the `formerlyincarcerated.org` domain

2. **Navigate to DNS Settings**
   - Click on **DNS** in the left sidebar
   - Click **Add record**

3. **Create CNAME Record**
   ```
   Type: CNAME
   Name: docs
   Target: cname.vercel-dns.com
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

4. **Save the Record**
   - Click **Save**
   - Record should appear as: `docs.formerlyincarcerated.org → cname.vercel-dns.com`

### **Step 2: Verify DNS Propagation**

```bash
# Check DNS propagation (may take up to 24 hours)
nslookup docs.formerlyincarcerated.org
dig docs.formerlyincarcerated.org CNAME
```

---

## 🚀 **2. Vercel Deployment Setup**

### **Step 1: Deploy Documentation Site**

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account if not already connected

2. **Import Documentation Project**
   - Click **New Project**
   - Select `4eckd/formerlyincarcerated` repository
   - Choose **docs-site** folder as root directory

3. **Configure Build Settings**
   ```
   Framework Preset: Other
   Root Directory: docs-site
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Environment Variables** (if needed)
   ```
   NODE_ENV=production
   ```

5. **Deploy**
   - Click **Deploy**
   - Wait for deployment to complete

### **Step 2: Configure Custom Domain**

1. **Go to Project Settings**
   - Select your deployed docs project
   - Click **Settings** → **Domains**

2. **Add Custom Domain**
   ```
   Domain: docs.formerlyincarcerated.org
   ```

3. **Verify Domain**
   - Vercel will automatically verify the CNAME record
   - SSL certificate will be provisioned automatically

4. **Set as Primary Domain** (optional)
   - Mark `docs.formerlyincarcerated.org` as primary domain

---

## 🔗 **3. Main Site Integration**

### **Step 1: Update Main Site Links**

Add documentation links to your main site navigation:

```typescript
// In your main site navigation component
const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/web3', label: 'Web3' },
  { href: 'https://docs.formerlyincarcerated.org', label: 'Documentation' },
  { href: '/contact', label: 'Contact' },
];
```

### **Step 2: Add Documentation Route Handler**

Create a redirect route in your main app:

```typescript
// app/docs/route.ts
import { redirect } from 'next/navigation';

export async function GET() {
  redirect('https://docs.formerlyincarcerated.org');
}
```

---

## 📊 **4. Verification Checklist**

### **DNS Verification**
- [ ] CNAME record created in Cloudflare
- [ ] DNS propagation completed (24-48 hours max)
- [ ] `nslookup docs.formerlyincarcerated.org` returns Vercel IP

### **Vercel Deployment**
- [ ] Documentation site deployed successfully
- [ ] Custom domain configured
- [ ] SSL certificate provisioned
- [ ] Site accessible at `https://docs.formerlyincarcerated.org`

### **Content Verification**
- [ ] Documentation loads correctly
- [ ] Navigation works properly
- [ ] Search functionality operational
- [ ] Mobile responsiveness verified

### **Integration Testing**
- [ ] Links from main site work
- [ ] Cross-domain navigation functional
- [ ] SEO meta tags properly configured
- [ ] Analytics tracking setup (if applicable)

---

## 🛠️ **5. Troubleshooting**

### **Common Issues**

#### **DNS Not Resolving**
```bash
# Check current DNS settings
dig docs.formerlyincarcerated.org

# Clear local DNS cache (Windows)
ipconfig /flushdns

# Clear local DNS cache (macOS)
sudo dscacheutil -flushcache
```

#### **SSL Certificate Issues**
- Wait 24-48 hours for automatic provisioning
- Verify CNAME record is correct
- Check Vercel domain settings

#### **Build Failures**
```bash
# Test local build
cd docs-site
npm install
npm run build

# Check build logs in Vercel dashboard
```

#### **404 Errors**
- Verify `vercel.json` routing configuration
- Check Docusaurus `baseUrl` setting
- Ensure static files are properly generated

---

## 📈 **6. Performance Optimization**

### **Cloudflare Settings**

1. **Enable Caching**
   - Go to **Caching** → **Configuration**
   - Set caching level to **Standard**

2. **Enable Compression**
   - Go to **Speed** → **Optimization**
   - Enable **Brotli** compression

3. **Enable Minification**
   - Enable **Auto Minify** for CSS, HTML, JS

### **Vercel Optimization**

1. **Enable Analytics**
   - Go to **Analytics** in Vercel dashboard
   - Monitor performance metrics

2. **Configure Headers**
   - Security headers already configured in `vercel.json`
   - Cache headers for static assets

---

## 🔒 **7. Security Configuration**

### **Content Security Policy**
Already configured in `docs-site/vercel.json`:
```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;"
}
```

### **Additional Security Headers**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## 📞 **8. Support & Monitoring**

### **Monitoring Setup**
- **Vercel Analytics**: Built-in performance monitoring
- **Cloudflare Analytics**: DNS and traffic monitoring
- **Uptime Monitoring**: Consider external service like UptimeRobot

### **Support Contacts**
- **Cloudflare Support**: For DNS issues
- **Vercel Support**: For deployment issues
- **GitHub Issues**: For documentation content issues

---

## 🎯 **Expected Results**

After completing this setup:

1. **Primary Domain**: `https://formerlyincarcerated.org` (main site)
2. **Documentation**: `https://docs.formerlyincarcerated.org` (Docusaurus)
3. **SSL Certificates**: Automatically provisioned for both domains
4. **Performance**: Optimized with CDN and caching
5. **Security**: Enhanced with security headers and CSP

---

## 📝 **Configuration Files Created**

- ✅ `vercel.json` - Main site Vercel configuration
- ✅ `docs-site/vercel.json` - Documentation site configuration
- ✅ `docs-site/docusaurus.config.ts` - Updated with correct URLs
- ✅ `DOCS_SUBDOMAIN_SETUP.md` - This setup guide

---

*Building second chances through Web3 technology and community-driven support systems.*

**Last Updated**: June 22, 2025  
**Version**: 1.0.0
