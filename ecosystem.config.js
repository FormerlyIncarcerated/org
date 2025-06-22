/**
 * PM2 Ecosystem Configuration for FormerlyIncarcerated.org
 * 
 * This configuration file defines how PM2 should manage the application
 * processes in different environments (development, staging, production).
 * 
 * Usage:
 * - Development: pm2 start ecosystem.config.js --env development
 * - Production: pm2 start ecosystem.config.js --env production
 * - Staging: pm2 start ecosystem.config.js --env staging
 */

module.exports = {
  apps: [
    {
      // Main Next.js application
      name: 'formerlyincarcerated-org',
      script: 'bun',
      args: 'run start',
      cwd: './',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
      
      // Environment variables
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1,
      },
      
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1,
      },
      
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1,
      },
      
      // Logging configuration
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Process management
      autorestart: true,
      watch: false, // Disable in production
      max_memory_restart: '1G',
      restart_delay: 4000,
      
      // Health monitoring
      min_uptime: '10s',
      max_restarts: 10,
      
      // Advanced settings
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Source map support
      source_map_support: true,
      
      // Merge logs from all instances
      merge_logs: true,
      
      // Time zone
      time: true,
    },
    
    {
      // Documentation site (Docusaurus)
      name: 'docs-formerlyincarcerated-org',
      script: 'bun',
      args: 'run serve',
      cwd: './docs-site',
      instances: 1, // Single instance for docs
      exec_mode: 'fork',
      
      // Environment variables
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
      },
      
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3001,
      },
      
      // Logging configuration
      log_file: './docs-site/logs/combined.log',
      out_file: './docs-site/logs/out.log',
      error_file: './docs-site/logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Process management
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      restart_delay: 4000,
      
      // Health monitoring
      min_uptime: '10s',
      max_restarts: 10,
      
      // Advanced settings
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Time zone
      time: true,
    }
  ],

  // Deployment configuration
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-production-server.com'],
      ref: 'origin/main',
      repo: 'git@github.com:formerly-incarcerated/platform.git',
      path: '/var/www/formerlyincarcerated.org',
      'pre-deploy-local': '',
      'post-deploy': 'bun install && bun run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'StrictHostKeyChecking=no'
    },
    
    staging: {
      user: 'deploy',
      host: ['your-staging-server.com'],
      ref: 'origin/develop',
      repo: 'git@github.com:formerly-incarcerated-empowerment/platform.git',
      path: '/var/www/staging.formerlyincarcerated.org',
      'pre-deploy-local': '',
      'post-deploy': 'bun install && bun run build && pm2 reload ecosystem.config.js --env staging',
      'pre-setup': '',
      'ssh_options': 'StrictHostKeyChecking=no'
    }
  }
};

/**
 * PM2 Commands Reference:
 * 
 * Start applications:
 * pm2 start ecosystem.config.js --env production
 * 
 * Restart applications:
 * pm2 restart ecosystem.config.js
 * 
 * Stop applications:
 * pm2 stop ecosystem.config.js
 * 
 * Delete applications:
 * pm2 delete ecosystem.config.js
 * 
 * Monitor applications:
 * pm2 monit
 * 
 * View logs:
 * pm2 logs
 * pm2 logs formerlyincarcerated-org
 * pm2 logs docs-formerlyincarcerated-org
 * 
 * Reload applications (zero-downtime):
 * pm2 reload ecosystem.config.js
 * 
 * Show application status:
 * pm2 status
 * 
 * Save PM2 configuration:
 * pm2 save
 * 
 * Resurrect saved configuration:
 * pm2 resurrect
 * 
 * Setup startup script:
 * pm2 startup
 * 
 * Deploy to production:
 * pm2 deploy ecosystem.config.js production
 * 
 * Deploy to staging:
 * pm2 deploy ecosystem.config.js staging
 */
