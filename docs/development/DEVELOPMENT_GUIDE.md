# FormerlyIncarcerated.org - Development Guide

**Quick Start Guide for Local Development**

---

## 🚀 **Current Running Services**

### **Main Application**
- **URL**: http://localhost:3001 (auto-assigned due to port conflict)
- **Framework**: Next.js 15 with React 19
- **Status**: ✅ Running
- **Command**: `npm run dev`

### **Documentation Site**
- **URL**: http://localhost:3002
- **Framework**: Docusaurus
- **Status**: ✅ Running
- **Command**: `cd docs-site && npm start -- --port 3002`

---

## 🔧 **Development Commands**

### **Main Site Commands**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

### **Documentation Site Commands**
```bash
# Start docs development server
npm run docs:dev

# Build docs for production
npm run docs:build

# Serve built docs
npm run docs:serve

# Alternative: Direct commands
cd docs-site
npm start
npm run build
npm run serve
```

### **PM2 Production Commands**
```bash
# Start all services
npm run pm2:start

# Restart services
npm run pm2:restart

# Stop services
npm run pm2:stop

# View logs
npm run pm2:logs

# Monitor services
npm run pm2:monit
```

---

## 📁 **Key Files & Directories**

### **Configuration Files**
- `package.json` - Main project dependencies and scripts
- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration
- `bunfig.toml` - Bun package manager configuration
- `ecosystem.config.js` - PM2 process management

### **Application Structure**
- `app/` - Next.js App Router pages and layouts
- `components/` - React components (UI, animations, features)
- `lib/` - Utility libraries and configurations
- `hooks/` - Custom React hooks
- `__tests__/` - Jest test files
- `public/` - Static assets (images, icons, etc.)

### **Documentation**
- `docs-site/` - Docusaurus documentation site
- `docs/` - Legacy documentation (being migrated)
- `DEPLOYMENT_PLAN.md` - Production deployment guide
- `PROJECT_STRUCTURE.md` - Detailed project organization
- `PROJECT_STATUS.md` - Current project status

---

## 🛠️ **Troubleshooting**

### **Common Issues**

#### **Dependency Conflicts**
If you encounter React 19 compatibility issues:
```bash
npm install --legacy-peer-deps
```

#### **Port Already in Use**
If ports 3000 or 3002 are busy:
```bash
# Kill processes on specific ports (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill processes on specific ports (Linux/Mac)
lsof -ti:3000 | xargs kill -9
```

#### **Jest Configuration Issues**
If tests fail with module resolution errors:
- Verify `moduleNameMapper` in `jest.config.js`
- Check that `@testing-library/dom` is installed
- Ensure test files match actual component exports

#### **Theme Switching Issues**
If themes don't switch properly:
- Check that `ThemeProvider` wraps the app in `layout.tsx`
- Verify CSS variables are defined in `globals.css`
- Ensure `next-themes` is properly configured

### **Restart Services**

#### **Restart Main Site**
```bash
# Stop current process (Ctrl+C in terminal)
# Then restart:
npm run dev
```

#### **Restart Documentation Site**
```bash
# Stop current process (Ctrl+C in terminal)
# Then restart:
cd docs-site
npm start -- --port 3002
```

#### **Full System Restart**
```bash
# Stop all processes
# Clear cache
npm run clean

# Reinstall dependencies if needed
npm install --legacy-peer-deps

# Restart both services
npm run dev
# In another terminal:
npm run docs:dev
```

---

## 🧪 **Testing**

### **Running Tests**
```bash
# Run all tests
npm test

# Run specific test file
npm test -- config.test.ts

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode (for development)
npm run test:watch
```

### **Test Structure**
- `__tests__/lib/` - Library and utility tests
- `__tests__/components/` - Component tests
- `__tests__/pages/` - Page tests

### **Current Test Status**
- ✅ Configuration tests passing (7/7)
- ⚠️ Some component tests need fixing (import/export issues)
- ✅ Core functionality verified manually

---

## 🎨 **Theme Development**

### **Available Themes**
1. **Default** - Dark navy with teal accents
2. **Purple** - Purple gradient theme
3. **Blue** - Blue gradient theme
4. **Green** - Green gradient theme
5. **Amber** - Amber/orange theme
6. **Red** - Red accent theme

### **Theme Configuration**
- Theme definitions: `lib/config.ts`
- CSS variables: `app/globals.css`
- Theme provider: `components/theme-provider.tsx`
- Theme selector: `components/theme-selector.tsx`

### **Adding New Themes**
1. Add theme config to `themeConfig` in `lib/config.ts`
2. Add CSS variables to `app/globals.css`
3. Test across all components

---

## 📦 **Dependencies**

### **Production Dependencies**
- Next.js 15, React 19, TypeScript 5
- Tailwind CSS 3.4, shadcn/ui components
- Framer Motion 11, Lucide React icons
- Web3 libraries (Wagmi, Viem, RainbowKit)

### **Development Dependencies**
- Jest 29, React Testing Library
- ESLint, Prettier, Husky
- TypeScript definitions

### **Package Management**
- Currently using `npm` with `--legacy-peer-deps`
- Bun configuration ready in `bunfig.toml`
- Transition to bun planned for production

---

## 🚀 **Deployment**

### **Local Development** ✅
- Main site: http://localhost:3000
- Docs site: http://localhost:3002

### **Production Deployment** (Planned)
- Main site: https://formerlyincarcerated.org
- Docs site: https://docs.formerlyincarcerated.org
- Server: infuze.cloud Ubuntu instance
- Process: Git-based CI/CD with PM2

### **Deployment Commands** (When Ready)
```bash
# Deploy to production
npm run deploy:production

# Deploy to staging
npm run deploy:staging

# Start PM2 services
npm run pm2:start
```

---

## 📞 **Quick Reference**

### **URLs**
- **Main Site**: http://localhost:3001
- **Documentation**: http://localhost:3002

### **Key Commands**
- **Start Dev**: `npm run dev`
- **Start Docs**: `npm run docs:dev`
- **Run Tests**: `npm test`
- **Build**: `npm run build`

### **Important Files**
- **Main Config**: `lib/config.ts`
- **Theme Config**: `app/globals.css`
- **Deployment Plan**: `DEPLOYMENT_PLAN.md`
- **Project Status**: `PROJECT_STATUS.md`

---

**Status**: Development Complete ✅  
**Next Step**: Production Deployment 🚀
