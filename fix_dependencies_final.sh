#!/bin/bash

# Automatic React Dependency Conflict Fix Script
# Fixes React 18 + react-scripts compatibility issues

echo "🔧 Fixing React dependency conflicts..."
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found."
    echo "Please run this script from your project root directory."
    exit 1
fi

# Step 1: Clean existing installation
echo "📦 Cleaning existing dependencies..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo "✅ Removed node_modules"
fi

if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    echo "✅ Removed package-lock.json"
fi

# Step 2: Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force
echo "✅ Cache cleared"

# Step 3: Create .npmrc if it doesn't exist
echo "⚙️ Configuring npm settings..."
cat > .npmrc << EOF
legacy-peer-deps=true
fund=false
audit=false
loglevel=warn
progress=false
EOF
echo "✅ Created .npmrc with legacy-peer-deps=true"

# Step 4: Install dependencies with legacy peer deps
echo "📥 Installing dependencies with --legacy-peer-deps..."
if npm install --legacy-peer-deps; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Error: Dependency installation failed"
    echo "💡 Try running: npm install --legacy-peer-deps --force"
    exit 1
fi

# Step 5: Test the build
echo "🧪 Testing build process..."
if npm run build; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed"
    echo "💡 Common solutions:"
    echo "   1. Check for TypeScript errors if using TS"
    echo "   2. Try: npm audit fix --legacy-peer-deps"
    echo "   3. Check React version compatibility"
    exit 1
fi

# Step 6: Show final status
echo ""
echo "🎉 Dependency conflicts fixed!"
echo ""
echo "📊 Installed versions:"
if [ -f "node_modules/react/package.json" ]; then
    REACT_VER=$(node -e "console.log(require('./node_modules/react/package.json').version)")
    echo "   React: $REACT_VER"
fi

if [ -f "node_modules/react-scripts/package.json" ]; then
    SCRIPTS_VER=$(node -e "console.log(require('./node_modules/react-scripts/package.json').version)")
    echo "   React Scripts: $SCRIPTS_VER"
fi

echo ""
echo "🚀 Next steps:"
echo "1. Test locally: npm run dev"
echo "2. Commit changes: git add . && git commit -m 'Fix dependency conflicts'"
echo "3. Deploy to Heroku: git push heroku main"
echo ""
echo "✨ Happy coding!"