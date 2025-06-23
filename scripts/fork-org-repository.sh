#!/bin/bash

# Fork FormerlyIncarcerated/org Repository and Set Up Contribution Workflow
# This script forks the main platform repository and prepares our discussions contribution

set -e

echo "🍴 Forking FormerlyIncarcerated/org Repository"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
UPSTREAM_ORG="FormerlyIncarcerated"
UPSTREAM_REPO="org"
FORK_OWNER="4eckd"  # Your GitHub username
UPSTREAM_URL="https://github.com/$UPSTREAM_ORG/$UPSTREAM_REPO"
FORK_URL="https://github.com/$FORK_OWNER/$UPSTREAM_REPO"

echo -e "${BLUE}📋 Repository Information:${NC}"
echo "  🎯 Upstream: $UPSTREAM_URL"
echo "  🍴 Fork: $FORK_URL"
echo "  📝 Description: FormerlyIncarcerated.org main platform repository"
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

# Fork the repository
echo -e "${BLUE}🍴 Forking repository...${NC}"
if ! gh repo view "$FORK_OWNER/$UPSTREAM_REPO" &> /dev/null; then
    echo -e "${YELLOW}📤 Creating fork...${NC}"
    gh repo fork "$UPSTREAM_URL" --clone=false
    echo -e "${GREEN}✅ Fork created: $FORK_URL${NC}"
else
    echo -e "${YELLOW}⚠️ Fork already exists${NC}"
fi

# Clone the fork locally
if [ ! -d "$UPSTREAM_REPO" ]; then
    echo -e "${YELLOW}📥 Cloning fork locally...${NC}"
    gh repo clone "$FORK_OWNER/$UPSTREAM_REPO"
    
    # Set up upstream remote
    cd "$UPSTREAM_REPO"
    git remote add upstream "$UPSTREAM_URL"
    echo -e "${GREEN}✅ Added upstream remote${NC}"
    cd ..
else
    echo -e "${YELLOW}⚠️ Local directory already exists${NC}"
fi

# Set up contribution branch
echo -e "${BLUE}🌿 Setting up contribution branch...${NC}"
cd "$UPSTREAM_REPO"

# Fetch latest from upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create contribution branch
BRANCH_NAME="feat/comprehensive-discussions-infrastructure"
if ! git branch | grep -q "$BRANCH_NAME"; then
    git checkout -b "$BRANCH_NAME"
    echo -e "${GREEN}✅ Created contribution branch: $BRANCH_NAME${NC}"
else
    git checkout "$BRANCH_NAME"
    echo -e "${YELLOW}⚠️ Using existing branch: $BRANCH_NAME${NC}"
fi

cd ..

# Create contribution workspace
echo -e "${BLUE}📁 Setting up contribution workspace...${NC}"
mkdir -p contributions/org-repo/{.github,scripts,docs}

# Copy our discussion infrastructure files
echo -e "${YELLOW}📋 Preparing contribution files...${NC}"

# Discussion infrastructure
cp .github/discussion-categories.yml contributions/org-repo/.github/
cp -r .github/DISCUSSION_TEMPLATE contributions/org-repo/.github/

# Scripts
cp scripts/setup-discussions.js contributions/org-repo/scripts/
cp scripts/setup-community.sh contributions/org-repo/scripts/

# Enhanced documentation
cp docs/WHITEPAPER.md contributions/org-repo/docs/
cp CONTRIBUTION_PLAN.md contributions/org-repo/

# Create README for the contribution
cat > contributions/org-repo/CONTRIBUTION_README.md << 'EOF'
# GitHub Discussions Infrastructure Contribution

This contribution adds comprehensive GitHub Discussions infrastructure to the FormerlyIncarcerated/org repository.

## 🗣️ What's Being Added

### Discussion Categories (8 Sections, 24 Categories)
- 📋 **Project Management**: Community Announcements, Strategic Discussions, Community Polls
- 🛠️ **Technical Development**: Architecture & Design, Technical Q&A, Technical Announcements
- 🔐 **Web3 & Blockchain**: Blockchain Development, Security & Privacy, Security Announcements
- 🐛 **Issues & Support**: Help & Support, Bug Reports & Issues, Documentation Q&A
- 🤝 **Community & Impact**: General Discussion, Success Stories, Impact Polls
- 🔬 **Research & Innovation**: Research & Development, Data & Analytics, Future Vision
- 🏛️ **Governance**: Governance Announcements, Governance Proposals, Policy Discussions
- 💼 **Use Cases**: Employment Solutions, Financial Services, Housing Solutions

### Professional Templates
- Feature request template with Web3 considerations
- Bug report template with comprehensive details
- General discussion template for structured conversations
- Success story template for community celebration

### Automation Scripts
- GitHub GraphQL API integration for automated setup
- Community health validation and setup scripts
- Cross-platform compatibility for easy deployment

## 🎯 Impact

This infrastructure will provide:
- **Professional community organization** for all stakeholder types
- **Scalable discussion framework** that grows with the platform
- **Clear contribution pathways** for developers, community members, and organizations
- **Structured support systems** for formerly incarcerated individuals

## 🛠️ Implementation

1. Enable GitHub Discussions in repository settings
2. Run setup scripts to create discussion categories
3. Create welcome discussions using provided templates
4. Begin community engagement across all categories

Building second chances through Web3 technology and community-driven support! 🚀
EOF

# Create deployment instructions
cat > contributions/org-repo/DEPLOYMENT.md << 'EOF'
# Deployment Instructions for Discussions Infrastructure

## Prerequisites
- Repository admin access to enable discussions
- GitHub CLI or Node.js for automated setup
- Community moderators ready for initial engagement

## Step 1: Enable Discussions
1. Go to repository Settings
2. Scroll to Features section
3. Check "Discussions" to enable
4. Confirm the feature is active

## Step 2: Deploy Categories
```bash
# Using our automated script
node scripts/setup-discussions.js

# Or using GitHub CLI
gh api graphql -f query='...' # (see setup-discussions.js for details)
```

## Step 3: Create Welcome Discussions
Use the templates in .github/DISCUSSION_TEMPLATE/welcome-discussions.md to create initial discussions in each category.

## Step 4: Community Onboarding
1. Pin important announcements
2. Create introduction discussions
3. Set up moderation guidelines
4. Begin community engagement

## Expected Timeline
- Setup: 1-2 hours
- Initial content creation: 4-6 hours
- Community onboarding: 1-2 weeks
- Full engagement: 1-2 months

Building second chances through Web3 technology! 🚀
EOF

echo -e "${GREEN}🎉 Fork setup completed!${NC}"
echo ""
echo -e "${BLUE}📁 Contribution Structure:${NC}"
echo "contributions/org-repo/"
echo "├── .github/"
echo "│   ├── discussion-categories.yml"
echo "│   └── DISCUSSION_TEMPLATE/"
echo "├── scripts/"
echo "│   ├── setup-discussions.js"
echo "│   └── setup-community.sh"
echo "├── docs/"
echo "│   └── WHITEPAPER.md"
echo "├── CONTRIBUTION_README.md"
echo "└── DEPLOYMENT.md"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Copy contribution files to the forked repository"
echo "2. Commit changes to the contribution branch"
echo "3. Push branch to your fork"
echo "4. Create pull request to upstream repository"
echo ""
echo -e "${BLUE}🚀 Commands to Execute:${NC}"
echo "# Copy files to fork"
echo "cp -r contributions/org-repo/* $UPSTREAM_REPO/"
echo ""
echo "# Commit and push"
echo "cd $UPSTREAM_REPO"
echo "git add ."
echo "git commit -m 'feat: add comprehensive GitHub Discussions infrastructure'"
echo "git push origin $BRANCH_NAME"
echo ""
echo "# Create pull request"
echo "gh pr create --title 'feat: Add comprehensive GitHub Discussions infrastructure' \\"
echo "  --body 'Implements professional discussion categories, templates, and automation scripts for community engagement.'"
echo ""
echo -e "${GREEN}🌟 Ready to contribute to FormerlyIncarcerated.org!${NC}"
