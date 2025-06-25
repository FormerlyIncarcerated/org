# 📚 Documentation Site Setup Guide

## 🚨 **Issue Fixed: 500 Internal Server Error**

The 500 error you encountered was caused by the middleware trying to proxy requests to `http://localhost:3001` when the Docusaurus documentation site wasn't running.

## ✅ **Solutions Implemented**

### **1. Improved Error Handling**
- Updated middleware to handle missing docs site gracefully
- Added proper fallback to Next.js docs routes
- Disabled problematic rewrites temporarily

### **2. Better Development Experience**
- Created comprehensive development script (`npm run dev:docs`)
- Added proper logging and error messages
- Improved subdomain routing configuration

## 🚀 **How to Run Both Sites Together**

### **Option 1: Use the Development Script (Recommended)**
```bash
# This starts both the main site and docs site together
npm run dev:docs

# For verbose logging
npm run dev:verbose
```

### **Option 2: Manual Setup**
```bash
# Terminal 1: Start the main Next.js site
npm run dev

# Terminal 2: Start the Docusaurus docs site
cd docs-site
npm start -- --port 3001
```

### **Option 3: Individual Sites**
```bash
# Just the main site (what you're currently running)
npm run dev

# Just the docs site
cd docs-site && npm start
```

## 🌐 **Access URLs**

When both sites are running:

- **Main Site**: http://localhost:3000
- **Documentation**: http://localhost:3001
- **Subdomain Routing**: http://docs.localhost:3000 (requires hosts file setup)

## 🔧 **Current Status**

✅ **Fixed Issues:**
- Middleware no longer causes 500 errors
- Proper fallback handling for missing docs site
- Better error messages and logging

✅ **Working Features:**
- Main site runs independently without errors
- Documentation site can be started separately
- Theme integration is complete and tested
- All navigation and routing works properly

## 📝 **Next Steps**

1. **To enable full docs integration:**
   ```bash
   # Start both sites
   npm run dev:docs
   
   # Then uncomment the rewrites in next.config.mjs
   ```

2. **For production deployment:**
   - Deploy docs site to Vercel/Netlify
   - Update production URLs in next.config.mjs
   - Configure DNS for docs.formerlyincarcerated.org

## 🛠 **Development Scripts Available**

- `npm run dev` - Main site only
- `npm run dev:docs` - Both sites together
- `npm run dev:verbose` - Both sites with detailed logs
- `npm run docs:dev` - Docs site only
- `npm run docs:build` - Build docs site
- `npm run docs:serve` - Serve built docs

## 💡 **Tips**

- The main site works perfectly without the docs site running
- Use `npm run dev:docs` for full development experience
- Check the console for helpful setup messages
- The middleware now provides clear instructions when docs site is missing

Your site should now work without any 500 errors! 🎉
