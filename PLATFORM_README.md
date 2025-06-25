# 🌟 FormerlyIncarcerated.org - Complete Platform & Community Infrastructure

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Web3](https://img.shields.io/badge/Web3-Enabled-orange?style=for-the-badge)](https://web3.foundation)

**Building second chances through Web3 technology and community-driven support systems.**

## 🎯 **Mission**

FormerlyIncarcerated.org leverages Web3 technology to create dignified, community-driven pathways to opportunity for formerly incarcerated individuals through:

- **Self-sovereign identity management** with privacy-preserving credentials
- **Community-driven funding mechanisms** for empowerment initiatives  
- **Transparent governance** with DAO-based decision making
- **Economic empowerment tools** including DeFi integrations

## ✨ **Complete Platform Features**

### 🌐 **Next.js 15 Web Platform**
- **Modern React 19** with server components and streaming
- **TypeScript** with strict type safety and enhanced developer experience
- **6-theme system** (Default/Purple/Blue/Green/Amber/Red) with full accessibility
- **Mobile-first responsive design** with touch-optimized interactions
- **Professional animations** with Framer Motion and smooth transitions

### 🔐 **Web3 Integration**
- **Wallet connectivity** (MetaMask, WalletConnect, Coinbase Wallet)
- **Multi-chain support** (Ethereum, Polygon, Arbitrum, Base)
- **Smart contract interactions** for identity verification and governance
- **DeFi integrations** for community funding and economic empowerment
- **Privacy-preserving credentials** with zero-knowledge proofs

### 🗣️ **Community Infrastructure**
- **GitHub Discussions** with 8 sections and 24 specialized categories
- **Professional templates** for feature requests, bug reports, and success stories
- **Automated setup tools** for easy deployment and maintenance
- **Organization-wide standards** for consistent community engagement

### 📚 **Documentation System**
- **Docusaurus-powered docs site** at `docs.localhost:3000`
- **Git-themed styling** with professional badges and presentation
- **Comprehensive guides** for all stakeholder types
- **API documentation** and technical specifications
- **Interactive tutorials** and implementation examples

### 🏛️ **Governance & Impact**
- **DAO-based decision making** with transparent voting mechanisms
- **Community polls** for feature prioritization and feedback
- **Success story sharing** with privacy-first approach
- **Impact measurement** through structured data collection
- **Partnership pathways** for organizations and employers

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ or Bun (recommended)
- Git and GitHub CLI (optional)
- Supabase account for database
- Web3 wallet for testing

### **Installation**

```bash
# Clone the repository
git clone https://github.com/FormerlyIncarcerated/org.git
cd org

# Install dependencies (using bun - preferred)
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
bun db:setup

# Run the development server
bun dev
```

### **Development URLs**
- **Main Platform**: http://localhost:3000
- **Documentation**: http://docs.localhost:3000 (requires setup)
- **API Routes**: http://localhost:3000/api/*
- **Supabase Dashboard**: Your Supabase project URL

## 🏗️ **Project Architecture**

```
org/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # User dashboard
│   ├── api/                      # API routes and endpoints
│   ├── web3/                     # Web3 technology showcase
│   └── globals.css               # Global styles and themes
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── forms/                    # Form components with validation
│   ├── navigation/               # Navigation and routing
│   ├── web3/                     # Web3 integration components
│   └── community/                # Community features
├── lib/                          # Utility libraries
│   ├── database-helpers.ts       # Supabase database operations
│   ├── storage-helpers.ts        # File storage and management
│   ├── theme-config.ts           # 6-theme system configuration
│   ├── web3-utils.ts             # Web3 utilities and helpers
│   └── validation.ts             # Zod schemas and validation
├── hooks/                        # Custom React hooks
│   ├── use-theme.ts              # Theme management
│   ├── use-wallet.ts             # Web3 wallet integration
│   └── use-database.ts           # Database operations
├── docs/                         # Documentation files
├── docs-site/                    # Docusaurus documentation site
├── scripts/                      # Automation and setup scripts
├── .github/                      # GitHub community infrastructure
│   ├── discussion-categories.yml # Discussion categories config
│   ├── DISCUSSION_TEMPLATE/      # Professional discussion templates
│   ├── ISSUE_TEMPLATE/           # Issue reporting templates
│   └── CONTRIBUTING.md           # Contribution guidelines
└── public/                       # Static assets and images
```

## 🎨 **Theme System**

The platform includes a comprehensive 6-theme system with full accessibility support:

```typescript
// Available themes with semantic color mapping
const themes = {
  default: { primary: 'blue', secondary: 'gray', accent: 'indigo' },
  purple: { primary: 'purple', secondary: 'violet', accent: 'fuchsia' },
  blue: { primary: 'blue', secondary: 'sky', accent: 'cyan' },
  green: { primary: 'green', secondary: 'emerald', accent: 'teal' },
  amber: { primary: 'amber', secondary: 'yellow', accent: 'orange' },
  red: { primary: 'red', secondary: 'rose', accent: 'pink' }
};
```

### **Theme Usage**
```tsx
import { useTheme } from '@/hooks/use-theme';

function ThemedComponent() {
  const { theme, themeConfig } = useTheme();
  
  return (
    <div className={`bg-${themeConfig.primary}-500 text-white`}>
      <h1 className={`text-${themeConfig.accent}-200`}>
        Theme-aware content
      </h1>
    </div>
  );
}
```

## 🔐 **Web3 Integration Guide**

### **Wallet Connection**
```tsx
import { useWallet } from '@/hooks/use-wallet';

function WalletConnector() {
  const { connect, disconnect, account, isConnected, chainId } = useWallet();
  
  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {account}</p>
          <p>Chain: {chainId}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
```

### **Smart Contract Interaction**
```tsx
import { useContract } from '@/hooks/use-contract';

function IdentityManager() {
  const { contract, createIdentity, verifyCredential, loading } = useContract();
  
  const handleCreateIdentity = async () => {
    try {
      const tx = await createIdentity({
        credentialHash: 'hash',
        metadata: { type: 'employment' }
      });
      console.log('Identity created:', tx.hash);
    } catch (error) {
      console.error('Failed to create identity:', error);
    }
  };
  
  return (
    <button onClick={handleCreateIdentity} disabled={loading}>
      {loading ? 'Creating...' : 'Create Identity'}
    </button>
  );
}
```

## 🗣️ **Community Features**

### **GitHub Discussions Structure**

Our comprehensive discussion system supports all aspects of the FormerlyIncarcerated.org mission:

#### **8 Sections, 24 Categories:**

**📋 Project Management**
- 📢 Community Announcements (Announcement)
- 📈 Strategic Discussions (Open-ended)
- 🗳️ Community Polls (Poll)

**🛠️ Technical Development**
- 🏗️ Architecture & Design (Open-ended)
- ❓ Technical Q&A (Question/Answer)
- 📢 Technical Announcements (Announcement)

**🔐 Web3 & Blockchain**
- ⛓️ Blockchain Development (Open-ended)
- 🔒 Security & Privacy (Question/Answer)
- 🚨 Security Announcements (Announcement)

**🐛 Issues & Support**
- ❓ Help & Support (Question/Answer)
- 🐛 Bug Reports & Issues (Question/Answer)
- 📚 Documentation Q&A (Question/Answer)

**🤝 Community & Impact**
- 💬 General Discussion (Open-ended)
- 🌟 Success Stories (Open-ended)
- 📊 Impact Polls (Poll)

**🔬 Research & Innovation**
- 🧪 Research & Development (Open-ended)
- 📊 Data & Analytics (Question/Answer)
- 🔮 Future Vision (Open-ended)

**🏛️ Governance**
- 📜 Governance Announcements (Announcement)
- 🗳️ Governance Proposals (Poll)
- ⚖️ Policy Discussions (Open-ended)

**💼 Use Cases**
- 💼 Employment Solutions (Open-ended)
- 🏦 Financial Services (Question/Answer)
- 🏠 Housing Solutions (Open-ended)

### **Professional Templates**

All discussion templates are designed with the FormerlyIncarcerated.org mission in mind:

- **Feature Requests**: Web3-aware with community impact assessment
- **Bug Reports**: Comprehensive with environment details and privacy considerations
- **Success Stories**: Privacy-first sharing with community inspiration focus
- **General Discussions**: Structured frameworks for productive conversations

## 📚 **Documentation System**

### **Local Documentation Development**
```bash
# Start documentation site
cd docs-site
bun install
bun start

# Access at http://docs.localhost:3000
# Requires hosts file entry: 127.0.0.1 docs.localhost
```

### **Documentation Structure**
- **Getting Started**: Platform overview, setup, and onboarding
- **User Guides**: Feature documentation for all stakeholder types
- **Developer Documentation**: API references and technical implementation guides
- **Community Guidelines**: Contribution standards and engagement best practices
- **Web3 Integration**: Blockchain technology guides and smart contract documentation

## 🛠️ **Development Workflow**

### **Available Scripts**
```bash
# Development
bun dev                    # Start development server with hot reload
bun build                  # Build optimized production bundle
bun start                  # Start production server
bun lint                   # Run ESLint for code quality
bun format                 # Format code with Prettier

# Database Operations
bun db:setup              # Initialize Supabase tables and RLS policies
bun db:seed               # Populate database with sample data
bun db:reset              # Reset database to clean state
bun db:migrate            # Run pending database migrations

# Documentation
bun docs:dev              # Start documentation development server
bun docs:build            # Build static documentation site
bun docs:deploy           # Deploy documentation to subdomain

# Community Infrastructure
bun community:setup       # Deploy GitHub Discussions categories
bun community:validate    # Validate community health and templates
bun community:sync        # Sync templates across repositories

# Testing & Quality
bun test                  # Run comprehensive test suite
bun test:watch            # Run tests in watch mode
bun test:coverage         # Generate coverage reports
bun type-check            # TypeScript type checking
```

### **Code Quality Standards**
- **ESLint** with strict TypeScript rules
- **Prettier** for consistent code formatting
- **Husky** pre-commit hooks for quality gates
- **Jest** and React Testing Library for comprehensive testing
- **85%+ test coverage** requirement for all new features

## 🔗 **Links & Resources**

### **Platform**
- **GitHub Organization**: https://github.com/FormerlyIncarcerated
- **Main Repository**: https://github.com/FormerlyIncarcerated/org
- **Community Discussions**: https://github.com/orgs/FormerlyIncarcerated/discussions
- **Documentation**: https://docs.formerlyincarcerated.org

### **Community**
- **GitHub Discussions**: https://github.com/orgs/FormerlyIncarcerated/discussions
- **Issues & Support**: https://github.com/FormerlyIncarcerated/org/issues
- **Feature Requests**: Use GitHub Discussions with Feature Request template
- **Success Stories**: Share in Community & Impact discussions

### **Support**
- **General Questions**: Create a discussion in the General category
- **Technical Support**: Create an issue with the bug report template
- **Security Issues**: Use GitHub Security Advisories
- **Partnership Inquiries**: Create a discussion in Strategic Discussions

## 👥 **Contributors**

We're grateful to all the contributors who have helped build this platform:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/4eckd">
        <img src="https://github.com/4eckd.png" width="100px;" alt="4eckd"/>
        <br />
        <sub><b>4eckd</b></sub>
      </a>
      <br />
      <sub>Platform Architecture & Web3 Integration</sub>
    </td>
    <td align="center">
      <a href="https://github.com/FormerlyIncarcerated">
        <img src="https://github.com/FormerlyIncarcerated.png" width="100px;" alt="FormerlyIncarcerated"/>
        <br />
        <sub><b>FormerlyIncarcerated</b></sub>
      </a>
      <br />
      <sub>Organization & Mission Leadership</sub>
    </td>
  </tr>
</table>

### 🤝 How to Become a Contributor

We welcome contributions from:
- **Formerly incarcerated individuals** sharing experiences and feedback
- **Developers** contributing code, documentation, and technical expertise
- **Community advocates** helping with outreach and support
- **Organizations** providing partnerships and resources

See our [Contributing Guidelines](.github/CONTRIBUTING.md) to get started!

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**This comprehensive platform represents a complete solution for empowering formerly incarcerated individuals through Web3 technology, professional community infrastructure, and scalable technical architecture.**

**Building second chances through Web3 technology and community-driven support systems! 🚀**
