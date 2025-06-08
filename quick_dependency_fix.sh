# 🔧 QUICK FIX: React Dependency Conflicts

# === IMMEDIATE FIX (Copy & Paste) ===

# 1. Clean environment
rm -rf node_modules package-lock.json
npm cache clean --force

# 2. Create .npmrc to handle peer deps
echo "legacy-peer-deps=true" > .npmrc
echo "fund=false" >> .npmrc
echo "audit=false" >> .npmrc

# 3. Install with legacy peer deps
npm install --legacy-peer-deps

# 4. Test build
npm run build

# 5. For Heroku deployment
heroku config:set NPM_CONFIG_LEGACY_PEER_DEPS=true
heroku config:set NPM_CONFIG_PRODUCTION=false

# === ALTERNATIVE: Use Updated package.json ===

# Replace your package.json engines section with:
{
  "engines": {
    "node": "18.19.0",
    "npm": "10.2.3"
  }
}

# Replace your scripts section with:
{
  "scripts": {
    "heroku-postbuild": "npm install --legacy-peer-deps && npm run build"
  }
}

# === IF STILL FAILING ===

# Try with force flag
npm install --legacy-peer-deps --force

# Or downgrade react-scripts temporarily
npm install react-scripts@4.0.3 --legacy-peer-deps

# === HEROKU DEPLOYMENT ===

# Commit fixes and deploy
git add package.json .npmrc package-lock.json
git commit -m "Fix React dependency conflicts"
heroku repo:purge_cache
git push heroku main