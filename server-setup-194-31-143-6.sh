#!/bin/bash

# FormerlyIncarcerated.org Production Setup Script
# Customized for server: 194.31.143.6 (IPv6: 2a11:29c0:4f50:5::10)
# Run this script on your server as root: sudo bash server-setup-194-31-143-6.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration for your specific server
DOMAIN="formerlyincarcerated.org"
DOCS_DOMAIN="docs.formerlyincarcerated.org"
APP_USER="deploy"
APP_DIR="/var/www/$DOMAIN"
DOCS_DIR="/var/www/$DOCS_DOMAIN"
REPO_URL="https://github.com/4eckd/formerlyincarcerated.git"
NODE_VERSION="20"
SERVER_IP="194.31.143.6"
SERVER_IPV6="2a11:29c0:4f50:5::10"

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    log_error "Please run this script as root (use sudo)"
    exit 1
fi

log "🚀 Starting FormerlyIncarcerated.org production setup..."
log "📍 Server IP: $SERVER_IP"
log "📍 Server IPv6: $SERVER_IPV6"

# Update system
log "📦 Updating system packages..."
apt update && apt upgrade -y

# Install required packages
log "📦 Installing required packages..."
apt install -y curl wget git nginx certbot python3-certbot-nginx ufw fail2ban htop unzip

# Install Node.js
log "📦 Installing Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt install -y nodejs

# Install Bun
log "📦 Installing Bun..."
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"

# Install PM2 globally
log "📦 Installing PM2..."
npm install -g pm2

# Create deploy user
log "👤 Creating deploy user..."
if ! id "$APP_USER" &>/dev/null; then
    useradd -m -s /bin/bash $APP_USER
    usermod -aG sudo $APP_USER
    log_success "Created deploy user: $APP_USER"
else
    log_warning "Deploy user already exists: $APP_USER"
fi

# Create application directories
log "📁 Creating application directories..."
mkdir -p $APP_DIR/{current,releases,shared,repo}
mkdir -p $DOCS_DIR/{current,releases,shared,repo}
mkdir -p /var/log/formerlyincarcerated

# Set ownership
chown -R $APP_USER:$APP_USER $APP_DIR
chown -R $APP_USER:$APP_USER $DOCS_DIR
chown -R $APP_USER:$APP_USER /var/log/formerlyincarcerated

# Setup SSH key for deploy user
log "🔑 Setting up SSH for deploy user..."
sudo -u $APP_USER mkdir -p /home/$APP_USER/.ssh
sudo -u $APP_USER chmod 700 /home/$APP_USER/.ssh
sudo -u $APP_USER touch /home/$APP_USER/.ssh/authorized_keys
sudo -u $APP_USER chmod 600 /home/$APP_USER/.ssh/authorized_keys

# Clone repository
log "📥 Cloning repository..."
sudo -u $APP_USER git clone $REPO_URL $APP_DIR/repo
cd $APP_DIR/repo
sudo -u $APP_USER git config --global --add safe.directory $APP_DIR/repo

# Create production environment file
log "⚙️  Creating production environment file..."
cat > $APP_DIR/shared/.env.production << EOF
# Production Environment Variables for FormerlyIncarcerated.org
# Server: $SERVER_IP (IPv6: $SERVER_IPV6)
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
NEXT_PUBLIC_DOCS_URL=https://$DOCS_DOMAIN

# Supabase Configuration (REPLACE WITH YOUR VALUES)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Email Configuration (Optional)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Security
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://$DOMAIN

# Server Information
SERVER_IP=$SERVER_IP
SERVER_IPV6=$SERVER_IPV6
EOF

chown $APP_USER:$APP_USER $APP_DIR/shared/.env.production

# Create Nginx configuration with IPv6 support
log "🌐 Creating Nginx configuration with IPv6 support..."
cat > /etc/nginx/sites-available/$DOMAIN << EOF
# FormerlyIncarcerated.org Nginx Configuration
# Server: $SERVER_IP (IPv6: $SERVER_IPV6)

# Main site configuration
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Redirect to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    
    # SSL configuration (will be configured by Certbot)
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
    
    # Rate limiting
    limit_req_zone \$binary_remote_addr zone=main:10m rate=10r/s;
    limit_req zone=main burst=20 nodelay;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Static files with long cache
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # Favicon and robots
    location = /favicon.ico {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }
    
    location = /robots.txt {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}

# Docs subdomain configuration
server {
    listen 80;
    listen [::]:80;
    server_name $DOCS_DOMAIN;
    
    # Redirect to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOCS_DOMAIN;
    
    # SSL configuration (will be configured by Certbot)
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Rate limiting
    limit_req zone=main burst=20 nodelay;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Static assets cache
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3001;
        add_header Cache-Control "public, max-age=86400";
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

log_success "Nginx configuration created and enabled"

# Configure firewall with IPv6 support
log "🔥 Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow 80
ufw allow 443

# Enable IPv6 in UFW
sed -i 's/IPV6=no/IPV6=yes/' /etc/default/ufw
ufw reload

log_success "Firewall configured with IPv6 support"

# Setup PM2 ecosystem
log "⚙️  Creating PM2 ecosystem configuration..."
cat > $APP_DIR/ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'formerlyincarcerated-org',
      script: 'bun',
      args: 'run start',
      cwd: '$APP_DIR/current',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1,
        SERVER_IP: '$SERVER_IP',
        SERVER_IPV6: '$SERVER_IPV6'
      },
      error_file: '/var/log/formerlyincarcerated/app-error.log',
      out_file: '/var/log/formerlyincarcerated/app-out.log',
      log_file: '/var/log/formerlyincarcerated/app-combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s'
    },
    {
      name: 'docs-formerlyincarcerated-org',
      script: 'bun',
      args: 'run serve',
      cwd: '$DOCS_DIR/current',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        SERVER_IP: '$SERVER_IP',
        SERVER_IPV6: '$SERVER_IPV6'
      },
      error_file: '/var/log/formerlyincarcerated/docs-error.log',
      out_file: '/var/log/formerlyincarcerated/docs-out.log',
      log_file: '/var/log/formerlyincarcerated/docs-combined.log',
      time: true,
      restart_delay: 4000,
      max_restarts: 5,
      min_uptime: '10s'
    }
  ]
};
EOF

chown $APP_USER:$APP_USER $APP_DIR/ecosystem.config.js

log_success "🎉 Production setup completed!"

echo ""
log "📋 Next steps:"
echo "1. Add your SSH public key to: /home/$APP_USER/.ssh/authorized_keys"
echo "2. Edit environment variables: $APP_DIR/shared/.env.production"
echo "3. Configure DNS records to point to $SERVER_IP"
echo "4. Wait for DNS propagation (24-48 hours)"
echo "5. Run initial deployment as deploy user"
echo "6. Setup SSL certificates with Certbot"
echo ""
log "🌐 DNS Records to configure:"
echo "   A    @     194.31.143.6"
echo "   A    www   194.31.143.6"
echo "   A    docs  194.31.143.6"
echo "   AAAA @     2a11:29c0:4f50:5::10"
echo "   AAAA www   2a11:29c0:4f50:5::10"
echo "   AAAA docs  2a11:29c0:4f50:5::10"
echo ""
log_warning "⚠️  Remember to configure your environment variables before deploying!"
log_success "🚀 Server is ready for FormerlyIncarcerated.org deployment!"
