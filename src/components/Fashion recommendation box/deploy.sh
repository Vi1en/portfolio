#!/bin/bash

echo "🚀 Deploying AI Fashion Recommendation Box..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    echo ""
    echo "🌐 To host this project, you can:"
    echo "1. Upload the 'dist' folder to any static hosting service"
    echo "2. Use Netlify, Vercel, GitHub Pages, or any web server"
    echo "3. The project is now ready for deployment!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
