#!/usr/bin/env node

/**
 * Firebase Project Verification Script
 * 
 * This script helps verify your Firebase project configuration
 * and check for common issues that cause 400 errors.
 */

const https = require('https');

console.log('🔥 Firebase Project Verification Tool');
console.log('=====================================');
console.log('');

// Current configuration from your project
const currentConfig = {
  projectId: 'job-tracker-saas',
  authDomain: 'job-tracker-saas.firebaseapp.com',
  apiKey: 'AIzaSyAyUJB_BXa1csxJpZacPSGCvvM3tKWKmSI'
};

console.log('📋 Current Configuration:');
console.log(`Project ID: ${currentConfig.projectId}`);
console.log(`Auth Domain: ${currentConfig.authDomain}`);
console.log(`API Key: ${currentConfig.apiKey.substring(0, 10)}...`);
console.log('');

// Test Firebase project accessibility
function testFirebaseProject() {
  console.log('🧪 Testing Firebase project accessibility...');
  
  const authUrl = `https://identitytoolkit.googleapis.com/v1/projects/${currentConfig.projectId}/config`;
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(authUrl, options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      console.log('✅ Firebase project is accessible');
      console.log('✅ Project configuration is valid');
    } else if (res.statusCode === 400) {
      console.log('❌ 400 Error - Project configuration issue');
      console.log('   Possible causes:');
      console.log('   - Project ID is incorrect');
      console.log('   - Project is suspended or inactive');
      console.log('   - API key is invalid or restricted');
      console.log('   - Firebase Authentication API is not enabled');
    } else if (res.statusCode === 403) {
      console.log('❌ 403 Error - Access denied');
      console.log('   Possible causes:');
      console.log('   - API key restrictions are too strict');
      console.log('   - Project permissions issue');
    } else if (res.statusCode === 404) {
      console.log('❌ 404 Error - Project not found');
      console.log('   Possible causes:');
      console.log('   - Project ID is incorrect');
      console.log('   - Project has been deleted');
    } else {
      console.log(`❌ Unexpected status code: ${res.statusCode}`);
    }
    
    console.log('');
    console.log('🔧 Recommended Actions:');
    console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
    console.log('2. Select your project and check its status');
    console.log('3. Go to Project Settings → Your apps');
    console.log('4. Get fresh configuration for your web app');
    console.log('5. Update your config file with new values');
    console.log('6. Check Google Cloud Console for API restrictions');
  });

  req.on('error', (error) => {
    console.log('❌ Network error:', error.message);
    console.log('');
    console.log('🔧 This might indicate:');
    console.log('- Network connectivity issues');
    console.log('- DNS resolution problems');
    console.log('- Firewall blocking requests');
  });

  req.end();
}

// Check common issues
function checkCommonIssues() {
  console.log('🔍 Checking for common issues...');
  console.log('');
  
  // Check API key format
  if (currentConfig.apiKey.startsWith('AIza')) {
    console.log('✅ API key format looks correct');
  } else {
    console.log('❌ API key format might be incorrect');
  }
  
  // Check project ID format
  if (currentConfig.projectId.includes('-') && currentConfig.projectId.length > 5) {
    console.log('✅ Project ID format looks correct');
  } else {
    console.log('❌ Project ID format might be incorrect');
  }
  
  // Check auth domain format
  if (currentConfig.authDomain.endsWith('.firebaseapp.com')) {
    console.log('✅ Auth domain format looks correct');
  } else {
    console.log('❌ Auth domain format might be incorrect');
  }
  
  console.log('');
}

// Run verification
checkCommonIssues();
testFirebaseProject();
