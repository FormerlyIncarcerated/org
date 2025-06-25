---
id: contributing-guidelines
title: Contributing Guidelines
sidebar_label: 🤝 Contributing
description: How to contribute to FormerlyIncarcerated.org - guidelines for developers, designers, and community members
---

# 🤝 Contributing to FormerlyIncarcerated.org

**Building Second Chances Together**

Thank you for your interest in contributing to FormerlyIncarcerated.org! We welcome contributions from developers, designers, formerly incarcerated individuals, advocates, and anyone passionate about creating positive change through technology.

---

## 🎯 Ways to Contribute

### 🔧 Technical Contributions

- **Code Development**: Frontend, backend, smart contracts, and infrastructure
- **Documentation**: Technical guides, API documentation, and tutorials
- **Testing**: Quality assurance, accessibility testing, and user experience testing
- **Design**: UI/UX design, branding, and user interface improvements

### 🤝 Community Contributions

- **Content Creation**: Blog posts, success stories, and educational content
- **Community Support**: Helping other community members and answering questions
- **Feedback**: User testing, feature requests, and improvement suggestions
- **Advocacy**: Spreading awareness and building partnerships

### 📚 Knowledge Contributions

- **Subject Matter Expertise**: Reentry resources, legal guidance, and policy insights
- **Professional Skills**: Career development, job placement, and skill building
- **Technical Expertise**: Web3, blockchain, and decentralized technologies

---

## 🚀 Getting Started

### 1. 📖 Understand Our Mission

Before contributing, please:

- Read our [Whitepaper](../whitepaper) to understand our vision
- Review our [Code of Conduct](./code-of-conduct) for community standards
- Explore the platform at [formerlyincarcerated.org](https://formerlyincarcerated.org)
- Join our [Discord community](https://discord.gg/fJPfsnZe9x) for real-time collaboration

### 2. 🔍 Find Your Contribution Area

Choose an area that matches your skills and interests:

#### For Developers
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, PostgreSQL, API development
- **Web3**: Smart contracts, blockchain integration, DeFi
- **DevOps**: Deployment, CI/CD, infrastructure

#### For Designers
- **UI/UX**: User interface design and user experience optimization
- **Accessibility**: WCAG compliance and inclusive design
- **Branding**: Visual identity and marketing materials
- **Research**: User research and usability testing

#### For Community Members
- **Content**: Writing, storytelling, and educational materials
- **Support**: Peer mentorship and community moderation
- **Testing**: User acceptance testing and feedback
- **Outreach**: Partnership development and advocacy

### 3. 🛠️ Set Up Your Development Environment

#### Prerequisites
- **Node.js 18+**: JavaScript runtime
- **Bun**: Fast package manager and runtime
- **Git**: Version control
- **Code Editor**: VS Code recommended with extensions

#### Installation
```bash
# Clone the repository
git clone https://github.com/FormerlyIncarcerated/org.git
cd org

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
bun run dev

# Start documentation site
cd docs-site
bun install
bun run start
```

---

## 📋 Contribution Process

### 1. 🔍 Choose an Issue

- Browse [GitHub Issues](https://github.com/FormerlyIncarcerated/org/issues)
- Look for issues labeled `good first issue` for beginners
- Check `help wanted` labels for priority contributions
- Comment on issues to express interest and get assigned

### 2. 🌿 Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 3. 💻 Make Your Changes

#### Code Standards
- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow our linting rules (`npm run lint`)
- **Prettier**: Format code consistently (`npm run format`)
- **Testing**: Write tests for new functionality

#### Commit Standards
Use conventional commit messages:
```bash
# Feature
git commit -m "feat: add user profile management"

# Bug fix
git commit -m "fix: resolve theme switching issue"

# Documentation
git commit -m "docs: update contributing guidelines"

# Style
git commit -m "style: improve button hover effects"
```

### 4. 🧪 Test Your Changes

```bash
# Run linting
bun run lint

# Run type checking
bun run type-check

# Run tests
bun run test

# Build for production
bun run build
```

### 5. 📤 Submit a Pull Request

1. **Push your branch**: `git push origin your-branch-name`
2. **Create PR**: Go to GitHub and create a pull request
3. **Fill out template**: Use our PR template for consistency
4. **Request review**: Tag relevant maintainers for review

---

## 🎨 Design Contributions

### 🏛️ Prison Blues Theme System

Our design system honors the lived experiences of formerly incarcerated individuals:

- **San Quentin Standard**: Classic, trusted, foundational
- **Pelican Depths**: Heavy, isolated, intense
- **Chino Skies**: Lighter, hopeful, symbolic of reentry potential
- **Folsom Iron**: Rugged, industrial, strength through adversity
- **Lancaster Light**: Modern, rehabilitative, calm
- **Crescent Night**: Solemn, reflective, transformative

### Design Principles

- **Dignity**: Every design choice should honor user dignity
- **Accessibility**: WCAG AAA compliance (8.7:1+ contrast ratio)
- **Authenticity**: Meaningful connections to lived experiences
- **Professionalism**: Suitable for business and career contexts

### Design Tools

- **Figma**: Primary design tool for UI/UX work
- **Adobe Creative Suite**: For branding and marketing materials
- **Accessibility Tools**: Color contrast analyzers and screen readers

---

## 📝 Documentation Contributions

### Types of Documentation

- **Technical Docs**: API references, architecture guides, deployment instructions
- **User Guides**: How-to guides, tutorials, and feature explanations
- **Community Docs**: Contributing guides, code of conduct, community resources
- **Legal Docs**: Terms of service, privacy policy, compliance information

### Documentation Standards

- **Clear Language**: Write for diverse audiences and skill levels
- **Inclusive Content**: Use inclusive language and examples
- **Accessibility**: Ensure documentation is accessible to all users
- **Up-to-Date**: Keep documentation current with code changes

### Writing Style

- **Tone**: Professional, empowering, and respectful
- **Structure**: Use clear headings, bullet points, and examples
- **Examples**: Provide practical, real-world examples
- **Links**: Include relevant internal and external links

---

## 🌐 Web3 Contributions

### Blockchain Development

- **Smart Contracts**: Solidity development for Ethereum and compatible chains
- **DeFi Integration**: Decentralized finance protocols and services
- **Identity Systems**: Self-sovereign identity and credential verification
- **Governance**: DAO structures and token-based voting systems

### Security Considerations

- **Audit Requirements**: All smart contracts must be audited
- **Testing**: Comprehensive testing on testnets before mainnet
- **Documentation**: Detailed documentation for all Web3 features
- **Compliance**: Ensure regulatory compliance and legal review

---

## 🤝 Community Guidelines

### Communication

- **Respectful**: Always communicate with respect and empathy
- **Constructive**: Provide constructive feedback and suggestions
- **Inclusive**: Use inclusive language and welcome diverse perspectives
- **Professional**: Maintain professional standards in all interactions

### Collaboration

- **Open Source**: Embrace open source principles and transparency
- **Knowledge Sharing**: Share knowledge and help others learn
- **Mentorship**: Support new contributors and community members
- **Recognition**: Acknowledge and celebrate contributions

---

## 🏆 Recognition

### Contributor Recognition

We recognize contributions through:

- **GitHub Contributors**: Listed in repository contributors
- **Community Highlights**: Featured in newsletters and social media
- **Contributor Badges**: Special recognition in Discord and platform
- **Annual Awards**: Recognition at community events and conferences

### Types of Recognition

- **Code Contributors**: Developers who contribute code and technical improvements
- **Community Champions**: Active community members who help and support others
- **Content Creators**: Contributors who create valuable content and resources
- **Advocates**: Those who promote the platform and mission

---

## 📞 Getting Help

### Support Channels

- **Discord**: Real-time chat and community support
- **GitHub Discussions**: Project-related discussions and Q&A
- **Email**: Direct contact for specific questions or concerns
- **Office Hours**: Regular community calls and developer sessions

### Mentorship Program

- **New Contributor Mentorship**: Pairing new contributors with experienced mentors
- **Technical Mentorship**: Specialized mentorship for technical contributions
- **Community Mentorship**: Support for community involvement and leadership

---

## 📊 Contribution Metrics

### What We Track

- **Code Contributions**: Commits, pull requests, and code reviews
- **Community Engagement**: Discord participation, forum posts, and support
- **Documentation**: Documentation improvements and content creation
- **Testing**: Bug reports, testing participation, and quality assurance

### Impact Measurement

- **Platform Improvement**: How contributions improve user experience
- **Community Growth**: Contribution to community building and engagement
- **Mission Advancement**: Alignment with our mission and values
- **Innovation**: Novel solutions and creative approaches

---

## 🔮 Future Opportunities

### Upcoming Projects

- **Mobile Application**: iOS and Android app development
- **Advanced Web3 Features**: Enhanced DeFi and governance capabilities
- **AI Integration**: Machine learning for job matching and skill assessment
- **International Expansion**: Multi-language support and global deployment

### Leadership Opportunities

- **Technical Leadership**: Lead development of major features and systems
- **Community Leadership**: Moderate communities and lead initiatives
- **Content Leadership**: Develop educational content and resources
- **Partnership Leadership**: Build relationships with organizations and employers

---

## 🙏 Thank You

Your contributions make a real difference in the lives of formerly incarcerated individuals. Whether you're contributing code, design, content, or community support, you're helping build a platform that creates second chances and empowers people to rebuild their lives with dignity.

**Together, we're not just building software - we're building hope, opportunity, and a better future for everyone.**

---

## 📞 Contact Information

- **General Questions**: contribute@formerlyincarcerated.org
- **Technical Questions**: dev@formerlyincarcerated.org
- **Community Questions**: community@formerlyincarcerated.org
- **Partnership Inquiries**: partners@formerlyincarcerated.org

### 🔗 Important Links

- **Main Repository**: [github.com/FormerlyIncarcerated/org](https://github.com/FormerlyIncarcerated/org)
- **Discord Community**: [discord.gg/fJPfsnZe9x](https://discord.gg/fJPfsnZe9x)
- **Documentation**: [docs.formerlyincarcerated.org](https://docs.formerlyincarcerated.org)
- **Main Platform**: [formerlyincarcerated.org](https://formerlyincarcerated.org)

---

**🏛️ Building second chances through collaborative technology and community-driven innovation.**

*Welcome to the FormerlyIncarcerated.org contributor community!*
