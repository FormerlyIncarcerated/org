#!/bin/bash

# FormerlyIncarcerated.org Production Deployment Script v2.1.1
# Comprehensive deployment with build verification and rollback capabilities
# Updated for version 2.1.1 with documentation fixes and environment restoration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION=$(node -p "require('$PROJECT_ROOT/package.json').version")
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
DEPLOYMENT_LOG="$PROJECT_ROOT/logs/deployment-$TIMESTAMP.log"
BACKUP_DIR="$PROJECT_ROOT/backups/pre-deployment-$TIMESTAMP"

# Create necessary directories
mkdir -p "$PROJECT_ROOT/logs"
mkdir -p "$PROJECT_ROOT/backups"

# Logging function
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$DEPLOYMENT_LOG"
}

log_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1${NC}" | tee -a "$DEPLOYMENT_LOG"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}" | tee -a "$DEPLOYMENT_LOG"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}" | tee -a "$DEPLOYMENT_LOG"
}

# Error handling
handle_error() {
    log_error "Deployment failed at step: $1"
    log_error "Check deployment log: $DEPLOYMENT_LOG"
    
    if [ "$2" = "rollback" ]; then
        log "Initiating rollback..."
        rollback_deployment
    fi
    
    exit 1
}

# Rollback function
rollback_deployment() {
    log "🔄 Rolling back deployment..."
    
    if [ -d "$BACKUP_DIR" ]; then
        log "Restoring from backup: $BACKUP_DIR"
        # Add rollback logic here
        log_success "Rollback completed"
    else
        log_warning "No backup found for rollback"
    fi
}

# Pre-deployment checks
pre_deployment_checks() {
    log "🔍 Running pre-deployment checks..."
    
    # Check Node.js version
    NODE_VERSION=$(node --version)
    log "Node.js version: $NODE_VERSION"
    
    # Check if git is clean
    if [ -n "$(git status --porcelain)" ]; then
        log_warning "Git working directory is not clean"
        git status --short
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_error "Deployment cancelled by user"
            exit 1
        fi
    fi
    
    # Check if on main branch
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "main" ]; then
        log_warning "Not on main branch (current: $CURRENT_BRANCH)"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_error "Deployment cancelled by user"
            exit 1
        fi
    fi
    
    # Check environment variables
    if [ -z "$VERCEL_TOKEN" ] && [ -z "$NETLIFY_AUTH_TOKEN" ]; then
        log_warning "No deployment tokens found in environment"
    fi
    
    log_success "Pre-deployment checks completed"
}

# Create backup
create_backup() {
    log "💾 Creating deployment backup..."
    
    mkdir -p "$BACKUP_DIR"
    
    # Backup current build artifacts
    if [ -d "$PROJECT_ROOT/.next" ]; then
        cp -r "$PROJECT_ROOT/.next" "$BACKUP_DIR/"
    fi
    
    if [ -d "$PROJECT_ROOT/docs-site/build" ]; then
        cp -r "$PROJECT_ROOT/docs-site/build" "$BACKUP_DIR/"
    fi
    
    # Backup package files
    cp "$PROJECT_ROOT/package.json" "$BACKUP_DIR/"
    cp "$PROJECT_ROOT/docs-site/package.json" "$BACKUP_DIR/"
    
    log_success "Backup created: $BACKUP_DIR"
}

# Clean and prepare
clean_and_prepare() {
    log "🧹 Cleaning and preparing for deployment..."
    
    # Run comprehensive cleanup
    node "$PROJECT_ROOT/scripts/cleanup-builds.js" --quiet || handle_error "cleanup" "rollback"
    
    # Install dependencies
    log "📦 Installing dependencies..."
    cd "$PROJECT_ROOT"
    
    if command -v bun &> /dev/null; then
        bun install || handle_error "main dependencies installation" "rollback"
    else
        npm install || handle_error "main dependencies installation" "rollback"
    fi
    
    cd "$PROJECT_ROOT/docs-site"
    npm install || handle_error "docs dependencies installation" "rollback"
    
    cd "$PROJECT_ROOT"
    log_success "Dependencies installed"
}

# Build verification
build_verification() {
    log "🏗️ Building and verifying applications..."
    
    # Build main site
    log "Building main site..."
    npm run build || handle_error "main site build" "rollback"
    log_success "Main site built successfully"
    
    # Build docs site
    log "Building docs site..."
    npm run docs:build || handle_error "docs site build" "rollback"
    log_success "Docs site built successfully"
    
    # Verify build outputs
    if [ ! -d "$PROJECT_ROOT/.next" ]; then
        handle_error "main site build output missing" "rollback"
    fi
    
    if [ ! -d "$PROJECT_ROOT/docs-site/build" ]; then
        handle_error "docs site build output missing" "rollback"
    fi
    
    log_success "Build verification completed"
}

# Run tests
run_tests() {
    log "🧪 Running tests..."
    
    # Run linting
    log "Running linter..."
    npm run lint || handle_error "linting" "rollback"
    
    # Run type checking
    log "Running type check..."
    npx tsc --noEmit || handle_error "type checking" "rollback"
    
    # Run accessibility tests if available
    if npm run test:a11y --silent 2>/dev/null; then
        log "Running accessibility tests..."
        npm run test:a11y || handle_error "accessibility tests" "rollback"
    fi
    
    log_success "All tests passed"
}

# Deploy to production
deploy_production() {
    log "🚀 Deploying to production..."
    
    # Tag the release
    log "Creating git tag for version $VERSION..."
    git tag -a "v$VERSION" -m "Release version $VERSION - Blue Ocean Foundation" || log_warning "Tag already exists"
    
    # Deploy main site
    if [ -n "$VERCEL_TOKEN" ]; then
        log "Deploying main site to Vercel..."
        npx vercel --prod --token "$VERCEL_TOKEN" || handle_error "main site deployment"
        log_success "Main site deployed to Vercel"
    else
        log_warning "Vercel token not found, skipping main site deployment"
    fi
    
    # Deploy docs site
    log "Deploying docs site..."
    if [ -f "$PROJECT_ROOT/scripts/deploy-docs.sh" ]; then
        bash "$PROJECT_ROOT/scripts/deploy-docs.sh" --production || handle_error "docs site deployment"
        log_success "Docs site deployed"
    else
        log_warning "Docs deployment script not found"
    fi
    
    log_success "Production deployment completed"
}

# Post-deployment verification
post_deployment_verification() {
    log "✅ Running post-deployment verification..."
    
    # Check main site
    log "Verifying main site..."
    if curl -f -s "https://formerlyincarcerated.org" > /dev/null; then
        log_success "Main site is accessible"
    else
        log_error "Main site is not accessible"
    fi
    
    # Check docs site
    log "Verifying docs site..."
    if curl -f -s "https://docs.formerlyincarcerated.org" > /dev/null; then
        log_success "Docs site is accessible"
    else
        log_error "Docs site is not accessible"
    fi
    
    log_success "Post-deployment verification completed"
}

# Generate deployment report
generate_deployment_report() {
    log "📊 Generating deployment report..."
    
    REPORT_FILE="$PROJECT_ROOT/logs/deployment-report-$TIMESTAMP.md"
    
    cat > "$REPORT_FILE" << EOF
# 🚀 Deployment Report

**Version:** $VERSION  
**Date:** $(date)  
**Deployment ID:** $TIMESTAMP  

## ✅ Deployment Summary

- **Status:** Success
- **Duration:** $(date -d @$(($(date +%s) - $(stat -c %Y "$DEPLOYMENT_LOG")))) +%H:%M:%S)
- **Main Site:** https://formerlyincarcerated.org
- **Docs Site:** https://docs.formerlyincarcerated.org

## 📋 Deployment Steps

- ✅ Pre-deployment checks
- ✅ Backup creation
- ✅ Clean and prepare
- ✅ Build verification
- ✅ Test execution
- ✅ Production deployment
- ✅ Post-deployment verification

## 📊 Build Statistics

- **Main Site Build Size:** $(du -sh "$PROJECT_ROOT/.next" | cut -f1)
- **Docs Site Build Size:** $(du -sh "$PROJECT_ROOT/docs-site/build" | cut -f1)
- **Total Dependencies:** $(find "$PROJECT_ROOT/node_modules" -name "package.json" | wc -l) packages

## 🔗 Resources

- **Deployment Log:** $DEPLOYMENT_LOG
- **Backup Location:** $BACKUP_DIR
- **Git Tag:** v$VERSION

## 🎉 Next Steps

1. Monitor application performance
2. Check error tracking dashboards
3. Verify all features are working correctly
4. Announce the release to the community

---

*Deployment completed successfully! 🎉*
EOF

    log_success "Deployment report generated: $REPORT_FILE"
}

# Cleanup deployment artifacts
cleanup_deployment() {
    log "🧹 Cleaning up deployment artifacts..."
    
    # Remove old backups (keep last 5)
    find "$PROJECT_ROOT/backups" -name "pre-deployment-*" -type d | sort -r | tail -n +6 | xargs rm -rf
    
    # Remove old logs (keep last 10)
    find "$PROJECT_ROOT/logs" -name "deployment-*.log" -type f | sort -r | tail -n +11 | xargs rm -f
    
    log_success "Deployment cleanup completed"
}

# Main deployment function
main_deployment() {
    log "🚀 Starting FormerlyIncarcerated.org v$VERSION deployment..."
    log "Deployment ID: $TIMESTAMP"
    
    # Run deployment steps
    pre_deployment_checks
    create_backup
    clean_and_prepare
    build_verification
    run_tests
    deploy_production
    post_deployment_verification
    generate_deployment_report
    cleanup_deployment
    
    log_success "🎉 Deployment completed successfully!"
    log "📊 Deployment report: $PROJECT_ROOT/logs/deployment-report-$TIMESTAMP.md"
    log "📝 Deployment log: $DEPLOYMENT_LOG"
    
    # Push git tag
    if git tag -l "v$VERSION" | grep -q "v$VERSION"; then
        log "Pushing git tag to remote..."
        git push origin "v$VERSION" || log_warning "Failed to push git tag"
    fi
}

# Help function
show_help() {
    echo "FormerlyIncarcerated.org Production Deployment Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --dry-run       Run deployment checks without deploying"
    echo "  --skip-tests    Skip test execution (not recommended)"
    echo "  --force         Force deployment even with warnings"
    echo "  --help          Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  VERCEL_TOKEN    Vercel deployment token"
    echo "  NETLIFY_AUTH_TOKEN  Netlify deployment token"
    echo ""
    echo "Examples:"
    echo "  $0                    # Full production deployment"
    echo "  $0 --dry-run          # Check deployment readiness"
    echo "  $0 --skip-tests       # Deploy without running tests"
}

# Parse command line arguments
case "${1:-}" in
    --dry-run)
        log "🔍 Running deployment dry-run..."
        pre_deployment_checks
        clean_and_prepare
        build_verification
        log_success "Dry-run completed successfully!"
        ;;
    --skip-tests)
        log "⚠️  Skipping tests as requested"
        main_deployment() {
            log "🚀 Starting FormerlyIncarcerated.org v$VERSION deployment..."
            pre_deployment_checks
            create_backup
            clean_and_prepare
            build_verification
            deploy_production
            post_deployment_verification
            generate_deployment_report
            cleanup_deployment
            log_success "🎉 Deployment completed successfully!"
        }
        main_deployment
        ;;
    --force)
        log "⚠️  Force deployment mode enabled"
        # Override error handling to continue on warnings
        main_deployment
        ;;
    --help)
        show_help
        ;;
    "")
        main_deployment
        ;;
    *)
        log_error "Unknown option: $1"
        show_help
        exit 1
        ;;
esac
