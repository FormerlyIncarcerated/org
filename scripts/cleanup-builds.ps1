# FormerlyIncarcerated.org Build Cleanup Script (PowerShell)
# Cleans build directories and temporary files to ensure fresh builds

param(
    [switch]$Deep,
    [switch]$Quiet,
    [switch]$SetupScheduledTask,
    [switch]$SetupFileWatcher,
    [switch]$SetupAll,
    [switch]$Help
)

# Configuration
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$MainSiteDir = $ProjectRoot
$DocsSiteDir = Join-Path $ProjectRoot "docs-site"
$LogsDir = Join-Path $ProjectRoot "logs"
$LogFile = Join-Path $LogsDir "cleanup-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"

# Create logs directory if it doesn't exist
if (!(Test-Path $LogsDir)) {
    New-Item -ItemType Directory -Path $LogsDir -Force | Out-Null
}

# Logging functions
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    
    switch ($Level) {
        "SUCCESS" {
            if (!$Quiet) { Write-Host "✅ $logMessage" -ForegroundColor Green }
        }
        "WARNING" {
            if (!$Quiet) { Write-Host "⚠️  $logMessage" -ForegroundColor Yellow }
        }
        "ERROR" {
            if (!$Quiet) { Write-Host "❌ $logMessage" -ForegroundColor Red }
        }
        default {
            if (!$Quiet) { Write-Host "ℹ️  $logMessage" -ForegroundColor Blue }
        }
    }

    Add-Content -Path $LogFile -Value $logMessage
}
    
    Add-Content -Path $LogFile -Value $logMessage
}

# Function to clean directory safely
function Remove-DirectorySafely {
    param([string]$Path, [string]$Description)
    
    if (Test-Path $Path) {
        Write-Log "Cleaning $Description`: $Path"
        try {
            Remove-Item -Path $Path -Recurse -Force -ErrorAction Stop
            Write-Log "Cleaned $Description" "SUCCESS"
        }
        catch {
            Write-Log "Failed to clean $Description`: $($_.Exception.Message)" "ERROR"
        }
    }
    else {
        Write-Log "$Description directory not found: $Path" "WARNING"
    }
}

# Function to clean file safely
function Remove-FileSafely {
    param([string]$Path, [string]$Description)
    
    if (Test-Path $Path) {
        Write-Log "Removing $Description`: $Path"
        try {
            Remove-Item -Path $Path -Force -ErrorAction Stop
            Write-Log "Removed $Description" "SUCCESS"
        }
        catch {
            Write-Log "Failed to remove $Description`: $($_.Exception.Message)" "ERROR"
        }
    }
    else {
        Write-Log "$Description file not found: $Path" "WARNING"
    }
}

# Function to get directory size
function Get-DirectorySize {
    param([string]$Path)
    
    if (Test-Path $Path) {
        try {
            $size = (Get-ChildItem -Path $Path -Recurse -ErrorAction SilentlyContinue | 
                    Measure-Object -Property Length -Sum).Sum
            return [math]::Round($size / 1MB, 2).ToString() + " MB"
        }
        catch {
            return "0 MB"
        }
    }
    return "0 MB"
}

# Main cleanup function
function Start-BuildCleanup {
    Write-Log "🧹 Starting build cleanup process..."
    Write-Log "Project root: $ProjectRoot"
    
    # Calculate initial disk usage
    $initialMainSize = Get-DirectorySize (Join-Path $MainSiteDir ".next")
    $initialDocsSize = Get-DirectorySize (Join-Path $DocsSiteDir "build")
    $initialNodeModulesMain = Get-DirectorySize (Join-Path $MainSiteDir "node_modules")
    $initialNodeModulesDocs = Get-DirectorySize (Join-Path $DocsSiteDir "node_modules")
    
    Write-Log "Initial build sizes:"
    Write-Log "  Main site (.next): $initialMainSize"
    Write-Log "  Docs site (build): $initialDocsSize"
    Write-Log "  Main node_modules: $initialNodeModulesMain"
    Write-Log "  Docs node_modules: $initialNodeModulesDocs"
    
    # Clean main site build artifacts
    Write-Log "🏠 Cleaning main site build artifacts..."
    Remove-DirectorySafely (Join-Path $MainSiteDir ".next") "Next.js build directory"
    Remove-DirectorySafely (Join-Path $MainSiteDir "out") "Next.js export directory"
    Remove-DirectorySafely (Join-Path $MainSiteDir ".vercel") "Vercel build cache"
    Remove-DirectorySafely (Join-Path $MainSiteDir "dist") "Distribution directory"
    
    # Clean docs site build artifacts
    Write-Log "📚 Cleaning docs site build artifacts..."
    Remove-DirectorySafely (Join-Path $DocsSiteDir "build") "Docusaurus build directory"
    Remove-DirectorySafely (Join-Path $DocsSiteDir ".docusaurus") "Docusaurus cache directory"
    Remove-DirectorySafely (Join-Path $DocsSiteDir "dist") "Docs distribution directory"
    
    # Clean cache directories
    Write-Log "🗂️  Cleaning cache directories..."
    Remove-DirectorySafely (Join-Path $MainSiteDir ".cache") "Main site cache"
    Remove-DirectorySafely (Join-Path $DocsSiteDir ".cache") "Docs site cache"
    Remove-DirectorySafely (Join-Path $ProjectRoot ".turbo") "Turbo cache"
    Remove-DirectorySafely (Join-Path $ProjectRoot ".nx") "NX cache"
    
    # Clean temporary files
    Write-Log "🗑️  Cleaning temporary files..."
    Remove-FileSafely (Join-Path $MainSiteDir ".env.local") "Local environment file"
    Remove-FileSafely (Join-Path $DocsSiteDir ".env.local") "Docs local environment file"
    
    # Clean old log files (older than 7 days)
    Write-Log "📝 Cleaning old log files..."
    try {
        Get-ChildItem -Path $LogsDir -Filter "*.log" | 
        Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } | 
        Remove-Item -Force
        Write-Log "Cleaned old log files" "SUCCESS"
    }
    catch {
        Write-Log "Failed to clean old log files: $($_.Exception.Message)" "WARNING"
    }
    
    # Clean package manager caches
    Write-Log "📦 Cleaning package manager caches..."
    
    # Clear bun cache
    if (Get-Command bun -ErrorAction SilentlyContinue) {
        try {
            & bun pm cache rm 2>$null
            Write-Log "Cleared bun cache" "SUCCESS"
        }
        catch {
            Write-Log "Failed to clear bun cache" "WARNING"
        }
    }
    
    # Clear npm cache
    if (Get-Command npm -ErrorAction SilentlyContinue) {
        try {
            & npm cache clean --force 2>$null
            Write-Log "Cleared npm cache" "SUCCESS"
        }
        catch {
            Write-Log "Failed to clear npm cache" "WARNING"
        }
    }
    
    # Clear yarn cache
    if (Get-Command yarn -ErrorAction SilentlyContinue) {
        try {
            & yarn cache clean 2>$null
            Write-Log "Cleared yarn cache" "SUCCESS"
        }
        catch {
            Write-Log "Failed to clear yarn cache" "WARNING"
        }
    }
    
    # Deep cleaning (node_modules)
    if ($Deep) {
        Write-Log "🔥 Deep cleaning: Removing node_modules..."
        Remove-DirectorySafely (Join-Path $MainSiteDir "node_modules") "Main site node_modules"
        Remove-DirectorySafely (Join-Path $DocsSiteDir "node_modules") "Docs site node_modules"
        
        # Reinstall dependencies
        Write-Log "📦 Reinstalling dependencies..."
        
        # Main site
        Set-Location $MainSiteDir
        if (Get-Command bun -ErrorAction SilentlyContinue) {
            & bun install
        }
        else {
            & npm install
        }
        
        # Docs site
        Set-Location $DocsSiteDir
        & npm install
        
        Set-Location $ProjectRoot
        Write-Log "Dependencies reinstalled" "SUCCESS"
    }
    
    # Calculate final disk usage
    $finalMainSize = Get-DirectorySize (Join-Path $MainSiteDir ".next")
    $finalDocsSize = Get-DirectorySize (Join-Path $DocsSiteDir "build")
    
    Write-Log "Final build sizes:"
    Write-Log "  Main site (.next): $finalMainSize"
    Write-Log "  Docs site (build): $finalDocsSize"
    
    Write-Log "🎉 Build cleanup completed successfully!" "SUCCESS"
    Write-Log "Cleanup log saved to: $LogFile"
}

# Function to setup scheduled task
function Set-ScheduledTask {
    Write-Log "⏰ Setting up scheduled task for automatic cleanup..."
    
    $taskName = "FormerlyIncarcerated-BuildCleanup"
    $scriptPath = Join-Path $PSScriptRoot "cleanup-builds.ps1"
    
    # Create scheduled task action
    $action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File `"$scriptPath`" -Quiet"
    
    # Create scheduled task trigger (daily at 2 AM)
    $trigger = New-ScheduledTaskTrigger -Daily -At "2:00 AM"
    
    # Create scheduled task settings
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
    
    # Register the scheduled task
    try {
        Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Force
        Write-Log "Scheduled task '$taskName' created successfully (runs daily at 2 AM)" "SUCCESS"
    }
    catch {
        Write-Log "Failed to create scheduled task: $($_.Exception.Message)" "ERROR"
    }
}

# Function to setup file watcher
function Set-FileWatcher {
    Write-Log "👀 Setting up file watcher for automatic cleanup..."
    
    $watcherScript = Join-Path $PSScriptRoot "watch-cleanup.ps1"
    
    $watcherContent = @"
# File watcher for automatic cleanup on changes
`$ProjectRoot = "$ProjectRoot"
`$CleanupScript = "$PSScriptRoot\cleanup-builds.ps1"

# Create file system watcher
`$watcher = New-Object System.IO.FileSystemWatcher
`$watcher.Path = `$ProjectRoot
`$watcher.IncludeSubdirectories = `$true
`$watcher.Filter = "*.*"
`$watcher.EnableRaisingEvents = `$true

# Define the action to take when a file changes
`$action = {
    `$path = `$Event.SourceEventArgs.FullPath
    `$changeType = `$Event.SourceEventArgs.ChangeType
    `$fileName = Split-Path `$path -Leaf
    
    # Only trigger on source files
    if (`$fileName -match '\.(ts|tsx|js|jsx|md|json|css|scss)$') {
        Write-Host "`$(Get-Date): File `$changeType`: `$path"
        
        # Debounce: wait 5 seconds for more changes
        Start-Sleep -Seconds 5
        
        # Run cleanup
        & `$CleanupScript -Quiet
    }
}

# Register event handlers
Register-ObjectEvent -InputObject `$watcher -EventName "Created" -Action `$action
Register-ObjectEvent -InputObject `$watcher -EventName "Changed" -Action `$action
Register-ObjectEvent -InputObject `$watcher -EventName "Deleted" -Action `$action

Write-Host "File watcher started. Press Ctrl+C to stop."

try {
    while (`$true) {
        Start-Sleep -Seconds 1
    }
}
finally {
    `$watcher.Dispose()
}
"@
    
    Set-Content -Path $watcherScript -Value $watcherContent
    Write-Log "File watcher script created: $watcherScript" "SUCCESS"
    Write-Log "To start watching: PowerShell -File `"$watcherScript`""
}

# Help function
function Show-Help {
    Write-Host "FormerlyIncarcerated.org Build Cleanup Script (PowerShell)"
    Write-Host ""
    Write-Host "Usage: .\cleanup-builds.ps1 [OPTIONS]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -Deep                Deep clean including node_modules"
    Write-Host "  -Quiet               Suppress verbose output"
    Write-Host "  -SetupScheduledTask  Setup Windows scheduled task for daily cleanup"
    Write-Host "  -SetupFileWatcher    Setup file watcher for real-time cleanup"
    Write-Host "  -SetupAll            Setup all automation features"
    Write-Host "  -Help                Show this help message"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  .\cleanup-builds.ps1                    # Basic cleanup"
    Write-Host "  .\cleanup-builds.ps1 -Deep              # Deep cleanup with node_modules"
    Write-Host "  .\cleanup-builds.ps1 -SetupAll          # Setup all automation"
}

# Main execution
if ($Help) {
    Show-Help
    exit
}

if ($SetupAll) {
    Set-ScheduledTask
    Set-FileWatcher
    Write-Log "🎉 All automation features setup completed!" "SUCCESS"
    exit
}

if ($SetupScheduledTask) {
    Set-ScheduledTask
    exit
}

if ($SetupFileWatcher) {
    Set-FileWatcher
    exit
}

# Run cleanup
Start-BuildCleanup
