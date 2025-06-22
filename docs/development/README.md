# Development Documentation

This directory contains all development-related documentation including contributor guides, development workflows, and coding standards.

## 📋 Current Files

### Development Guides
- `DEVELOPMENT_GUIDE.md` - Complete contributor onboarding and development setup
- `AUGMENT_GUIDELINES` - AI assistant guidelines and development practices

## 🛠️ Getting Started

### For New Contributors
1. Read [Development Guide](./DEVELOPMENT_GUIDE.md)
2. Review [Augment Guidelines](./AUGMENT_GUIDELINES)
3. Set up local development environment
4. Join our [Discord community](https://discord.gg/formerly-incarcerated-empowerment)

### Development Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase, PostgreSQL
- **Web3**: Wagmi, Viem, RainbowKit
- **Testing**: Jest, React Testing Library
- **Package Manager**: Bun (preferred)

### Key Commands
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun run test

# Build for production
bun run build
```

## 🤝 Contributing

- Follow the [Development Guide](./DEVELOPMENT_GUIDE.md)
- Use conventional commit messages
- Write tests for new features
- Ensure accessibility compliance
- Maintain TypeScript strict mode
