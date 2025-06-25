# 🚀 Deploy FormerlyIncarcerated.org NOW - Manual Steps

**Immediate deployment to Infuze Cloud instance 194.31.143.6**

---

## 🔑 **Connection Details**
- **Server**: 194.31.143.6
- **Username**: supitsj (try first) or root (if supitsj fails)
- **Password**: Aaaa8888

---

## 📋 **Step-by-Step Deployment**

### **Step 1: Connect to Server**
Open a new terminal/command prompt and run:
```bash
ssh supitsj@194.31.143.6
```
When prompted for password, enter: `Aaaa8888`

If supitsj doesn't work, try:
```bash
ssh root@194.31.143.6
```

### **Step 2: One-Command Deployment**
Once connected, copy and paste this entire block:

```bash
#!/bin/bash
set -e

echo "🚀 Starting FormerlyIncarcerated.org deployment..."

# Determine the correct user directory
if [ "$USER" = "root" ]; then
    USER_HOME="/root"
else
    USER_HOME="/home/$USER"
fi

echo "📍 Using directory: $USER_HOME"

# Check if project exists, clone if not
if [ ! -d "$USER_HOME/formerlyincarcerated" ]; then
    echo "📥 Cloning repository..."
    cd $USER_HOME
    git clone https://github.com/4eckd/formerlyincarcerated.git
    cd formerlyincarcerated
else
    echo "📥 Updating repository..."
    cd $USER_HOME/formerlyincarcerated
    git fetch origin
    git checkout master
    git pull origin master
fi

echo "📋 Current version: $(git describe --tags 2>/dev/null || git rev-parse --short HEAD)"

# Install Node.js and npm if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd docs-site && npm install && cd ..

# Build applications
echo "🔨 Building applications..."
npm run build
cd docs-site && npm run build && cd ..

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "🌐 Installing Nginx..."
    sudo apt update
    sudo apt install -y nginx
fi

# Create web directories
echo "📁 Setting up web directories..."
sudo mkdir -p /var/www/formerlyincarcerated.org
sudo mkdir -p /var/www/docs.formerlyincarcerated.org
sudo mkdir -p /var/www/backups

# Create backup
echo "💾 Creating backup..."
sudo cp -r /var/www/formerlyincarcerated.org /var/www/backups/formerlyincarcerated.org_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
sudo cp -r /var/www/docs.formerlyincarcerated.org /var/www/backups/docs.formerlyincarcerated.org_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# Deploy main application
echo "📁 Deploying main application..."
sudo rm -rf /var/www/formerlyincarcerated.org/*
sudo cp -r .next/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true
sudo cp -r public/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true

# Deploy documentation
echo "📚 Deploying documentation..."
sudo rm -rf /var/www/docs.formerlyincarcerated.org/*
sudo cp -r docs-site/build/* /var/www/docs.formerlyincarcerated.org/

# Set permissions
echo "🔐 Setting permissions..."
sudo chown -R www-data:www-data /var/www/formerlyincarcerated.org
sudo chown -R www-data:www-data /var/www/docs.formerlyincarcerated.org
sudo chmod -R 755 /var/www/formerlyincarcerated.org
sudo chmod -R 755 /var/www/docs.formerlyincarcerated.org

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/formerlyincarcerated.org > /dev/null <<EOF
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
}
EOF

sudo tee /etc/nginx/sites-available/docs.formerlyincarcerated.org > /dev/null <<EOF
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
}
EOF

# Enable sites
sudo ln -sf /etc/nginx/sites-available/formerlyincarcerated.org /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/docs.formerlyincarcerated.org /etc/nginx/sites-enabled/

# Remove default site if it exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
echo "🔍 Testing Nginx configuration..."
sudo nginx -t

# Restart services
echo "🔄 Restarting services..."
sudo systemctl restart nginx
sudo systemctl enable nginx

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

echo ""
echo "🎉 Deployment completed!"
echo "📊 Deployment Summary:"
echo "   • Version: $(git describe --tags 2>/dev/null || git rev-parse --short HEAD)"
echo "   • Time: $(date)"
echo "   • Server IP: 194.31.143.6"
echo "   • Main Site: http://194.31.143.6 or http://formerlyincarcerated.org"
echo "   • Documentation: http://docs.formerlyincarcerated.org"
echo ""
echo "🔗 Test your deployment:"
echo "   curl -I http://194.31.143.6"
echo "   curl -I http://formerlyincarcerated.org"
echo "   curl -I http://docs.formerlyincarcerated.org"
echo ""
echo "🌐 Open in browser:"
echo "   http://194.31.143.6"
echo "   http://formerlyincarcerated.org (if DNS is configured)"
```

---

## 🔍 **Verification Steps**

After running the deployment script, test these URLs:

### **From the server:**
```bash
curl -I http://localhost
curl -I http://194.31.143.6
```

### **From your local machine:**
```bash
curl -I http://194.31.143.6
curl -I http://formerlyincarcerated.org
curl -I http://docs.formerlyincarcerated.org
```

### **In your browser:**
- http://194.31.143.6
- http://formerlyincarcerated.org (if DNS is configured)
- http://docs.formerlyincarcerated.org (if DNS is configured)

---

## 🚨 **If Something Goes Wrong**

### **Check Nginx Status:**
```bash
sudo systemctl status nginx
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### **Check File Permissions:**
```bash
ls -la /var/www/formerlyincarcerated.org/
ls -la /var/www/docs.formerlyincarcerated.org/
```

### **Restart Services:**
```bash
sudo systemctl restart nginx
sudo systemctl status nginx
```

### **Check Logs:**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🎯 **Expected Results**

After successful deployment:

- **✅ Server responds** on http://194.31.143.6
- **✅ Main site loads** with FormerlyIncarcerated.org content
- **✅ Documentation loads** with all the guides we created
- **✅ Prison Blues themes** work correctly
- **✅ Mobile responsive** design
- **✅ Fast loading** times

---

## 📞 **Next Steps After Deployment**

1. **Test the site** thoroughly
2. **Configure SSL certificates** (Let's Encrypt)
3. **Set up DNS** to point domains to 194.31.143.6
4. **Configure automated backups**
5. **Set up monitoring**

---

**🚀 Ready to deploy! Just copy and paste the deployment script after connecting to the server.**
