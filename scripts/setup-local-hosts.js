#!/usr/bin/env node

/**
 * Local Hosts File Setup Script
 * 
 * This script helps set up local subdomain routing by providing
 * instructions for modifying the hosts file.
 */

const os = require('os');
const path = require('path');

class LocalHostsSetup {
  constructor() {
    this.platform = os.platform();
    this.hostsEntry = '127.0.0.1 docs.localhost';
  }

  /**
   * Main setup function
   */
  setup() {
    console.log('🌐 Setting up local subdomain routing...\n');

    this.printInstructions();
    this.printTestingInfo();
    this.printTroubleshooting();
  }

  /**
   * Print platform-specific instructions
   */
  printInstructions() {
    console.log('📝 Hosts File Setup Instructions:\n');

    switch (this.platform) {
      case 'win32':
        this.printWindowsInstructions();
        break;
      case 'darwin':
        this.printMacInstructions();
        break;
      case 'linux':
        this.printLinuxInstructions();
        break;
      default:
        this.printGenericInstructions();
    }
  }

  /**
   * Windows instructions
   */
  printWindowsInstructions() {
    console.log(`🪟 Windows Instructions:

1. Open Command Prompt or PowerShell as Administrator
2. Navigate to the hosts file:
   cd C:\\Windows\\System32\\drivers\\etc

3. Edit the hosts file:
   notepad hosts

4. Add this line at the end:
   ${this.hostsEntry}

5. Save and close the file

Alternative using PowerShell (as Administrator):
   Add-Content -Path "C:\\Windows\\System32\\drivers\\etc\\hosts" -Value "${this.hostsEntry}"
`);
  }

  /**
   * macOS instructions
   */
  printMacInstructions() {
    console.log(`🍎 macOS Instructions:

1. Open Terminal
2. Edit the hosts file with sudo:
   sudo nano /etc/hosts

3. Add this line at the end:
   ${this.hostsEntry}

4. Save and exit (Ctrl+X, then Y, then Enter)

Alternative one-liner:
   echo "${this.hostsEntry}" | sudo tee -a /etc/hosts
`);
  }

  /**
   * Linux instructions
   */
  printLinuxInstructions() {
    console.log(`🐧 Linux Instructions:

1. Open Terminal
2. Edit the hosts file with sudo:
   sudo nano /etc/hosts

3. Add this line at the end:
   ${this.hostsEntry}

4. Save and exit (Ctrl+X, then Y, then Enter)

Alternative one-liner:
   echo "${this.hostsEntry}" | sudo tee -a /etc/hosts
`);
  }

  /**
   * Generic instructions
   */
  printGenericInstructions() {
    console.log(`📋 Generic Instructions:

1. Locate your system's hosts file:
   - Windows: C:\\Windows\\System32\\drivers\\etc\\hosts
   - macOS/Linux: /etc/hosts

2. Edit the file with administrator/root privileges

3. Add this line:
   ${this.hostsEntry}

4. Save the file
`);
  }

  /**
   * Print testing information
   */
  printTestingInfo() {
    console.log(`🧪 Testing Your Setup:

After modifying the hosts file:

1. Start the development servers:
   npm run dev:docs

2. Test the following URLs:
   ✅ Main app: http://localhost:3000
   ✅ Docs direct: http://localhost:3001
   ✅ Docs subdomain: http://docs.localhost:3000

3. Verify subdomain routing works:
   - Visit http://docs.localhost:3000
   - Should show the documentation site
   - Check browser developer tools for any errors

4. Test both HTTP and HTTPS (if configured):
   - http://docs.localhost:3000
   - https://docs.localhost:3000 (if SSL is set up)
`);
  }

  /**
   * Print troubleshooting information
   */
  printTroubleshooting() {
    console.log(`🔧 Troubleshooting:

Common Issues:

1. "Site can't be reached" error:
   - Verify hosts file entry is correct
   - Restart your browser
   - Clear DNS cache:
     Windows: ipconfig /flushdns
     macOS: sudo dscacheutil -flushcache
     Linux: sudo systemctl restart systemd-resolved

2. Still seeing main app instead of docs:
   - Check middleware.ts is working
   - Verify docs site is running on port 3001
   - Check browser developer tools for redirect errors

3. Permission denied when editing hosts file:
   - Make sure you're running as Administrator/sudo
   - Check file permissions
   - Try using a different text editor

4. Changes not taking effect:
   - Restart your browser completely
   - Clear browser cache
   - Try incognito/private browsing mode
   - Restart the development servers

5. Port conflicts:
   - Make sure ports 3000 and 3001 are available
   - Check for other running services
   - Use different ports if needed:
     PORT=3002 DOCS_PORT=3003 npm run dev:docs

📞 Need Help?
   - Check the project documentation
   - Review middleware.ts for routing logic
   - Test with curl: curl -H "Host: docs.localhost" http://localhost:3000
`);
  }

  /**
   * Check if hosts entry already exists
   */
  checkHostsEntry() {
    const hostsPath = this.getHostsPath();
    
    try {
      const fs = require('fs');
      const hostsContent = fs.readFileSync(hostsPath, 'utf8');
      
      if (hostsContent.includes('docs.localhost')) {
        console.log('✅ docs.localhost entry found in hosts file');
        return true;
      } else {
        console.log('❌ docs.localhost entry not found in hosts file');
        return false;
      }
    } catch (error) {
      console.log('⚠️  Could not read hosts file:', error.message);
      return false;
    }
  }

  /**
   * Get hosts file path for current platform
   */
  getHostsPath() {
    switch (this.platform) {
      case 'win32':
        return 'C:\\Windows\\System32\\drivers\\etc\\hosts';
      default:
        return '/etc/hosts';
    }
  }

  /**
   * Print current hosts file status
   */
  printStatus() {
    console.log('📊 Current Status:\n');
    
    const hasEntry = this.checkHostsEntry();
    const hostsPath = this.getHostsPath();
    
    console.log(`Hosts file location: ${hostsPath}`);
    console.log(`Required entry: ${this.hostsEntry}`);
    console.log(`Status: ${hasEntry ? '✅ Configured' : '❌ Not configured'}\n`);
    
    if (!hasEntry) {
      console.log('Run this script to get setup instructions.');
    }
  }
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);
  const setup = new LocalHostsSetup();
  
  if (args.includes('--help')) {
    console.log(`
🌐 Local Hosts File Setup

Usage: node scripts/setup-local-hosts.js [options]

Options:
  --help     Show this help message
  --status   Check current hosts file status
  --check    Same as --status

Examples:
  node scripts/setup-local-hosts.js
  node scripts/setup-local-hosts.js --status
`);
    process.exit(0);
  }

  if (args.includes('--status') || args.includes('--check')) {
    setup.printStatus();
  } else {
    setup.setup();
  }
}

module.exports = LocalHostsSetup;
