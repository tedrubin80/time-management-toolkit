#!/bin/bash

# Fix Heroku Engines Semver Range Warning
# This script updates package.json with exact versions

echo "🔧 Fixing Heroku engines semver range warning..."

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this from your project root."
    exit 1
fi

# Get current versions
NODE_VER=$(node --version | sed 's/v//')
NPM_VER=$(npm --version)

echo "📋 Current versions:"
echo "   Node.js: $NODE_VER"
echo "   npm: $NPM_VER"

# Backup package.json
cp package.json package.json.backup
echo "💾 Backup created: package.json.backup"

# Check if jq is available for JSON manipulation
if command -v jq &> /dev/null; then
    echo "🔧 Using jq to update package.json..."
    
    # Update using jq (clean JSON manipulation)
    jq --arg node_ver "$NODE_VER" --arg npm_ver "$NPM_VER" \
       '.engines.node = $node_ver | .engines.npm = $npm_ver' \
       package.json > package.json.tmp && mv package.json.tmp package.json
    
    echo "✅ package.json updated with exact versions"
else
    echo "🔧 Using sed to update package.json..."
    
    # Update using sed (fallback method)
    sed -i.tmp "s/\"node\": \"[^\"]*\"/\"node\": \"$NODE_VER\"/" package.json
    sed -i.tmp "s/\"npm\": \"[^\"]*\"/\"npm\": \"$NPM_VER\"/" package.json
    rm -f package.json.tmp
    
    echo "✅ package.json updated with exact versions"
fi

# Show the updated engines section
echo ""
echo "📊 Updated engines section:"
if command -v jq &> /dev/null; then
    jq '.engines' package.json
else
    grep -A 3 '"engines"' package.json
fi

echo ""
echo "🎯 Next steps:"
echo "1. Review the changes above"
echo "2. Test locally: npm run build"
echo "3. Commit: git add package.json && git commit -m 'Fix engines semver range'"
echo "4. Deploy: git push heroku main"

echo ""
echo "💡 Alternative safe versions if needed:"
echo "   LTS Current: \"18.19.0\" / \"10.2.3\""
echo "   LTS Previous: \"18.17.1\" / \"9.6.7\""
echo "   Flexible: \"18.x\" / \"10.x\""

# Validate the JSON
if command -v jq &> /dev/null; then
    if jq empty package.json 2>/dev/null; then
        echo "✅ package.json is valid JSON"
    else
        echo "❌ package.json has invalid JSON. Restoring backup..."
        mv package.json.backup package.json
        exit 1
    fi
fi

echo ""
echo "🎉 Engines fixed! No more semver range warnings."