#!/bin/bash

# FormerlyIncarcerated.org Community Setup Script
# This script sets up GitHub Discussions and community infrastructure

set -e

echo "🚀 Setting up FormerlyIncarcerated.org Community Infrastructure..."
echo "=================================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Repository information
REPO_OWNER="FormerlyIncarcerated"
REPO_NAME="formerlyincarcerated"
REPO_URL="https://github.com/$REPO_OWNER/$REPO_NAME"

echo -e "${BLUE}📋 Repository: $REPO_URL${NC}"

# Enable discussions if not already enabled
echo -e "${YELLOW}🔧 Enabling GitHub Discussions...${NC}"
gh repo edit $REPO_OWNER/$REPO_NAME --enable-discussions || echo "Discussions may already be enabled"

# Check if Node.js is available for the setup script
if command -v node &> /dev/null; then
    echo -e "${YELLOW}📝 Setting up discussion categories...${NC}"
    
    # Install dependencies if package.json exists
    if [ -f "package.json" ]; then
        echo -e "${BLUE}📦 Installing dependencies...${NC}"
        if command -v bun &> /dev/null; then
            bun install
        elif command -v npm &> /dev/null; then
            npm install
        else
            echo -e "${RED}❌ No package manager found (bun or npm)${NC}"
            exit 1
        fi
    fi
    
    # Run the discussion setup script
    if [ -f "scripts/setup-discussions.js" ]; then
        echo -e "${BLUE}🗣️ Creating discussion categories...${NC}"
        node scripts/setup-discussions.js
    else
        echo -e "${YELLOW}⚠️ Discussion setup script not found, skipping category creation${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ Node.js not found, skipping automated discussion category creation${NC}"
    echo "You can manually create categories using the GitHub web interface"
fi

# Create initial discussions (manual step)
echo -e "${YELLOW}📝 Next steps for manual setup:${NC}"
echo "1. Visit: $REPO_URL/discussions"
echo "2. Create welcome discussions using templates in .github/DISCUSSION_TEMPLATE/welcome-discussions.md"
echo "3. Pin important announcements"
echo "4. Set up discussion category descriptions"

# Community health files check
echo -e "${BLUE}📋 Checking community health files...${NC}"

files_to_check=(
    ".github/CONTRIBUTING.md"
    ".github/CODE_OF_CONDUCT.md"
    ".github/discussion-categories.yml"
    ".github/DISCUSSION_TEMPLATE/feature-request.md"
    ".github/DISCUSSION_TEMPLATE/bug-report.md"
    ".github/DISCUSSION_TEMPLATE/general-discussion.md"
    ".github/DISCUSSION_TEMPLATE/success-story.md"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file (missing)${NC}"
    fi
done

# Documentation links
echo -e "${BLUE}📚 Documentation and Resources:${NC}"
echo "• Contributing Guide: $REPO_URL/blob/main/.github/CONTRIBUTING.md"
echo "• Code of Conduct: $REPO_URL/blob/main/.github/CODE_OF_CONDUCT.md"
echo "• Discussions: $REPO_URL/discussions"
echo "• Issues: $REPO_URL/issues"
echo "• Project Documentation: https://docs.formerlyincarcerated.org"

# Community links
echo -e "${BLUE}🤝 Community Links:${NC}"
echo "• Discord: https://discord.gg/formerly-incarcerated-empowerment"
echo "• Website: https://formerlyincarcerated.org"
echo "• Email: community@formerlyincarcerated.org"

echo ""
echo -e "${GREEN}🎉 Community setup completed!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Review and customize discussion categories"
echo "2. Create welcome discussions in each category"
echo "3. Invite community members to participate"
echo "4. Set up moderation and community guidelines"
echo "5. Begin engaging with the community!"

echo ""
echo -e "${YELLOW}💡 Pro tip:${NC} Pin important discussions and use labels to organize conversations effectively."
echo ""
echo "Building second chances through Web3 technology and community-driven support systems! 🌟"
