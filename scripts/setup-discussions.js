#!/usr/bin/env node

/**
 * GitHub Discussions Setup Script
 * FormerlyIncarcerated.org
 * 
 * This script sets up GitHub Discussions categories using the GitHub GraphQL API
 * Run with: node scripts/setup-discussions.js
 * 
 * Prerequisites:
 * - GITHUB_TOKEN environment variable with repo permissions
 * - Repository must have discussions enabled
 */

const { Octokit } = require("@octokit/rest");
const { graphql } = require("@octokit/graphql");

// Configuration
const REPO_OWNER = "FormerlyIncarcerated";
const REPO_NAME = "formerlyincarcerated";

// Discussion categories configuration
const categories = [
  // Section 1: Project Management
  {
    name: "📢 Community Announcements",
    description: "Official updates, milestones, and community news from the FormerlyIncarcerated.org team",
    format: "ANNOUNCEMENT",
    section: "📋 Project Management"
  },
  {
    name: "📈 Strategic Discussions",
    description: "Business strategy, partnerships, funding, and long-term vision conversations",
    format: "OPEN",
    section: "📋 Project Management"
  },
  {
    name: "🗳️ Community Polls",
    description: "Feature prioritization, design choices, and community preference voting",
    format: "POLL",
    section: "📋 Project Management"
  },

  // Section 2: Technical Development
  {
    name: "🏗️ Architecture & Design",
    description: "Technical architecture discussions, design patterns, and technology choices",
    format: "OPEN",
    section: "🛠️ Technical Development"
  },
  {
    name: "❓ Technical Q&A",
    description: "Technical questions, implementation help, troubleshooting, and development support",
    format: "QUESTION",
    section: "🛠️ Technical Development"
  },
  {
    name: "📢 Technical Announcements",
    description: "Breaking changes, new releases, security updates, and API changes",
    format: "ANNOUNCEMENT",
    section: "🛠️ Technical Development"
  },

  // Section 3: Web3 & Blockchain
  {
    name: "⛓️ Blockchain Development",
    description: "Smart contract discussions, tokenomics, DeFi integrations, and Web3 development",
    format: "OPEN",
    section: "🔐 Web3 & Blockchain"
  },
  {
    name: "🔒 Security & Privacy",
    description: "Security questions, privacy implementation, zero-knowledge proofs, and audit discussions",
    format: "QUESTION",
    section: "🔐 Web3 & Blockchain"
  },
  {
    name: "🚨 Security Announcements",
    description: "Security updates, vulnerability disclosures, and audit results",
    format: "ANNOUNCEMENT",
    section: "🔐 Web3 & Blockchain"
  },

  // Section 4: Issues & Support
  {
    name: "❓ Help & Support",
    description: "User support, how-to questions, platform usage help, and general troubleshooting",
    format: "QUESTION",
    section: "🐛 Issues & Support"
  },
  {
    name: "🐛 Bug Reports & Issues",
    description: "Bug reporting, issue discussion, collaborative debugging, and solution finding",
    format: "QUESTION",
    section: "🐛 Issues & Support"
  },
  {
    name: "📚 Documentation Q&A",
    description: "Documentation questions, clarifications, improvement suggestions, and how-to guides",
    format: "QUESTION",
    section: "🐛 Issues & Support"
  },

  // Section 5: Community & Impact
  {
    name: "💬 General Discussion",
    description: "Community chat, introductions, networking, and general conversations",
    format: "OPEN",
    section: "🤝 Community & Impact"
  },
  {
    name: "🌟 Success Stories",
    description: "Impact stories, user testimonials, case studies, and community achievements",
    format: "OPEN",
    section: "🤝 Community & Impact"
  },
  {
    name: "📊 Impact Polls",
    description: "Community needs assessment, satisfaction surveys, and impact measurement",
    format: "POLL",
    section: "🤝 Community & Impact"
  },

  // Section 6: Research & Innovation
  {
    name: "🧪 Research & Development",
    description: "Research ideas, experimental features, innovation discussions, and proof of concepts",
    format: "OPEN",
    section: "🔬 Research & Innovation"
  },
  {
    name: "📊 Data & Analytics",
    description: "Data analysis questions, metrics discussions, research methodology, and insights",
    format: "QUESTION",
    section: "🔬 Research & Innovation"
  },
  {
    name: "🔮 Future Vision",
    description: "Long-term vision, emerging trends, future planning, and strategic foresight",
    format: "OPEN",
    section: "🔬 Research & Innovation"
  },

  // Section 7: Governance
  {
    name: "📜 Governance Announcements",
    description: "DAO proposals, governance decisions, policy updates, and official governance communications",
    format: "ANNOUNCEMENT",
    section: "🏛️ Governance"
  },
  {
    name: "🗳️ Governance Proposals",
    description: "DAO voting, governance decisions, community consensus building, and proposal discussions",
    format: "POLL",
    section: "🏛️ Governance"
  },
  {
    name: "⚖️ Policy Discussions",
    description: "Policy development, compliance discussions, legal considerations, and regulatory topics",
    format: "OPEN",
    section: "🏛️ Governance"
  },

  // Section 8: Use Cases
  {
    name: "💼 Employment Solutions",
    description: "Employment features, job matching, career development, and workforce integration",
    format: "OPEN",
    section: "💼 Use Cases"
  },
  {
    name: "🏦 Financial Services",
    description: "Credit scoring, banking integration, financial literacy, and economic empowerment",
    format: "QUESTION",
    section: "💼 Use Cases"
  },
  {
    name: "🏠 Housing Solutions",
    description: "Housing verification, landlord partnerships, housing stability, and accommodation support",
    format: "OPEN",
    section: "💼 Use Cases"
  }
];

async function setupDiscussions() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error("❌ GITHUB_TOKEN environment variable is required");
    process.exit(1);
  }

  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });

  try {
    console.log("🚀 Setting up GitHub Discussions for FormerlyIncarcerated.org...\n");

    // First, get the repository ID
    const repoQuery = `
      query($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          id
          hasDiscussionsEnabled
        }
      }
    `;

    const repoResult = await graphqlWithAuth(repoQuery, {
      owner: REPO_OWNER,
      name: REPO_NAME,
    });

    const repositoryId = repoResult.repository.id;
    const hasDiscussions = repoResult.repository.hasDiscussionsEnabled;

    console.log(`📋 Repository ID: ${repositoryId}`);
    console.log(`💬 Discussions enabled: ${hasDiscussions ? "✅" : "❌"}\n`);

    if (!hasDiscussions) {
      console.log("⚠️  Discussions are not enabled for this repository.");
      console.log("   Please enable discussions in the repository settings first.");
      return;
    }

    // Create discussion categories
    console.log("📝 Creating discussion categories...\n");

    for (const category of categories) {
      try {
        const mutation = `
          mutation($repositoryId: ID!, $name: String!, $description: String!, $format: DiscussionCategoryFormat!) {
            createDiscussionCategory(input: {
              repositoryId: $repositoryId,
              name: $name,
              description: $description,
              format: $format
            }) {
              discussionCategory {
                id
                name
                description
                format
              }
            }
          }
        `;

        const result = await graphqlWithAuth(mutation, {
          repositoryId,
          name: category.name,
          description: category.description,
          format: category.format,
        });

        console.log(`✅ Created: ${category.name}`);
        console.log(`   Section: ${category.section}`);
        console.log(`   Format: ${category.format}\n`);

      } catch (error) {
        if (error.message.includes("already exists")) {
          console.log(`⚠️  Category already exists: ${category.name}\n`);
        } else {
          console.error(`❌ Failed to create category: ${category.name}`);
          console.error(`   Error: ${error.message}\n`);
        }
      }
    }

    console.log("🎉 Discussion setup completed!");
    console.log(`🔗 View discussions: https://github.com/${REPO_OWNER}/${REPO_NAME}/discussions`);

  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  setupDiscussions();
}

module.exports = { setupDiscussions, categories };
