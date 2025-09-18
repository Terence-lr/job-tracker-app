#!/usr/bin/env node

/**
 * Firebase Configuration Update Script
 * 
 * This script helps you quickly update the Firebase configuration
 * with fresh values from the Firebase Console.
 * 
 * Usage:
 * 1. Get fresh config from Firebase Console
 * 2. Run: node update-firebase-config.js
 * 3. Follow the prompts to enter new values
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const configPath = path.join(__dirname, 'src', 'firebase', 'config.js');

console.log('🔥 Firebase Configuration Update Tool');
console.log('=====================================');
console.log('');
console.log('Please get your fresh Firebase configuration from:');
console.log('Firebase Console → Project Settings → Your apps → Web app');
console.log('');

const questions = [
  {
    key: 'apiKey',
    prompt: 'Enter your new API Key: ',
    current: 'AIzaSyAyUJB_BXa1csxJpZacPSGCvvM3tKWKmSI'
  },
  {
    key: 'authDomain',
    prompt: 'Enter your Auth Domain: ',
    current: 'job-tracker-saas.firebaseapp.com'
  },
  {
    key: 'projectId',
    prompt: 'Enter your Project ID: ',
    current: 'job-tracker-saas'
  },
  {
    key: 'storageBucket',
    prompt: 'Enter your Storage Bucket: ',
    current: 'job-tracker-saas.firebasestorage.app'
  },
  {
    key: 'messagingSenderId',
    prompt: 'Enter your Messaging Sender ID: ',
    current: '324920266160'
  },
  {
    key: 'appId',
    prompt: 'Enter your App ID: ',
    current: '1:324920266160:web:04971e2e35aa5cf701da75'
  },
  {
    key: 'measurementId',
    prompt: 'Enter your Measurement ID: ',
    current: 'G-CV61MY2M84'
  }
];

const newConfig = {};

function askQuestion(index) {
  if (index >= questions.length) {
    updateConfigFile();
    return;
  }

  const question = questions[index];
  console.log(`Current ${question.key}: ${question.current}`);
  
  rl.question(question.prompt, (answer) => {
    newConfig[question.key] = answer.trim() || question.current;
    askQuestion(index + 1);
  });
}

function updateConfigFile() {
  console.log('\n📝 Updating Firebase configuration...');
  
  const configTemplate = `// Firebase configuration
// You'll need to replace these with your actual Firebase project config
// Get these values from your Firebase Console > Project Settings > General > Your apps

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "${newConfig.apiKey}",
  authDomain: "${newConfig.authDomain}",
  projectId: "${newConfig.projectId}",
  storageBucket: "${newConfig.storageBucket}",
  messagingSenderId: "${newConfig.messagingSenderId}",
  appId: "${newConfig.appId}",
  measurementId: "${newConfig.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Debug function to verify Firebase configuration
export const verifyFirebaseConfig = () => {
  console.log('🔍 FIREBASE CONFIG VERIFICATION:');
  console.log('Project ID:', firebaseConfig.projectId);
  console.log('Auth Domain:', firebaseConfig.authDomain);
  console.log('API Key present:', !!firebaseConfig.apiKey);
  console.log('App ID present:', !!firebaseConfig.appId);
  console.log('Storage Bucket:', firebaseConfig.storageBucket);
  console.log('Messaging Sender ID:', firebaseConfig.messagingSenderId);
  console.log('Auth object initialized:', !!auth);
  console.log('Firestore object initialized:', !!db);
  
  // Check if we're in production or development
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Current URL:', window.location.href);
  
  return {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    hasApiKey: !!firebaseConfig.apiKey,
    hasAppId: !!firebaseConfig.appId,
    authInitialized: !!auth,
    dbInitialized: !!db
  };
};

export default app;`;

  try {
    fs.writeFileSync(configPath, configTemplate);
    console.log('✅ Firebase configuration updated successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Test locally: npm start');
    console.log('2. Check browser console for Firebase logs');
    console.log('3. Test authentication');
    console.log('4. Commit changes: git add . && git commit -m "Update Firebase configuration"');
    console.log('5. Deploy: git push origin main');
  } catch (error) {
    console.error('❌ Error updating configuration:', error.message);
  }

  rl.close();
}

// Start the process
askQuestion(0);
