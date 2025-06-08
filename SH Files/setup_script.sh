#!/bin/bash

# Time Management Toolkit - Automated Setup Script
# Run this script to set up your GitHub repository automatically

set -e

echo "🎯 Time Management Toolkit - GitHub Setup"
echo "========================================"

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ Git is required but not installed. Aborting." >&2; exit 1; }

# Get user input
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter repository name (default: time-management-toolkit): " REPO_NAME
REPO_NAME=${REPO_NAME:-time-management-toolkit}

echo ""
echo "🏗️  Setting up project..."

# Create React app
if [ ! -d "$REPO_NAME" ]; then
    echo "📦 Creating React app..."
    npx create-react-app "$REPO_NAME"
else
    echo "📁 Directory already exists, using existing project..."
fi

cd "$REPO_NAME"

# Install additional dependencies
echo "📦 Installing additional dependencies..."
npm install -D tailwindcss autoprefixer postcss gh-pages

# Initialize Tailwind
echo "🎨 Setting up Tailwind CSS..."
npx tailwindcss init -p

# Create directories
echo "📁 Creating project directories..."
mkdir -p src/components
mkdir -p src/utils

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
fi

# Add GitHub remote
echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Update package.json with homepage
echo "⚙️  Updating package.json..."
HOMEPAGE="https://$GITHUB_USERNAME.github.io/$REPO_NAME"

# Create a temporary file with updated package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.homepage = '$HOMEPAGE';
pkg.scripts.predeploy = 'npm run build';
pkg.scripts.deploy = 'gh-pages -d build';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo ""
echo "✅ Basic setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the file contents from the artifacts into your project"
echo "2. Replace/create the following files:"
echo "   - src/App.js"
echo "   - src/App.css" 
echo "   - src/index.js"
echo "   - src/index.css"
echo "   - public/index.html"
echo "   - All component files in src/components/"
echo "   - src/utils/fileUtils.js"
echo "   - README.md"
echo "   - .gitignore"
echo "   - tailwind.config.js"
echo "   - postcss.config.js"
echo ""
echo "3. Run deployment commands:"
echo "   git add ."
echo "   git commit -m 'Initial commit: Time Management Toolkit'"
echo "   git push -u origin main"
echo "   npm run deploy"
echo ""
echo "🌐 Your app will be live at: $HOMEPAGE"
echo ""
echo "Happy coding! 🚀"