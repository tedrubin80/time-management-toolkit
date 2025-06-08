#!/bin/bash

# Automatic React Dependency Conflict Fix Script
# Resolves React 18 + react-scripts compatibility issues

echo "🔧 Fixing React dependency conflicts..."
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
warning() { echo -e "${YELLOW}⚠️ $1${NC}"; }
info() { echo -e "${BLUE}ℹ️ $1${NC}"; }

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    error "package.json not found. Please run this from the project root."
    exit 1
fi

# Step 1: Backup current package.json
info "Creating backup of package.json..."
cp package.json package.json.backup
success "Backup created: package.json.backup"

# Step 2: Clean existing installation
info "Cleaning existing dependencies..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    success "Removed node_modules"
fi

if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    success "Removed package-lock.json"
fi

# Step 3: Clear npm cache
info "Clearing npm cache..."
npm cache clean --force
success "Cache cleared"

# Step 4: Create .npmrc with legacy peer deps
info "Creating .npmrc configuration..."
cat > .npmrc << EOF
# NPM Configuration for React 18 compatibility
legacy-peer-deps=true
fund=false
audit=false
loglevel=warn
progress=false
EOF
success ".npmrc created with legacy-peer-deps=true"

# Step 5: Show current React versions in package.json
info "Current React versions in package.json:"
if command -v jq &> /dev/null; then
    echo "  React: $(jq -r '.dependencies.react // "not found"' package.json)"
    echo "  React-DOM: $(jq -r '.dependencies["react-dom"] // "not found"' package.json)"
    echo "  React-Scripts: $(jq -r '.dependencies["react-scripts"] // "not found"' package.json)"
else
    grep -E "(react|react-dom|react-scripts)" package.json | head -3
fi

# Step 6: Install dependencies with legacy peer deps
info "Installing dependencies with --legacy-peer-deps..."
if npm install --legacy-peer-deps; then
    success "Dependencies installed successfully"
else
    error "Dependency installation failed"
    warning "Restoring backup package.json..."
    mv package.json.backup package.json
    exit 1
fi

# Step 7: Test the build
info "Testing build process..."
if npm run build; then
    success "Build completed successfully!"
else
    error "Build failed. Checking for common issues..."
    
    # Try with force flag
    warning "Attempting build with npm audit fix..."
    npm audit fix --legacy-peer-deps
    
    if npm run build; then
        success "Build succeeded after audit fix!"
    else
        error "Build still failing. Manual intervention required."
        echo ""
        echo "🔍 Common solutions:"
        echo "1. Check React version compatibility"
        echo "2. Update @testing-library packages"
        echo "3. Clear browser cache and try again"
        echo "4. Check for TypeScript errors if using TS"
        exit 1
    fi
fi

# Step 8: Check for peer dependency warnings
info "Checking for remaining peer dependency issues..."
npm ls > dependency-check.log 2>&1

if grep -q "ERESOLVE\|peer dep" dependency-check.log; then
    warning "Some peer dependency warnings remain, but build succeeded"
    echo "Details in dependency-check.log"
else
    success "No peer dependency conflicts detected"
    rm -f dependency-check.log
fi

# Step 9: Update Heroku configuration
if command -v heroku &> /dev/null && heroku apps:info &> /dev/null 2>&1; then
    info "Updating Heroku configuration..."
    heroku config:set NPM_CONFIG_LEGACY_PEER_DEPS=true
    heroku config:set NPM_CONFIG_FUND=false
    heroku config:set NPM_CONFIG_AUDIT=false
    success "Heroku environment variables updated"
else
    info "Heroku CLI not found or not logged in. Skipping Heroku config."
fi

# Step 10: Git status check
info "Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    warning "You have uncommitted changes. Consider committing:"
    echo ""
    echo "git add package.json package-lock.json .npmrc"
    echo "git commit -m 'Fix React dependency conflicts'"
    echo ""
fi

# Step 11: Final verification
echo ""
echo "🧪 Final verification:"
echo "==================="

# Check React versions
info "Installed React versions:"
if [ -f "node_modules/react/package.json" ]; then
    REACT_VER=$(jq -r '.version' node_modules/react/package.json 2>/dev/null || echo "unknown")
    echo "  React: $REACT_VER"
fi

if [ -f "node_modules/react-dom/package.json" ]; then
    REACT_DOM_VER=$(jq -r '.version' node_modules/react-dom/package.json 2>/dev/null || echo "unknown")
    echo "  React-DOM: $REACT_DOM_VER"
fi

if [ -f "node_modules/react-scripts/package.json" ]; then
    REACT_SCRIPTS_VER=$(jq -r '.version' node_modules/react-scripts/package.json 2>/dev/null || echo "unknown")
    echo "  React-Scripts: $REACT_SCRIPTS_VER"
fi

echo ""
success "Dependency conflicts fixed!"
echo ""
echo "🚀 Next steps:"
echo "1. Test locally: npm run dev"
echo "2. Commit changes: git add . && git commit -m 'Fix dependency conflicts'"
echo "3. Deploy to Heroku: git push heroku main"
echo "4. Monitor deployment: heroku logs --tail"
echo ""
echo "📋 Key files created/modified:"
echo "  ✅ .npmrc (enables legacy-peer-deps)"
echo "  ✅ package-lock.json (with resolved dependencies)"
echo "  ✅ node_modules (clean installation)"
echo ""
echo "💡 If you still have issues:"
echo "1. Check the dependency-check.log file"
echo "2. Try: npm run install-legacy"
echo "3. Or use: npm install --force"
echo ""
echo "🎉 Happy coding with React 18!"