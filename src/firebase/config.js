// Firebase configuration
// You'll need to replace these with your actual Firebase project config
// Get these values from your Firebase Console > Project Settings > General > Your apps

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAyUJB_BXa1csxJpZacPSGCvvM3tKWKmSI",
  authDomain: "job-tracker-saas.firebaseapp.com",
  projectId: "job-tracker-saas",
  storageBucket: "job-tracker-saas.firebasestorage.app",
  messagingSenderId: "324920266160",
  appId: "1:324920266160:web:04971e235aa5cf701da75",
  measurementId: "G-CV61MY2M84"
};

// Initialize Firebase with cache-busting timestamp
const app = initializeApp(firebaseConfig);

// Add cache-busting timestamp to help with deployment verification
console.log('🔥 Firebase initialized at:', new Date().toISOString());
console.log('🔥 Config version: v2.1 - Updated appId fix');

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Debug function to verify Firebase configuration
export const verifyFirebaseConfig = () => {
  console.log('🔍 FIREBASE CONFIG VERIFICATION:');
  console.log('📦 CONFIG VERSION: v2.1 - Updated appId fix');
  console.log('📅 DEPLOYMENT TIME:', new Date().toISOString());
  console.log('Project ID:', firebaseConfig.projectId);
  console.log('Auth Domain:', firebaseConfig.authDomain);
  console.log('API Key present:', !!firebaseConfig.apiKey);
  console.log('App ID present:', !!firebaseConfig.appId);
  console.log('App ID value:', firebaseConfig.appId);
  console.log('Storage Bucket:', firebaseConfig.storageBucket);
  console.log('Messaging Sender ID:', firebaseConfig.messagingSenderId);
  console.log('Auth object initialized:', !!auth);
  console.log('Firestore object initialized:', !!db);
  
  // Check if we're in production or development
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Current URL:', window.location.href);
  
  return {
    version: 'v2.1',
    deploymentTime: new Date().toISOString(),
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    hasApiKey: !!firebaseConfig.apiKey,
    hasAppId: !!firebaseConfig.appId,
    appIdValue: firebaseConfig.appId,
    authInitialized: !!auth,
    dbInitialized: !!db
  };
};

export default app;
