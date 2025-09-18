
#!/usr/bin/env node

/**
 * Quick Firebase Connection Test
 * Run this to verify your Firebase setup works
 */

const https = require('https');

// Test Firebase project connectivity
function testFirebaseConnection() {
  console.log('🧪 Testing Firebase Connection...\n');
  
  // Test the Identity Toolkit API endpoint
  const testUrl = 'https://identitytoolkit.googleapis.com/v1/projects/job-tracker-saas/config';
  
  https.get(testUrl, (res) => {
    console.log(`Response Status: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      console.log('✅ Firebase project is accessible');
      console.log('✅ The project exists and is active');
      console.log('\n🔧 Issue is likely with your API key.');
      console.log('   Solution: Get fresh config from Firebase Console');
    } else if (res.statusCode === 400) {
      console.log('❌ Project configuration issue');
      console.log('   Possible causes:');
      console.log('   - Invalid project ID');
      console.log('   - Project suspended');
      console.log('   - Authentication API not enabled');
    } else if (res.statusCode === 404) {
      console.log('❌ Project not found');
      console.log('   Solution: Create new Firebase project');
    }
    
    console.log('\n📋 Recommended Action:');
    console.log('1. Go to Firebase Console');
    console.log('2. Get fresh firebaseConfig');
    console.log('3. Replace config in src/firebase/config.js');
    
  }).on('error', (err) => {
    console.log('❌ Connection failed:', err.message);
  });
}

testFirebaseConnection();
