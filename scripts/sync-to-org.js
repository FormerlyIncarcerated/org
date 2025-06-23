#!/usr/bin/env node

/**
 * Sync files from main repository to organization repository
 * This script helps maintain consistency between the two repositories
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  mainRepo: process.cwd(),
  orgRepo: process.env.ORG_REPO_PATH || '../FormerlyIncarcerated-org',
  filesToSync: [
    'README.md',
    'LICENSE',
    'package.json',
    '.gitignore',
    'docs/',
    '.github/',
    'profile/'
  ],
  excludePatterns: [
    'node_modules/',
    '.next/',
    'dist/',
    'build/',
    '.env*',
    '*.log'
  ]
};

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

function copyFile(src, dest) {
  try {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    return true;
  } catch (error) {
    log(`Failed to copy ${src} to ${dest}: ${error.message}`, 'error');
    return false;
  }
}

function copyDirectory(src, dest) {
  try {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);
    
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      
      // Skip excluded patterns
      if (CONFIG.excludePatterns.some(pattern => item.includes(pattern.replace('/', '')))) {
        continue;
      }
      
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        copyDirectory(srcPath, destPath);
      } else {
        copyFile(srcPath, destPath);
      }
    }
    return true;
  } catch (error) {
    log(`Failed to copy directory ${src} to ${dest}: ${error.message}`, 'error');
    return false;
  }
}

function syncFiles() {
  log('Starting file synchronization...');
  
  // Check if organization repository exists
  if (!fileExists(CONFIG.orgRepo)) {
    log(`Organization repository not found at ${CONFIG.orgRepo}`, 'error');
    log('Please clone the organization repository or set ORG_REPO_PATH environment variable');
    process.exit(1);
  }
  
  let syncedFiles = 0;
  let failedFiles = 0;
  
  for (const file of CONFIG.filesToSync) {
    const srcPath = path.join(CONFIG.mainRepo, file);
    const destPath = path.join(CONFIG.orgRepo, file);
    
    if (!fileExists(srcPath)) {
      log(`Source file/directory not found: ${file}`, 'error');
      failedFiles++;
      continue;
    }
    
    const stat = fs.statSync(srcPath);
    let success = false;
    
    if (stat.isDirectory()) {
      log(`Syncing directory: ${file}`);
      success = copyDirectory(srcPath, destPath);
    } else {
      log(`Syncing file: ${file}`);
      success = copyFile(srcPath, destPath);
    }
    
    if (success) {
      syncedFiles++;
    } else {
      failedFiles++;
    }
  }
  
  log(`Synchronization complete: ${syncedFiles} files synced, ${failedFiles} failed`, 
      failedFiles === 0 ? 'success' : 'error');
  
  return failedFiles === 0;
}

function commitAndPush() {
  try {
    log('Committing changes to organization repository...');
    
    process.chdir(CONFIG.orgRepo);
    
    // Check if there are changes to commit
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (!status.trim()) {
      log('No changes to commit', 'info');
      return true;
    }
    
    // Add all changes
    execSync('git add .');
    
    // Commit with timestamp
    const timestamp = new Date().toISOString();
    const commitMessage = `sync: Update from main repository (${timestamp})`;
    execSync(`git commit -m "${commitMessage}"`);
    
    // Push changes
    execSync('git push');
    
    log('Changes committed and pushed successfully', 'success');
    return true;
  } catch (error) {
    log(`Failed to commit and push: ${error.message}`, 'error');
    return false;
  } finally {
    process.chdir(CONFIG.mainRepo);
  }
}

function main() {
  log('🚀 Starting repository synchronization');
  log(`Main repository: ${CONFIG.mainRepo}`);
  log(`Organization repository: ${CONFIG.orgRepo}`);
  
  const syncSuccess = syncFiles();
  
  if (!syncSuccess) {
    log('Synchronization failed, skipping commit', 'error');
    process.exit(1);
  }
  
  const commitSuccess = commitAndPush();
  
  if (!commitSuccess) {
    log('Failed to commit changes', 'error');
    process.exit(1);
  }
  
  log('🎉 Repository synchronization completed successfully', 'success');
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { syncFiles, commitAndPush, CONFIG };
