# Getting Started

Welcome to FUSED GAMING React TypeScript Boilerplate! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** for version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/itsdifferentproductions/fused-gaming-boilerplate.git
cd fused-gaming-boilerplate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Your application will be available at `http://localhost:5174`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run tests in watch mode |
| `npm run test:ui` | Run tests with UI interface |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint code with ESLint |
| `npm run lint:fix` | Fix linting issues automatically |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Type check without emitting files |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── navigation/     # Navigation components (Header, Footer)
│   ├── forms/          # Form components with validation
│   └── layout/         # Layout components
├── context/            # React contexts (Theme, etc.)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── styles/             # Global styles and themes
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── test/               # Test utilities and setup
└── assets/             # Static assets
```

## First Steps

1. **Explore the Demo**: Visit the theme demo page to see all available themes
2. **Check Components**: Browse the component library in `src/components/ui/`
3. **Customize Themes**: Modify theme colors in `src/styles/themes.css`
4. **Add Your Content**: Start building your application in `src/pages/`

## Development Tips

- Use the theme context to switch between themes dynamically
- All components are fully typed with TypeScript
- Tests are set up with Vitest and React Testing Library
- Framer Motion is configured for smooth animations
- Tailwind CSS provides utility-first styling

## Next Steps

- [Learn about the Architecture](../technical/architecture.md)
- [Explore the Theme System](../technical/theming.md)
- [Browse Component Documentation](../technical/components.md)
- [Set up Testing](../technical/testing.md)

## Need Help?

- Check the [FAQ](./faq.md)
- Visit [Its Different Productions](https://itsdifferentproductions.com)
- Open an issue on GitHub
