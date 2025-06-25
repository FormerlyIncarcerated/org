# 🚀 SSH Deployment Commands for v2.1.1

## Quick Deployment Steps

### 1. Connect to Server
```bash
ssh deploy@194.31.143.6
```

### 2. Run Deployment Script
```bash
# Download and run the deployment script
curl -sSL https://raw.githubusercontent.com/4eckd/formerlyincarcerated/master/scripts/deploy-production.sh | bash

# OR if you have the repository cloned:
cd /home/deploy/formerlyincarcerated
git pull origin master
bash scripts/deploy-production.sh
```

### 3. Manual Deployment (if script fails)
```bash
# Navigate to project directory
cd /home/deploy/formerlyincarcerated || git clone https://github.com/4eckd/formerlyincarcerated.git /home/deploy/formerlyincarcerated && cd /home/deploy/formerlyincarcerated

# Pull latest changes
git fetch origin
git checkout master
git pull origin master

# Verify version
git describe --tags
# Should show: v2.1.1

# Install dependencies
bun install
cd docs-site && bun install && cd ..

# Build applications
bun run build
cd docs-site && bun run build && cd ..

# Deploy to web directories
sudo rm -rf /var/www/formerlyincarcerated.org/*
sudo cp -r .next/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true
sudo cp -r public/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true

sudo rm -rf /var/www/docs.formerlyincarcerated.org/*
sudo cp -r docs-site/build/* /var/www/docs.formerlyincarcerated.org/

# Set permissions
sudo chown -R deploy:www-data /var/www/formerlyincarcerated.org
sudo chown -R deploy:www-data /var/www/docs.formerlyincarcerated.org
sudo chmod -R 755 /var/www/formerlyincarcerated.org
sudo chmod -R 755 /var/www/docs.formerlyincarcerated.org

# Restart services
sudo systemctl restart nginx
pm2 restart all 2>/dev/null || true
```

### 4. Verification Commands
```bash
# Test main site
curl -I https://formerlyincarcerated.org

# Test documentation site
curl -I https://docs.formerlyincarcerated.org

# Check Nginx status
sudo systemctl status nginx

# Check application logs
sudo tail -f /var/log/nginx/access.log
```

---

## 🔧 Environment Configuration

### Production .env.local
Create `/home/deploy/formerlyincarcerated/.env.local` with:
```env
# Production Configuration
NEXT_PUBLIC_SITE_URL=https://formerlyincarcerated.org
NEXT_PUBLIC_DOCS_URL=https://docs.formerlyincarcerated.org
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Supabase (Replace with actual production values)
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# Security
NEXTAUTH_SECRET=your_secure_production_secret_32_chars_min
NEXTAUTH_URL=https://formerlyincarcerated.org

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SURVEYS=true
NEXT_PUBLIC_ENABLE_WEB3=true

# Prison Blues Theme
NEXT_PUBLIC_DEFAULT_THEME=theme-san-quentin
```

---

## 🚨 Troubleshooting

### Common Issues & Solutions

#### 1. Permission Denied
```bash
# Fix ownership
sudo chown -R deploy:www-data /var/www/formerlyincarcerated.org
sudo chown -R deploy:www-data /var/www/docs.formerlyincarcerated.org
```

#### 2. Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules docs-site/node_modules docs-site/build
bun install
cd docs-site && bun install && cd ..
bun run build
cd docs-site && bun run build && cd ..
```

#### 3. Nginx Not Starting
```bash
# Check configuration
sudo nginx -t

# Check logs
sudo tail -f /var/log/nginx/error.log

# Restart
sudo systemctl restart nginx
```

#### 4. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew if needed
sudo certbot renew
sudo systemctl restart nginx
```

---

## 📊 Post-Deployment Checklist

### ✅ Verify These Work:
- [ ] https://formerlyincarcerated.org loads
- [ ] https://docs.formerlyincarcerated.org loads
- [ ] SSL certificates are valid (green lock)
- [ ] Theme switching works (try different Prison Blues themes)
- [ ] Mobile responsiveness
- [ ] Documentation search (if enabled)
- [ ] All navigation links work
- [ ] Contact forms work (if applicable)

### 🔍 Check Logs:
```bash
# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Application logs (if using PM2)
pm2 logs

# System logs
sudo journalctl -u nginx -f
```

---

## 🎉 Success Indicators

If deployment is successful, you should see:
- ✅ Both sites load without errors
- ✅ Version 2.1.1 features are visible
- ✅ Prison Blues theme system works
- ✅ Documentation builds and displays correctly
- ✅ SSL certificates are valid
- ✅ No 404 errors on main navigation

---

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify all files were copied correctly
3. Ensure permissions are set properly
4. Test the build locally first
5. Use the backup if needed to rollback

**Server Details:**
- IP: 194.31.143.6
- IPv6: 2a11:29c0:4f50:5::10
- User: deploy
- Web Root: /var/www/formerlyincarcerated.org
- Docs Root: /var/www/docs.formerlyincarcerated.org
