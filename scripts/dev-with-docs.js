#!/usr/bin/env node

/**
 * Local Development Script with Docs Subdomain Support
 * 
 * This script runs both the main app and docs site simultaneously
 * with proper subdomain routing for local development.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class LocalDevServer {
  constructor() {
    this.projectRoot = process.cwd();
    this.docsPath = path.join(this.projectRoot, 'docs-site');
    this.processes = [];
    this.ports = {
      main: 3000,
      docs: 3001
    };
  }

  /**
   * Start the development servers
   */
  async start() {
    console.log('🚀 Starting local development with docs subdomain support...\n');

    try {
      // Check if docs-site exists
      this.verifyDocsDirectory();

      // Start main app
      await this.startMainApp();

      // Start docs site
      await this.startDocsApp();

      // Setup graceful shutdown
      this.setupGracefulShutdown();

      // Print access information
      this.printAccessInfo();

      // Keep the process running
      process.stdin.resume();

    } catch (error) {
      console.error('❌ Failed to start development servers:', error.message);
      this.cleanup();
      process.exit(1);
    }
  }

  /**
   * Verify that docs-site directory exists
   */
  verifyDocsDirectory() {
    if (!fs.existsSync(this.docsPath)) {
      throw new Error('docs-site directory not found. Please ensure it exists.');
    }
    console.log('✓ docs-site directory found');
  }

  /**
   * Start the main Next.js application
   */
  async startMainApp() {
    console.log('📱 Starting main application...');
    
    const mainProcess = spawn('npm', ['run', 'dev'], {
      cwd: this.projectRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
      env: {
        ...process.env,
        PORT: this.ports.main.toString()
      }
    });

    this.processes.push({
      name: 'main-app',
      process: mainProcess,
      port: this.ports.main
    });

    // Handle main app output
    mainProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready') || output.includes('started server')) {
        console.log('✅ Main app ready at http://localhost:' + this.ports.main);
      }
      // Optionally log other output
      if (process.env.VERBOSE) {
        console.log(`[MAIN] ${output.trim()}`);
      }
    });

    mainProcess.stderr.on('data', (data) => {
      const error = data.toString();
      if (!error.includes('Warning') && !error.includes('Note:')) {
        console.error(`[MAIN ERROR] ${error.trim()}`);
      }
    });

    mainProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Main app process exited with code ${code}`);
      }
    });

    // Wait a moment for the main app to start
    await this.sleep(3000);
  }

  /**
   * Start the docs site
   */
  async startDocsApp() {
    console.log('📚 Starting docs site...');

    // Check if docs site has dependencies installed
    const docsPackageJson = path.join(this.docsPath, 'package.json');
    const docsNodeModules = path.join(this.docsPath, 'node_modules');
    
    if (!fs.existsSync(docsNodeModules)) {
      console.log('📦 Installing docs dependencies...');
      await this.installDocsDependencies();
    }

    const docsProcess = spawn('npm', ['run', 'start', '--', '--port', this.ports.docs.toString()], {
      cwd: this.docsPath,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });

    this.processes.push({
      name: 'docs-site',
      process: docsProcess,
      port: this.ports.docs
    });

    // Handle docs output
    docsProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') || output.includes('started server')) {
        console.log('✅ Docs site ready at http://localhost:' + this.ports.docs);
      }
      // Optionally log other output
      if (process.env.VERBOSE) {
        console.log(`[DOCS] ${output.trim()}`);
      }
    });

    docsProcess.stderr.on('data', (data) => {
      const error = data.toString();
      if (!error.includes('Warning') && !error.includes('Note:')) {
        console.error(`[DOCS ERROR] ${error.trim()}`);
      }
    });

    docsProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Docs process exited with code ${code}`);
      }
    });

    // Wait for docs to start
    await this.sleep(5000);
  }

  /**
   * Install docs dependencies if needed
   */
  async installDocsDependencies() {
    return new Promise((resolve, reject) => {
      const installProcess = spawn('npm', ['install'], {
        cwd: this.docsPath,
        stdio: 'inherit',
        shell: true
      });

      installProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Docs dependencies installed');
          resolve();
        } else {
          reject(new Error(`Failed to install docs dependencies (exit code: ${code})`));
        }
      });
    });
  }

  /**
   * Setup graceful shutdown
   */
  setupGracefulShutdown() {
    const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    
    signals.forEach(signal => {
      process.on(signal, () => {
        console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
        this.cleanup();
        process.exit(0);
      });
    });
  }

  /**
   * Cleanup all processes
   */
  cleanup() {
    console.log('🧹 Cleaning up processes...');
    
    this.processes.forEach(({ name, process }) => {
      if (process && !process.killed) {
        console.log(`  Stopping ${name}...`);
        process.kill('SIGTERM');
      }
    });

    // Force kill after timeout
    setTimeout(() => {
      this.processes.forEach(({ name, process }) => {
        if (process && !process.killed) {
          console.log(`  Force killing ${name}...`);
          process.kill('SIGKILL');
        }
      });
    }, 5000);
  }

  /**
   * Print access information
   */
  printAccessInfo() {
    console.log(`
🌐 Development servers are running!

📱 Main Application:
   http://localhost:${this.ports.main}

📚 Documentation:
   http://localhost:${this.ports.docs}
   http://docs.localhost:${this.ports.main} (subdomain routing)

🔧 Local Subdomain Setup:
   Add this to your hosts file for subdomain testing:
   127.0.0.1 docs.localhost

📝 Available Commands:
   - Press Ctrl+C to stop all servers
   - Set VERBOSE=1 to see detailed logs
   - Use 'npm run dev:docs' as a shortcut

💡 Tips:
   - The main app will proxy docs.localhost requests to the docs site
   - Both servers support hot reloading
   - Check the console for any build errors
`);
  }

  /**
   * Sleep utility
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    console.log(`
🚀 Local Development with Docs Subdomain

Usage: node scripts/dev-with-docs.js [options]

Options:
  --help     Show this help message
  --verbose  Show detailed server logs

Environment Variables:
  VERBOSE=1  Enable verbose logging
  PORT=3000  Main app port (default: 3000)
  DOCS_PORT=3001  Docs port (default: 3001)

Examples:
  node scripts/dev-with-docs.js
  VERBOSE=1 node scripts/dev-with-docs.js
  npm run dev:docs
`);
    process.exit(0);
  }

  if (args.includes('--verbose')) {
    process.env.VERBOSE = '1';
  }

  const devServer = new LocalDevServer();
  devServer.start().catch(console.error);
}

module.exports = LocalDevServer;
