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
  appId: "1:324920266160:web:04971e2e35aa5cf701da75",
  measurementId: "G-CV61MY2M84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
