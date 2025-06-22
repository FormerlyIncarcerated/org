# FormerlyIncarcerated.org Deployment Plan
## infuze.cloud Ubuntu Instance with Git CI/CD

**Created:** June 22, 2025  
**Target Environment:** infuze.cloud Ubuntu Server  
**Deployment Method:** Git-based CI/CD with SSH automation

---

## 🎯 Deployment Overview

### Architecture
- **Main Site:** formerlyincarcerated.org (Next.js 15 application)
- **Documentation:** docs.formerlyincarcerated.org (Docusaurus site)
- **Server:** Ubuntu instance on infuze.cloud
- **CI/CD:** Git hooks + GitHub Actions
- **Process Manager:** PM2 for Node.js applications
- **Reverse Proxy:** Nginx for domain routing and SSL

### Deployment Strategy
1. **Git-based deployment** with automated builds
2. **Zero-downtime deployments** using PM2 ecosystem
3. **SSL certificates** via Let's Encrypt/Certbot
4. **Environment-specific configurations**
5. **Automated backups** and rollback capabilities

---

## 🛠 Server Setup Requirements

### System Prerequisites
```bash
# Ubuntu Server Setup
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
```

### Node.js & Package Manager Setup
```bash
# Install Node.js 18+ LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install bun (optional, for faster builds)
curl -fsSL https://bun.sh/install | bash
```

### Directory Structure
```
/var/www/
├── formerlyincarcerated.org/
│   ├── current/           # Current production build
│   ├── releases/          # Previous releases for rollback
│   ├── shared/            # Shared files (logs, uploads, etc.)
│   └── repo/              # Git repository
└── docs.formerlyincarcerated.org/
    ├── current/
    ├── releases/
    ├── shared/
    └── repo/
```

---

## 🔧 Git Repository Configuration

### Repository Setup
```bash
# Create bare repository for main site
sudo mkdir -p /var/www/formerlyincarcerated.org/repo
cd /var/www/formerlyincarcerated.org/repo
sudo git init --bare

# Create bare repository for docs
sudo mkdir -p /var/www/docs.formerlyincarcerated.org/repo
cd /var/www/docs.formerlyincarcerated.org/repo
sudo git init --bare

# Set proper permissions
sudo chown -R www-data:www-data /var/www/
sudo chmod -R 755 /var/www/
```

### Git Hooks for Automated Deployment
```bash
# Main site post-receive hook
sudo tee /var/www/formerlyincarcerated.org/repo/hooks/post-receive << 'EOF'
#!/bin/bash
set -e

REPO_DIR="/var/www/formerlyincarcerated.org/repo"
WORK_DIR="/var/www/formerlyincarcerated.org/current"
RELEASES_DIR="/var/www/formerlyincarcerated.org/releases"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RELEASE_DIR="$RELEASES_DIR/$TIMESTAMP"

echo "🚀 Starting deployment..."

# Create release directory
mkdir -p "$RELEASE_DIR"

# Checkout latest code
git --git-dir="$REPO_DIR" --work-tree="$RELEASE_DIR" checkout -f

# Install dependencies and build
cd "$RELEASE_DIR"
npm ci --production
npm run build

# Update symlink to new release
ln -sfn "$RELEASE_DIR" "$WORK_DIR"

# Restart application
pm2 restart formerlyincarcerated-org || pm2 start ecosystem.config.js

# Cleanup old releases (keep last 5)
cd "$RELEASES_DIR"
ls -t | tail -n +6 | xargs -r rm -rf

echo "✅ Deployment completed successfully!"
EOF

sudo chmod +x /var/www/formerlyincarcerated.org/repo/hooks/post-receive
```

---

## 🌐 Nginx Configuration

### Main Site Configuration
```nginx
# /etc/nginx/sites-available/formerlyincarcerated.org
server {
    listen 80;
    server_name formerlyincarcerated.org www.formerlyincarcerated.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name formerlyincarcerated.org www.formerlyincarcerated.org;

    ssl_certificate /etc/letsencrypt/live/formerlyincarcerated.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/formerlyincarcerated.org/privkey.pem;
    
    # SSL Security Headers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    location / {
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

### Documentation Site Configuration
```nginx
# /etc/nginx/sites-available/docs.formerlyincarcerated.org
server {
    listen 80;
    server_name docs.formerlyincarcerated.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name docs.formerlyincarcerated.org;

    ssl_certificate /etc/letsencrypt/live/docs.formerlyincarcerated.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/docs.formerlyincarcerated.org/privkey.pem;
    
    # Same SSL configuration as main site
    
    location / {
        proxy_pass http://localhost:3001;
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

---

## 🔄 PM2 Process Management

### Ecosystem Configuration
```javascript
// ecosystem.config.js for main site
module.exports = {
  apps: [
    {
      name: 'formerlyincarcerated-org',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/formerlyincarcerated.org/current',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/www/formerlyincarcerated.org/shared/logs/err.log',
      out_file: '/var/www/formerlyincarcerated.org/shared/logs/out.log',
      log_file: '/var/www/formerlyincarcerated.org/shared/logs/combined.log',
      time: true
    },
    {
      name: 'docs-formerlyincarcerated-org',
      script: 'npm',
      args: 'run serve',
      cwd: '/var/www/docs.formerlyincarcerated.org/current',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/www/docs.formerlyincarcerated.org/shared/logs/err.log',
      out_file: '/var/www/docs.formerlyincarcerated.org/shared/logs/out.log',
      log_file: '/var/www/docs.formerlyincarcerated.org/shared/logs/combined.log',
      time: true
    }
  ]
};
```

---

## 🔐 SSL Certificate Setup

### Let's Encrypt Configuration
```bash
# Install certificates for both domains
sudo certbot --nginx -d formerlyincarcerated.org -d www.formerlyincarcerated.org
sudo certbot --nginx -d docs.formerlyincarcerated.org

# Set up automatic renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Server provisioned and accessible via SSH
- [ ] Domain DNS configured to point to server IP
- [ ] SSL certificates installed and configured
- [ ] Git repositories set up with proper hooks
- [ ] PM2 ecosystem configuration deployed
- [ ] Nginx virtual hosts configured and enabled
- [ ] Environment variables configured
- [ ] Database connections tested (if applicable)

### Deployment Process
- [ ] Push code to production branch
- [ ] Verify automatic deployment via git hooks
- [ ] Check application status via PM2
- [ ] Verify sites accessible via HTTPS
- [ ] Test all major functionality
- [ ] Monitor logs for errors
- [ ] Verify SSL certificate validity
- [ ] Test backup and rollback procedures

### Post-Deployment
- [ ] Set up monitoring and alerting
- [ ] Configure log rotation
- [ ] Schedule regular backups
- [ ] Document rollback procedures
- [ ] Update team on deployment status

---

## 🚨 Rollback Procedures

### Quick Rollback
```bash
# List available releases
ls -la /var/www/formerlyincarcerated.org/releases/

# Rollback to previous release
PREVIOUS_RELEASE=$(ls -t /var/www/formerlyincarcerated.org/releases/ | sed -n '2p')
ln -sfn "/var/www/formerlyincarcerated.org/releases/$PREVIOUS_RELEASE" \
       "/var/www/formerlyincarcerated.org/current"

# Restart application
pm2 restart formerlyincarcerated-org
```

### Emergency Procedures
- Immediate rollback to last known good release
- Database rollback procedures (if schema changes)
- DNS failover to backup server (if available)
- Communication plan for stakeholders

---

## 📊 Monitoring & Maintenance

### Log Management
```bash
# PM2 log monitoring
pm2 logs formerlyincarcerated-org --lines 100

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# System monitoring
htop
df -h
free -m
```

### Regular Maintenance Tasks
- Weekly security updates
- Monthly log cleanup
- Quarterly SSL certificate renewal check
- Bi-annual backup restoration tests

---

**Next Steps:**
1. Provision infuze.cloud Ubuntu instance
2. Configure SSH access and security
3. Implement deployment scripts
4. Test deployment process in staging
5. Execute production deployment

