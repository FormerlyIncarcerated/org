#!/bin/bash

# FormerlyIncarcerated.org Build Cleanup Script
# Cleans build directories and temporary files to ensure fresh builds

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MAIN_SITE_DIR="$PROJECT_ROOT"
DOCS_SITE_DIR="$PROJECT_ROOT/docs-site"
LOG_FILE="$PROJECT_ROOT/logs/cleanup-$(date +%Y%m%d-%H%M%S).log"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_ROOT/logs"

# Logging function
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1${NC}" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}" | tee -a "$LOG_FILE"
}

# Function to clean directory safely
clean_directory() {
    local dir="$1"
    local description="$2"
    
    if [ -d "$dir" ]; then
        log "Cleaning $description: $dir"
        rm -rf "$dir"
        log_success "Cleaned $description"
    else
        log_warning "$description directory not found: $dir"
    fi
}

# Function to clean file safely
clean_file() {
    local file="$1"
    local description="$2"
    
    if [ -f "$file" ]; then
        log "Removing $description: $file"
        rm -f "$file"
        log_success "Removed $description"
    else
        log_warning "$description file not found: $file"
    fi
}

# Function to get directory size
get_dir_size() {
    local dir="$1"
    if [ -d "$dir" ]; then
        du -sh "$dir" 2>/dev/null | cut -f1 || echo "0B"
    else
        echo "0B"
    fi
}

# Main cleanup function
cleanup_builds() {
    log "🧹 Starting build cleanup process..."
    log "Project root: $PROJECT_ROOT"
    
    # Calculate initial disk usage
    local initial_main_size=$(get_dir_size "$MAIN_SITE_DIR/.next")
    local initial_docs_size=$(get_dir_size "$DOCS_SITE_DIR/build")
    local initial_node_modules_main=$(get_dir_size "$MAIN_SITE_DIR/node_modules")
    local initial_node_modules_docs=$(get_dir_size "$DOCS_SITE_DIR/node_modules")
    
    log "Initial build sizes:"
    log "  Main site (.next): $initial_main_size"
    log "  Docs site (build): $initial_docs_size"
    log "  Main node_modules: $initial_node_modules_main"
    log "  Docs node_modules: $initial_node_modules_docs"
    
    # Clean main site build artifacts
    log "🏠 Cleaning main site build artifacts..."
    clean_directory "$MAIN_SITE_DIR/.next" "Next.js build directory"
    clean_directory "$MAIN_SITE_DIR/out" "Next.js export directory"
    clean_directory "$MAIN_SITE_DIR/.vercel" "Vercel build cache"
    clean_directory "$MAIN_SITE_DIR/dist" "Distribution directory"
    
    # Clean docs site build artifacts
    log "📚 Cleaning docs site build artifacts..."
    clean_directory "$DOCS_SITE_DIR/build" "Docusaurus build directory"
    clean_directory "$DOCS_SITE_DIR/.docusaurus" "Docusaurus cache directory"
    clean_directory "$DOCS_SITE_DIR/dist" "Docs distribution directory"
    
    # Clean cache directories
    log "🗂️  Cleaning cache directories..."
    clean_directory "$MAIN_SITE_DIR/.cache" "Main site cache"
    clean_directory "$DOCS_SITE_DIR/.cache" "Docs site cache"
    clean_directory "$PROJECT_ROOT/.turbo" "Turbo cache"
    clean_directory "$PROJECT_ROOT/.nx" "NX cache"
    
    # Clean temporary files
    log "🗑️  Cleaning temporary files..."
    clean_file "$MAIN_SITE_DIR/.env.local" "Local environment file"
    clean_file "$DOCS_SITE_DIR/.env.local" "Docs local environment file"
    
    # Clean log files older than 7 days
    log "📝 Cleaning old log files..."
    find "$PROJECT_ROOT/logs" -name "*.log" -type f -mtime +7 -delete 2>/dev/null || true
    log_success "Cleaned old log files"
    
    # Clean package manager caches
    log "📦 Cleaning package manager caches..."
    if command -v bun &> /dev/null; then
        bun pm cache rm 2>/dev/null || log_warning "Failed to clear bun cache"
        log_success "Cleared bun cache"
    fi
    
    if command -v npm &> /dev/null; then
        npm cache clean --force 2>/dev/null || log_warning "Failed to clear npm cache"
        log_success "Cleared npm cache"
    fi
    
    if command -v yarn &> /dev/null; then
        yarn cache clean 2>/dev/null || log_warning "Failed to clear yarn cache"
        log_success "Cleared yarn cache"
    fi
    
    # Optional: Clean node_modules (only if --deep flag is passed)
    if [[ "$1" == "--deep" ]]; then
        log "🔥 Deep cleaning: Removing node_modules..."
        clean_directory "$MAIN_SITE_DIR/node_modules" "Main site node_modules"
        clean_directory "$DOCS_SITE_DIR/node_modules" "Docs site node_modules"
        
        # Reinstall dependencies
        log "📦 Reinstalling dependencies..."
        cd "$MAIN_SITE_DIR"
        if command -v bun &> /dev/null; then
            bun install
        else
            npm install
        fi
        
        cd "$DOCS_SITE_DIR"
        npm install
        
        log_success "Dependencies reinstalled"
    fi
    
    # Calculate final disk usage
    local final_main_size=$(get_dir_size "$MAIN_SITE_DIR/.next")
    local final_docs_size=$(get_dir_size "$DOCS_SITE_DIR/build")
    
    log "Final build sizes:"
    log "  Main site (.next): $final_main_size"
    log "  Docs site (build): $final_docs_size"
    
    log_success "🎉 Build cleanup completed successfully!"
    log "Cleanup log saved to: $LOG_FILE"
}

# Function to setup git hooks
setup_git_hooks() {
    log "🔗 Setting up git hooks for automatic cleanup..."
    
    # Create pre-commit hook
    cat > "$PROJECT_ROOT/.git/hooks/pre-commit" << 'EOF'
#!/bin/bash
# Auto-cleanup before commit
echo "🧹 Running pre-commit cleanup..."
./scripts/cleanup-builds.sh --quiet
EOF
    
    # Create post-merge hook
    cat > "$PROJECT_ROOT/.git/hooks/post-merge" << 'EOF'
#!/bin/bash
# Auto-cleanup after merge
echo "🧹 Running post-merge cleanup..."
./scripts/cleanup-builds.sh --quiet
EOF
    
    # Make hooks executable
    chmod +x "$PROJECT_ROOT/.git/hooks/pre-commit"
    chmod +x "$PROJECT_ROOT/.git/hooks/post-merge"
    
    log_success "Git hooks setup completed"
}

# Function to setup cron job
setup_cron_job() {
    log "⏰ Setting up cron job for automatic cleanup..."
    
    # Create cron script
    cat > "$PROJECT_ROOT/scripts/cron-cleanup.sh" << EOF
#!/bin/bash
# Cron job script for FormerlyIncarcerated.org build cleanup
cd "$PROJECT_ROOT"
./scripts/cleanup-builds.sh --quiet >> "$PROJECT_ROOT/logs/cron-cleanup.log" 2>&1
EOF
    
    chmod +x "$PROJECT_ROOT/scripts/cron-cleanup.sh"
    
    # Add to crontab (runs daily at 2 AM)
    (crontab -l 2>/dev/null; echo "0 2 * * * $PROJECT_ROOT/scripts/cron-cleanup.sh") | crontab -
    
    log_success "Cron job setup completed (runs daily at 2 AM)"
}

# Function to watch for file changes
setup_file_watcher() {
    log "👀 Setting up file watcher for automatic cleanup..."
    
    # Create file watcher script
    cat > "$PROJECT_ROOT/scripts/watch-cleanup.sh" << 'EOF'
#!/bin/bash
# File watcher for automatic cleanup on changes

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Watch for changes in source files
inotifywait -m -r -e modify,create,delete \
    --include '\.(ts|tsx|js|jsx|md|json|css|scss)$' \
    "$PROJECT_ROOT/src" "$PROJECT_ROOT/docs-site/src" "$PROJECT_ROOT/docs-site/docs" \
    2>/dev/null | while read path action file; do
    
    echo "$(date): File $action: $path$file"
    
    # Debounce: wait 5 seconds for more changes
    sleep 5
    
    # Run cleanup
    "$PROJECT_ROOT/scripts/cleanup-builds.sh" --quiet
done
EOF
    
    chmod +x "$PROJECT_ROOT/scripts/watch-cleanup.sh"
    
    log_success "File watcher script created"
    log "To start watching: ./scripts/watch-cleanup.sh"
}

# Help function
show_help() {
    echo "FormerlyIncarcerated.org Build Cleanup Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --deep          Deep clean including node_modules"
    echo "  --quiet         Suppress verbose output"
    echo "  --setup-hooks   Setup git hooks for automatic cleanup"
    echo "  --setup-cron    Setup cron job for daily cleanup"
    echo "  --setup-watcher Setup file watcher for real-time cleanup"
    echo "  --setup-all     Setup all automation features"
    echo "  --help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                    # Basic cleanup"
    echo "  $0 --deep            # Deep cleanup with node_modules"
    echo "  $0 --setup-all       # Setup all automation"
}

# Main execution
case "${1:-}" in
    --deep)
        cleanup_builds --deep
        ;;
    --quiet)
        cleanup_builds > /dev/null 2>&1
        ;;
    --setup-hooks)
        setup_git_hooks
        ;;
    --setup-cron)
        setup_cron_job
        ;;
    --setup-watcher)
        setup_file_watcher
        ;;
    --setup-all)
        setup_git_hooks
        setup_cron_job
        setup_file_watcher
        log_success "🎉 All automation features setup completed!"
        ;;
    --help)
        show_help
        ;;
    "")
        cleanup_builds
        ;;
    *)
        log_error "Unknown option: $1"
        show_help
        exit 1
        ;;
esac
