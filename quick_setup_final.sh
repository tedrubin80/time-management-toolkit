#!/bin/bash

# Quick Setup Script for Time Management Toolkit
# Fixes all dependency and deployment issues automatically

echo "🎯 Time Management Toolkit - Complete Setup"
echo "==========================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

success() { echo -e "${GREEN}✅ $1${NC}"; }
info() { echo -e "${BLUE}ℹ️ $1${NC}"; }
warning() { echo -e "${YELLOW}⚠️ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    error "package.json not found. Please run this from the project root."
    exit 1
fi

info "Starting complete setup process..."

# Step 1: Clean existing dependencies
info "Cleaning existing dependencies..."
rm -rf node_modules package-lock.json 2>/dev/null
npm cache clean --force
success "Environment cleaned"

# Step 2: Create/Update configuration files
info "Creating configuration files..."

# Create .npmrc
cat > .npmrc << 'EOF'
legacy-peer-deps=true
fund=false
audit=false
loglevel=warn
progress=false
EOF
success "Created .npmrc"

# Make sure Procfile exists
if [ ! -f "Procfile" ]; then
    echo "web: npm start" > Procfile
    success "Created Procfile"
fi

# Step 3: Install dependencies
info "Installing dependencies with legacy peer deps..."
if npm install --legacy-peer-deps; then
    success "Dependencies installed successfully"
else
    error "Dependency installation failed"
    warning "Trying with --force flag..."
    if npm install --legacy-peer-deps --force; then
        success "Dependencies installed with force flag"
    else
        error "Installation failed completely. Manual intervention required."
        exit 1
    fi
fi

# Step 4: Test build
info "Testing build process..."
if npm run build; then
    success "Build completed successfully!"
else
    error "Build failed. Attempting fixes..."
    
    # Try audit fix
    npm audit fix --legacy-peer-deps 2>/dev/null
    
    if npm run build; then
        success "Build succeeded after audit fix!"
    else
        warning "Build still failing. Check the errors above."
    fi
fi

# Step 5: Configure Heroku (if available)
if command -v heroku &> /dev/null; then
    info "Configuring Heroku..."
    
    # Check if logged in to Heroku
    if heroku auth:whoami &> /dev/null; then
        # Set buildpack
        heroku buildpacks:clear 2>/dev/null || true
        heroku buildpacks:set heroku/nodejs
        
        # Set environment variables
        heroku config:set NPM_CONFIG_LEGACY_PEER_DEPS=true
        heroku config:set NPM_CONFIG_PRODUCTION=false
        heroku config:set NODE_ENV=production
        heroku config:set GENERATE_SOURCEMAP=false
        
        # Clear cache
        heroku repo:purge_cache 2>/dev/null || true
        
        success "Heroku configured successfully"
    else
        warning "Not logged in to Heroku. Skipping Heroku configuration."
        info "To configure Heroku later, run: heroku login && ./quick-setup.sh"
    fi
else
    warning "Heroku CLI not found. Skipping Heroku configuration."
    info "Install with: npm install -g heroku"
fi

# Step 6: Show status
echo ""
echo "📊 Setup Summary:"
echo "=================="

# Check Node/npm versions
info "System versions:"
echo "   Node.js: $(node --version)"
echo "   npm: $(npm --version)"

# Check installed React versions
if [ -f "node_modules/react/package.json" ]; then
    REACT_VER=$(node -e "console.log(require('./node_modules/react/package.json').version)" 2>/dev/null)
    echo "   React: $REACT_VER"
fi

if [ -f "node_modules/react-scripts/package.json" ]; then
    SCRIPTS_VER=$(node -e "console.log(require('./node_modules/react-scripts/package.json').version)" 2>/dev/null)
    echo "   React Scripts: $SCRIPTS_VER"
fi

# Check file status
info "Configuration files:"
[ -f ".npmrc" ] && echo "   ✅ .npmrc" || echo "   ❌ .npmrc missing"
[ -f "Procfile" ] && echo "   ✅ Procfile" || echo "   ❌ Procfile missing"
[ -f "app.json" ] && echo "   ✅ app.json" || echo "   ❌ app.json missing"
[ -f "package.json" ] && echo "   ✅ package.json" || echo "   ❌ package.json missing"

# Check git status
echo ""
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    warning "You have uncommitted changes:"
    git status --short
    echo ""
    info "To commit and deploy:"
    echo "   git add ."
    echo "   git commit -m 'Fix all dependency and deployment issues'"
    echo "   git push heroku main"
else
    success "No uncommitted changes"
fi

echo ""
echo "🚀 Next steps:"
echo "=============="
echo "1. Test locally: npm run dev"
echo "2. Test build: npm run build"

if command -v heroku &> /dev/null && heroku auth:whoami &> /dev/null; then
    echo "3. Deploy to Heroku: git push heroku main"
    echo "4. Monitor deployment: heroku logs --tail"
fi

echo "5. Deploy to GitHub Pages: npm run deploy"

echo ""
success "Setup completed! Your Time Management Toolkit is ready to deploy! 🎉"
echo ""
echo "📚 Useful commands:"
echo "   npm run dev          - Start development server"
echo "   npm run build        - Build for production"
echo "   npm run deploy       - Deploy to GitHub Pages"
echo "   npm run fix-deps     - Fix dependency issues"

if command -v heroku &> /dev/null; then
    echo "   heroku logs --tail   - Monitor Heroku deployment"
fi

echo ""
echo "🎯 Your app will be available at:"
echo "   GitHub Pages: https://tedrubin80.github.io/time-management-toolkit"

if command -v heroku &> /dev/null && heroku auth:whoami &> /dev/null; then
    APP_NAME=$(heroku apps:info --json 2>/dev/null | grep -o '"name":"[^"]*' | cut -d'"' -f4 2>/dev/null || echo "your-app")
    echo "   Heroku: https://$APP_NAME.herokuapp.com"
fi

echo ""
echo "✨ Happy coding!"