#!/bin/bash

# FormerlyIncarcerated.org Fork and Contribution Workflow
# This script sets up forks and prepares contributions for upstream submission

set -e

echo "🍴 FormerlyIncarcerated.org Fork & Contribution Setup"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
UPSTREAM_ORG="FormerlyIncarcerated"
FORK_OWNER="4eckd"  # Your GitHub username
REPOSITORIES=(".github" "whitepaper" "roadmap")

echo -e "${BLUE}📋 Target Repositories:${NC}"
echo "  🏛️ .github (Organization community hub - HAS DISCUSSIONS ENABLED!)"
echo "  📄 whitepaper (Documentation repository)"
echo "  🗺️ roadmap (Development roadmap)"
echo ""

# Check prerequisites
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is not installed${NC}"
    echo "Please install GitHub CLI: https://cli.github.com/"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ Not authenticated with GitHub CLI${NC}"
    echo "Please run: gh auth login"
    exit 1
fi

echo -e "${GREEN}✅ GitHub CLI is ready${NC}"

# Function to fork and set up repository
setup_fork() {
    local repo_name=$1
    local upstream_url="https://github.com/$UPSTREAM_ORG/$repo_name"
    local fork_url="https://github.com/$FORK_OWNER/$repo_name"
    
    echo -e "${BLUE}🍴 Setting up fork for $repo_name...${NC}"
    
    # Fork if doesn't exist
    if ! gh repo view "$FORK_OWNER/$repo_name" &> /dev/null; then
        echo -e "${YELLOW}📤 Forking repository...${NC}"
        gh repo fork "$upstream_url" --clone=false
        echo -e "${GREEN}✅ Forked: $upstream_url${NC}"
    else
        echo -e "${YELLOW}⚠️ Fork already exists${NC}"
    fi
    
    # Clone locally if doesn't exist
    if [ ! -d "$repo_name" ]; then
        echo -e "${YELLOW}📥 Cloning fork locally...${NC}"
        gh repo clone "$FORK_OWNER/$repo_name"
        
        # Set up upstream remote
        cd "$repo_name"
        git remote add upstream "$upstream_url"
        echo -e "${GREEN}✅ Added upstream remote${NC}"
        cd ..
    else
        echo -e "${YELLOW}⚠️ Local directory exists${NC}"
    fi
    
    # Set up contribution branch
    cd "$repo_name"
    git fetch upstream
    git checkout main 2>/dev/null || git checkout master 2>/dev/null
    git merge upstream/main 2>/dev/null || git merge upstream/master 2>/dev/null
    
    local branch_name="feat/community-discussions-infrastructure"
    if ! git branch | grep -q "$branch_name"; then
        git checkout -b "$branch_name"
        echo -e "${GREEN}✅ Created contribution branch: $branch_name${NC}"
    else
        git checkout "$branch_name"
        echo -e "${YELLOW}⚠️ Using existing branch: $branch_name${NC}"
    fi
    cd ..
    
    echo ""
}

# Main execution
echo -e "${YELLOW}🚀 Starting fork setup...${NC}"
echo ""

for repo in "${REPOSITORIES[@]}"; do
    setup_fork "$repo"
done

# Create contribution workspace
echo -e "${BLUE}📁 Setting up contribution workspace...${NC}"
mkdir -p contributions/{discussions,templates,scripts,docs}

# Copy our discussion infrastructure files to appropriate repositories
echo -e "${BLUE}📋 Preparing contribution files...${NC}"

# For .github repository (main community infrastructure)
if [ -d ".github" ]; then
    echo -e "${YELLOW}📝 Preparing .github repository contributions...${NC}"
    
    # Copy discussion infrastructure
    cp -r .github/discussion-categories.yml .github/
    cp -r .github/DISCUSSION_TEMPLATE/ .github/
    cp -r scripts/ .github/
    
    # Update CONTRIBUTING.md if it exists, or create it
    if [ -f ".github/CONTRIBUTING.md" ]; then
        echo -e "${BLUE}📝 Updating existing CONTRIBUTING.md...${NC}"
    else
        echo -e "${BLUE}📝 Creating CONTRIBUTING.md...${NC}"
        cp .github/CONTRIBUTING.md .github/
    fi
fi

# For whitepaper repository (enhanced documentation)
if [ -d "whitepaper" ]; then
    echo -e "${YELLOW}📄 Preparing whitepaper repository contributions...${NC}"
    
    # Copy enhanced whitepaper
    cp docs/WHITEPAPER.md whitepaper/README.md
fi

echo -e "${GREEN}🎉 Fork setup completed!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Review and commit changes in each repository"
echo "2. Push contribution branches to your forks"
echo "3. Create pull requests to upstream repositories"
echo ""
echo -e "${YELLOW}💡 Repository Status:${NC}"
for repo in "${REPOSITORIES[@]}"; do
    if [ -d "$repo" ]; then
        echo "  📁 $repo/"
        echo "    ├── 🔗 origin → https://github.com/$FORK_OWNER/$repo"
        echo "    ├── 🔗 upstream → https://github.com/$UPSTREAM_ORG/$repo"
        echo "    └── 🌿 branch → feat/community-discussions-infrastructure"
    fi
done

echo ""
echo -e "${BLUE}🚀 Ready to contribute to FormerlyIncarcerated.org!${NC}"
echo ""
echo -e "${YELLOW}📝 Commit and Push Commands:${NC}"
echo "cd .github && git add . && git commit -m 'feat: add comprehensive discussions infrastructure' && git push origin feat/community-discussions-infrastructure"
echo "cd ../whitepaper && git add . && git commit -m 'feat: enhance whitepaper with Git-themed styling' && git push origin feat/community-discussions-infrastructure"
echo ""
echo -e "${YELLOW}🔗 Create Pull Requests:${NC}"
echo "gh pr create --repo FormerlyIncarcerated/.github --title 'feat: Add comprehensive GitHub Discussions infrastructure' --body 'Implements professional discussion categories, templates, and automation scripts for community engagement.'"
echo "gh pr create --repo FormerlyIncarcerated/whitepaper --title 'feat: Enhance whitepaper with Git-themed styling and structure' --body 'Adds professional Git-themed formatting, badges, and improved organization to the whitepaper.'"
