
// Firebase configuration - Updated with fresh config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TEMPORARY CONFIG - You need to replace this with your actual Firebase config
// Get it from: https://console.firebase.google.com/ > Project Settings > Your apps
const firebaseConfig = {
  apiKey: "YOUR_NEW_API_KEY_HERE", // Replace with fresh API key from Firebase Console
  authDomain: "job-tracker-saas.firebaseapp.com",
  projectId: "job-tracker-saas",
  storageBucket: "job-tracker-saas.firebasestorage.app",
  messagingSenderId: "324920266160",
  appId: "YOUR_NEW_APP_ID_HERE", // Replace with fresh app ID from Firebase Console
  measurementId: "G-CV61MY2M84"
};

// Validate configuration before initializing
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_NEW_API_KEY_HERE") {
  console.error("🚨 FIREBASE CONFIG ERROR: API key is missing or placeholder!");
  console.error("🔧 Please get fresh config from Firebase Console:");
  console.error("   1. Go to https://console.firebase.google.com/");
  console.error("   2. Select 'job-tracker-saas' project");
  console.error("   3. Go to Project Settings > Your apps");
  console.error("   4. Copy the fresh firebaseConfig object");
  console.error("   5. Replace the config in src/firebase/config.js");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log('🔥 Firebase initialized at:', new Date().toISOString());
console.log('🔥 Config version: v4.0 - Fresh configuration needed');

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Debug function to verify Firebase configuration
export const verifyFirebaseConfig = () => {
  console.log('🔍 FIREBASE CONFIG VERIFICATION:');
  console.log('📦 CONFIG VERSION: v4.0 - Fresh configuration needed');
  console.log('📅 DEPLOYMENT TIME:', new Date().toISOString());
  console.log('Project ID:', firebaseConfig.projectId);
  console.log('Auth Domain:', firebaseConfig.authDomain);
  console.log('API Key present:', !!firebaseConfig.apiKey);
  console.log('API Key valid:', firebaseConfig.apiKey !== "YOUR_NEW_API_KEY_HERE");
  console.log('App ID present:', !!firebaseConfig.appId);
  console.log('App ID valid:', firebaseConfig.appId !== "YOUR_NEW_APP_ID_HERE");
  console.log('Storage Bucket:', firebaseConfig.storageBucket);
  console.log('Messaging Sender ID:', firebaseConfig.messagingSenderId);
  console.log('Auth object initialized:', !!auth);
  console.log('Firestore object initialized:', !!db);
  
  // Check if we're in production or development
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Current URL:', window.location.href);
  
  // Configuration validation
  const isValid = firebaseConfig.apiKey !== "YOUR_NEW_API_KEY_HERE" && 
                  firebaseConfig.appId !== "YOUR_NEW_APP_ID_HERE";
  
  console.log('🎯 CONFIGURATION STATUS:', isValid ? '✅ VALID' : '❌ NEEDS UPDATE');
  
  return {
    version: 'v4.0',
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
