#!/bin/bash

# Deployment Script for FormerlyIncarcerated.org
# Target Server: 194.31.143.6 (IPv6: 2a11:29c0:4f50:5::10)
# Run this script as the deploy user on the server

set -e

# Configuration
DOMAIN="formerlyincarcerated.org"
DOCS_DOMAIN="docs.formerlyincarcerated.org"
APP_DIR="/var/www/$DOMAIN"
DOCS_DIR="/var/www/$DOCS_DOMAIN"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SERVER_IP="194.31.143.6"
SERVER_IPV6="2a11:29c0:4f50:5::10"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if running as deploy user
if [ "$USER" != "deploy" ]; then
    log_error "This script must be run as the 'deploy' user"
    log "Switch to deploy user: sudo su - deploy"
    exit 1
fi

log "🚀 Starting deployment to $DOMAIN..."
log "📍 Server: $SERVER_IP (IPv6: $SERVER_IPV6)"
log "⏰ Deployment ID: $TIMESTAMP"

# Deploy main application
log "📦 Deploying main application..."
cd $APP_DIR/repo

# Fetch latest changes
log "📥 Fetching latest changes from repository..."
git fetch origin
git reset --hard origin/master

# Create release directory
RELEASE_DIR="$APP_DIR/releases/$TIMESTAMP"
mkdir -p "$RELEASE_DIR"

log "📁 Creating release: $RELEASE_DIR"

# Copy files to release directory
cp -r . "$RELEASE_DIR/"
cd "$RELEASE_DIR"

# Link shared files
log "🔗 Linking shared environment file..."
ln -sf $APP_DIR/shared/.env.production .env.local

# Install dependencies
log "📦 Installing dependencies..."
if command -v bun &> /dev/null; then
    bun install --production
else
    npm ci --production
fi

# Build main application
log "🔨 Building main application..."
if command -v bun &> /dev/null; then
    bun run build
else
    npm run build
fi

# Update current symlink for main app
log "🔄 Updating main application symlink..."
ln -sfn "$RELEASE_DIR" "$APP_DIR/current"

# Deploy documentation
log "📚 Deploying documentation..."
cd "$RELEASE_DIR/docs-site"

# Install docs dependencies
log "📦 Installing docs dependencies..."
if command -v bun &> /dev/null; then
    bun install --production
else
    npm ci --production
fi

# Build documentation
log "🔨 Building documentation..."
if command -v bun &> /dev/null; then
    bun run build
else
    npm run build
fi

# Create docs release
DOCS_RELEASE_DIR="$DOCS_DIR/releases/$TIMESTAMP"
mkdir -p "$DOCS_RELEASE_DIR"

log "📁 Creating docs release: $DOCS_RELEASE_DIR"

# Copy built docs
cp -r build/* "$DOCS_RELEASE_DIR/"

# Update docs current symlink
log "🔄 Updating docs symlink..."
ln -sfn "$DOCS_RELEASE_DIR" "$DOCS_DIR/current"

# Restart applications
log "🔄 Restarting applications..."
cd $APP_DIR

# Start or restart PM2 applications
if pm2 list | grep -q "formerlyincarcerated-org"; then
    pm2 restart ecosystem.config.js --env production
else
    pm2 start ecosystem.config.js --env production
fi

# Save PM2 configuration
pm2 save

# Wait for applications to start
log "⏳ Waiting for applications to start..."
sleep 10

# Check application status
log "🔍 Checking application status..."
pm2 status

# Test applications
log "🧪 Testing applications..."

# Test main app
if curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000" | grep -q "200"; then
    log_success "Main application is responding on port 3000"
else
    log_warning "Main application may not be responding properly"
fi

# Test docs app
if curl -s -o /dev/null -w "%{http_code}" "http://localhost:3001" | grep -q "200"; then
    log_success "Documentation application is responding on port 3001"
else
    log_warning "Documentation application may not be responding properly"
fi

# Cleanup old releases (keep last 5)
log "🧹 Cleaning up old releases..."
cd "$APP_DIR/releases" && ls -t | tail -n +6 | xargs -r rm -rf
cd "$DOCS_DIR/releases" && ls -t | tail -n +6 | xargs -r rm -rf

# Generate deployment report
log "📊 Generating deployment report..."
REPORT_FILE="/var/log/formerlyincarcerated/deployment-$TIMESTAMP.log"

cat > "$REPORT_FILE" << EOF
# Deployment Report - FormerlyIncarcerated.org

**Deployment ID:** $TIMESTAMP
**Date:** $(date)
**Server:** $SERVER_IP (IPv6: $SERVER_IPV6)
**Domain:** $DOMAIN
**Docs Domain:** $DOCS_DOMAIN

## Deployment Status: SUCCESS ✅

### Applications
- Main Site: http://localhost:3000 → https://$DOMAIN
- Documentation: http://localhost:3001 → https://$DOCS_DOMAIN

### Release Information
- Main App Release: $RELEASE_DIR
- Docs Release: $DOCS_RELEASE_DIR
- Git Commit: $(git rev-parse HEAD)
- Git Branch: $(git branch --show-current)

### PM2 Status
$(pm2 status)

### Disk Usage
- Main App Size: $(du -sh $RELEASE_DIR | cut -f1)
- Docs Size: $(du -sh $DOCS_RELEASE_DIR | cut -f1)
- Total Releases: $(ls -1 $APP_DIR/releases | wc -l)

### Next Steps
1. Verify websites are accessible
2. Check SSL certificates if DNS is configured
3. Monitor application logs for any issues
4. Test all functionality including theme system

---
Deployment completed at $(date)
EOF

log_success "✅ Deployment completed successfully!"
log "📊 Deployment report: $REPORT_FILE"

echo ""
log "🌐 Application URLs (after DNS configuration):"
echo "   Main Site: https://$DOMAIN"
echo "   Documentation: https://$DOCS_DOMAIN"
echo ""
log "📋 Next steps:"
echo "1. Configure DNS records to point to $SERVER_IP"
echo "2. Wait for DNS propagation"
echo "3. Install SSL certificates: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN -d $DOCS_DOMAIN"
echo "4. Test all functionality"
echo ""
log "📊 Monitor applications:"
echo "   pm2 status"
echo "   pm2 logs"
echo "   pm2 monit"
echo ""
log_success "🎉 FormerlyIncarcerated.org is ready to serve the community!"
