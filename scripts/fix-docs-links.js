#!/usr/bin/env node

/**
 * Fix Broken Documentation Links
 * 
 * This script scans the docs-site directory for broken markdown links
 * and attempts to fix them automatically.
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'blue') {
  const timestamp = new Date().toISOString().slice(11, 19);
  console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

// Common broken link patterns and their fixes
const linkFixes = {
  // Contributing links
  './contributing/code-of-conduct.md': './contributing/code-of-conduct',
  './contributing/guidelines.md': './contributing/guidelines',
  './contributing/issues.md': './contributing/issues',
  
  // Technical links
  './technical/WEB3_ARCHITECTURE.md': './technical/WEB3_ARCHITECTURE',
  './technical/deployment.md': './technical/deployment',
  './technical/theming.md': './technical/theming',
  
  // Legal links
  './legal/terms-of-service.md': './legal/terms-of-service',
  './legal/privacy-policy.md': './legal/privacy-policy',
  './legal/community-guidelines.md': './legal/community-guidelines',
  
  // Main docs
  './whitepaper.md': './whitepaper',
  './roadmap.md': './roadmap',
  './status.md': './status',
  './changelog.md': './changelog'
};

// External links that should be absolute
const externalLinks = {
  'https://github.com/FormerlyIncarcerated/org/blob/main/CONTRIBUTING.md': 'https://github.com/FormerlyIncarcerated/org/blob/main/CONTRIBUTING.md',
  'https://github.com/FormerlyIncarcerated/org/blob/main/CODE_OF_CONDUCT.md': 'https://github.com/FormerlyIncarcerated/org/blob/main/CODE_OF_CONDUCT.md'
};

function findMarkdownFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.')) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // Fix relative markdown links
  for (const [brokenLink, fixedLink] of Object.entries(linkFixes)) {
    const regex = new RegExp(`\\[([^\\]]+)\\]\\(${brokenLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `[$1](${fixedLink})`);
      hasChanges = true;
      log(`Fixed link in ${path.relative(process.cwd(), filePath)}: ${brokenLink} → ${fixedLink}`);
    }
  }
  
  // Fix external links
  for (const [oldLink, newLink] of Object.entries(externalLinks)) {
    if (content.includes(oldLink) && oldLink !== newLink) {
      content = content.replace(new RegExp(oldLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newLink);
      hasChanges = true;
      log(`Updated external link in ${path.relative(process.cwd(), filePath)}`);
    }
  }
  
  // Remove .md extensions from internal links
  const mdLinkRegex = /\[([^\]]+)\]\(\.\/([^)]+)\.md\)/g;
  content = content.replace(mdLinkRegex, (match, text, link) => {
    hasChanges = true;
    log(`Removed .md extension: ${match} → [${text}](./${link})`);
    return `[${text}](./${link})`;
  });
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    logSuccess(`Updated ${path.relative(process.cwd(), filePath)}`);
  }
  
  return hasChanges;
}

function createMissingFiles() {
  const docsDir = path.join(process.cwd(), 'docs-site', 'docs');
  
  // Create missing directories
  const requiredDirs = [
    'contributing',
    'technical', 
    'legal'
  ];
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(docsDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      logSuccess(`Created directory: ${dir}`);
    }
  }
  
  // Create missing files with basic content
  const missingFiles = [
    {
      path: 'contributing/issues.md',
      content: `---
id: issues
title: Reporting Issues
sidebar_label: 🐛 Issues
description: How to report bugs and request features
---

# 🐛 Reporting Issues

Please report issues on our [GitHub Issues page](https://github.com/FormerlyIncarcerated/org/issues).

## Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details

## Feature Requests

For feature requests, please describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered
`
    }
  ];
  
  for (const file of missingFiles) {
    const filePath = path.join(docsDir, file.path);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content, 'utf8');
      logSuccess(`Created missing file: ${file.path}`);
    }
  }
}

function main() {
  log('🔧 Starting documentation link fix process...');
  
  const docsDir = path.join(process.cwd(), 'docs-site', 'docs');
  
  if (!fs.existsSync(docsDir)) {
    logError(`Documentation directory not found: ${docsDir}`);
    process.exit(1);
  }
  
  // Create missing files and directories
  createMissingFiles();
  
  // Find all markdown files
  const markdownFiles = findMarkdownFiles(docsDir);
  log(`Found ${markdownFiles.length} markdown files to check`);
  
  let totalFilesFixed = 0;
  
  // Fix links in each file
  for (const file of markdownFiles) {
    if (fixLinksInFile(file)) {
      totalFilesFixed++;
    }
  }
  
  if (totalFilesFixed > 0) {
    logSuccess(`Fixed links in ${totalFilesFixed} files`);
  } else {
    log('No broken links found to fix');
  }
  
  log('🎉 Documentation link fix process completed!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { fixLinksInFile, createMissingFiles };
