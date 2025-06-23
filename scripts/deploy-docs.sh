#!/bin/bash

# Docs Deployment Script
# This script handles the deployment of the documentation site to Vercel

set -e

echo "🚀 Starting docs deployment..."

# Check if we're in the right directory
if [ ! -f "docs-site/package.json" ]; then
    echo "❌ Error: docs-site/package.json not found. Please run from project root."
    exit 1
fi

# Navigate to docs directory
cd docs-site

echo "📦 Installing dependencies..."
bun install

echo "🔨 Building documentation..."
bun run build

echo "🚀 Deploying to Vercel..."
if [ "$1" = "--production" ]; then
    echo "Deploying to production..."
    vercel --prod
else
    echo "Deploying to preview..."
    vercel
fi

echo "✅ Deployment completed!"
echo "📖 Documentation available at: https://docs.formerlyincarcerated.org"
