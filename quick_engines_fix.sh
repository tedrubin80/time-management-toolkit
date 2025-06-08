# Quick Fix for "dangerous semver range in engines.node"

# Option 1: One-liner fix with your exact versions
NODE_VER=$(node --version | sed 's/v//') && NPM_VER=$(npm --version) && echo "Updating to Node: $NODE_VER, npm: $NPM_VER" && sed -i.bak -e "s/\"node\": \"[^\"]*\"/\"node\": \"$NODE_VER\"/" -e "s/\"npm\": \"[^\"]*\"/\"npm\": \"$NPM_VER\"/" package.json && echo "✅ Fixed!"

# Option 2: Use recommended safe versions (copy the JSON below)
# Replace your engines section with this:
{
  "engines": {
    "node": "18.19.0",
    "npm": "10.2.3"
  }
}

# Option 3: Use flexible but safe versions
{
  "engines": {
    "node": "18.x",
    "npm": "10.x"  
  }
}

# After fixing, deploy:
git add package.json
git commit -m "Fix engines semver range for Heroku"
git push heroku main