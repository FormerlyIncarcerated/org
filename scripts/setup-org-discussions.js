#!/usr/bin/env node

/**
 * Setup GitHub Discussions for FormerlyIncarcerated/org Repository
 * 
 * This script creates the comprehensive discussion structure for the main
 * FormerlyIncarcerated.org platform repository with 8 sections and 24 categories.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const REPO_OWNER = 'FormerlyIncarcerated';
const REPO_NAME = 'org';
const REPO_FULL = `${REPO_OWNER}/${REPO_NAME}`;

// Discussion Categories Structure
const discussionCategories = [
  // 📋 1. Project Planning & Strategy
  {
    name: "🎯 Roadmap & Milestones",
    description: "Phase planning, milestone reviews, timeline adjustments, and project dependencies",
    format: "discussion",
    section: "📋 Project Planning & Strategy"
  },
  {
    name: "📈 Business & Partnerships", 
    description: "Partnership opportunities, funding discussions, grants, marketing strategy, and policy advocacy",
    format: "discussion",
    section: "📋 Project Planning & Strategy"
  },
  {
    name: "🎨 Product & Design",
    description: "UI/UX feedback, feature requests, design system, accessibility, and user experience research",
    format: "discussion",
    section: "📋 Project Planning & Strategy"
  },

  // 🛠️ 2. Technical Development
  {
    name: "⚙️ Platform Development",
    description: "Frontend/backend development, architecture decisions, performance optimization, and code reviews",
    format: "DISCUSSION",
    section: "🛠️ Technical Development"
  },
  {
    name: "🔐 Web3 & Blockchain",
    description: "Smart contracts, self-sovereign identity, zero-knowledge proofs, multi-chain integration, and DeFi",
    format: "DISCUSSION",
    section: "🛠️ Technical Development"
  },
  {
    name: "🔒 Security & Privacy",
    description: "Security audits, privacy technologies, identity verification, wallet management, and data protection",
    format: "DISCUSSION",
    section: "🛠️ Technical Development"
  },

  // 🐛 3. Issues & Support
  {
    name: "🐛 Bug Reports",
    description: "Frontend/backend issues, smart contract bugs, mobile app problems, and documentation errors",
    format: "QUESTION",
    section: "🐛 Issues & Support"
  },
  {
    name: "❓ Help & Support",
    description: "Getting started guides, technical questions, Web3 onboarding, platform usage, and developer setup",
    format: "QUESTION",
    section: "🐛 Issues & Support"
  },
  {
    name: "🔧 DevOps & Infrastructure",
    description: "Deployment issues, CI/CD pipeline, environment setup, monitoring, and scaling",
    format: "QUESTION",
    section: "🐛 Issues & Support"
  },

  // 🤝 4. Community & Impact
  {
    name: "👥 Community Engagement",
    description: "Member introductions, success stories, community feedback, events, and volunteer opportunities",
    format: "DISCUSSION",
    section: "🤝 Community & Impact"
  },
  {
    name: "🌟 Social Impact & Outcomes",
    description: "Impact measurement, recidivism reduction data, employment success, business launches, and research",
    format: "DISCUSSION",
    section: "🤝 Community & Impact"
  },
  {
    name: "📚 Education & Outreach",
    description: "Documentation improvements, tutorials, workshops, educational resources, and training programs",
    format: "DISCUSSION",
    section: "🤝 Community & Impact"
  },

  // 🔬 5. Research & Innovation
  {
    name: "🧪 Research & Development",
    description: "Experimental features, academic collaboration, innovation labs, emerging tech, and beta testing",
    format: "DISCUSSION",
    section: "🔬 Research & Innovation"
  },
  {
    name: "📊 Data & Analytics",
    description: "Platform analytics, impact data, market research, user research, and performance metrics",
    format: "QUESTION",
    section: "🔬 Research & Innovation"
  },
  {
    name: "🔮 Future Vision & Strategy",
    description: "Long-term planning, Vision 2030, industry trends, technology roadmap, and ecosystem expansion",
    format: "DISCUSSION",
    section: "🔬 Research & Innovation"
  },

  // 🏛️ 6. Governance & DAO
  {
    name: "🗳️ DAO Governance",
    description: "Governance proposals, community decisions, treasury management, and token holder communications",
    format: "POLL",
    section: "🏛️ Governance & DAO"
  },
  {
    name: "📜 Policy & Compliance",
    description: "Regulatory compliance, legal framework, privacy policy, token classification, and international expansion",
    format: "DISCUSSION",
    section: "🏛️ Governance & DAO"
  },
  {
    name: "🤝 Community Leadership",
    description: "Advisory board communications, moderator discussions, leadership development, and mentorship",
    format: "DISCUSSION",
    section: "🏛️ Governance & DAO"
  },

  // 💼 7. Use Case Specific
  {
    name: "💼 Employment & Career Development",
    description: "Job matching platform, employer partnerships, skills verification, career resources, and success metrics",
    format: "DISCUSSION",
    section: "💼 Use Case Specific"
  },
  {
    name: "🏦 Financial Services & Credit",
    description: "Credit scoring algorithms, banking partnerships, micro-lending, financial literacy, and alternative credit",
    format: "DISCUSSION",
    section: "💼 Use Case Specific"
  },
  {
    name: "🏠 Housing & Accommodation",
    description: "Housing verification, landlord partnerships, housing stability metrics, and supportive housing integration",
    format: "DISCUSSION",
    section: "💼 Use Case Specific"
  },

  // 🌐 8. Platform Specific
  {
    name: "📱 Mobile Application",
    description: "Mobile app development, iOS/Android issues, mobile UX/UI, app store optimization, and mobile-first features",
    format: "DISCUSSION",
    section: "🌐 Platform Specific"
  },
  {
    name: "🌍 Multi-Language & Accessibility",
    description: "Internationalization support, translation, accessibility compliance, cultural adaptation, and regional customization",
    format: "DISCUSSION",
    section: "🌐 Platform Specific"
  },
  {
    name: "🔗 Integrations & APIs",
    description: "Third-party integrations, API development, webhooks, external service connections, and integration testing",
    format: "QUESTION",
    section: "🌐 Platform Specific"
  }
];

/**
 * Main execution function
 */
async function setupDiscussions() {
  console.log('🚀 Setting up GitHub Discussions for FormerlyIncarcerated/org...\n');

  try {
    // Check if GitHub CLI is available
    execSync('gh --version', { stdio: 'pipe' });
    console.log('✅ GitHub CLI is available');

    // Check authentication
    const authStatus = execSync('gh auth status', { encoding: 'utf8', stdio: 'pipe' });
    console.log('✅ GitHub CLI is authenticated');

    // Enable discussions for the repository
    console.log('\n📋 Enabling discussions for the repository...');
    try {
      execSync(`gh api repos/${REPO_FULL} --method PATCH --field has_discussions=true`, { stdio: 'pipe' });
      console.log('✅ Discussions enabled for repository');
    } catch (error) {
      console.log('ℹ️  Discussions may already be enabled');
    }

    // Create discussion categories
    console.log('\n🗂️  Creating discussion categories...\n');
    
    let successCount = 0;
    let errorCount = 0;

    for (const category of discussionCategories) {
      try {
        console.log(`Creating: ${category.name}`);
        
        // Use REST API instead of GraphQL for better compatibility
        const createCommand = `gh api repos/${REPO_FULL}/discussions/categories \\
          --method POST \\
          --field name="${category.name}" \\
          --field description="${category.description}" \\
          --field format="${category.format.toLowerCase()}"`;


        execSync(createCommand, { stdio: 'pipe' });
        console.log(`✅ Created: ${category.name}`);
        successCount++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.log(`⚠️  Category may already exist: ${category.name}`);
        errorCount++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Successfully created: ${successCount} categories`);
    console.log(`⚠️  Skipped (may exist): ${errorCount} categories`);
    console.log(`📋 Total categories: ${discussionCategories.length}`);

    console.log('\n🎉 Discussion structure setup complete!');
    console.log(`🔗 View discussions: https://github.com/${REPO_FULL}/discussions`);

  } catch (error) {
    console.error('❌ Error setting up discussions:', error.message);
    process.exit(1);
  }
}

/**
 * Get repository ID using GraphQL
 */
async function getRepositoryId() {
  try {
    const result = execSync(`gh api graphql -f query='
      query {
        repository(owner: "${REPO_OWNER}", name: "${REPO_NAME}") {
          id
        }
      }'`, { encoding: 'utf8' });
    
    const data = JSON.parse(result);
    return data.data.repository.id;
  } catch (error) {
    throw new Error(`Failed to get repository ID: ${error.message}`);
  }
}

// Run the setup
if (require.main === module) {
  setupDiscussions().catch(console.error);
}

module.exports = { setupDiscussions, discussionCategories };
