# F.Inc. - Formerly Incarcerated.org

> Building second chances through Web3 technology and community-driven support systems.

## 🌟 Mission

To empower formerly incarcerated individuals through innovative Web3 technology, creating sustainable pathways to economic independence, community integration, and personal growth.

## 🚀 Features

### 🎨 **v1.0.0 - Professional Branding & Enhanced UX**
- **Custom Logo**: Professional SVG with padlock symbolism representing freedom from barriers
- **Advanced Theming**: Custom color palette with Dark Mode first approach
- **Magic UI Theme Selector**: Animated dropdown with live color palette preview
- **Enhanced Navigation**: Consistent header/footer across all pages with larger, prominent logo

### 📱 **Complete Platform**
- **Comprehensive About Page**: Mission, values, and impact statistics
- **Web3 Programs Showcase**: 8 detailed utility token programs
- **Interactive Survey**: 6-step comprehensive feedback collection system
- **Contact & Engagement**: Multi-channel contact forms and community integration
- **Responsive Design**: Mobile-first approach optimized for all devices
- **SEO Optimized**: Structured data, Open Graph, and performance optimized

## 🎨 Design System

### **Custom Color Palette**
```css
--color-1: #002447; /* Deep Navy Gradient - Primary Background */
--color-2: #53d3d1; /* Bright Teal - Interactive elements */
--color-3: #fbeceb; /* Soft Cream - Accent details */
--color-4: #feb249; /* Vibrant Orange - Call-to-action highlights */
```

### **Theme Features**
- **Dark Mode First**: Beautiful dark theme as default with bright accent colors
- **Light Mode Support**: Clean light theme with proper contrast ratios
- **System Integration**: Automatic theme detection based on user preferences
- **Smooth Transitions**: Animated theme switching with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19 and TypeScript 5
- **Package Manager**: npm (transitioning to bun for production)
- **Styling**: Tailwind CSS 3.4 with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React + Web3 Icons, no emojis in UI
- **Animation**: Framer Motion 11, Magic UI components
- **Theme Management**: next-themes with 6-theme support
- **Testing**: Jest 29 with React Testing Library
- **Web3**: Wagmi 2.x, Viem 2.x, RainbowKit 2.x (ready for integration)
- **Documentation**: Docusaurus for docs.formerlyincarcerated.org
- **Process Management**: PM2 with clustering for production
- **Hosting**: infuze.cloud Ubuntu server with git CI/CD deployment


## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/formerly-incarcerated-empowerment/platform.git
cd platform
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development servers:
```bash
# Main site (port 3000)
npm run dev

# Documentation site (port 3002)
npm run docs:dev
```

5. Open the applications:
   - **Main site**: [http://localhost:3000](http://localhost:3000)
   - **Documentation**: [http://localhost:3002](http://localhost:3002)

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
├── app/                    # Next.js 15 App Router
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── programs/          # Programs showcase
│   ├── proposals/         # Proposals page
│   ├── survey/            # Community survey
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage with animated hero
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   ├── magicui/          # Magic UI animated components
│   ├── animated-*.tsx    # Feature animations
│   ├── header.tsx        # Navigation header with theme selector
│   ├── footer.tsx        # Site footer
│   ├── theme-provider.tsx # Theme context provider
│   └── wallet-connect.tsx # Web3 wallet integration (ready)
├── lib/                  # Utility libraries
│   ├── config.ts         # Site configuration
│   ├── analytics.ts      # Analytics utilities
│   ├── web3-config.ts    # Web3 configuration
│   ├── structured-data.ts # SEO structured data
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
│   ├── use-mobile.tsx    # Mobile detection
│   ├── use-mouse-position.ts # Mouse tracking
│   └── use-toast.ts      # Toast notifications
├── docs/                 # Legacy documentation
├── docs-site/            # Docusaurus documentation site
│   ├── docs/             # Documentation content
│   ├── blog/             # Blog posts
│   ├── src/              # Docusaurus customization
│   └── static/           # Static assets
├── __tests__/            # Jest test files
├── logs/                 # Application logs
├── bunfig.toml           # Bun configuration
├── ecosystem.config.js   # PM2 process management
├── DEPLOYMENT_PLAN.md    # Production deployment guide
├── PROJECT_STRUCTURE.md  # Detailed project documentation
└── public/               # Static assets (logos, icons, etc.)
```

## 🗺️ Development Roadmap

### Phase 1: Foundation ✅ (Completed June 2025)
- [x] **Project Structure**: Comprehensive cleanup and organization
- [x] **Documentation Site**: Docusaurus setup for docs.formerlyincarcerated.org
- [x] **Deployment Planning**: Complete infuze.cloud deployment strategy
- [x] **Local Development**: Working dev environment with dual-port setup
- [x] **Testing Infrastructure**: Jest configuration and basic test suite
- [x] **Professional Branding**: 6-theme system with advanced theming
- [x] **Core Pages**: About, Programs, Survey, Contact, Proposals
- [x] **SEO Optimization**: Structured data, meta tags, sitemap

### Phase 2: Production Deployment (Next Steps)
- [ ] **Server Setup**: Provision infuze.cloud Ubuntu instance
- [ ] **Git CI/CD**: Implement automated deployment pipeline
- [ ] **SSL & Security**: Configure Let's Encrypt certificates
- [ ] **Domain Configuration**: Set up formerlyincarcerated.org DNS
- [ ] **Monitoring**: PM2 process management and logging
- [ ] **Performance**: Optimize build and caching strategies

### Phase 3: Content Enhancement (Q3 2025)
- [ ] **Survey Analytics**: Advanced feedback collection and reporting
- [ ] **Content Expansion**: Blog, resources, and educational content
- [ ] **Community Features**: Forums, discussion boards, events
- [ ] **User Experience**: Enhanced accessibility and mobile optimization

### Phase 4: Web3 Integration (Q4 2025 - Q1 2026)
- [ ] **Wallet Connection**: Web3 authentication and user profiles
- [ ] **Governance Token**: Second Chance Governance Token (SCG) implementation
- [ ] **Basic DAO**: Community voting and proposal system
- [ ] **Skill Verification**: NFT-based credential system

### Phase 5: Advanced Features (Q2-Q3 2026)
- [ ] **Job Marketplace**: Decentralized employment platform
- [ ] **Micro-Investment DAO**: Community-funded business opportunities
- [ ] **Peer-to-Peer Lending**: Blockchain-based financial services
- [ ] **Cross-Chain Integration**: Multi-blockchain support

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines and code of conduct.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📊 Key Statistics

- **70 Million**: Americans with criminal records
- **27%**: Unemployment rate among formerly incarcerated individuals
- **68%**: Recidivism rate within three years
- **$87 Billion**: Annual economic impact of employment barriers

## 🌐 Web3 Utility Tokens (Planned)

1. **Second Chance Governance Token (SCG)** - Community governance and funding decisions
2. **Skill Verification NFTs** - Blockchain-verified credentials and certifications
3. **Micro-Investment DAO** - Collective investment in formerly incarcerated-owned businesses
4. **Resource Access Tokens** - Exchange for housing, legal aid, and support services
5. **Job Marketplace Protocol** - Decentralized employment opportunities
6. **Peer-to-Peer Lending** - Community-backed financial services

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: contact@formerlyincarcerated.org
- **Twitter**: [@FormerlyIncEmp](https://twitter.com/FormerlyIncEmp)
- **Discord**: [Join our community](https://discord.gg/formerly-incarcerated-empowerment)
- **Website**: [formerlyincarcerated.org](https://formerlyincarcerated.org)

## 🙏 Acknowledgments

- The formerly incarcerated community for their resilience and feedback
- Web3 developers and advocates supporting social impact
- Organizations working on criminal justice reform
- Contributors and supporters of this platform

---

**Building bridges, not barriers. Creating opportunities, not obstacles.**
