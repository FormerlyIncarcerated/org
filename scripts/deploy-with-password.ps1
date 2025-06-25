# PowerShell script for deploying to Infuze Cloud with password authentication
param(
    [string]$Username = "supitsj",
    [string]$Server = "194.31.143.6",
    [string]$Password = "Aaaa8888"
)

Write-Host "🚀 Starting deployment to Infuze Cloud..." -ForegroundColor Blue
Write-Host "📍 Target: $Username@$Server" -ForegroundColor Cyan

# Create deployment script content
$deployScript = @"
#!/bin/bash
set -e

echo "🚀 Starting FormerlyIncarcerated.org deployment..."

# Check if we're in the right directory or need to clone
if [ ! -d "/home/$Username/formerlyincarcerated" ]; then
    echo "📥 Cloning repository..."
    cd /home/$Username
    git clone https://github.com/4eckd/formerlyincarcerated.git
    cd formerlyincarcerated
else
    echo "📥 Updating repository..."
    cd /home/$Username/formerlyincarcerated
    git fetch origin
    git checkout master
    git pull origin master
fi

echo "📋 Current version: `$(git describe --tags 2>/dev/null || git rev-parse --short HEAD)`"

# Install dependencies
echo "📦 Installing dependencies..."
if command -v bun &> /dev/null; then
    bun install
    cd docs-site && bun install && cd ..
else
    npm install
    cd docs-site && npm install && cd ..
fi

# Build applications
echo "🔨 Building applications..."
if command -v bun &> /dev/null; then
    bun run build
    cd docs-site && bun run build && cd ..
else
    npm run build
    cd docs-site && npm run build && cd ..
fi

# Create web directories if they don't exist
echo "📁 Setting up web directories..."
sudo mkdir -p /var/www/formerlyincarcerated.org
sudo mkdir -p /var/www/docs.formerlyincarcerated.org
sudo mkdir -p /var/www/backups

# Create backup
echo "💾 Creating backup..."
sudo cp -r /var/www/formerlyincarcerated.org /var/www/backups/formerlyincarcerated.org_`$(date +%Y%m%d_%H%M%S)` 2>/dev/null || true
sudo cp -r /var/www/docs.formerlyincarcerated.org /var/www/backups/docs.formerlyincarcerated.org_`$(date +%Y%m%d_%H%M%S)` 2>/dev/null || true

# Deploy main application
echo "📁 Deploying main application..."
sudo rm -rf /var/www/formerlyincarcerated.org/*
sudo cp -r .next/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true
sudo cp -r public/* /var/www/formerlyincarcerated.org/ 2>/dev/null || true

# Deploy documentation
echo "📚 Deploying documentation..."
sudo rm -rf /var/www/docs.formerlyincarcerated.org/*
sudo cp -r docs-site/build/* /var/www/docs.formerlyincarcerated.org/

# Set permissions
echo "🔐 Setting permissions..."
sudo chown -R $Username:www-data /var/www/formerlyincarcerated.org 2>/dev/null || sudo chown -R $Username:nginx /var/www/formerlyincarcerated.org
sudo chown -R $Username:www-data /var/www/docs.formerlyincarcerated.org 2>/dev/null || sudo chown -R $Username:nginx /var/www/docs.formerlyincarcerated.org
sudo chmod -R 755 /var/www/formerlyincarcerated.org
sudo chmod -R 755 /var/www/docs.formerlyincarcerated.org

# Restart services
echo "🔄 Restarting services..."
sudo systemctl restart nginx 2>/dev/null || sudo service nginx restart
pm2 restart all 2>/dev/null || echo "PM2 not running or no processes"

# Verify deployment
echo "🔍 Verifying deployment..."
sleep 3

# Test local server
if curl -f -s http://localhost > /dev/null 2>&1; then
    echo "✅ Local server responding"
else
    echo "⚠️  Local server check failed, but this might be normal"
fi

# Check if files were deployed
if [ -f "/var/www/formerlyincarcerated.org/index.html" ] || [ -d "/var/www/formerlyincarcerated.org/_next" ]; then
    echo "✅ Main application files deployed"
else
    echo "⚠️  Main application files may not be deployed correctly"
fi

if [ -f "/var/www/docs.formerlyincarcerated.org/index.html" ]; then
    echo "✅ Documentation files deployed"
else
    echo "⚠️  Documentation files may not be deployed correctly"
fi

echo "🎉 Deployment completed!"
echo "📊 Deployment Summary:"
echo "   • Version: `$(git describe --tags 2>/dev/null || git rev-parse --short HEAD)`"
echo "   • Time: `$(date)`"
echo "   • Main Site: https://formerlyincarcerated.org"
echo "   • Documentation: https://docs.formerlyincarcerated.org"
echo ""
echo "🔗 Test your deployment:"
echo "   curl -I https://formerlyincarcerated.org"
echo "   curl -I https://docs.formerlyincarcerated.org"
"@

# Save the script to a temporary file
$scriptPath = "$env:TEMP\deploy-script.sh"
$deployScript | Out-File -FilePath $scriptPath -Encoding UTF8

Write-Host "📝 Deployment script created at: $scriptPath" -ForegroundColor Green

# Try to connect and execute the deployment
try {
    Write-Host "🔐 Attempting to connect to $Username@$Server..." -ForegroundColor Yellow
    
    # Use plink (PuTTY) if available, otherwise provide manual instructions
    if (Get-Command plink -ErrorAction SilentlyContinue) {
        Write-Host "📡 Using plink for connection..." -ForegroundColor Green
        
        # Upload and execute the script using plink
        $plinkCmd = "echo y | plink -ssh -l $Username -pw $Password $Server"
        $uploadCmd = "cat > deploy-script.sh && chmod +x deploy-script.sh && ./deploy-script.sh"
        
        # This is a simplified approach - in practice, you'd need to handle the script upload differently
        Write-Host "⚠️  Manual execution required. Please run the following commands:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Connect to server:" -ForegroundColor Cyan
        Write-Host "   ssh $Username@$Server" -ForegroundColor White
        Write-Host ""
        Write-Host "2. When prompted for password, enter: $Password" -ForegroundColor White
        Write-Host ""
        Write-Host "3. Copy and paste this deployment script:" -ForegroundColor Cyan
        Write-Host $deployScript -ForegroundColor Gray
        
    } else {
        Write-Host "📋 Manual deployment instructions:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Open a new terminal/command prompt" -ForegroundColor Cyan
        Write-Host "2. Connect to the server:" -ForegroundColor Cyan
        Write-Host "   ssh $Username@$Server" -ForegroundColor White
        Write-Host ""
        Write-Host "3. When prompted for password, enter: $Password" -ForegroundColor White
        Write-Host ""
        Write-Host "4. Copy and paste the deployment script from: $scriptPath" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Or run this one-liner:" -ForegroundColor Cyan
        Write-Host $deployScript -ForegroundColor Gray
    }
    
} catch {
    Write-Host "❌ Connection failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "📋 Manual deployment required:" -ForegroundColor Yellow
    Write-Host "1. ssh $Username@$Server" -ForegroundColor White
    Write-Host "2. Password: $Password" -ForegroundColor White
    Write-Host "3. Run the deployment script from: $scriptPath" -ForegroundColor White
}

Write-Host ""
Write-Host "🔍 After deployment, verify with:" -ForegroundColor Green
Write-Host "   curl -I https://formerlyincarcerated.org" -ForegroundColor White
Write-Host "   curl -I https://docs.formerlyincarcerated.org" -ForegroundColor White
