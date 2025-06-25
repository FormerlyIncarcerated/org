#!/bin/bash

# Quick Deployment Script for FormerlyIncarcerated.org
# Run this script to deploy updates to your production server

set -e

# Configuration
SERVER_IP="194.31.143.6"
SERVER_USER="deploy"
DOMAIN="formerlyincarcerated.org"
APP_DIR="/var/www/$DOMAIN"

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

# Check if server IP is configured
if [ "$SERVER_IP" = "YOUR_SERVER_IP" ]; then
    log_error "Please configure SERVER_IP in this script with your actual server IP address"
    exit 1
fi

# Function to run commands on remote server
run_remote() {
    ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "$1"
}

# Function to copy files to remote server
copy_to_remote() {
    scp -o StrictHostKeyChecking=no -r "$1" $SERVER_USER@$SERVER_IP:"$2"
}

log "🚀 Starting deployment to $DOMAIN..."

# Check if we can connect to the server
log "🔍 Checking server connection..."
if ! run_remote "echo 'Connection successful'"; then
    log_error "Cannot connect to server. Please check your SSH configuration."
    exit 1
fi

log_success "Server connection established"

# Check if local changes are committed
if [ -n "$(git status --porcelain)" ]; then
    log_warning "You have uncommitted changes. Commit them first:"
    git status --short
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_error "Deployment cancelled"
        exit 1
    fi
fi

# Push latest changes to repository
log "📤 Pushing latest changes to repository..."
git push origin master

# Run deployment on remote server
log "🚀 Running deployment on remote server..."
run_remote "cd $APP_DIR && ./deploy.sh"

# Check if applications are running
log "🔍 Checking application status..."
if run_remote "pm2 status | grep -q 'online'"; then
    log_success "Applications are running"
else
    log_error "Applications may not be running properly"
    run_remote "pm2 status"
fi

# Test website accessibility
log "🌐 Testing website accessibility..."
if curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" | grep -q "200"; then
    log_success "Main website is accessible"
else
    log_warning "Main website may not be accessible"
fi

if curl -s -o /dev/null -w "%{http_code}" "https://docs.$DOMAIN" | grep -q "200"; then
    log_success "Documentation site is accessible"
else
    log_warning "Documentation site may not be accessible"
fi

# Show recent logs
log "📝 Recent application logs:"
run_remote "pm2 logs --lines 10"

log_success "🎉 Deployment completed!"
log "🌐 Main site: https://$DOMAIN"
log "📚 Docs site: https://docs.$DOMAIN"
log "📊 Monitor with: ssh $SERVER_USER@$SERVER_IP 'pm2 monit'"
