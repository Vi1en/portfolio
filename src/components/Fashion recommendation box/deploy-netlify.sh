#!/bin/bash

echo "🚀 Deploying to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🌐 Deploying to Netlify..."
    
    # Deploy to Netlify
    netlify deploy --dir=dist --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 Successfully deployed to Netlify!"
        echo "🔗 Your live URL will be shown above"
    else
        echo "❌ Deployment failed. Please check the errors above."
        exit 1
    fi
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
