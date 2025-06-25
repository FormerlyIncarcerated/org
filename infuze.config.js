/**
 * Infuze Cloud Configuration
 * 
 * Configuration file for Infuze Cloud deployment and management
 * for FormerlyIncarcerated.org platform
 */

module.exports = {
  // VM Configuration
  vm: {
    id: process.env.INFUZE_VM_ID || '106',
    name: process.env.INFUZE_VM_NAME || 'formerlyincarcerated',
    ip: process.env.INFUZE_VM_IP || '194.31.143.6',
    ipv6: process.env.INFUZE_VM_IPV6 || '2a11:29c0:4f50:5::10',
    
    // Resource specifications
    specs: {
      cores: 1,
      memory: '4GB',
      storage: '50GB',
      monthlyCost: '$10.00'
    },
    
    // Operating system
    os: {
      distribution: 'Ubuntu',
      version: '24.04',
      template: 'ubuntu-2404'
    }
  },

  // Domain Configuration
  domains: {
    primary: process.env.PRODUCTION_DOMAIN || 'formerlyincarcerated.org',
    docs: process.env.DOCS_DOMAIN || 'docs.formerlyincarcerated.org',
    
    // SSL Configuration
    ssl: {
      provider: 'letsencrypt',
      autoRenew: true,
      certPath: '/etc/letsencrypt/live',
    }
  },

  // Deployment Configuration
  deployment: {
    user: process.env.INFUZE_VM_USERNAME || 'root',
    password: process.env.INFUZE_VM_PASSWORD || '9ijn*UHB',
    
    // Paths on the server
    paths: {
      app: '/var/www/formerlyincarcerated.org',
      docs: '/var/www/docs.formerlyincarcerated.org',
      repository: '/root/formerlyincarcerated',
      backups: '/var/www/backups',
      logs: '/var/log/formerlyincarcerated'
    },
    
    // Services to restart after deployment
    services: [
      'nginx',
      'pm2'
    ],
    
    // Build commands
    build: {
      install: 'bun install',
      build: 'bun run build',
      test: 'bun run test:ci',
      lint: 'bun run lint'
    }
  },

  // Monitoring Configuration
  monitoring: {
    healthChecks: [
      {
        name: 'Main Site',
        url: 'https://formerlyincarcerated.org',
        expectedStatus: 200,
        timeout: 10000
      },
      {
        name: 'Documentation',
        url: 'https://docs.formerlyincarcerated.org',
        expectedStatus: 200,
        timeout: 10000
      },
      {
        name: 'API Health',
        url: 'https://formerlyincarcerated.org/api/health',
        expectedStatus: 200,
        timeout: 5000
      }
    ],
    
    // Performance thresholds
    performance: {
      maxResponseTime: 3000, // 3 seconds
      minUptime: 99.9, // 99.9%
      maxCpuUsage: 80, // 80%
      maxMemoryUsage: 85 // 85%
    },
    
    // Notification settings
    notifications: {
      email: process.env.NOTIFICATION_EMAIL,
      slack: process.env.SLACK_WEBHOOK_URL,
      discord: process.env.DISCORD_WEBHOOK_URL
    }
  },

  // Security Configuration
  security: {
    // SSH Configuration
    ssh: {
      keyPath: process.env.SSH_KEY_PATH || '~/.ssh/id_rsa',
      port: 22,
      strictHostKeyChecking: false
    },
    
    // Firewall rules
    firewall: {
      allowedPorts: [22, 80, 443],
      allowedIPs: [], // Empty means allow all
      rateLimiting: true
    },
    
    // Backup configuration
    backup: {
      enabled: true,
      frequency: 'daily',
      retention: 7, // days
      destinations: ['local', 'cloud']
    }
  },

  // CI/CD Configuration
  cicd: {
    // GitHub Actions
    github: {
      repository: 'FormerlyIncarcerated/org',
      branch: 'master',
      
      // Required secrets
      secrets: [
        'INFUZE_API_KEY',
        'DEPLOY_SSH_KEY',
        'NOTIFICATION_EMAIL'
      ]
    },
    
    // Deployment stages
    stages: {
      development: {
        branch: 'develop',
        autoDeploy: true,
        runTests: true
      },
      staging: {
        branch: 'staging',
        autoDeploy: true,
        runTests: true,
        requireApproval: false
      },
      production: {
        branch: 'master',
        autoDeploy: true,
        runTests: true,
        requireApproval: true
      }
    },
    
    // Rollback configuration
    rollback: {
      enabled: true,
      maxVersions: 5,
      autoRollbackOnFailure: true
    }
  },

  // Infuze Cloud API Configuration
  api: {
    baseUrl: process.env.INFUZE_API_URL || 'https://infuze.cloud/api',
    timeout: 30000,
    retries: 3,
    
    // Rate limiting
    rateLimit: {
      requests: 100,
      window: 60000 // 1 minute
    }
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json',
    
    // Log destinations
    destinations: [
      {
        type: 'file',
        path: '/var/log/formerlyincarcerated/app.log',
        maxSize: '10MB',
        maxFiles: 5
      },
      {
        type: 'console',
        colorize: true
      }
    ]
  },

  // Environment-specific overrides
  environments: {
    development: {
      domains: {
        primary: 'localhost:3000',
        docs: 'localhost:3001'
      },
      monitoring: {
        enabled: false
      }
    },
    
    staging: {
      domains: {
        primary: 'staging.formerlyincarcerated.org',
        docs: 'docs-staging.formerlyincarcerated.org'
      },
      vm: {
        id: 'staging-vm-id'
      }
    },
    
    production: {
      // Use default configuration
    }
  }
};

// Helper function to get environment-specific config
function getConfig(environment = process.env.NODE_ENV || 'development') {
  const baseConfig = module.exports;
  const envConfig = baseConfig.environments[environment] || {};
  
  // Deep merge environment config with base config
  return mergeDeep(baseConfig, envConfig);
}

// Deep merge utility function
function mergeDeep(target, source) {
  const output = Object.assign({}, target);
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

module.exports.getConfig = getConfig;
