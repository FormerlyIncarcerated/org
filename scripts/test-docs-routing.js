#!/usr/bin/env node

/**
 * Test Docs Routing Script
 * 
 * This script tests the docs subdomain routing functionality
 * to ensure everything is working correctly.
 */

const http = require('http');
const https = require('https');

class DocsRoutingTester {
  constructor() {
    this.tests = [
      {
        name: 'Main app accessibility',
        url: 'http://localhost:3000',
        expectedStatus: 200,
        description: 'Main Next.js app should be accessible'
      },
      {
        name: 'Docs site direct access',
        url: 'http://localhost:3001',
        expectedStatus: 200,
        description: 'Docs site should be accessible directly'
      },
      {
        name: 'Docs subdomain routing',
        url: 'http://localhost:3000',
        headers: { 'Host': 'docs.localhost:3000' },
        expectedStatus: 200,
        description: 'docs.localhost should route to docs site'
      },
      {
        name: 'Docs path routing',
        url: 'http://localhost:3000/docs',
        expectedStatus: 200,
        description: '/docs path should route to docs site'
      }
    ];
  }

  /**
   * Run all tests
   */
  async runTests() {
    console.log('🧪 Testing docs routing functionality...\n');

    let passed = 0;
    let failed = 0;

    for (const test of this.tests) {
      try {
        const result = await this.runTest(test);
        if (result.success) {
          console.log(`✅ ${test.name}: PASSED`);
          if (result.details) {
            console.log(`   ${result.details}`);
          }
          passed++;
        } else {
          console.log(`❌ ${test.name}: FAILED`);
          console.log(`   ${result.error}`);
          failed++;
        }
      } catch (error) {
        console.log(`❌ ${test.name}: ERROR`);
        console.log(`   ${error.message}`);
        failed++;
      }
      console.log(''); // Empty line for readability
    }

    // Summary
    console.log('📊 Test Summary:');
    console.log(`   ✅ Passed: ${passed}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%\n`);

    if (failed > 0) {
      console.log('💡 Troubleshooting Tips:');
      console.log('   - Make sure both servers are running: npm run dev:docs');
      console.log('   - Check hosts file: npm run docs:hosts:check');
      console.log('   - Verify ports 3000 and 3001 are available');
      console.log('   - Clear DNS cache if subdomain test fails');
    } else {
      console.log('🎉 All tests passed! Docs routing is working correctly.');
    }

    return { passed, failed };
  }

  /**
   * Run a single test
   */
  async runTest(test) {
    return new Promise((resolve) => {
      const url = new URL(test.url);
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'User-Agent': 'DocsRoutingTester/1.0',
          ...test.headers
        },
        timeout: 5000
      };

      const client = url.protocol === 'https:' ? https : http;
      
      const req = client.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const success = res.statusCode === test.expectedStatus;
          const details = this.analyzeResponse(res, data, test);
          
          resolve({
            success,
            statusCode: res.statusCode,
            details: success ? details : null,
            error: success ? null : `Expected status ${test.expectedStatus}, got ${res.statusCode}`
          });
        });
      });

      req.on('error', (error) => {
        resolve({
          success: false,
          error: `Request failed: ${error.message}`
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          success: false,
          error: 'Request timed out'
        });
      });

      req.end();
    });
  }

  /**
   * Analyze response for additional details
   */
  analyzeResponse(res, data, test) {
    const details = [];

    // Check for specific content indicators
    if (data.includes('Docusaurus')) {
      details.push('Docusaurus site detected');
    } else if (data.includes('Next.js')) {
      details.push('Next.js app detected');
    }

    // Check for redirects
    if (res.headers.location) {
      details.push(`Redirected to: ${res.headers.location}`);
    }

    // Check content type
    if (res.headers['content-type']) {
      details.push(`Content-Type: ${res.headers['content-type']}`);
    }

    return details.join(', ');
  }

  /**
   * Check if servers are running
   */
  async checkServers() {
    console.log('🔍 Checking server status...\n');

    const servers = [
      { name: 'Main App', port: 3000 },
      { name: 'Docs Site', port: 3001 }
    ];

    for (const server of servers) {
      try {
        const result = await this.runTest({
          url: `http://localhost:${server.port}`,
          expectedStatus: 200
        });

        if (result.success) {
          console.log(`✅ ${server.name} (port ${server.port}): Running`);
        } else {
          console.log(`❌ ${server.name} (port ${server.port}): Not accessible`);
          console.log(`   ${result.error}`);
        }
      } catch (error) {
        console.log(`❌ ${server.name} (port ${server.port}): Error - ${error.message}`);
      }
    }
    console.log('');
  }

  /**
   * Print help information
   */
  printHelp() {
    console.log(`
🧪 Docs Routing Tester

Usage: node scripts/test-docs-routing.js [options]

Options:
  --help        Show this help message
  --check       Check server status only
  --verbose     Show detailed output

Examples:
  node scripts/test-docs-routing.js
  node scripts/test-docs-routing.js --check
  npm run test:docs-routing

Prerequisites:
  1. Both servers must be running: npm run dev:docs
  2. Hosts file configured: npm run docs:hosts
  3. Ports 3000 and 3001 available

Tests performed:
  ✓ Main app accessibility (localhost:3000)
  ✓ Docs site direct access (localhost:3001)
  ✓ Subdomain routing (docs.localhost:3000)
  ✓ Path routing (/docs)
`);
  }
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);
  const tester = new DocsRoutingTester();

  if (args.includes('--help')) {
    tester.printHelp();
    process.exit(0);
  }

  if (args.includes('--check')) {
    tester.checkServers().catch(console.error);
  } else {
    tester.runTests().catch(console.error);
  }
}

module.exports = DocsRoutingTester;
