# Frequently Asked Questions

Common questions and answers about the FUSED GAMING React TypeScript Boilerplate.

## General Questions

### What is FUSED GAMING Boilerplate?

FUSED GAMING is a modern, production-ready React TypeScript boilerplate created by Its Different Productions. It provides a comprehensive foundation for building React applications with best practices, modern tooling, and a beautiful theme system.

### Who created this boilerplate?

This boilerplate was created by [Its Different Productions](https://itsdifferentproductions.com), a development studio focused on creating high-quality web applications and tools.

### Is this boilerplate free to use?

Yes, this boilerplate is released under the MIT License, which means you can use it for both personal and commercial projects.

### What makes this different from other React boilerplates?

- **5 Beautiful Themes**: Pre-built theme system with gaming-inspired designs
- **Production Ready**: Comprehensive tooling and best practices included
- **TypeScript First**: Strict type safety throughout the codebase
- **Modern Stack**: Latest versions of React, Vite, and other tools
- **Comprehensive Documentation**: Detailed guides and examples

## Technical Questions

### What versions of Node.js are supported?

The boilerplate requires Node.js 18.0.0 or higher and npm 9.0.0 or higher.

### Can I use Yarn or pnpm instead of npm?

Yes, you can use any package manager. However, you may need to:
- Delete `package-lock.json` if using Yarn or pnpm
- Update the scripts in `package.json` if needed
- Ensure your package manager version is compatible

### How do I add new dependencies?

```bash
# For runtime dependencies
npm install package-name

# For development dependencies
npm install -D package-name
```

Always use the package manager commands rather than manually editing `package.json`.

### Can I use this with Next.js?

This boilerplate is specifically designed for Vite + React. For Next.js, you would need to:
- Migrate the components to Next.js structure
- Adapt the routing to Next.js file-based routing
- Update the build configuration

### How do I customize the themes?

See the [Theme System documentation](../technical/theming.md) for detailed instructions on:
- Modifying existing themes
- Creating new themes
- Understanding the color system

### Can I remove the theme system?

Yes, you can remove the theme system by:
1. Removing the `ThemeContext` and related files
2. Updating components to use static colors
3. Simplifying the CSS variables

However, we recommend keeping it for flexibility.

## Development Questions

### How do I add new pages?

1. Create a new component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Export the component from `src/pages/index.ts`

Example:
```tsx
// src/pages/NewPage.tsx
export const NewPage = () => {
  return <div>New Page Content</div>;
};

// src/App.tsx
<Route path="new-page" element={<NewPage />} />
```

### How do I add new components?

1. Create the component in the appropriate directory under `src/components/`
2. Write tests for the component
3. Export it from the relevant index file
4. Document the component's props and usage

### Why are my tests failing?

Common test issues:
- **Import errors**: Check your import paths and ensure components are exported
- **Theme context**: Some components require the ThemeProvider wrapper
- **Mock issues**: Ensure external dependencies are properly mocked
- **Async operations**: Use `waitFor` for asynchronous operations

### How do I debug build issues?

1. Check TypeScript errors: `npm run type-check`
2. Check linting errors: `npm run lint`
3. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
4. Check for circular dependencies
5. Verify all imports are correct

## Deployment Questions

### Which deployment platform should I use?

We recommend **Vercel** for most use cases because:
- Excellent React/Vite support
- Automatic deployments from Git
- Preview deployments for PRs
- Built-in analytics and performance monitoring

Other good options:
- **Netlify**: Great for static sites with forms
- **GitHub Pages**: Free for open source projects
- **AWS S3 + CloudFront**: For enterprise deployments

### How do I set up environment variables?

1. Create `.env.local` for local development
2. Prefix variables with `VITE_` to make them available in the browser
3. Configure variables in your deployment platform
4. Never commit sensitive variables to Git

### My app doesn't work after deployment

Common deployment issues:
- **Routing**: Configure your server to serve `index.html` for all routes
- **Base URL**: Set the correct base URL in `vite.config.ts`
- **Environment variables**: Ensure they're properly configured on the platform
- **CORS**: Check API CORS configuration

### How do I set up a custom domain?

Each platform has different steps:
- **Vercel**: Add domain in project settings
- **Netlify**: Configure domain in site settings
- **GitHub Pages**: Add CNAME file to repository

## Customization Questions

### How do I change the color scheme?

1. Modify the CSS custom properties in `src/styles/themes.css`
2. Update the theme configuration in `src/utils/themeConfig.ts`
3. Test all themes to ensure consistency

### Can I use a different CSS framework?

Yes, but you'll need to:
1. Remove Tailwind CSS dependencies
2. Update all component styles
3. Modify the theme system if needed
4. Update the build configuration

### How do I add animations?

The boilerplate includes Framer Motion. You can:
1. Use the existing motion components
2. Add new animations to components
3. Create reusable animation variants
4. Configure global animation settings

### Can I use this for mobile apps?

This boilerplate is designed for web applications. For mobile apps, consider:
- **React Native**: For native mobile apps
- **Capacitor**: To wrap this web app as a mobile app
- **PWA**: Configure as a Progressive Web App

## Performance Questions

### How do I optimize bundle size?

1. Use dynamic imports for code splitting
2. Remove unused dependencies
3. Optimize images and assets
4. Use the bundle analyzer: `npm run build -- --analyze`

### How do I improve loading performance?

1. Implement lazy loading for routes
2. Optimize images (WebP, proper sizing)
3. Use CDN for static assets
4. Enable compression on your server

### How do I monitor performance?

1. Use browser DevTools
2. Implement Web Vitals monitoring
3. Set up error tracking (Sentry)
4. Use platform analytics (Vercel Analytics)

## Support Questions

### Where can I get help?

1. Check this documentation
2. Search existing GitHub issues
3. Create a new GitHub issue
4. Visit [Its Different Productions](https://itsdifferentproductions.com)

### How do I report bugs?

1. Check if the issue already exists
2. Create a minimal reproduction case
3. Include environment details (Node.js version, OS, browser)
4. Open a GitHub issue with detailed information

### Can I contribute to the project?

Yes! We welcome contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

### How do I stay updated?

1. Watch the GitHub repository for releases
2. Follow [Its Different Productions](https://itsdifferentproductions.com)
3. Check the [CHANGELOG.md](../../CHANGELOG.md) for updates

## License Questions

### Can I use this commercially?

Yes, the MIT License allows commercial use.

### Do I need to credit Its Different Productions?

While not required by the license, we appreciate attribution and would love to see what you build!

### Can I modify and redistribute?

Yes, you can modify and redistribute under the MIT License terms.

### What are my obligations?

The MIT License requires you to include the original license notice in any substantial portions of the software you distribute.
