// Firebase configuration - Updated with fresh config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Updated with fresh config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAy9JB_BXa1csxJpZacPSGCvvM3tKWKmSI",
  authDomain: "job-tracker-saas.firebaseapp.com",
  projectId: "job-tracker-saas",
  storageBucket: "job-tracker-saas.firebasestorage.app",
  messagingSenderId: "324920266160",
  appId: "1:324920266160:web:043712e35aa5cf7001da75",
  measurementId: "G-CVG1MY2M84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log('🔥 Firebase initialized at:', new Date().toISOString());
console.log('🔥 Config version: v5.0 - Fresh configuration from Firebase Console');

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Debug function to verify Firebase configuration
export const verifyFirebaseConfig = () => {
  console.log('🔍 FIREBASE CONFIG VERIFICATION:');
  console.log('📦 CONFIG VERSION: v5.0 - Fresh configuration from Firebase Console');
  console.log('📅 DEPLOYMENT TIME:', new Date().toISOString());
  console.log('Project ID:', firebaseConfig.projectId);
  console.log('Auth Domain:', firebaseConfig.authDomain);
  console.log('API Key present:', !!firebaseConfig.apiKey);
  console.log('API Key (first 10 chars):', firebaseConfig.apiKey.substring(0, 10) + '...');
  console.log('App ID present:', !!firebaseConfig.appId);
  console.log('App ID value:', firebaseConfig.appId);
  console.log('Storage Bucket:', firebaseConfig.storageBucket);
  console.log('Messaging Sender ID:', firebaseConfig.messagingSenderId);
  console.log('Auth object initialized:', !!auth);
  console.log('Firestore object initialized:', !!db);

  // Check if we're in production or development
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Current URL:', window.location.href);

  // Configuration validation
  const isValid = firebaseConfig.apiKey && 
                  firebaseConfig.appId && 
                  firebaseConfig.apiKey !== "YOUR_NEW_API_KEY_HERE";

  console.log('🎯 CONFIGURATION STATUS:', isValid ? '✅ VALID' : '❌ NEEDS UPDATE');

  return {
    version: 'v5.0',
    deploymentTime: new Date().toISOString(),
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    hasApiKey: !!firebaseConfig.apiKey,
    hasAppId: !!firebaseConfig.appId,
    appIdValue: firebaseConfig.appId,
    authInitialized: !!auth,
    dbInitialized: !!db,
    configurationValid: isValid
  };
};

export default app;