# 🧹 Build Cleanup Automation System

Comprehensive build cleanup system for FormerlyIncarcerated.org platform with automated cron jobs, file watching, and cross-platform support.

## 🌟 Features

- **🧹 Comprehensive Cleanup**: Removes build artifacts, cache files, and temporary data
- **⏰ Automated Scheduling**: Cron jobs and scheduled tasks for regular cleanup
- **👀 File Watching**: Real-time cleanup on source file changes
- **🔗 Git Integration**: Pre-commit and post-merge hooks
- **🌐 Cross-Platform**: Works on Linux, macOS, and Windows
- **📊 Performance Monitoring**: Tracks cleanup effectiveness and disk usage
- **🔧 CI/CD Integration**: GitHub Actions workflow for automated cleanup

## 📁 Files Overview

```
scripts/
├── cleanup-builds.sh      # Bash script (Linux/macOS)
├── cleanup-builds.ps1     # PowerShell script (Windows)
├── cleanup-builds.js      # Node.js script (Cross-platform)
├── watch-cleanup.js       # File watcher (Auto-generated)
├── cron-cleanup.sh        # Cron job script (Auto-generated)
└── README.md             # This documentation
```

## 🚀 Quick Start

### Basic Cleanup

```bash
# Using npm scripts (recommended)
npm run clean              # Basic cleanup
npm run clean:deep         # Deep cleanup including node_modules
npm run clean:quiet        # Silent cleanup

# Using scripts directly
node scripts/cleanup-builds.js
./scripts/cleanup-builds.sh
powershell -File scripts/cleanup-builds.ps1
```

### Setup Automation

```bash
# Setup all automation features
npm run clean:setup

# Or setup individually
node scripts/cleanup-builds.js --setup-hooks    # Git hooks
node scripts/cleanup-builds.js --setup-cron     # Cron jobs
node scripts/cleanup-builds.js --setup-watcher  # File watcher
```

## 🛠️ Script Options

### Node.js Script (`cleanup-builds.js`)

```bash
node scripts/cleanup-builds.js [OPTIONS]

Options:
  --deep          Deep clean including node_modules
  --quiet         Suppress verbose output
  --setup-hooks   Setup git hooks for automatic cleanup
  --setup-cron    Setup cron job for daily cleanup
  --setup-watcher Setup file watcher for real-time cleanup
  --setup-all     Setup all automation features
  --help          Show help message
```

### Bash Script (`cleanup-builds.sh`)

```bash
./scripts/cleanup-builds.sh [OPTIONS]

Options:
  --deep          Deep clean including node_modules
  --quiet         Suppress verbose output
  --setup-hooks   Setup git hooks
  --setup-cron    Setup cron job
  --setup-watcher Setup file watcher
  --setup-all     Setup all automation
  --help          Show help message
```

### PowerShell Script (`cleanup-builds.ps1`)

```powershell
.\scripts\cleanup-builds.ps1 [OPTIONS]

Options:
  -Deep                Deep clean including node_modules
  -Quiet               Suppress verbose output
  -SetupScheduledTask  Setup Windows scheduled task
  -SetupFileWatcher    Setup file watcher
  -SetupAll            Setup all automation
  -Help                Show help message
```

## 🧹 What Gets Cleaned

### Build Artifacts
- `.next/` - Next.js build directory
- `out/` - Next.js export directory
- `docs-site/build/` - Docusaurus build directory
- `docs-site/.docusaurus/` - Docusaurus cache
- `dist/` - Distribution directories

### Cache Directories
- `.cache/` - General cache directories
- `.vercel/` - Vercel build cache
- `.turbo/` - Turbo cache
- `.nx/` - NX cache

### Package Manager Caches
- npm cache
- yarn cache
- bun cache

### Temporary Files
- `.env.local` - Local environment files
- Old log files (>7 days)

### Deep Clean (Optional)
- `node_modules/` - All dependency directories
- Reinstalls dependencies after cleanup

## ⏰ Automation Features

### 1. Git Hooks

Automatically runs cleanup before commits and after merges:

```bash
# Setup git hooks
npm run clean:setup
# or
node scripts/cleanup-builds.js --setup-hooks
```

**Created hooks:**
- `pre-commit`: Cleans build artifacts before committing
- `post-merge`: Cleans after merging branches

### 2. Cron Jobs (Linux/macOS)

Daily automated cleanup at 2 AM:

```bash
# Setup cron job
node scripts/cleanup-builds.js --setup-cron
```

**Cron entry:**
```
0 2 * * * /path/to/project/scripts/cron-cleanup.sh
```

### 3. Scheduled Tasks (Windows)

Daily automated cleanup using Windows Task Scheduler:

```powershell
# Setup scheduled task
.\scripts\cleanup-builds.ps1 -SetupScheduledTask
```

### 4. File Watcher

Real-time cleanup when source files change:

```bash
# Setup file watcher
node scripts/cleanup-builds.js --setup-watcher

# Start watching
node scripts/watch-cleanup.js
```

**Watched file types:**
- `.ts`, `.tsx`, `.js`, `.jsx`
- `.md`, `.json`
- `.css`, `.scss`

**Watched directories:**
- `src/`
- `docs-site/src/`
- `docs-site/docs/`

## 📊 Monitoring & Logging

### Log Files

All cleanup operations are logged to `logs/` directory:

```
logs/
├── cleanup-2025-06-25-14-30-15.log
├── cron-cleanup.log
└── watch-cleanup.log
```

### Performance Tracking

Scripts track and report:
- Directory sizes before/after cleanup
- Cleanup duration
- Disk space recovered
- Success/failure status

### Example Output

```
[2025-06-25 14:30:15] 🧹 Starting build cleanup process...
[2025-06-25 14:30:15] Project root: /path/to/project
[2025-06-25 14:30:15] Initial build sizes:
[2025-06-25 14:30:15]   Main site (.next): 45.2 MB
[2025-06-25 14:30:15]   Docs site (build): 23.1 MB
[2025-06-25 14:30:16] ✅ Cleaned Next.js build directory
[2025-06-25 14:30:16] ✅ Cleaned Docusaurus build directory
[2025-06-25 14:30:17] ✅ Cleared npm cache
[2025-06-25 14:30:17] Final build sizes:
[2025-06-25 14:30:17]   Main site (.next): 0 MB
[2025-06-25 14:30:17]   Docs site (build): 0 MB
[2025-06-25 14:30:17] 🎉 Build cleanup completed successfully!
```

## 🔧 CI/CD Integration

### GitHub Actions

Automated cleanup workflow (`.github/workflows/cleanup-builds.yml`):

**Triggers:**
- Push to main branch
- Pull requests
- Daily at 2 AM UTC
- Manual dispatch

**Jobs:**
- **cleanup-builds**: Main cleanup process
- **setup-automation**: Configure git hooks
- **validate-cleanup**: Cross-platform validation
- **performance-test**: Performance monitoring

### npm Scripts Integration

Pre/post build hooks automatically run cleanup:

```json
{
  "scripts": {
    "prebuild": "npm run clean:quiet",
    "build": "next build",
    "predocs:build": "npm run docs:clean",
    "docs:build": "cd docs-site && bun run build"
  }
}
```

## 🛡️ Safety Features

### Safe Deletion
- Checks if directories exist before deletion
- Uses force flags appropriately
- Handles permission errors gracefully

### Backup Prevention
- Never deletes source code
- Preserves `.env` files (only removes `.env.local`)
- Maintains git history and configuration

### Error Handling
- Continues cleanup even if individual operations fail
- Logs all errors for debugging
- Provides detailed error messages

## 🔧 Troubleshooting

### Common Issues

**Permission Errors:**
```bash
# Fix script permissions
chmod +x scripts/cleanup-builds.sh
chmod +x scripts/cron-cleanup.sh
```

**Cron Job Not Running:**
```bash
# Check cron service
sudo service cron status

# View cron logs
grep CRON /var/log/syslog

# List current cron jobs
crontab -l
```

**File Watcher Issues:**
```bash
# Install required dependency
npm install chokidar

# Check if files are being watched
node scripts/watch-cleanup.js
```

**Windows Scheduled Task Issues:**
```powershell
# Check scheduled tasks
Get-ScheduledTask -TaskName "FormerlyIncarcerated-BuildCleanup"

# View task history
Get-WinEvent -FilterHashtable @{LogName="Microsoft-Windows-TaskScheduler/Operational"}
```

### Debug Mode

Enable verbose logging:

```bash
# Node.js script
node scripts/cleanup-builds.js --verbose

# Bash script
DEBUG=1 ./scripts/cleanup-builds.sh

# PowerShell script
$VerbosePreference = "Continue"
.\scripts\cleanup-builds.ps1
```

## 📈 Performance Optimization

### Cleanup Frequency

**Recommended schedule:**
- **Development**: After each build (automatic via hooks)
- **CI/CD**: Before each build (automatic via workflows)
- **Production**: Daily at low-traffic hours (2 AM)

### Selective Cleanup

For faster cleanup, target specific directories:

```bash
# Only clean build artifacts
rm -rf .next docs-site/build

# Only clean caches
npm cache clean --force
```

### Monitoring Disk Usage

```bash
# Check project disk usage
du -sh .

# Monitor cleanup effectiveness
df -h
```

## 🤝 Contributing

### Adding New Cleanup Targets

1. Edit the cleanup scripts to include new directories/files
2. Update the documentation
3. Test on all platforms
4. Submit a pull request

### Platform-Specific Features

- **Linux/macOS**: Use bash script features
- **Windows**: Use PowerShell cmdlets
- **Cross-platform**: Use Node.js for compatibility

## 📞 Support

For issues with the cleanup system:

1. Check the logs in `logs/` directory
2. Run with `--help` flag for usage information
3. Enable debug mode for detailed output
4. Open an issue on GitHub with log files

---

**🎉 Happy cleaning! Keep your builds fast and your disk space free!**
