#!/usr/bin/env node

/**
 * Heroku Configuration Script for Time Management Toolkit
 * Run this script to automatically configure Heroku environment variables
 */

const { execSync } = require('child_process');

// Configuration object
const config = {
  // App Configuration
  REACT_APP_NAME: 'Time Management Toolkit',
  REACT_APP_VERSION: '1.0.0',
  REACT_APP_DESCRIPTION: 'Master your workload and learn to say no with confidence',
  
  // Build Configuration
  GENERATE_SOURCEMAP: 'false',
  SKIP_PREFLIGHT_CHECK: 'true',
  
  // Development Settings
  FAST_REFRESH: 'true',
  
  // Deployment Settings (Critical for Heroku)
  NODE_ENV: 'production',
  NPM_CONFIG_PRODUCTION: 'false', // Allow devDependencies for build
  CI: 'false',
  
  // App Features
  REACT_APP_ENABLE_PWA: 'true',
  REACT_APP_THEME_COLOR: '#4facfe',
  REACT_APP_BACKGROUND_COLOR: '#ffffff'
};

function runCommand(command) {
  try {
    console.log(`📋 Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Error running command: ${command}`);
    console.error(error.message);
    return false;
  }
}

function checkHerokuCLI() {
  try {
    execSync('heroku --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error('❌ Heroku CLI not found. Please install it first:');
    console.error('   npm install -g heroku');
    console.error('   or visit: https://devcenter.heroku.com/articles/heroku-cli');
    return false;
  }
}

function configureHeroku() {
  console.log('🚀 Configuring Heroku for Time Management Toolkit...\n');
  
  // Check Heroku CLI
  if (!checkHerokuCLI()) {
    return false;
  }
  
  // Clear existing buildpacks
  console.log('🧹 Clearing existing buildpacks...');
  runCommand('heroku buildpacks:clear');
  
  // Set correct buildpack
  console.log('📦 Setting Node.js buildpack...');
  runCommand('heroku buildpacks:set heroku/nodejs');
  
  // Set environment variables
  console.log('⚙️ Setting environment variables...');
  Object.entries(config).forEach(([key, value]) => {
    runCommand(`heroku config:set ${key}="${value}"`);
  });
  
  // Clear cache
  console.log('🧹 Clearing Heroku cache...');
  runCommand('heroku repo:purge_cache');
  
  // Show current configuration
  console.log('\n📊 Current Heroku configuration:');
  runCommand('heroku config');
  
  console.log('\n✅ Heroku configuration complete!');
  console.log('\n🚀 Ready to deploy:');
  console.log('   git add .');
  console.log('   git commit -m "Configure Heroku environment"');
  console.log('   git push heroku main');
  console.log('\n📊 Monitor deployment:');
  console.log('   heroku logs --tail');
  
  return true;
}

// Run the configuration
if (require.main === module) {
  configureHeroku();
}

module.exports = { config, configureHeroku };