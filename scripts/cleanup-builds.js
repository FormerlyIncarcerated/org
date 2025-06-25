#!/usr/bin/env node

/**
 * FormerlyIncarcerated.org Build Cleanup Script (Node.js)
 * Cross-platform build cleanup with automation features
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync, spawn } = require('child_process');
const os = require('os');

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');
const MAIN_SITE_DIR = PROJECT_ROOT;
const DOCS_SITE_DIR = path.join(PROJECT_ROOT, 'docs-site');
const LOGS_DIR = path.join(PROJECT_ROOT, 'logs');
const LOG_FILE = path.join(LOGS_DIR, `cleanup-${new Date().toISOString().replace(/[:.]/g, '-')}.log`);

// CLI arguments
const args = process.argv.slice(2);
const options = {
  deep: args.includes('--deep'),
  quiet: args.includes('--quiet'),
  setupHooks: args.includes('--setup-hooks'),
  setupCron: args.includes('--setup-cron'),
  setupWatcher: args.includes('--setup-watcher'),
  setupAll: args.includes('--setup-all'),
  help: args.includes('--help')
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

// Logging functions
async function ensureLogsDir() {
  try {
    await fs.mkdir(LOGS_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists or other error
  }
}

function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const logMessage = `[${timestamp}] ${message}`;
  
  if (!options.quiet) {
    switch (level) {
      case 'SUCCESS':
        console.log(`${colors.green}✅ ${logMessage}${colors.reset}`);
        break;
      case 'WARNING':
        console.log(`${colors.yellow}⚠️  ${logMessage}${colors.reset}`);
        break;
      case 'ERROR':
        console.log(`${colors.red}❌ ${logMessage}${colors.reset}`);
        break;
      default:
        console.log(`${colors.blue}ℹ️  ${logMessage}${colors.reset}`);
    }
  }
  
  // Append to log file
  fs.appendFile(LOG_FILE, logMessage + '\n').catch(() => {});
}

// Utility functions
async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getDirectorySize(dirPath) {
  try {
    if (!(await pathExists(dirPath))) return '0 MB';
    
    const stats = await fs.stat(dirPath);
    if (!stats.isDirectory()) return '0 MB';
    
    // Simple size calculation (not recursive for performance)
    const files = await fs.readdir(dirPath);
    let totalSize = 0;
    
    for (const file of files.slice(0, 100)) { // Limit for performance
      try {
        const filePath = path.join(dirPath, file);
        const stat = await fs.stat(filePath);
        totalSize += stat.size;
      } catch {
        // Skip files that can't be accessed
      }
    }
    
    return `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
  } catch {
    return '0 MB';
  }
}

async function removeDirectorySafely(dirPath, description) {
  if (await pathExists(dirPath)) {
    log(`Cleaning ${description}: ${dirPath}`);
    try {
      await fs.rm(dirPath, { recursive: true, force: true });
      log(`Cleaned ${description}`, 'SUCCESS');
    } catch (error) {
      log(`Failed to clean ${description}: ${error.message}`, 'ERROR');
    }
  } else {
    log(`${description} directory not found: ${dirPath}`, 'WARNING');
  }
}

async function removeFileSafely(filePath, description) {
  if (await pathExists(filePath)) {
    log(`Removing ${description}: ${filePath}`);
    try {
      await fs.unlink(filePath);
      log(`Removed ${description}`, 'SUCCESS');
    } catch (error) {
      log(`Failed to remove ${description}: ${error.message}`, 'ERROR');
    }
  } else {
    log(`${description} file not found: ${filePath}`, 'WARNING');
  }
}

function runCommand(command, cwd = PROJECT_ROOT) {
  try {
    execSync(command, { cwd, stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// Main cleanup function
async function cleanupBuilds() {
  await ensureLogsDir();
  
  log('🧹 Starting build cleanup process...');
  log(`Project root: ${PROJECT_ROOT}`);
  
  // Calculate initial disk usage
  const initialMainSize = await getDirectorySize(path.join(MAIN_SITE_DIR, '.next'));
  const initialDocsSize = await getDirectorySize(path.join(DOCS_SITE_DIR, 'build'));
  const initialNodeModulesMain = await getDirectorySize(path.join(MAIN_SITE_DIR, 'node_modules'));
  const initialNodeModulesDocs = await getDirectorySize(path.join(DOCS_SITE_DIR, 'node_modules'));
  
  log('Initial build sizes:');
  log(`  Main site (.next): ${initialMainSize}`);
  log(`  Docs site (build): ${initialDocsSize}`);
  log(`  Main node_modules: ${initialNodeModulesMain}`);
  log(`  Docs node_modules: ${initialNodeModulesDocs}`);
  
  // Clean main site build artifacts
  log('🏠 Cleaning main site build artifacts...');
  await removeDirectorySafely(path.join(MAIN_SITE_DIR, '.next'), 'Next.js build directory');
  await removeDirectorySafely(path.join(MAIN_SITE_DIR, 'out'), 'Next.js export directory');
  await removeDirectorySafely(path.join(MAIN_SITE_DIR, '.vercel'), 'Vercel build cache');
  await removeDirectorySafely(path.join(MAIN_SITE_DIR, 'dist'), 'Distribution directory');
  
  // Clean docs site build artifacts
  log('📚 Cleaning docs site build artifacts...');
  await removeDirectorySafely(path.join(DOCS_SITE_DIR, 'build'), 'Docusaurus build directory');
  await removeDirectorySafely(path.join(DOCS_SITE_DIR, '.docusaurus'), 'Docusaurus cache directory');
  await removeDirectorySafely(path.join(DOCS_SITE_DIR, 'dist'), 'Docs distribution directory');
  
  // Clean cache directories
  log('🗂️  Cleaning cache directories...');
  await removeDirectorySafely(path.join(MAIN_SITE_DIR, '.cache'), 'Main site cache');
  await removeDirectorySafely(path.join(DOCS_SITE_DIR, '.cache'), 'Docs site cache');
  await removeDirectorySafely(path.join(PROJECT_ROOT, '.turbo'), 'Turbo cache');
  await removeDirectorySafely(path.join(PROJECT_ROOT, '.nx'), 'NX cache');
  
  // Clean temporary files
  log('🗑️  Cleaning temporary files...');
  await removeFileSafely(path.join(MAIN_SITE_DIR, '.env.local'), 'Local environment file');
  await removeFileSafely(path.join(DOCS_SITE_DIR, '.env.local'), 'Docs local environment file');
  
  // Clean old log files
  log('📝 Cleaning old log files...');
  try {
    const files = await fs.readdir(LOGS_DIR);
    const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    
    for (const file of files) {
      if (file.endsWith('.log')) {
        const filePath = path.join(LOGS_DIR, file);
        const stats = await fs.stat(filePath);
        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath);
        }
      }
    }
    log('Cleaned old log files', 'SUCCESS');
  } catch (error) {
    log(`Failed to clean old log files: ${error.message}`, 'WARNING');
  }
  
  // Clean package manager caches
  log('📦 Cleaning package manager caches...');
  
  if (runCommand('bun --version')) {
    if (runCommand('bun pm cache rm')) {
      log('Cleared bun cache', 'SUCCESS');
    } else {
      log('Failed to clear bun cache', 'WARNING');
    }
  }
  
  if (runCommand('npm --version')) {
    if (runCommand('npm cache clean --force')) {
      log('Cleared npm cache', 'SUCCESS');
    } else {
      log('Failed to clear npm cache', 'WARNING');
    }
  }
  
  if (runCommand('yarn --version')) {
    if (runCommand('yarn cache clean')) {
      log('Cleared yarn cache', 'SUCCESS');
    } else {
      log('Failed to clear yarn cache', 'WARNING');
    }
  }
  
  // Deep cleaning
  if (options.deep) {
    log('🔥 Deep cleaning: Removing node_modules...');
    await removeDirectorySafely(path.join(MAIN_SITE_DIR, 'node_modules'), 'Main site node_modules');
    await removeDirectorySafely(path.join(DOCS_SITE_DIR, 'node_modules'), 'Docs site node_modules');
    
    // Reinstall dependencies
    log('📦 Reinstalling dependencies...');
    
    // Main site
    process.chdir(MAIN_SITE_DIR);
    if (runCommand('bun --version')) {
      runCommand('bun install');
    } else {
      runCommand('npm install');
    }
    
    // Docs site
    process.chdir(DOCS_SITE_DIR);
    runCommand('npm install');
    
    process.chdir(PROJECT_ROOT);
    log('Dependencies reinstalled', 'SUCCESS');
  }
  
  // Calculate final disk usage
  const finalMainSize = await getDirectorySize(path.join(MAIN_SITE_DIR, '.next'));
  const finalDocsSize = await getDirectorySize(path.join(DOCS_SITE_DIR, 'build'));
  
  log('Final build sizes:');
  log(`  Main site (.next): ${finalMainSize}`);
  log(`  Docs site (build): ${finalDocsSize}`);
  
  log('🎉 Build cleanup completed successfully!', 'SUCCESS');
  log(`Cleanup log saved to: ${LOG_FILE}`);
}

// Setup functions
async function setupGitHooks() {
  log('🔗 Setting up git hooks for automatic cleanup...');
  
  const hooksDir = path.join(PROJECT_ROOT, '.git', 'hooks');
  
  // Pre-commit hook
  const preCommitHook = `#!/bin/bash
# Auto-cleanup before commit
echo "🧹 Running pre-commit cleanup..."
node "${path.join(__dirname, 'cleanup-builds.js')}" --quiet
`;
  
  // Post-merge hook
  const postMergeHook = `#!/bin/bash
# Auto-cleanup after merge
echo "🧹 Running post-merge cleanup..."
node "${path.join(__dirname, 'cleanup-builds.js')}" --quiet
`;
  
  try {
    await fs.writeFile(path.join(hooksDir, 'pre-commit'), preCommitHook, { mode: 0o755 });
    await fs.writeFile(path.join(hooksDir, 'post-merge'), postMergeHook, { mode: 0o755 });
    log('Git hooks setup completed', 'SUCCESS');
  } catch (error) {
    log(`Failed to setup git hooks: ${error.message}`, 'ERROR');
  }
}

async function setupCronJob() {
  log('⏰ Setting up cron job for automatic cleanup...');
  
  if (os.platform() === 'win32') {
    log('Use PowerShell script for Windows scheduled tasks', 'WARNING');
    return;
  }
  
  const cronScript = path.join(__dirname, 'cron-cleanup.sh');
  const cronContent = `#!/bin/bash
# Cron job script for FormerlyIncarcerated.org build cleanup
cd "${PROJECT_ROOT}"
node "${path.join(__dirname, 'cleanup-builds.js')}" --quiet >> "${path.join(PROJECT_ROOT, 'logs', 'cron-cleanup.log')}" 2>&1
`;
  
  try {
    await fs.writeFile(cronScript, cronContent, { mode: 0o755 });
    
    // Add to crontab (runs daily at 2 AM)
    runCommand(`(crontab -l 2>/dev/null; echo "0 2 * * * ${cronScript}") | crontab -`);
    
    log('Cron job setup completed (runs daily at 2 AM)', 'SUCCESS');
  } catch (error) {
    log(`Failed to setup cron job: ${error.message}`, 'ERROR');
  }
}

async function setupFileWatcher() {
  log('👀 Setting up file watcher for automatic cleanup...');
  
  const watcherScript = path.join(__dirname, 'watch-cleanup.js');
  const watcherContent = `#!/usr/bin/env node

const chokidar = require('chokidar');
const { execSync } = require('child_process');
const path = require('path');

const PROJECT_ROOT = '${PROJECT_ROOT}';
const CLEANUP_SCRIPT = '${path.join(__dirname, 'cleanup-builds.js')}';

// Watch for changes in source files
const watcher = chokidar.watch([
  path.join(PROJECT_ROOT, 'src'),
  path.join(PROJECT_ROOT, 'docs-site/src'),
  path.join(PROJECT_ROOT, 'docs-site/docs')
], {
  ignored: /node_modules/,
  persistent: true
});

let debounceTimer;

watcher.on('change', (filePath) => {
  if (/\\.(ts|tsx|js|jsx|md|json|css|scss)$/.test(filePath)) {
    console.log(\`\${new Date().toISOString()}: File changed: \${filePath}\`);
    
    // Debounce: wait 5 seconds for more changes
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      try {
        execSync(\`node "\${CLEANUP_SCRIPT}" --quiet\`, { stdio: 'inherit' });
      } catch (error) {
        console.error('Cleanup failed:', error.message);
      }
    }, 5000);
  }
});

console.log('File watcher started. Press Ctrl+C to stop.');
console.log('Watching:', PROJECT_ROOT);
`;
  
  try {
    await fs.writeFile(watcherScript, watcherContent, { mode: 0o755 });
    log('File watcher script created', 'SUCCESS');
    log(`To start watching: node "${watcherScript}"`);
    log('Note: Requires chokidar package (npm install chokidar)');
  } catch (error) {
    log(`Failed to setup file watcher: ${error.message}`, 'ERROR');
  }
}

function showHelp() {
  console.log('FormerlyIncarcerated.org Build Cleanup Script (Node.js)');
  console.log('');
  console.log('Usage: node cleanup-builds.js [OPTIONS]');
  console.log('');
  console.log('Options:');
  console.log('  --deep          Deep clean including node_modules');
  console.log('  --quiet         Suppress verbose output');
  console.log('  --setup-hooks   Setup git hooks for automatic cleanup');
  console.log('  --setup-cron    Setup cron job for daily cleanup (Unix/Linux/macOS)');
  console.log('  --setup-watcher Setup file watcher for real-time cleanup');
  console.log('  --setup-all     Setup all automation features');
  console.log('  --help          Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  node cleanup-builds.js                    # Basic cleanup');
  console.log('  node cleanup-builds.js --deep             # Deep cleanup with node_modules');
  console.log('  node cleanup-builds.js --setup-all        # Setup all automation');
}

// Main execution
async function main() {
  if (options.help) {
    showHelp();
    return;
  }
  
  if (options.setupAll) {
    await setupGitHooks();
    await setupCronJob();
    await setupFileWatcher();
    log('🎉 All automation features setup completed!', 'SUCCESS');
    return;
  }
  
  if (options.setupHooks) {
    await setupGitHooks();
    return;
  }
  
  if (options.setupCron) {
    await setupCronJob();
    return;
  }
  
  if (options.setupWatcher) {
    await setupFileWatcher();
    return;
  }
  
  // Run cleanup
  await cleanupBuilds();
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

// Run the script
main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
