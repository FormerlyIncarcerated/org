# Deployment

Guide for deploying your FUSED GAMING React TypeScript application to various platforms.

## Build Process

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build process:
1. TypeScript compilation and type checking
2. Vite bundling and optimization
3. Asset optimization and compression
4. Code splitting and tree shaking

### Build Output

```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].css   # Bundled CSS
│   ├── index-[hash].js    # Main JavaScript bundle
│   ├── vendor-[hash].js   # Third-party dependencies
│   └── [other-chunks].js  # Code-split chunks
└── vite.svg               # Static assets
```

## Deployment Platforms

### Vercel (Recommended)

Vercel provides excellent support for React applications with automatic deployments.

#### Setup

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   # First deployment
   vercel

   # Production deployment
   vercel --prod
   ```

3. **Configuration** (`vercel.json`)
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "framework": "vite"
   }
   ```

#### Features
- Automatic deployments from Git
- Preview deployments for pull requests
- Edge functions support
- Built-in analytics
- Custom domains

### Netlify

Netlify offers simple deployment with continuous integration.

#### Setup

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Configuration** (`netlify.toml`)
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy**
   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli

   # Build and deploy
   npm run build
   netlify deploy --prod --dir=dist
   ```

#### Features
- Form handling
- Serverless functions
- Split testing
- Identity management
- Edge handlers

### GitHub Pages

Deploy directly from your GitHub repository.

#### Setup

1. **Install gh-pages**
   ```bash
   npm i -D gh-pages
   ```

2. **Add Deploy Script** (`package.json`)
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Configure Vite** (`vite.config.ts`)
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... other config
   });
   ```

4. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

#### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### AWS S3 + CloudFront

Deploy to AWS for scalable hosting with CDN.

#### Setup

1. **Create S3 Bucket**
   - Enable static website hosting
   - Configure bucket policy for public access

2. **Build and Upload**
   ```bash
   npm run build
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **CloudFront Distribution**
   - Create distribution pointing to S3 bucket
   - Configure custom error pages for SPA routing

4. **Automated Deployment**
   ```bash
   # Install AWS CLI
   pip install awscli

   # Configure credentials
   aws configure

   # Deploy script
   npm run build
   aws s3 sync dist/ s3://your-bucket-name --delete
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

### Docker Deployment

Containerize your application for consistent deployments.

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### Build and Run

```bash
# Build Docker image
docker build -t fused-gaming-app .

# Run container
docker run -p 8080:80 fused-gaming-app
```

## Environment Variables

### Build-time Variables

Vite supports environment variables prefixed with `VITE_`:

```bash
# .env.production
VITE_API_URL=https://api.production.com
VITE_APP_VERSION=1.0.0
```

### Usage in Code

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const version = import.meta.env.VITE_APP_VERSION;
```

### Platform-specific Configuration

#### Vercel
```bash
# Environment variables in Vercel dashboard
VITE_API_URL=https://api.vercel.app
```

#### Netlify
```bash
# Environment variables in Netlify dashboard
VITE_API_URL=https://api.netlify.app
```

## Performance Optimization

### Build Optimization

1. **Bundle Analysis**
   ```bash
   npm run build -- --analyze
   ```

2. **Code Splitting**
   ```typescript
   // Lazy load routes
   const Home = lazy(() => import('./pages/Home'));
   const About = lazy(() => import('./pages/About'));
   ```

3. **Asset Optimization**
   - Image compression
   - Font optimization
   - CSS purging

### Runtime Performance

1. **Caching Headers**
   ```nginx
   # Cache static assets
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

2. **Compression**
   ```nginx
   # Enable gzip compression
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

## Monitoring and Analytics

### Error Tracking

```typescript
// Sentry integration
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

### Performance Monitoring

```typescript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Analytics

```typescript
// Google Analytics 4
import { gtag } from 'ga-gtag';

gtag('config', 'GA_MEASUREMENT_ID');
```

## Security Considerations

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### HTTPS Configuration

- Always use HTTPS in production
- Configure HSTS headers
- Use secure cookies

### Environment Security

- Never commit sensitive environment variables
- Use platform-specific secret management
- Rotate API keys regularly

## Troubleshooting

### Common Issues

1. **Routing Issues**
   - Configure server to serve `index.html` for all routes
   - Check base URL configuration

2. **Asset Loading**
   - Verify asset paths in production
   - Check CORS configuration

3. **Environment Variables**
   - Ensure variables are prefixed with `VITE_`
   - Check platform-specific configuration

### Debug Mode

```bash
# Build with debug information
npm run build -- --mode development

# Serve with debug logs
npm run preview -- --debug
```
