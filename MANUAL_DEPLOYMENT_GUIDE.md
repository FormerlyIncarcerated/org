# 🚀 Manual Deployment Guide - Immediate Deployment

**Deploy FormerlyIncarcerated.org v2.1.1 to Infuze Cloud Instance**

---

## 🎯 Quick Deployment Steps

### **Option 1: SSH with Password (Immediate)**

#### **1. Connect to Server**
```bash
ssh deploy@194.31.143.6
# Enter password when prompted
```

#### **2. Update Repository**
```bash
cd /home/deploy/formerlyincarcerated || git clone https://github.com/4eckd/formerlyincarcerated.git /home/deploy/formerlyincarcerated && cd /home/deploy/formerlyincarcerated

# Pull latest changes
git fetch origin
git checkout master
git pull origin master

# Verify we're on the latest version
git log --oneline -3
```

#### **3. Install Dependencies**
```bash
# Install main dependencies
bun install || npm install

# Install docs dependencies
cd docs-site
bun install || npm install
cd ..
```

#### **4. Build Applications**
```bash
# Build main application
bun run build || npm run build

# Build documentation
cd docs-site
bun run build || npm run build
cd ..
```

#### **5. Deploy to Web Directories**
```bash
# Backup current deployment
sudo mkdir -p /var/www/backups
sudo cp -r /var/www/formerlyincarcerated.org /var/www/backups/formerlyincarcerated.org_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
sudo cp -r /var/www/docs.formerlyincarcerated.org /var/www/backups/docs.formerlyincarcerated.org_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# Deploy main application
sudo rm -rf /var/www/formerlyincarcerated.org/*
sudo cp -r .next/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true
sudo cp -r public/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true

# Deploy documentation
sudo rm -rf /var/www/docs.formerlyincarcerated.org/*
sudo cp -r docs-site/build/* /var/www/docs.formerlyincarcerated.org/
```

#### **6. Set Permissions**
```bash
# Set proper ownership and permissions
sudo chown -R deploy:www-data /var/www/formerlyincarcerated.org
sudo chown -R deploy:www-data /var/www/docs.formerlyincarcerated.org
sudo chmod -R 755 /var/www/formerlyincarcerated.org
sudo chmod -R 755 /var/www/docs.formerlyincarcerated.org
```

#### **7. Restart Services**
```bash
# Restart Nginx
sudo systemctl restart nginx

# Restart PM2 processes (if running)
pm2 restart all 2>/dev/null || echo "PM2 not running or no processes"

# Check service status
sudo systemctl status nginx
```

#### **8. Verify Deployment**
```bash
# Test local responses
curl -I http://localhost
curl -I http://localhost:80

# Check if sites are accessible
curl -I https://formerlyincarcerated.org
curl -I https://docs.formerlyincarcerated.org
```

---

## 🔧 **Option 2: One-Command Deployment**

Copy and paste this entire block into your SSH session:

```bash
#!/bin/bash
set -e

echo "🚀 Starting FormerlyIncarcerated.org deployment..."

# Navigate to project directory
cd /home/deploy/formerlyincarcerated || (echo "❌ Project directory not found" && exit 1)

# Update repository
echo "📥 Updating repository..."
git fetch origin
git checkout master
git pull origin master

# Install dependencies
echo "📦 Installing dependencies..."
bun install || npm install
cd docs-site && (bun install || npm install) && cd ..

# Build applications
echo "🔨 Building applications..."
bun run build || npm run build
cd docs-site && (bun run build || npm run build) && cd ..

# Create backup
echo "💾 Creating backup..."
sudo mkdir -p /var/www/backups
sudo cp -r /var/www/formerlyincarcerated.org /var/www/backups/formerlyincarcerated.org_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
sudo cp -r /var/www/docs.formerlyincarcerated.org /var/www/backups/docs.formerlyincarcerated.org_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# Deploy files
echo "📁 Deploying files..."
sudo rm -rf /var/www/formerlyincarcerated.org/*
sudo cp -r .next/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true
sudo cp -r public/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true

sudo rm -rf /var/www/docs.formerlyincarcerated.org/*
sudo cp -r docs-site/build/* /var/www/docs.formerlyincarcerated.org/

# Set permissions
echo "🔐 Setting permissions..."
sudo chown -R deploy:www-data /var/www/formerlyincarcerated.org
sudo chown -R deploy:www-data /var/www/docs.formerlyincarcerated.org
sudo chmod -R 755 /var/www/formerlyincarcerated.org
sudo chmod -R 755 /var/www/docs.formerlyincarcerated.org

# Restart services
echo "🔄 Restarting services..."
sudo systemctl restart nginx
pm2 restart all 2>/dev/null || echo "PM2 not running"

# Verify deployment
echo "🔍 Verifying deployment..."
sleep 3
if curl -f -s http://localhost > /dev/null; then
    echo "✅ Local server responding"
else
    echo "⚠️  Local server may not be responding"
fi

echo "🎉 Deployment completed!"
echo "📊 Deployment Summary:"
echo "   • Version: $(git describe --tags 2>/dev/null || git rev-parse --short HEAD)"
echo "   • Time: $(date)"
echo "   • Main Site: https://formerlyincarcerated.org"
echo "   • Documentation: https://docs.formerlyincarcerated.org"
```

---

## 🔍 **Verification Steps**

After deployment, verify everything is working:

### **1. Check Websites**
```bash
# From your local machine
curl -I https://formerlyincarcerated.org
curl -I https://docs.formerlyincarcerated.org

# Should return HTTP/2 200 or 301/302
```

### **2. Check Server Status**
```bash
# On the server
sudo systemctl status nginx
sudo systemctl status ssh
df -h  # Check disk usage
free -h  # Check memory usage
```

### **3. Check Logs**
```bash
# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Build Failures**
```bash
# Clear cache and rebuild
rm -rf .next node_modules docs-site/node_modules docs-site/build
npm install
cd docs-site && npm install && cd ..
npm run build
cd docs-site && npm run build && cd ..
```

#### **Permission Issues**
```bash
# Fix ownership
sudo chown -R deploy:www-data /var/www/formerlyincarcerated.org
sudo chown -R deploy:www-data /var/www/docs.formerlyincarcerated.org

# Fix permissions
sudo chmod -R 755 /var/www/formerlyincarcerated.org
sudo chmod -R 755 /var/www/docs.formerlyincarcerated.org
```

#### **Nginx Issues**
```bash
# Test configuration
sudo nginx -t

# Restart if needed
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

#### **Repository Issues**
```bash
# Reset to latest
git fetch origin
git reset --hard origin/master
git clean -fd
```

---

## 🔑 **Setting Up SSH Keys (For Future Automation)**

### **1. Generate SSH Key (on your local machine)**
```bash
ssh-keygen -t rsa -b 4096 -C "deploy@formerlyincarcerated.org"
```

### **2. Copy Public Key to Server**
```bash
ssh-copy-id deploy@194.31.143.6
```

### **3. Test SSH Key Authentication**
```bash
ssh deploy@194.31.143.6 "whoami"
# Should connect without password
```

### **4. Add Private Key to GitHub Secrets**
- Go to GitHub repository settings
- Add secret named `DEPLOY_SSH_KEY`
- Paste the private key content

---

## 📊 **Expected Results**

After successful deployment:

- **✅ Main Site**: https://formerlyincarcerated.org loads with v2.1.1 features
- **✅ Documentation**: https://docs.formerlyincarcerated.org shows updated docs
- **✅ Prison Blues Themes**: All 6 theme variants work correctly
- **✅ Mobile Responsive**: Site works on all devices
- **✅ SSL Certificates**: Green lock icon in browser
- **✅ Fast Loading**: Pages load in under 3 seconds

---

## 📞 **Support**

If you encounter issues:

1. **Check the logs** first (Nginx, system logs)
2. **Verify file permissions** are correct
3. **Test the build locally** before deploying
4. **Use the backup** to rollback if needed
5. **Contact support** with specific error messages

---

**🎯 Choose Option 1 for step-by-step deployment or Option 2 for one-command deployment.**

**🚀 Your FormerlyIncarcerated.org platform will be live with all the latest improvements!**
