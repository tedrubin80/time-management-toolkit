#!/bin/bash

# Time Management Toolkit - Complete Deployment Script
# This script handles both GitHub Pages and Heroku deployment

set -e  # Exit on any error

echo "🎯 Time Management Toolkit - Deployment Script"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

info() {
    echo -e "${BLUE}ℹ️ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if required files exist
check_files() {
    info "Checking required files..."
    
    local files=(
        "package.json"
        "public/index.html"
        "src/App.js"
        "Procfile"
        "app.json"
    )
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            success "$file exists"
        else
            error "$file is missing!"
            echo "Please ensure all required files are present before deploying."
            exit 1
        fi
    done
}

# Install dependencies
install_deps() {
    info "Installing dependencies..."
    if npm install; then
        success "Dependencies installed"
    else
        error "Failed to install dependencies"
        exit 1
    fi
}

# Test local build
test_build() {
    info "Testing local build..."
    if npm run build; then
        success "Local build successful"
    else
        error "Local build failed"
        exit 1
    fi
}

# Deploy to GitHub Pages
deploy_github() {
    info "Deploying to GitHub Pages..."
    
    if command -v gh &> /dev/null; then
        # Using GitHub CLI
        if npm run deploy; then
            success "GitHub Pages deployment successful"
            echo "🌐 Your app is live at: https://tedrubin80.github.io/time-management-toolkit"
        else
            error "GitHub Pages deployment failed"
            return 1
        fi
    else
        warning "GitHub CLI not found. Using npm deploy only."
        if npm run deploy; then
            success "GitHub Pages deployment successful"
            echo "🌐 Your app is live at: https://tedrubin80.github.io/time-management-toolkit"
        else
            error "GitHub Pages deployment failed"
            return 1
        fi
    fi
}

# Configure Heroku
configure_heroku() {
    info "Configuring Heroku..."
    
    # Check if Heroku CLI is installed
    if ! command -v heroku &> /dev/null; then
        error "Heroku CLI not found. Please install it first:"
        echo "npm install -g heroku"
        echo "or visit: https://devcenter.heroku.com/articles/heroku-cli"
        return 1
    fi
    
    # Clear and set buildpack
    heroku buildpacks:clear
    heroku buildpacks:set heroku/nodejs
    
    # Set critical environment variables
    heroku config:set NODE_ENV=production
    heroku config:set NPM_CONFIG_PRODUCTION=false
    heroku config:set GENERATE_SOURCEMAP=false
    heroku config:set REACT_APP_NAME="Time Management Toolkit"
    
    # Clear cache
    heroku repo:purge_cache
    
    success "Heroku configured"
}

# Deploy to Heroku
deploy_heroku() {
    info "Deploying to Heroku..."
    
    # Ensure all changes are committed
    if [ -n "$(git status --porcelain)" ]; then
        warning "Uncommitted changes found. Committing them..."
        git add .
        git commit -m "Deploy: Update configuration for Heroku"
    fi
    
    # Deploy to Heroku
    if git push heroku main; then
        success "Heroku deployment successful"
        
        # Get app URL
        APP_URL=$(heroku apps:info --json | grep -o '"web_url":"[^"]*' | grep -o '[^"]*$')
        if [ -n "$APP_URL" ]; then
            echo "🌐 Your app is live at: $APP_URL"
        fi
        
        # Show logs
        info "Showing deployment logs..."
        heroku logs --tail --num 50
    else
        error "Heroku deployment failed"
        echo "💡 Try running: heroku logs --tail"
        return 1
    fi
}

# Verify deployments
verify_deployments() {
    info "Verifying deployments..."
    
    # Check GitHub Pages
    echo "📊 GitHub Pages Status:"
    if curl -s -o /dev/null -w "%{http_code}" "https://tedrubin80.github.io/time-management-toolkit" | grep -q "200"; then
        success "GitHub Pages is accessible"
    else
        warning "GitHub Pages may not be ready yet (can take a few minutes)"
    fi
    
    # Check Heroku (if deployed)
    if command -v heroku &> /dev/null && heroku apps:info &> /dev/null; then
        echo "📊 Heroku Status:"
        heroku ps
    fi
}

# Main deployment menu
main_menu() {
    echo ""
    echo "Choose deployment option:"
    echo "1) GitHub Pages only (Recommended for React apps)"
    echo "2) Heroku only"
    echo "3) Both GitHub Pages and Heroku"
    echo "4) Just test build (no deployment)"
    echo "5) Exit"
    echo ""
    
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            info "Deploying to GitHub Pages only..."
            check_files
            install_deps
            test_build
            deploy_github
            verify_deployments
            ;;
        2)
            info "Deploying to Heroku only..."
            check_files
            install_deps
            test_build
            configure_heroku
            deploy_heroku
            verify_deployments
            ;;
        3)
            info "Deploying to both platforms..."
            check_files
            install_deps
            test_build
            deploy_github
            configure_heroku
            deploy_heroku
            verify_deployments
            ;;
        4)
            info "Testing build only..."
            check_files
            install_deps
            test_build
            success "Build test completed successfully"
            ;;
        5)
            info "Exiting..."
            exit 0
            ;;
        *)
            error "Invalid choice. Please try again."
            main_menu
            ;;
    esac
}

# Pre-deployment checks
pre_check() {
    info "Running pre-deployment checks..."
    
    # Check Node.js version
    NODE_VERSION=$(node --version)
    info "Node.js version: $NODE_VERSION"
    
    # Check npm version
    NPM_VERSION=$(npm --version)
    info "npm version: $NPM_VERSION"
    
    # Check git status
    if [ -n "$(git status --porcelain)" ]; then
        warning "You have uncommitted changes:"
        git status --short
        echo ""
        read -p "Continue anyway? (y/N): " continue_deploy
        if [[ ! $continue_deploy =~ ^[Yy]$ ]]; then
            info "Deployment cancelled. Please commit your changes first."
            exit 0
        fi
    fi
    
    success "Pre-deployment checks completed"
}

# Run the script
echo "🔍 Running pre-deployment checks..."
pre_check

echo "📋 All checks passed. Ready to deploy!"
main_menu

echo ""
success "Deployment script completed!"
echo ""
echo "📚 Useful commands:"
echo "   GitHub Pages: npm run deploy"
echo "   Heroku logs:  heroku logs --tail"
echo "   Local dev:    npm run dev"
echo ""
echo "🎉 Happy coding!"