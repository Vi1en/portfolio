#!/bin/bash

# Portfolio Deployment Script
echo "🚀 Deploying Manab's Portfolio..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Deployment Options:"
    echo "1. Netlify (Recommended)"
    echo "2. Vercel"
    echo "3. GitHub Pages"
    echo "4. Surge.sh"
    echo ""
    echo "📁 Your built files are in the 'dist' folder"
    echo "📋 To deploy manually, upload the contents of 'dist' to your hosting service"
    echo ""
    echo "🔗 Quick Deploy Commands:"
    echo "• Netlify: npx netlify-cli deploy --dir=dist --prod"
    echo "• Vercel: npx vercel --prod"
    echo "• Surge: npx surge dist"
    echo "• GitHub Pages: git push origin gh-pages"
else
    echo "❌ Build failed!"
    exit 1
fi
