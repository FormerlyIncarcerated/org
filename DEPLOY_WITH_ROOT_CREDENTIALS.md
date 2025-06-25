# 🚀 Deploy FormerlyIncarcerated.org with Root Credentials

**Updated deployment guide using root user and password authentication**

---

## 🔑 **Updated Connection Details**
- **Server**: 194.31.143.6
- **Username**: root
- **Password**: 9ijn*UHB
- **VM ID**: 106 (formerlyincarcerated)

---

## 📋 **Quick Deployment Steps**

### **Step 1: Connect to Server**
```bash
ssh root@194.31.143.6
```
**Password**: `9ijn*UHB`

### **Step 2: One-Command Deployment**
Copy and paste this entire deployment script:

```bash
#!/bin/bash
set -e

echo "🚀 Starting FormerlyIncarcerated.org deployment with root credentials..."
echo "📍 Server: 194.31.143.6 (VM ID: 106)"
echo "👤 User: root"
echo "⏰ Started: $(date)"

# Navigate to root directory
cd /root

# Check if project exists, clone if not
if [ ! -d "/root/formerlyincarcerated" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/4eckd/formerlyincarcerated.git
    cd formerlyincarcerated
else
    echo "📥 Updating repository..."
    cd /root/formerlyincarcerated
    git fetch origin
    git checkout master
    git pull origin master
fi

echo "📋 Current version: $(git describe --tags 2>/dev/null || git rev-parse --short HEAD)"

# Install Node.js and npm if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Install Bun if not present
if ! command -v bun &> /dev/null; then
    echo "🥖 Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
fi

# Install dependencies
echo "📦 Installing dependencies..."
if command -v bun &> /dev/null; then
    bun install
    cd docs-site && bun install && cd ..
else
    npm install
    cd docs-site && npm install && cd ..
fi

# Build applications
echo "🔨 Building applications..."
if command -v bun &> /dev/null; then
    bun run build
    cd docs-site && bun run build && cd ..
else
    npm run build
    cd docs-site && npm run build && cd ..
fi

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "🌐 Installing Nginx..."
    apt update
    apt install -y nginx
fi

# Create web directories
echo "📁 Setting up web directories..."
mkdir -p /var/www/formerlyincarcerated.org
mkdir -p /var/www/docs.formerlyincarcerated.org
mkdir -p /var/www/backups

# Create backup
echo "💾 Creating backup..."
cp -r /var/www/formerlyincarcerated.org /var/www/backups/formerlyincarcerated.org_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
cp -r /var/www/docs.formerlyincarcerated.org /var/www/backups/docs.formerlyincarcerated.org_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# Deploy main application
echo "📁 Deploying main application..."
rm -rf /var/www/formerlyincarcerated.org/*
cp -r .next/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true
cp -r public/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true

# Deploy documentation
echo "📚 Deploying documentation..."
rm -rf /var/www/docs.formerlyincarcerated.org/*
cp -r docs-site/build/* /var/www/docs.formerlyincarcerated.org/

# Set permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/formerlyincarcerated.org
chown -R www-data:www-data /var/www/docs.formerlyincarcerated.org
chmod -R 755 /var/www/formerlyincarcerated.org
chmod -R 755 /var/www/docs.formerlyincarcerated.org

# Configure Nginx
echo "🌐 Configuring Nginx..."
tee /etc/nginx/sites-available/formerlyincarcerated.org > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name formerlyincarcerated.org www.formerlyincarcerated.org 194.31.143.6;
    
    root /var/www/formerlyincarcerated.org;
    index index.html index.htm;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

tee /etc/nginx/sites-available/docs.formerlyincarcerated.org > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name docs.formerlyincarcerated.org;
    
    root /var/www/docs.formerlyincarcerated.org;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

# Enable sites
ln -sf /etc/nginx/sites-available/formerlyincarcerated.org /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/docs.formerlyincarcerated.org /etc/nginx/sites-enabled/

# Remove default site if it exists
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
echo "🔍 Testing Nginx configuration..."
nginx -t

# Restart services
echo "🔄 Restarting services..."
systemctl restart nginx
systemctl enable nginx

# Install PM2 for process management (optional)
if ! command -v pm2 &> /dev/null; then
    echo "⚙️ Installing PM2..."
    npm install -g pm2
fi

# Verify deployment
echo "🔍 Verifying deployment..."
sleep 3

# Test local server
if curl -f -s http://localhost > /dev/null 2>&1; then
    echo "✅ Local server responding"
else
    echo "⚠️  Local server check - testing with IP..."
    if curl -f -s http://194.31.143.6 > /dev/null 2>&1; then
        echo "✅ Server responding on IP"
    else
        echo "⚠️  Server may need additional configuration"
    fi
fi

# Check if files were deployed
if [ -f "/var/www/formerlyincarcerated.org/index.html" ] || [ -d "/var/www/formerlyincarcerated.org/_next" ]; then
    echo "✅ Main application files deployed"
else
    echo "⚠️  Main application files may not be deployed correctly"
fi

if [ -f "/var/www/docs.formerlyincarcerated.org/index.html" ]; then
    echo "✅ Documentation files deployed"
else
    echo "⚠️  Documentation files may not be deployed correctly"
fi

# Display system information
echo ""
echo "📊 System Information:"
echo "   • CPU Usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)%"
echo "   • Memory Usage: $(free | grep Mem | awk '{printf("%.1f%%", $3/$2 * 100.0)}')"
echo "   • Disk Usage: $(df -h / | awk 'NR==2{printf "%s", $5}')"
echo "   • Uptime: $(uptime -p)"

echo ""
echo "🎉 Deployment completed successfully!"
echo "📊 Deployment Summary:"
echo "   • Version: $(git describe --tags 2>/dev/null || git rev-parse --short HEAD)"
echo "   • Time: $(date)"
echo "   • Server: 194.31.143.6 (VM ID: 106)"
echo "   • User: root"
echo "   • Main Site: http://194.31.143.6"
echo "   • Documentation: http://docs.formerlyincarcerated.org (if DNS configured)"
echo ""
echo "🔗 Test your deployment:"
echo "   curl -I http://194.31.143.6"
echo "   curl -I http://formerlyincarcerated.org"
echo ""
echo "🌐 Open in browser:"
echo "   http://194.31.143.6"
echo "   http://formerlyincarcerated.org (if DNS is configured)"
```

---

## 🔍 **Verification Commands**

After deployment, run these commands to verify:

### **On the server:**
```bash
# Check services
systemctl status nginx
systemctl status ssh

# Check files
ls -la /var/www/formerlyincarcerated.org/
ls -la /var/www/docs.formerlyincarcerated.org/

# Test local responses
curl -I http://localhost
curl -I http://194.31.143.6
```

### **From your local machine:**
```bash
# Test the deployed sites
curl -I http://194.31.143.6
curl -I http://formerlyincarcerated.org
curl -I http://docs.formerlyincarcerated.org
```

---

## 🚨 **Troubleshooting**

### **If deployment fails:**
```bash
# Check logs
tail -f /var/log/nginx/error.log
journalctl -u nginx -f

# Restart services
systemctl restart nginx

# Check disk space
df -h

# Check memory
free -h
```

### **If sites don't load:**
```bash
# Check nginx configuration
nginx -t

# Check if files exist
ls -la /var/www/formerlyincarcerated.org/
ls -la /var/www/docs.formerlyincarcerated.org/

# Check permissions
ls -la /var/www/
```

---

## 🎯 **Expected Results**

After successful deployment:

- **✅ Main site** loads at http://194.31.143.6
- **✅ Documentation** accessible via subdomain (if DNS configured)
- **✅ All Prison Blues themes** work correctly
- **✅ Mobile responsive** design
- **✅ Fast loading** performance
- **✅ Nginx** serving static files efficiently
- **✅ Security headers** configured
- **✅ Proper file permissions** set

---

## 📞 **Next Steps**

1. **Configure SSL certificates** (Let's Encrypt)
2. **Set up DNS** to point domains to 194.31.143.6
3. **Configure automated backups**
4. **Set up monitoring and alerts**
5. **Configure firewall rules**

---

**🚀 Your FormerlyIncarcerated.org platform will be live with all the latest v2.1.1 improvements!**

**Connection**: `ssh root@194.31.143.6` (Password: `9ijn*UHB`)
