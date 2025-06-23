#!/usr/bin/env node

/**
 * Build Artifacts Cleanup Script
 * 
 * This script cleans up Next.js, webpack, and other build artifacts
 * to free up disk space and ensure clean builds.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BuildCleanup {
  constructor() {
    this.projectRoot = process.cwd();
    this.cleanupPaths = [
      // Next.js artifacts
      '.next',
      'out',
      
      // Node modules and package manager caches
      'node_modules/.cache',
      '.npm',
      '.yarn/cache',
      '.pnpm-store',
      
      // Build outputs
      'build',
      'dist',
      'coverage',
      
      // Logs
      'logs',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      
      // Runtime data
      'pids',
      '*.pid',
      '*.seed',
      '*.pid.lock',
      
      // Coverage directory used by tools like istanbul
      'lib-cov',
      
      // nyc test coverage
      '.nyc_output',
      
      // Grunt intermediate storage
      '.grunt',
      
      // Bower dependency directory
      'bower_components',
      
      // node-waf configuration
      '.lock-wscript',
      
      // Compiled binary addons
      'build/Release',
      
      // Dependency directories
      'jspm_packages/',
      
      // TypeScript cache
      '*.tsbuildinfo',
      
      // Optional npm cache directory
      '.npm',
      
      // Optional eslint cache
      '.eslintcache',
      
      // Microbundle cache
      '.rpt2_cache/',
      '.rts2_cache_cjs/',
      '.rts2_cache_es/',
      '.rts2_cache_umd/',
      
      // Optional REPL history
      '.node_repl_history',
      
      // Output of 'npm pack'
      '*.tgz',
      
      // Yarn Integrity file
      '.yarn-integrity',
      
      // dotenv environment variables file
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',
      
      // parcel-bundler cache
      '.cache',
      '.parcel-cache',
      
      // Next.js build output
      '.next',
      'out',
      
      // Nuxt.js build / generate output
      '.nuxt',
      
      // Gatsby files
      '.cache/',
      'public',
      
      // Vuepress build output
      '.vuepress/dist',
      
      // Serverless directories
      '.serverless/',
      
      // FuseBox cache
      '.fusebox/',
      
      // DynamoDB Local files
      '.dynamodb/',
      
      // TernJS port file
      '.tern-port',
      
      // Stores VSCode versions used for testing VSCode extensions
      '.vscode-test',
      
      // Temporary folders
      'tmp/',
      'temp/',
      
      // OS generated files
      '.DS_Store',
      '.DS_Store?',
      '._*',
      '.Spotlight-V100',
      '.Trashes',
      'ehthumbs.db',
      'Thumbs.db'
    ];
    
    this.docsCleanupPaths = [
      'docs-site/.docusaurus',
      'docs-site/build',
      'docs-site/node_modules/.cache',
      'docs-site/.cache'
    ];
  }

  /**
   * Main cleanup function
   */
  async cleanup(options = {}) {
    console.log('🧹 Starting build artifacts cleanup...\n');

    const {
      includeNodeModules = false,
      includeDocs = true,
      dryRun = false,
      verbose = false
    } = options;

    try {
      let totalSize = 0;
      let cleanedCount = 0;

      // Clean main project artifacts
      for (const cleanupPath of this.cleanupPaths) {
        const result = await this.cleanPath(cleanupPath, { dryRun, verbose });
        totalSize += result.size;
        if (result.cleaned) cleanedCount++;
      }

      // Clean docs artifacts if requested
      if (includeDocs) {
        console.log('\n📚 Cleaning docs-site artifacts...');
        for (const cleanupPath of this.docsCleanupPaths) {
          const result = await this.cleanPath(cleanupPath, { dryRun, verbose });
          totalSize += result.size;
          if (result.cleaned) cleanedCount++;
        }
      }

      // Clean node_modules if requested
      if (includeNodeModules) {
        console.log('\n📦 Cleaning node_modules...');
        const result = await this.cleanPath('node_modules', { dryRun, verbose });
        totalSize += result.size;
        if (result.cleaned) cleanedCount++;

        if (includeDocs) {
          const docsResult = await this.cleanPath('docs-site/node_modules', { dryRun, verbose });
          totalSize += docsResult.size;
          if (docsResult.cleaned) cleanedCount++;
        }
      }

      // Clean package manager caches
      await this.cleanPackageManagerCaches({ dryRun, verbose });

      console.log(`\n✅ Cleanup completed!`);
      console.log(`📊 Summary:`);
      console.log(`   - Files/directories processed: ${cleanedCount}`);
      console.log(`   - Space ${dryRun ? 'would be' : ''} freed: ${this.formatBytes(totalSize)}`);

      if (dryRun) {
        console.log('\n💡 This was a dry run. Use --execute to actually clean files.');
      }

    } catch (error) {
      console.error('❌ Cleanup failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Clean a specific path
   */
  async cleanPath(cleanupPath, { dryRun = false, verbose = false } = {}) {
    const fullPath = path.resolve(this.projectRoot, cleanupPath);
    
    try {
      const stats = await this.getPathStats(fullPath);
      
      if (!stats.exists) {
        if (verbose) {
          console.log(`⏭️  Skipping ${cleanupPath} (doesn't exist)`);
        }
        return { cleaned: false, size: 0 };
      }

      const size = stats.size;
      
      if (dryRun) {
        console.log(`🔍 Would clean: ${cleanupPath} (${this.formatBytes(size)})`);
        return { cleaned: true, size };
      }

      if (stats.isDirectory) {
        await this.removeDirectory(fullPath);
      } else {
        await this.removeFile(fullPath);
      }

      console.log(`🗑️  Cleaned: ${cleanupPath} (${this.formatBytes(size)})`);
      return { cleaned: true, size };

    } catch (error) {
      if (verbose) {
        console.log(`⚠️  Failed to clean ${cleanupPath}: ${error.message}`);
      }
      return { cleaned: false, size: 0 };
    }
  }

  /**
   * Get path statistics
   */
  async getPathStats(fullPath) {
    try {
      const stats = fs.statSync(fullPath);
      const size = stats.isDirectory() ? await this.getDirectorySize(fullPath) : stats.size;
      
      return {
        exists: true,
        isDirectory: stats.isDirectory(),
        size
      };
    } catch (error) {
      return { exists: false, isDirectory: false, size: 0 };
    }
  }

  /**
   * Calculate directory size recursively
   */
  async getDirectorySize(dirPath) {
    let totalSize = 0;
    
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          totalSize += await this.getDirectorySize(itemPath);
        } else {
          totalSize += stats.size;
        }
      }
    } catch (error) {
      // Ignore errors for inaccessible directories
    }
    
    return totalSize;
  }

  /**
   * Remove directory recursively
   */
  async removeDirectory(dirPath) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }

  /**
   * Remove file
   */
  async removeFile(filePath) {
    fs.unlinkSync(filePath);
  }

  /**
   * Clean package manager caches
   */
  async cleanPackageManagerCaches({ dryRun = false, verbose = false } = {}) {
    console.log('\n🗂️  Cleaning package manager caches...');

    const cacheCommands = [
      { name: 'npm', command: 'npm cache clean --force' },
      { name: 'yarn', command: 'yarn cache clean' },
      { name: 'pnpm', command: 'pnpm store prune' },
      { name: 'bun', command: 'bun pm cache rm' }
    ];

    for (const { name, command } of cacheCommands) {
      try {
        if (dryRun) {
          console.log(`🔍 Would run: ${command}`);
          continue;
        }

        execSync(command, { stdio: verbose ? 'inherit' : 'pipe' });
        console.log(`✓ Cleaned ${name} cache`);
      } catch (error) {
        if (verbose) {
          console.log(`⏭️  Skipping ${name} cache (not available)`);
        }
      }
    }
  }

  /**
   * Format bytes to human readable format
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Print help information
   */
  printHelp() {
    console.log(`
🧹 Build Artifacts Cleanup Script

Usage: node scripts/cleanup-build-artifacts.js [options]

Options:
  --help              Show this help message
  --dry-run           Show what would be cleaned without actually cleaning
  --execute           Actually perform the cleanup (default)
  --include-node-modules  Also clean node_modules directories
  --exclude-docs      Skip cleaning docs-site artifacts
  --verbose           Show detailed output

Examples:
  node scripts/cleanup-build-artifacts.js --dry-run
  node scripts/cleanup-build-artifacts.js --include-node-modules
  node scripts/cleanup-build-artifacts.js --verbose --execute
`);
  }
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    const cleanup = new BuildCleanup();
    cleanup.printHelp();
    process.exit(0);
  }

  const options = {
    includeNodeModules: args.includes('--include-node-modules'),
    includeDocs: !args.includes('--exclude-docs'),
    dryRun: args.includes('--dry-run'),
    verbose: args.includes('--verbose')
  };

  const cleanup = new BuildCleanup();
  cleanup.cleanup(options).catch(console.error);
}

module.exports = BuildCleanup;
