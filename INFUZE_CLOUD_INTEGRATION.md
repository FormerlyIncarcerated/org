# ☁️ Infuze Cloud Integration

**CI/CD Pipeline and Deployment Integration for FormerlyIncarcerated.org**

---

## 🏗️ Infrastructure Overview

### **Current Setup**
- **VM Instance**: formerlyincarcerated (ID: 106)
- **IP Address**: 194.31.143.6
- **IPv6**: 2a11:29c0:4f50:5::10
- **Resources**: 1 core, 4GB RAM, 50GB storage
- **Cost**: $10.00/month
- **OS**: Ubuntu 24.04

### **Domains**
- **Primary**: https://formerlyincarcerated.org
- **Documentation**: https://docs.formerlyincarcerated.org

---

## 🚀 CI/CD Pipeline

### **GitHub Actions Workflow**
The CI/CD pipeline is configured in `.github/workflows/infuze-cicd.yml` with the following stages:

#### **1. Build & Test** 🔨
- Code checkout and dependency installation
- Linting and type checking
- Unit and integration tests
- Application builds (main + docs)
- Artifact upload for deployment

#### **2. Security Scan** 🛡️
- NPM security audit
- Dependency vulnerability check
- Code quality analysis

#### **3. Production Deployment** 🚀
- Artifact download
- Infuze CLI authentication
- VM status verification
- SSH deployment to production server
- Service restart and verification

#### **4. Post-Deployment Monitoring** 📊
- Health checks for both domains
- Performance monitoring
- Resource usage tracking
- Notification dispatch

---

## 🔧 Deployment Scripts

### **Main Deployment Script**
```bash
# Full deployment
npm run infuze:deploy

# Check VM status
npm run infuze:check

# Verify deployment
npm run infuze:verify

# Monitor resources
npm run infuze:monitor
```

### **Manual Deployment**
```bash
# Using the deployment script directly
node scripts/infuze-deploy.js

# Or using the traditional SSH method
bash scripts/deploy-production.sh
```

---

## ⚙️ Configuration

### **Environment Variables**
Required environment variables for CI/CD:

```env
# Infuze Cloud Configuration
INFUZE_API_KEY=fdac2216acffddd6135b6a56858c6dda1ac961641e14c3efdd11da8ec13b27b0
INFUZE_VM_ID=106
INFUZE_VM_IP=194.31.143.6
INFUZE_VM_NAME=formerlyincarcerated

# Deployment Configuration
PRODUCTION_DOMAIN=formerlyincarcerated.org
DOCS_DOMAIN=docs.formerlyincarcerated.org
DEPLOY_USER=deploy

# SSH Configuration (for GitHub Actions)
DEPLOY_SSH_KEY=<private_ssh_key_content>

# Notification Configuration (optional)
NOTIFICATION_EMAIL=admin@formerlyincarcerated.org
SLACK_WEBHOOK_URL=<slack_webhook_url>
DISCORD_WEBHOOK_URL=<discord_webhook_url>
```

### **Infuze Configuration File**
The `infuze.config.js` file contains comprehensive configuration for:
- VM specifications and settings
- Domain and SSL configuration
- Deployment paths and commands
- Monitoring and health checks
- Security and backup settings
- CI/CD pipeline configuration

---

## 🔐 Security Setup

### **GitHub Secrets**
Configure these secrets in your GitHub repository:

1. **INFUZE_API_KEY**: Your Infuze Cloud API key
2. **DEPLOY_SSH_KEY**: Private SSH key for server access
3. **NOTIFICATION_EMAIL**: Email for deployment notifications

### **SSH Key Management**
```bash
# Generate SSH key pair (if needed)
ssh-keygen -t rsa -b 4096 -C "deploy@formerlyincarcerated.org"

# Add public key to server
ssh-copy-id deploy@194.31.143.6

# Add private key to GitHub Secrets
cat ~/.ssh/id_rsa | pbcopy  # Copy to clipboard
```

---

## 📊 Monitoring & Health Checks

### **Automated Monitoring**
The pipeline includes automated monitoring for:

- **Website Availability**: HTTP status checks
- **Response Times**: Performance monitoring
- **SSL Certificate Status**: Certificate validation
- **Resource Usage**: CPU, memory, disk usage
- **Service Status**: Nginx, PM2, application health

### **Health Check Endpoints**
- **Main Site**: https://formerlyincarcerated.org
- **Documentation**: https://docs.formerlyincarcerated.org
- **API Health**: https://formerlyincarcerated.org/api/health (if implemented)

### **Notification Channels**
- **GitHub**: Commit comments with deployment status
- **Email**: Deployment success/failure notifications
- **Slack/Discord**: Real-time deployment updates (optional)

---

## 🔄 Deployment Workflow

### **Automatic Deployment**
1. **Push to master** → Triggers CI/CD pipeline
2. **Build & Test** → Ensures code quality
3. **Security Scan** → Validates dependencies
4. **Deploy** → Updates production server
5. **Verify** → Confirms deployment success
6. **Monitor** → Tracks post-deployment health

### **Manual Deployment**
```bash
# Quick deployment
npm run infuze:deploy

# Step-by-step deployment
npm run infuze:check     # Check VM status
npm run build            # Build locally
npm run infuze:deploy    # Deploy to server
npm run infuze:verify    # Verify deployment
npm run infuze:monitor   # Check resources
```

---

## 🛠️ Troubleshooting

### **Common Issues**

#### **Authentication Failures**
```bash
# Check API key
echo $INFUZE_API_KEY

# Re-authenticate
infuze login

# Verify authentication
infuze balance
```

#### **Deployment Failures**
```bash
# Check VM status
npm run infuze:check

# Check server logs
ssh deploy@194.31.143.6 'sudo tail -f /var/log/nginx/error.log'

# Manual deployment
ssh deploy@194.31.143.6
cd /home/deploy/formerlyincarcerated
git pull origin master
bash scripts/deploy-production.sh
```

#### **Build Failures**
```bash
# Clear cache and rebuild
npm run clean:deep
npm install
npm run build

# Check for dependency issues
npm audit
npm audit fix
```

### **Rollback Procedures**
```bash
# SSH to server
ssh deploy@194.31.143.6

# Restore from backup
sudo cp -r /var/www/backups/formerlyincarcerated.org_TIMESTAMP/* /var/www/formerlyincarcerated.org/

# Restart services
sudo systemctl restart nginx
pm2 restart all
```

---

## 📈 Performance Optimization

### **Resource Monitoring**
- **CPU Usage**: Target < 80%
- **Memory Usage**: Target < 85%
- **Disk Usage**: Target < 90%
- **Response Time**: Target < 3 seconds

### **Scaling Options**
If performance issues arise:

1. **Vertical Scaling**: Upgrade VM resources via Infuze dashboard
2. **Horizontal Scaling**: Deploy additional VMs with load balancing
3. **CDN Integration**: Implement content delivery network
4. **Database Optimization**: Optimize queries and indexing

---

## 🔮 Future Enhancements

### **Planned Improvements**
- **Multi-environment Support**: Staging and development environments
- **Blue-Green Deployments**: Zero-downtime deployments
- **Container Integration**: Docker containerization
- **Load Balancing**: Multiple VM instances
- **Database Clustering**: High availability database setup
- **Advanced Monitoring**: Prometheus/Grafana integration

### **Integration Opportunities**
- **Backup Automation**: Automated daily backups
- **Log Aggregation**: Centralized logging system
- **Performance Analytics**: Real-time performance monitoring
- **Security Scanning**: Automated vulnerability assessments

---

## 📞 Support & Resources

### **Infuze Cloud Resources**
- **Dashboard**: https://infuze.cloud/dashboard
- **Documentation**: https://infuze.cloud/help
- **Support**: https://infuze.cloud/support
- **Status Page**: https://infuze.cloud/status

### **CLI Commands Reference**
```bash
# VM Management
infuze vms                    # List all VMs
infuze vm info <id>          # Get VM details
infuze vm start <id>         # Start VM
infuze vm stop <id>          # Stop VM
infuze vm restart <id>       # Restart VM

# Account Management
infuze balance               # Check wallet balance
infuze templates             # List available templates
infuze login                 # Authenticate CLI
infuze logout                # Logout

# Deployment
npm run infuze:deploy        # Full deployment
npm run infuze:check         # Status check
npm run infuze:verify        # Verify deployment
npm run infuze:monitor       # Resource monitoring
```

---

## 🎯 Quick Start

### **1. Setup Environment**
```bash
# Install Infuze CLI
npm install -g infuze

# Set API key
export INFUZE_API_KEY=fdac2216acffddd6135b6a56858c6dda1ac961641e14c3efdd11da8ec13b27b0

# Authenticate
infuze login
```

### **2. Deploy to Production**
```bash
# Clone repository
git clone https://github.com/4eckd/formerlyincarcerated.git
cd formerlyincarcerated

# Install dependencies
npm install

# Deploy
npm run infuze:deploy
```

### **3. Verify Deployment**
```bash
# Check deployment
npm run infuze:verify

# Monitor resources
npm run infuze:monitor

# Test websites
curl -I https://formerlyincarcerated.org
curl -I https://docs.formerlyincarcerated.org
```

---

**🎉 Your Infuze Cloud CI/CD pipeline is now ready for automated deployments!**

*Last Updated: June 25, 2025*
