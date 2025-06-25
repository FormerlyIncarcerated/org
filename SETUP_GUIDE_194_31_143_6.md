# 🚀 FormerlyIncarcerated.org Production Setup Guide

**Server:** 194.31.143.6 (IPv6: 2a11:29c0:4f50:5::10)  
**Domain:** formerlyincarcerated.org  
**Documentation:** docs.formerlyincarcerated.org

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Server Setup (Run on your server via SSH)

```bash
# SSH into your server as root
ssh root@194.31.143.6

# Download and run the setup script
wget https://raw.githubusercontent.com/4eckd/formerlyincarcerated/master/server-setup-194-31-143-6.sh
chmod +x server-setup-194-31-143-6.sh
sudo bash server-setup-194-31-143-6.sh
```

**What this does:**
- ✅ Installs Node.js 20, Nginx, PM2, Certbot
- ✅ Creates deploy user with sudo access
- ✅ Sets up directory structure
- ✅ Configures Nginx with IPv6 support
- ✅ Sets up firewall (UFW)
- ✅ Creates PM2 ecosystem configuration

### Step 2: SSH Key Setup

```bash
# On your local machine, copy your SSH public key
cat ~/.ssh/id_rsa.pub

# On the server, add your key to the deploy user
sudo su - deploy
echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
```

### Step 3: Configure Environment Variables

```bash
# Edit the production environment file
sudo nano /var/www/formerlyincarcerated.org/shared/.env.production
```

**Required variables to update:**
```env
# Supabase Configuration (REPLACE WITH YOUR VALUES)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Security (GENERATE A STRONG SECRET)
NEXTAUTH_SECRET=your_strong_random_secret_here

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Step 4: DNS Configuration

Configure these DNS records with your domain provider:

#### A Records (IPv4)
```
Type: A
Name: @
Value: 194.31.143.6
TTL: 300

Type: A
Name: www
Value: 194.31.143.6
TTL: 300

Type: A
Name: docs
Value: 194.31.143.6
TTL: 300
```

#### AAAA Records (IPv6)
```
Type: AAAA
Name: @
Value: 2a11:29c0:4f50:5::10
TTL: 300

Type: AAAA
Name: www
Value: 2a11:29c0:4f50:5::10
TTL: 300

Type: AAAA
Name: docs
Value: 2a11:29c0:4f50:5::10
TTL: 300
```

### Step 5: Initial Deployment

```bash
# Switch to deploy user
sudo su - deploy

# Navigate to app directory
cd /var/www/formerlyincarcerated.org

# Run initial deployment
bash deploy-to-194-31-143-6.sh
```

### Step 6: Verify Applications

```bash
# Check PM2 status
pm2 status

# Check application logs
pm2 logs

# Test local applications
curl http://localhost:3000  # Main app
curl http://localhost:3001  # Docs app
```

### Step 7: Wait for DNS Propagation

**Check DNS propagation:**
```bash
# Check if DNS is propagating
dig formerlyincarcerated.org @8.8.8.8
dig docs.formerlyincarcerated.org @8.8.8.8

# Online tools:
# https://dnschecker.org/
# https://www.whatsmydns.net/
```

**Typical propagation times:**
- Local ISP: 5-30 minutes
- Regional: 1-4 hours
- Global: 24-48 hours maximum

### Step 8: SSL Certificate Setup

**After DNS propagation is complete:**

```bash
# Install SSL certificates for all domains
sudo certbot --nginx -d formerlyincarcerated.org -d www.formerlyincarcerated.org -d docs.formerlyincarcerated.org

# Test automatic renewal
sudo certbot renew --dry-run
```

---

## ✅ Verification Checklist

### Server Status
- [ ] **Server accessible**: `ssh deploy@194.31.143.6`
- [ ] **Applications running**: `pm2 status` shows online
- [ ] **Nginx running**: `sudo systemctl status nginx`
- [ ] **Firewall configured**: `sudo ufw status`

### DNS Configuration
- [ ] **A records configured**: @ www docs → 194.31.143.6
- [ ] **AAAA records configured**: @ www docs → 2a11:29c0:4f50:5::10
- [ ] **DNS propagation**: `dig formerlyincarcerated.org`
- [ ] **All subdomains resolve**: www, docs

### Website Accessibility
- [ ] **Main site**: https://formerlyincarcerated.org
- [ ] **WWW redirect**: https://www.formerlyincarcerated.org
- [ ] **Documentation**: https://docs.formerlyincarcerated.org
- [ ] **SSL certificates**: Green lock icon
- [ ] **HTTPS redirect**: HTTP automatically redirects to HTTPS

### Functionality Testing
- [ ] **Theme selector**: All 6 Prison Blues themes work
- [ ] **Navigation**: All menu items functional
- [ ] **Mobile responsive**: Works on mobile devices
- [ ] **Performance**: Page load times under 3 seconds
- [ ] **Contact forms**: If using email functionality

---

## 🔧 Maintenance Commands

### Application Management
```bash
# Check status
pm2 status

# View logs
pm2 logs
pm2 logs formerlyincarcerated-org
pm2 logs docs-formerlyincarcerated-org

# Restart applications
pm2 restart all

# Monitor resources
pm2 monit
```

### Server Management
```bash
# Check system resources
htop
df -h

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Check SSL certificates
sudo certbot certificates

# View application logs
tail -f /var/log/formerlyincarcerated/app-combined.log
```

### Deployment Updates
```bash
# Deploy updates (as deploy user)
cd /var/www/formerlyincarcerated.org
bash deploy-to-194-31-143-6.sh

# Or use the quick deploy script from local machine
bash quick-deploy.sh
```

---

## 🚨 Troubleshooting

### Common Issues

**1. Applications won't start**
```bash
# Check logs
pm2 logs

# Check environment variables
cat /var/www/formerlyincarcerated.org/shared/.env.production

# Restart applications
pm2 restart all
```

**2. DNS not resolving**
```bash
# Check DNS propagation
dig formerlyincarcerated.org
nslookup formerlyincarcerated.org 8.8.8.8

# Clear local DNS cache
sudo systemctl flush-dns
```

**3. SSL certificate issues**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Check Nginx configuration
sudo nginx -t
sudo systemctl reload nginx
```

**4. Performance issues**
```bash
# Check server resources
htop
df -h

# Check application memory usage
pm2 monit

# Restart services if needed
pm2 restart all
sudo systemctl restart nginx
```

---

## 📊 Monitoring & Alerts

### Log Files
- **Application logs**: `/var/log/formerlyincarcerated/`
- **Nginx logs**: `/var/log/nginx/`
- **System logs**: `/var/log/syslog`

### Performance Monitoring
```bash
# Real-time monitoring
pm2 monit

# System resources
htop
iotop
nethogs

# Disk usage
df -h
du -sh /var/www/*
```

---

## 🔐 Security Notes

### Firewall Configuration
- **Port 22**: SSH access
- **Port 80**: HTTP (redirects to HTTPS)
- **Port 443**: HTTPS
- **All other ports**: Blocked

### Security Features
- ✅ **Fail2ban**: Protection against brute force attacks
- ✅ **UFW firewall**: Minimal open ports
- ✅ **SSL/TLS**: Let's Encrypt certificates
- ✅ **Security headers**: Configured in Nginx
- ✅ **Rate limiting**: Protection against abuse

---

## 📞 Support Information

### Server Details
- **IPv4**: 194.31.143.6
- **IPv6**: 2a11:29c0:4f50:5::10
- **OS**: Ubuntu Server
- **Web Server**: Nginx
- **Application Server**: Node.js + PM2

### Emergency Procedures
```bash
# Stop all applications
pm2 stop all

# Rollback to previous release
ls -la /var/www/formerlyincarcerated.org/releases/
ln -sfn /var/www/formerlyincarcerated.org/releases/PREVIOUS_TIMESTAMP /var/www/formerlyincarcerated.org/current
pm2 restart all
```

---

## 🎉 Success!

Once all steps are completed, your FormerlyIncarcerated.org platform will be:

- ✅ **Live and accessible** at https://formerlyincarcerated.org
- ✅ **Documentation available** at https://docs.formerlyincarcerated.org
- ✅ **SSL secured** with automatic certificate renewal
- ✅ **High performance** with Nginx and PM2
- ✅ **Prison Blues themes** fully functional
- ✅ **Mobile responsive** across all devices
- ✅ **Production ready** for community use

**🏛️ Building second chances through technology - now serving the community 24/7!**
