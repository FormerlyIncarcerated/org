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
--color-1: #002447; /* Deep Navy - Primary elements */
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

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React + Web3 Icons
- **Animation**: Framer Motion
- **Testing**: Jest with React Testing Library
- **Analytics**: Google Analytics integration ready

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/formerly-incarcerated-empowerment/platform.git
cd platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser.

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
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── programs/          # Programs showcase
│   ├── survey/            # Community survey
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── animated-hero.tsx # Hero section
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Site footer
│   └── wallet-connect.tsx # Web3 wallet (placeholder)
├── lib/                  # Utility libraries
│   ├── config.ts         # Site configuration
│   ├── analytics.ts      # Analytics utilities
│   ├── web3-config.ts    # Web3 configuration
│   └── structured-data.ts # SEO structured data
├── docs/                 # Documentation
│   └── WEB3_ARCHITECTURE.md # Web3 technical design
├── __tests__/            # Test files
└── public/               # Static assets
```

## 🗺️ Development Roadmap

### Phase 1: Foundation ✅ (Completed June 2025)
- [x] Site cleanup and branding
- [x] Core pages development
- [x] SEO optimization
- [x] Testing infrastructure

### Phase 2: Content Enhancement (Q3 2025)
- [ ] Survey integration and analytics
- [ ] Content expansion and blog
- [ ] Community features
- [ ] Performance optimization

### Phase 3: Web3 Integration (Q4 2025 - Q1 2026)
- [ ] Wallet connection
- [ ] Governance token implementation
- [ ] Basic DAO features
- [ ] Skill verification NFTs

### Phase 4: Advanced Features (Q2-Q3 2026)
- [ ] Job marketplace
- [ ] Micro-lending protocol
- [ ] Investment DAO
- [ ] Cross-chain integration

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
