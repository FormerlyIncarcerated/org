# 🚀 Production Deployment Checklist

## 📋 Pre-Deployment Setup

### 1. Server Preparation
- [ ] **Run production setup script**: `sudo bash production-setup.sh`
- [ ] **Verify system packages installed**: Node.js 20, Nginx, PM2, Certbot
- [ ] **Create deploy user**: User `deploy` created with sudo access
- [ ] **Setup SSH access**: Add your public key to `/home/deploy/.ssh/authorized_keys`
- [ ] **Verify directory structure**: `/var/www/formerlyincarcerated.org` created

### 2. Environment Configuration
- [ ] **Edit environment file**: `/var/www/formerlyincarcerated.org/shared/.env.production`
- [ ] **Set Supabase credentials**: URL and API keys
- [ ] **Configure email settings**: SMTP credentials (if using email)
- [ ] **Set analytics ID**: Google Analytics (optional)
- [ ] **Generate NextAuth secret**: Strong random string

### 3. DNS Configuration
- [ ] **A Record**: `@` → Your server IP
- [ ] **A Record**: `www` → Your server IP  
- [ ] **A Record**: `docs` → Your server IP
- [ ] **Verify DNS propagation**: Use dnschecker.org
- [ ] **Test domain resolution**: `dig formerlyincarcerated.org`

---

## 🔧 Deployment Process

### 1. Initial Deployment
```bash
# Switch to deploy user
sudo su - deploy

# Navigate to app directory
cd /var/www/formerlyincarcerated.org

# Run initial deployment
./deploy.sh
```

### 2. Verify Application Status
```bash
# Check PM2 processes
pm2 status

# Check application logs
pm2 logs formerlyincarcerated-org
pm2 logs docs-formerlyincarcerated-org

# Check if apps are running on correct ports
curl http://localhost:3000  # Main app
curl http://localhost:3001  # Docs app
```

### 3. SSL Certificate Setup
```bash
# Install SSL certificates for all domains
sudo certbot --nginx -d formerlyincarcerated.org -d www.formerlyincarcerated.org -d docs.formerlyincarcerated.org

# Test automatic renewal
sudo certbot renew --dry-run
```

---

## ✅ Verification Steps

### 1. Website Accessibility
- [ ] **Main site loads**: https://formerlyincarcerated.org
- [ ] **WWW redirect works**: https://www.formerlyincarcerated.org
- [ ] **Docs site loads**: https://docs.formerlyincarcerated.org
- [ ] **SSL certificates valid**: Green lock icon in browser
- [ ] **HTTP redirects to HTTPS**: All domains force HTTPS

### 2. Functionality Testing
- [ ] **Theme selector works**: All 6 Prison Blues themes
- [ ] **Navigation functional**: All menu items work
- [ ] **Contact forms work**: If using email functionality
- [ ] **Mobile responsive**: Test on mobile devices
- [ ] **Performance check**: Page load times under 3 seconds

### 3. Technical Verification
- [ ] **Server resources**: CPU and memory usage normal
- [ ] **Log files clean**: No critical errors in logs
- [ ] **Backup system**: Deployment creates release backups
- [ ] **Firewall configured**: Only necessary ports open
- [ ] **Security headers**: Check with securityheaders.com

---

## 🔄 Ongoing Maintenance

### 1. Monitoring Setup
```bash
# Setup log rotation
sudo logrotate -d /etc/logrotate.d/formerlyincarcerated

# Monitor disk usage
df -h

# Check system resources
htop
```

### 2. Update Process
```bash
# Pull latest changes
cd /var/www/formerlyincarcerated.org/repo
git pull origin master

# Deploy updates
./deploy.sh
```

### 3. Backup Strategy
- [ ] **Database backups**: If using Supabase, configure automated backups
- [ ] **File backups**: Regular backup of `/var/www` directory
- [ ] **SSL certificate renewal**: Automated via Certbot cron job

---

## 🚨 Troubleshooting

### Common Issues

**1. Application Won't Start**
```bash
# Check PM2 logs
pm2 logs

# Restart applications
pm2 restart all

# Check environment variables
cat /var/www/formerlyincarcerated.org/shared/.env.production
```

**2. SSL Certificate Issues**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates manually
sudo certbot renew

# Check Nginx configuration
sudo nginx -t
```

**3. DNS Not Resolving**
```bash
# Check DNS propagation
dig formerlyincarcerated.org
nslookup formerlyincarcerated.org

# Clear local DNS cache
sudo systemctl flush-dns
```

**4. Performance Issues**
```bash
# Check server resources
htop
df -h

# Restart services
sudo systemctl restart nginx
pm2 restart all
```

---

## 📊 Performance Optimization

### 1. Nginx Optimization
- [ ] **Gzip compression enabled**: Check response headers
- [ ] **Static file caching**: Long cache headers for assets
- [ ] **Rate limiting**: Protect against abuse
- [ ] **Security headers**: All security headers configured

### 2. Application Optimization
- [ ] **PM2 cluster mode**: Using all CPU cores
- [ ] **Memory limits**: Prevent memory leaks
- [ ] **Log rotation**: Prevent disk space issues
- [ ] **Build optimization**: Production builds minified

### 3. Monitoring
- [ ] **Uptime monitoring**: Setup external monitoring service
- [ ] **Performance monitoring**: Track page load times
- [ ] **Error tracking**: Monitor application errors
- [ ] **Resource monitoring**: CPU, memory, disk usage

---

## 🔐 Security Checklist

### 1. Server Security
- [ ] **Firewall configured**: UFW enabled with minimal ports
- [ ] **SSH hardened**: Key-based authentication only
- [ ] **Fail2ban active**: Protection against brute force
- [ ] **System updates**: Regular security updates

### 2. Application Security
- [ ] **Environment variables**: Sensitive data not in code
- [ ] **HTTPS enforced**: All traffic encrypted
- [ ] **Security headers**: CSP, HSTS, etc. configured
- [ ] **Input validation**: All forms properly validated

### 3. Regular Maintenance
- [ ] **Security updates**: Monthly system updates
- [ ] **SSL renewal**: Automated certificate renewal
- [ ] **Log monitoring**: Regular log review
- [ ] **Backup testing**: Verify backup integrity

---

## 📞 Emergency Contacts

### Technical Support
- **Server Provider**: [Your hosting provider support]
- **Domain Registrar**: [Your domain registrar support]
- **DNS Provider**: [Your DNS provider support]

### Rollback Procedure
```bash
# List available releases
ls -la /var/www/formerlyincarcerated.org/releases/

# Rollback to previous release
ln -sfn /var/www/formerlyincarcerated.org/releases/[PREVIOUS_TIMESTAMP] /var/www/formerlyincarcerated.org/current

# Restart applications
pm2 restart all
```

---

## ✅ Final Verification

Once everything is deployed and configured:

- [ ] **Main site**: https://formerlyincarcerated.org ✅
- [ ] **WWW redirect**: https://www.formerlyincarcerated.org ✅
- [ ] **Docs site**: https://docs.formerlyincarcerated.org ✅
- [ ] **SSL certificates**: All domains have valid SSL ✅
- [ ] **Performance**: Page load times < 3 seconds ✅
- [ ] **Mobile responsive**: Works on all devices ✅
- [ ] **Theme system**: All Prison Blues themes functional ✅
- [ ] **Security**: All security headers configured ✅
- [ ] **Monitoring**: Logs and monitoring active ✅
- [ ] **Backups**: Backup system operational ✅

---

**🎉 Congratulations! FormerlyIncarcerated.org is now live in production!**

*Building second chances through technology - now serving the community 24/7.*
