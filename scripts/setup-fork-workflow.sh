#!/bin/bash

# FormerlyIncarcerated.org Fork and Upstream Contribution Setup
# This script helps set up the fork workflow for contributing to the organization

set -e

echo "🍴 Setting up Fork Workflow for FormerlyIncarcerated.org"
echo "========================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
UPSTREAM_ORG="FormerlyIncarcerated"
FORK_OWNER="4eckd"  # Your GitHub username
REPOSITORIES=("whitepaper" "roadmap" ".github")

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is not installed${NC}"
    echo "Please install GitHub CLI: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ Not authenticated with GitHub CLI${NC}"
    echo "Please run: gh auth login"
    exit 1
fi

echo -e "${GREEN}✅ GitHub CLI is installed and authenticated${NC}"

# Function to fork a repository
fork_repository() {
    local repo_name=$1
    local upstream_url="https://github.com/$UPSTREAM_ORG/$repo_name"
    local fork_url="https://github.com/$FORK_OWNER/$repo_name"
    
    echo -e "${BLUE}🍴 Forking $repo_name...${NC}"
    
    # Check if fork already exists
    if gh repo view "$FORK_OWNER/$repo_name" &> /dev/null; then
        echo -e "${YELLOW}⚠️ Fork already exists: $fork_url${NC}"
    else
        # Fork the repository
        gh repo fork "$upstream_url" --clone=false
        echo -e "${GREEN}✅ Forked: $upstream_url → $fork_url${NC}"
    fi
    
    # Clone the fork locally if it doesn't exist
    if [ ! -d "$repo_name" ]; then
        echo -e "${BLUE}📥 Cloning fork locally...${NC}"
        gh repo clone "$FORK_OWNER/$repo_name"
        
        # Set up upstream remote
        cd "$repo_name"
        git remote add upstream "$upstream_url"
        git remote -v
        cd ..
        
        echo -e "${GREEN}✅ Local clone set up with upstream remote${NC}"
    else
        echo -e "${YELLOW}⚠️ Local directory already exists: $repo_name${NC}"
    fi
}

# Function to set up contribution branch
setup_contribution_branch() {
    local repo_name=$1
    local branch_name="feat/community-discussions-infrastructure"
    
    echo -e "${BLUE}🌿 Setting up contribution branch in $repo_name...${NC}"
    
    cd "$repo_name"
    
    # Fetch latest from upstream
    git fetch upstream
    git checkout main || git checkout master
    git merge upstream/main || git merge upstream/master
    
    # Create and switch to contribution branch
    if git branch | grep -q "$branch_name"; then
        echo -e "${YELLOW}⚠️ Branch already exists: $branch_name${NC}"
        git checkout "$branch_name"
    else
        git checkout -b "$branch_name"
        echo -e "${GREEN}✅ Created branch: $branch_name${NC}"
    fi
    
    cd ..
}

# Main execution
echo -e "${YELLOW}📋 Repositories to fork:${NC}"
for repo in "${REPOSITORIES[@]}"; do
    echo "  - $UPSTREAM_ORG/$repo"
done

echo ""
read -p "Continue with forking? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

# Fork each repository
for repo in "${REPOSITORIES[@]}"; do
    fork_repository "$repo"
    echo ""
done

# Set up contribution branches
echo -e "${YELLOW}🌿 Setting up contribution branches...${NC}"
for repo in "${REPOSITORIES[@]}"; do
    if [ -d "$repo" ]; then
        setup_contribution_branch "$repo"
    fi
    echo ""
done

# Create workspace structure
echo -e "${BLUE}📁 Creating workspace structure...${NC}"
mkdir -p contributions/{discussions,templates,scripts,docs}

echo -e "${GREEN}🎉 Fork workflow setup completed!${NC}"
echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo "1. Copy our discussion infrastructure files to the appropriate repositories"
echo "2. Commit changes to contribution branches"
echo "3. Push branches to your forks"
echo "4. Create pull requests to upstream repositories"
echo ""
echo -e "${YELLOW}💡 Repository structure:${NC}"
for repo in "${REPOSITORIES[@]}"; do
    if [ -d "$repo" ]; then
        echo "  📁 $repo/"
        echo "    ├── 🔗 origin → https://github.com/$FORK_OWNER/$repo"
        echo "    └── 🔗 upstream → https://github.com/$UPSTREAM_ORG/$repo"
    fi
done

echo ""
echo -e "${BLUE}🚀 Ready to contribute to FormerlyIncarcerated.org!${NC}"
