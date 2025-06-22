# FormerlyIncarcerated.org Project Structure

**Updated:** June 22, 2025  
**Version:** 1.0.0

## 📁 Current Project Structure

```
formerlyincarcerated/
├── 📄 Configuration Files
│   ├── package.json              # Main project dependencies
│   ├── bun.lock                  # Bun lockfile
│   ├── next.config.mjs           # Next.js configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── postcss.config.mjs        # PostCSS configuration
│   ├── components.json           # shadcn/ui configuration
│   ├── jest.config.js            # Jest testing configuration
│   └── jest.setup.js             # Jest setup file
│
├── 📱 Application Source
│   ├── app/                      # Next.js 15 App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Global styles
│   │   ├── about/                # About page
│   │   ├── contact/              # Contact page
│   │   ├── programs/             # Programs page
│   │   ├── proposals/            # Proposals page
│   │   ├── survey/               # Survey page
│   │   ├── robots.ts             # Robots.txt generation
│   │   └── sitemap.ts            # Sitemap generation
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── magicui/              # Magic UI components
│   │   ├── animated-features.tsx # Feature animations
│   │   ├── animated-hero.tsx     # Hero animations
│   │   ├── blockchain-showcase.tsx
│   │   ├── floating-particles.tsx
│   │   ├── footer.tsx            # Site footer
│   │   ├── gradient-background.tsx
│   │   ├── gradient-hero.tsx
│   │   ├── header.tsx            # Site header
│   │   ├── theme-provider.tsx    # Theme context
│   │   ├── theme-selector.tsx    # Theme switcher
│   │   └── wallet-connect.tsx    # Web3 wallet connection
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-mobile.tsx        # Mobile detection
│   │   ├── use-mouse-position.ts # Mouse tracking
│   │   └── use-toast.ts          # Toast notifications
│   │
│   ├── lib/                      # Utility libraries
│   │   ├── analytics.ts          # Analytics configuration
│   │   ├── config.ts             # App configuration
│   │   ├── structured-data.ts    # SEO structured data
│   │   ├── utils.ts              # General utilities
│   │   └── web3-config.ts        # Web3 configuration
│   │
│   └── styles/                   # Additional styles
│
├── 🧪 Testing
│   └── __tests__/                # Test files
│       ├── components/           # Component tests
│       ├── lib/                  # Library tests
│       └── pages/                # Page tests
│
├── 📚 Documentation
│   ├── docs/                     # Legacy docs (to be migrated)
│   │   ├── README.md
│   │   ├── WEB3_ARCHITECTURE.md
│   │   └── technical/
│   │
│   └── docs-site/                # Docusaurus documentation site
│       ├── docs/                 # Documentation content
│       ├── blog/                 # Blog posts
│       ├── src/                  # Docusaurus customization
│       ├── static/               # Static assets
│       ├── docusaurus.config.ts  # Docusaurus configuration
│       ├── sidebars.ts           # Sidebar configuration
│       └── package.json          # Docusaurus dependencies
│
├── 🌐 Static Assets
│   └── public/                   # Public static files
│       ├── favicon.ico
│       ├── favicon.svg
│       ├── logo.png
│       ├── logo.svg
│       ├── og-image.png
│       ├── robots.txt
│       └── site.webmanifest
│
├── 💡 Project Resources
│   ├── Ideas/                    # Project ideas and concepts
│   │   ├── web3_felon_empowerment_ideas.md
│   │   └── web3_utility_survey.html
│   │
│   ├── AUGMENT_GUIDELINES        # AI assistant guidelines
│   ├── CHANGELOG.md              # Version history
│   ├── DEPLOYMENT_PLAN.md        # Deployment strategy
│   ├── DEVELOPMENT_PLAN.md       # Development roadmap
│   ├── PROJECT_STRUCTURE.md      # This file
│   ├── README.md                 # Project overview
│   ├── RELEASE_NOTES.md          # Release information
│   └── LICENSE                   # Project license
│
└── 🔧 Build & Dependencies
    ├── node_modules/             # npm dependencies
    ├── package-lock.json         # npm lockfile
    └── next-env.d.ts             # Next.js TypeScript definitions
```

## 🎯 Key Architectural Decisions

### Framework & Technology Stack
- **Next.js 15** with App Router for modern React development
- **TypeScript 5** for type safety and developer experience
- **Tailwind CSS 3.4** for utility-first styling
- **shadcn/ui** for consistent, accessible UI components
- **Framer Motion** for smooth animations
- **Bun** for fast package management and builds

### Component Organization
- **UI Components**: Reusable, atomic components in `/components/ui/`
- **Feature Components**: Page-specific components in `/components/`
- **Layout Components**: Header, footer, and layout wrappers
- **Animation Components**: Motion and interactive elements

### State Management
- **React Context**: Theme management and global state
- **Custom Hooks**: Reusable stateful logic
- **Local State**: Component-specific state with useState/useReducer

### Styling Strategy
- **Tailwind CSS**: Utility-first approach for rapid development
- **CSS Variables**: Theme-aware color system
- **Component Variants**: Using class-variance-authority for component styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Testing Strategy
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Test Organization**: Mirror source structure in `__tests__/`

## 🚀 Development Workflow

### Package Management
```bash
# Install dependencies
bun install

# Development server
bun run dev

# Production build
bun run build

# Run tests
bun run test
```

### Code Organization Principles
1. **Single Responsibility**: Each component/function has one clear purpose
2. **Composition over Inheritance**: Favor component composition
3. **Type Safety**: Comprehensive TypeScript usage
4. **Performance**: Lazy loading and code splitting
5. **Accessibility**: ARIA compliance and semantic HTML

### File Naming Conventions
- **Components**: PascalCase (e.g., `ThemeProvider.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useTheme.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Pages**: kebab-case directories (e.g., `about/page.tsx`)
- **Types**: PascalCase interfaces (e.g., `UserProfile.ts`)

## 📦 Dependencies Overview

### Core Dependencies
- **next**: React framework with App Router
- **react**: UI library
- **typescript**: Type system
- **tailwindcss**: CSS framework
- **framer-motion**: Animation library

### UI & Components
- **@radix-ui/***: Accessible UI primitives
- **lucide-react**: Icon library
- **class-variance-authority**: Component variants
- **tailwind-merge**: Tailwind class merging

### Web3 Integration
- **wagmi**: React hooks for Ethereum
- **viem**: TypeScript Ethereum library
- **@rainbow-me/rainbowkit**: Wallet connection UI
- **web3-icons**: Blockchain icons

### Development Tools
- **jest**: Testing framework
- **@types/***: TypeScript definitions
- **eslint**: Code linting
- **prettier**: Code formatting

## 🔄 Migration & Cleanup Tasks

### Completed ✅
- [x] Removed legacy boilerplate code from `Ideas/boilerplate/`
- [x] Set up Docusaurus documentation site
- [x] Created deployment plan
- [x] Organized project structure documentation

### In Progress 🔄
- [ ] Migrate remaining docs from `/docs/` to `/docs-site/docs/`
- [ ] Add bun-specific configuration files
- [ ] Create ecosystem.config.js for PM2
- [ ] Set up GitHub Actions for CI/CD

### Planned 📋
- [ ] Add comprehensive test coverage
- [ ] Set up Storybook for component documentation
- [ ] Implement error boundaries
- [ ] Add performance monitoring
- [ ] Create component library documentation

## 🎨 Design System Integration

### Theme System
- **6 Theme Support**: Default, Purple, Blue, Green, Amber, Red
- **Dark Mode First**: Optimized for dark theme
- **CSS Variables**: Dynamic theme switching
- **Component Theming**: Theme-aware component variants

### Component Library
- **shadcn/ui**: Base component system
- **Custom Components**: Extended functionality
- **Animation System**: Framer Motion integration
- **Responsive Design**: Mobile-first approach

---

**Next Steps:**
1. Complete documentation migration
2. Add bun configuration
3. Set up CI/CD pipeline
4. Implement comprehensive testing
5. Deploy to production environment
