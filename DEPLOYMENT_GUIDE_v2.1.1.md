# 🚀 Production Deployment Guide - v2.1.1

## Server Information
- **IP Address**: 194.31.143.6
- **IPv6**: 2a11:29c0:4f50:5::10
- **Domain**: formerlyincarcerated.org
- **Docs Domain**: docs.formerlyincarcerated.org

---

## 📋 Pre-Deployment Checklist

### ✅ Local Preparation Complete
- [x] Version updated to 2.1.1
- [x] All changes committed and pushed
- [x] Git tag v2.1.1 created
- [x] Documentation build tested locally
- [x] Environment files configured

### 🔑 SSH Access Required
You'll need SSH access to the server as the `deploy` user:
```bash
ssh deploy@194.31.143.6
```

---

## 🚀 Deployment Steps

### 1. Connect to Production Server
```bash
ssh deploy@194.31.143.6
```

### 2. Navigate to Application Directory
```bash
cd /var/www/formerlyincarcerated.org
```

### 3. Backup Current Deployment
```bash
# Create backup of current version
sudo cp -r /var/www/formerlyincarcerated.org /var/www/backups/formerlyincarcerated.org_$(date +%Y%m%d_%H%M%S)
```

### 4. Pull Latest Changes
```bash
# Pull latest code from repository
git fetch origin
git checkout master
git pull origin master

# Verify we're on the correct version
git describe --tags
# Should show: v2.1.1
```

### 5. Install Dependencies
```bash
# Install main application dependencies
bun install

# Install documentation dependencies
cd docs-site
bun install
cd ..
```

### 6. Build Applications
```bash
# Build main application
bun run build

# Build documentation site
cd docs-site
bun run build
cd ..
```

### 7. Update Environment Configuration
```bash
# Copy production environment file
cp .env.example .env.local

# Edit with production values (use nano or vim)
nano .env.local
```

**Required Environment Variables for Production:**
```env
# Production Configuration
NEXT_PUBLIC_SITE_URL=https://formerlyincarcerated.org
NEXT_PUBLIC_DOCS_URL=https://docs.formerlyincarcerated.org
NODE_ENV=production

# Supabase (Replace with actual values)
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# Security
NEXTAUTH_SECRET=your_secure_production_secret
NEXTAUTH_URL=https://formerlyincarcerated.org

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### 8. Set Proper Permissions
```bash
# Set ownership
sudo chown -R deploy:www-data /var/www/formerlyincarcerated.org
sudo chown -R deploy:www-data /var/www/docs.formerlyincarcerated.org

# Set permissions
sudo chmod -R 755 /var/www/formerlyincarcerated.org
sudo chmod -R 755 /var/www/docs.formerlyincarcerated.org
```

### 9. Copy Built Files to Web Directories
```bash
# Copy main application build
sudo cp -r .next/* /var/www/formerlyincarcerated.org/
sudo cp -r public/* /var/www/formerlyincarcerated.org/

# Copy documentation build
sudo cp -r docs-site/build/* /var/www/docs.formerlyincarcerated.org/
```

### 10. Restart Services
```bash
# Restart Nginx
sudo systemctl restart nginx

# If using PM2 for Node.js
pm2 restart all

# Or if using systemd service
sudo systemctl restart formerlyincarcerated
```

---

## 🔧 Nginx Configuration

### Main Site Configuration (`/etc/nginx/sites-available/formerlyincarcerated.org`)
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name formerlyincarcerated.org www.formerlyincarcerated.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name formerlyincarcerated.org www.formerlyincarcerated.org;

    ssl_certificate /etc/letsencrypt/live/formerlyincarcerated.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/formerlyincarcerated.org/privkey.pem;

    root /var/www/formerlyincarcerated.org;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ @nextjs;
    }

    location @nextjs {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Documentation Site Configuration (`/etc/nginx/sites-available/docs.formerlyincarcerated.org`)
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name docs.formerlyincarcerated.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name docs.formerlyincarcerated.org;

    ssl_certificate /etc/letsencrypt/live/docs.formerlyincarcerated.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/docs.formerlyincarcerated.org/privkey.pem;

    root /var/www/docs.formerlyincarcerated.org;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🔍 Verification Steps

### 1. Check Application Status
```bash
# Check if Next.js is running
pm2 status
# or
sudo systemctl status formerlyincarcerated

# Check Nginx status
sudo systemctl status nginx
```

### 2. Test Websites
```bash
# Test main site
curl -I https://formerlyincarcerated.org

# Test documentation site
curl -I https://docs.formerlyincarcerated.org
```

### 3. Check Logs
```bash
# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Application logs
pm2 logs
# or
sudo journalctl -u formerlyincarcerated -f
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
bun install
bun run build
```

#### 2. Permission Issues
```bash
# Fix ownership
sudo chown -R deploy:www-data /var/www/formerlyincarcerated.org
sudo chmod -R 755 /var/www/formerlyincarcerated.org
```

#### 3. SSL Certificate Issues
```bash
# Renew certificates
sudo certbot renew
sudo systemctl restart nginx
```

#### 4. Documentation Build Issues
```bash
cd docs-site
rm -rf node_modules build
bun install
bun run build
```

---

## 📊 Post-Deployment Verification

### ✅ Checklist
- [ ] Main site loads at https://formerlyincarcerated.org
- [ ] Documentation loads at https://docs.formerlyincarcerated.org
- [ ] SSL certificates are valid
- [ ] All theme variants work correctly
- [ ] Mobile responsiveness verified
- [ ] Search functionality works (if applicable)
- [ ] Contact forms work (if applicable)
- [ ] Analytics tracking active (if configured)

### 🔗 Test URLs
- **Main Site**: https://formerlyincarcerated.org
- **Documentation**: https://docs.formerlyincarcerated.org
- **API Health**: https://formerlyincarcerated.org/api/health (if applicable)

---

## 📞 Support

If you encounter issues during deployment:

1. **Check Logs**: Review Nginx and application logs
2. **Verify Configuration**: Ensure all config files are correct
3. **Test Locally**: Verify the build works locally first
4. **Rollback**: Use backup if needed
5. **Contact Support**: Document the issue and error messages

---

**🎉 Deployment Complete! Version 2.1.1 should now be live on production.**
