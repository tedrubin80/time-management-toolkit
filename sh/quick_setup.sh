#!/bin/bash

# Quick Setup Script for Time Management Toolkit
# Run this after copying all the artifacts

echo "🎯 Time Management Toolkit - Quick Setup"
echo "========================================"

# Make sure we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting up Heroku configuration..."

# Check if Heroku CLI is available
if command -v heroku &> /dev/null; then
    echo "✅ Heroku CLI found, configuring..."
    
    # Set buildpack
    heroku buildpacks:clear 2>/dev/null || true
    heroku buildpacks:set heroku/nodejs
    
    # Set critical environment variables
    heroku config:set NODE_ENV=production
    heroku config:set NPM_CONFIG_PRODUCTION=false
    heroku config:set GENERATE_SOURCEMAP=false
    heroku config:set SKIP_PREFLIGHT_CHECK=true
    heroku config:set REACT_APP_NAME="Time Management Toolkit"
    heroku config:set REACT_APP_THEME_COLOR="#4facfe"
    
    # Clear cache
    heroku repo:purge_cache 2>/dev/null || true
    
    echo "✅ Heroku configured successfully"
else
    echo "⚠️ Heroku CLI not found. Skipping Heroku configuration."
    echo "   Install with: npm install -g heroku"
fi

echo "🧪 Testing local build..."
if npm run build; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi

echo "📋 Checking file structure..."
if [ -f "public/index.html" ]; then
    echo "✅ public/index.html exists"
else
    echo "❌ public/index.html missing"
fi

if [ -f "Procfile" ]; then
    echo "✅ Procfile exists"
else
    echo "❌ Procfile missing"
fi

if [ -f "app.json" ]; then
    echo "✅ app.json exists"
else
    echo "❌ app.json missing"
fi

echo ""
echo "🎉 Setup complete! You can now:"
echo ""
echo "📊 Local development:"
echo "   npm run dev"
echo ""
echo "🚀 Deploy to GitHub Pages:"
echo "   npm run deploy"
echo ""
echo "☁️ Deploy to Heroku:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git push heroku main"
echo ""
echo "📊 Monitor Heroku deployment:"
echo "   heroku logs --tail"
echo ""
echo "🌐 Your GitHub Pages URL:"
echo "   https://tedrubin80.github.io/time-management-toolkit"
echo ""

# Show current status
echo "📋 Current project status:"
echo "   Node.js: $(node --version)"
echo "   npm: $(npm --version)"
echo "   Git status: $(git status --porcelain | wc -l) files changed"

if command -v heroku &> /dev/null; then
    echo "   Heroku app: $(heroku apps:info --json 2>/dev/null | grep -o '"name":"[^"]*' | cut -d'"' -f4 || echo 'Not connected')"
fi

echo ""
echo "✨ Happy coding!"