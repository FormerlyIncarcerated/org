#!/usr/bin/env node

/**
 * Infuze Cloud Deployment Script
 * 
 * This script handles deployment to Infuze Cloud infrastructure
 * for FormerlyIncarcerated.org platform
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  vmId: process.env.INFUZE_VM_ID || '106',
  vmIp: process.env.INFUZE_VM_IP || '194.31.143.6',
  vmName: process.env.INFUZE_VM_NAME || 'formerlyincarcerated',
  domain: process.env.PRODUCTION_DOMAIN || 'formerlyincarcerated.org',
  docsDomain: process.env.DOCS_DOMAIN || 'docs.formerlyincarcerated.org',
  deployUser: process.env.DEPLOY_USER || 'deploy',
  apiKey: process.env.INFUZE_API_KEY,
  sshKey: process.env.DEPLOY_SSH_KEY
};

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

function execCommand(command, options = {}) {
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    return result;
  } catch (error) {
    logError(`Command failed: ${command}`);
    logError(error.message);
    throw error;
  }
}

async function checkInfuzeCLI() {
  log('🔧 Checking Infuze CLI installation...');
  
  try {
    execCommand('infuze --version', { silent: true });
    logSuccess('Infuze CLI is installed');
  } catch (error) {
    logError('Infuze CLI not found. Installing...');
    execCommand('npm install -g infuze');
    logSuccess('Infuze CLI installed');
  }
}

async function authenticateInfuze() {
  log('🔐 Authenticating with Infuze Cloud...');
  
  if (!config.apiKey) {
    logError('INFUZE_API_KEY environment variable not set');
    process.exit(1);
  }
  
  // Set environment variable for CLI
  process.env.INFUZE_API_KEY = config.apiKey;
  
  try {
    // Check if already authenticated
    const result = execCommand('infuze balance', { silent: true });
    logSuccess('Already authenticated with Infuze Cloud');
    return true;
  } catch (error) {
    logWarning('Authentication required');
    // In CI/CD, we might need to handle authentication differently
    return false;
  }
}

async function checkVMStatus() {
  log(`🖥️  Checking VM status (ID: ${config.vmId})...`);
  
  try {
    const result = execCommand(`infuze vm info ${config.vmId}`, { silent: true });
    logSuccess(`VM ${config.vmName} is accessible`);
    return true;
  } catch (error) {
    logError(`Failed to get VM info: ${error.message}`);
    return false;
  }
}

async function deployToServer() {
  log('🚀 Starting deployment to production server...');
  
  const deployScript = `
    set -e
    
    echo "📥 Updating repository..."
    cd /home/deploy/formerlyincarcerated || exit 1
    git fetch origin
    git checkout master
    git pull origin master
    
    echo "📦 Installing dependencies..."
    bun install
    cd docs-site && bun install && cd ..
    
    echo "🔨 Building applications..."
    bun run build
    cd docs-site && bun run build && cd ..
    
    echo "📁 Deploying to web directories..."
    sudo rm -rf /var/www/formerlyincarcerated.org/*
    sudo cp -r .next/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true
    sudo cp -r public/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true
    
    sudo rm -rf /var/www/docs.formerlyincarcerated.org/*
    sudo cp -r docs-site/build/* /var/www/docs.formerlyincarcerated.org/
    
    echo "🔐 Setting permissions..."
    sudo chown -R deploy:www-data /var/www/formerlyincarcerated.org
    sudo chown -R deploy:www-data /var/www/docs.formerlyincarcerated.org
    sudo chmod -R 755 /var/www/formerlyincarcerated.org
    sudo chmod -R 755 /var/www/docs.formerlyincarcerated.org
    
    echo "🔄 Restarting services..."
    sudo systemctl restart nginx
    pm2 restart all 2>/dev/null || true
    
    echo "✅ Deployment completed successfully!"
  `;
  
  try {
    // Write deploy script to temp file
    const scriptPath = '/tmp/deploy-script.sh';
    fs.writeFileSync(scriptPath, deployScript);
    
    // Execute deployment via SSH
    const sshCommand = `ssh -o StrictHostKeyChecking=no ${config.deployUser}@${config.vmIp} 'bash -s' < ${scriptPath}`;
    execCommand(sshCommand);
    
    logSuccess('Deployment completed successfully');
    
    // Clean up
    fs.unlinkSync(scriptPath);
    
  } catch (error) {
    logError(`Deployment failed: ${error.message}`);
    throw error;
  }
}

async function verifyDeployment() {
  log('🔍 Verifying deployment...');
  
  const sites = [
    { name: 'Main Site', url: `https://${config.domain}` },
    { name: 'Documentation', url: `https://${config.docsDomain}` }
  ];
  
  for (const site of sites) {
    try {
      const response = execCommand(`curl -f -s -o /dev/null -w "%{http_code}" ${site.url}`, { silent: true });
      const statusCode = response.trim();
      
      if (statusCode === '200') {
        logSuccess(`${site.name} is responding (${statusCode})`);
      } else {
        logWarning(`${site.name} returned status ${statusCode}`);
      }
    } catch (error) {
      logError(`${site.name} is not responding`);
    }
  }
}

async function monitorResources() {
  log('📊 Monitoring VM resources...');
  
  try {
    // Get VM info and resource usage
    const vmInfo = execCommand(`infuze vm info ${config.vmId}`, { silent: true });
    log('VM resource information retrieved');
    
    // Could add more detailed monitoring here
    logSuccess('Resource monitoring completed');
    
  } catch (error) {
    logWarning(`Resource monitoring failed: ${error.message}`);
  }
}

async function sendNotification(status, message) {
  log(`📢 Sending deployment notification...`);
  
  // This could integrate with Slack, Discord, email, etc.
  const notification = {
    status,
    message,
    timestamp: new Date().toISOString(),
    vm: {
      id: config.vmId,
      ip: config.vmIp,
      name: config.vmName
    },
    domains: [config.domain, config.docsDomain]
  };
  
  console.log('📢 Deployment Notification:', JSON.stringify(notification, null, 2));
}

async function main() {
  const startTime = Date.now();
  
  try {
    log('🚀 Starting Infuze Cloud deployment process...');
    log(`📍 Target VM: ${config.vmName} (${config.vmIp})`);
    log(`🌐 Domains: ${config.domain}, ${config.docsDomain}`);
    
    // Pre-deployment checks
    await checkInfuzeCLI();
    await authenticateInfuze();
    await checkVMStatus();
    
    // Deploy
    await deployToServer();
    
    // Post-deployment
    await verifyDeployment();
    await monitorResources();
    
    const duration = Math.round((Date.now() - startTime) / 1000);
    logSuccess(`🎉 Deployment completed successfully in ${duration}s`);
    
    await sendNotification('success', `Deployment completed in ${duration}s`);
    
  } catch (error) {
    const duration = Math.round((Date.now() - startTime) / 1000);
    logError(`💥 Deployment failed after ${duration}s: ${error.message}`);
    
    await sendNotification('failure', `Deployment failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'check':
    checkVMStatus().then(() => process.exit(0)).catch(() => process.exit(1));
    break;
  case 'verify':
    verifyDeployment().then(() => process.exit(0)).catch(() => process.exit(1));
    break;
  case 'monitor':
    monitorResources().then(() => process.exit(0)).catch(() => process.exit(1));
    break;
  default:
    main();
}

module.exports = {
  checkInfuzeCLI,
  authenticateInfuze,
  checkVMStatus,
  deployToServer,
  verifyDeployment,
  monitorResources
};
