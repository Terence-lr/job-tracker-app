# 🔥 Firebase Project Troubleshooting Guide

## 🚨 **Current Issue: 400 Server Error**

The 400 error when loading Firebase resources indicates a project-level issue. Here's how to resolve it:

## 📋 **Step-by-Step Resolution**

### **Step 1: Verify Firebase Project Status**

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your `job-tracker-saas` project

2. **Check Project Status:**
   - Look for any warning banners at the top
   - Check if the project is active (not suspended)
   - Verify the project name and ID

3. **Check Project Settings:**
   - Click the gear icon (⚙️) → Project Settings
   - Verify the project is in good standing
   - Check if there are any billing issues

### **Step 2: Regenerate Firebase Configuration**

1. **Go to Project Settings:**
   - Firebase Console → Project Settings (gear icon)
   - Scroll down to "Your apps" section

2. **Find Your Web App:**
   - Look for your web app (should be named something like "job-tracker-web")
   - If you don't see it, you may need to add a new web app

3. **Get Fresh Configuration:**
   - Click on your web app
   - Copy the entire `firebaseConfig` object
   - **OR** click "Add app" → Web app → Register app

4. **New Configuration Format:**
   ```javascript
   const firebaseConfig = {
     apiKey: "your-new-api-key",
     authDomain: "job-tracker-saas.firebaseapp.com",
     projectId: "job-tracker-saas",
     storageBucket: "job-tracker-saas.appspot.com", // Note: might be different
     messagingSenderId: "324920266160",
     appId: "your-new-app-id",
     measurementId: "your-measurement-id"
   };
   ```

### **Step 3: Check Project Billing & Restrictions**

1. **Billing Status:**
   - Go to Firebase Console → Usage
   - Check if there are any quota exceeded warnings
   - Verify billing is set up (if required)

2. **API Restrictions:**
   - Go to Google Cloud Console: https://console.cloud.google.com/
   - Select `job-tracker-saas` project
   - Go to APIs & Services → Credentials
   - Check your API key restrictions

3. **Service Status:**
   - Go to Google Cloud Console → APIs & Services → Library
   - Search for "Firebase Authentication API"
   - Ensure it's enabled

### **Step 4: Common Issues & Solutions**

#### **Issue 1: Project Suspended**
- **Symptom**: 400 error, project not accessible
- **Solution**: Check billing, reactivate project

#### **Issue 2: Wrong Auth Domain**
- **Symptom**: 400 error on authentication
- **Solution**: Verify authDomain in config matches project

#### **Issue 3: API Not Enabled**
- **Symptom**: 400 error, authentication fails
- **Solution**: Enable Firebase Authentication API in Google Cloud Console

#### **Issue 4: Quota Exceeded**
- **Symptom**: 400 error, rate limiting
- **Solution**: Check usage limits, upgrade plan if needed

#### **Issue 5: App Not Registered**
- **Symptom**: 400 error, invalid app ID
- **Solution**: Register new web app in Firebase Console

## 🔧 **Quick Fix: Create New Web App**

If the current app is corrupted, create a new one:

1. **Firebase Console → Project Settings**
2. **Scroll to "Your apps" → Add app**
3. **Select Web app (</> icon)**
4. **Register app with name: "job-tracker-web-v2"**
5. **Copy the new configuration**
6. **Replace in your code**

## 📝 **Configuration Template**

Here's the template to replace in `src/firebase/config.js`:

```javascript
// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace this with your fresh configuration from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_NEW_API_KEY",
  authDomain: "job-tracker-saas.firebaseapp.com",
  projectId: "job-tracker-saas",
  storageBucket: "job-tracker-saas.appspot.com", // or .firebasestorage.app
  messagingSenderId: "324920266160",
  appId: "YOUR_NEW_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
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

export default app;
```

## 🧪 **Testing Steps**

1. **Update Configuration:**
   - Replace the config with fresh values from Firebase Console
   - Save the file

2. **Test Locally:**
   ```bash
   npm start
   ```

3. **Check Console:**
   - Open browser DevTools
   - Look for Firebase configuration logs
   - Verify no 400 errors

4. **Test Authentication:**
   - Try to create an account
   - Check for detailed error logs

## 🚀 **Deployment**

Once the configuration is working locally:

1. **Commit Changes:**
   ```bash
   git add .
   git commit -m "Fix Firebase project configuration and resolve 400 errors"
   git push origin main
   ```

2. **Verify Deployment:**
   - Check Vercel deployment
   - Test live authentication
   - Monitor console for errors

## 📞 **If Issues Persist**

1. **Check Firebase Status Page:**
   - https://status.firebase.google.com/

2. **Contact Firebase Support:**
   - If project is corrupted, may need support assistance

3. **Create New Project:**
   - As last resort, create a new Firebase project
   - Update configuration with new project details

---

**🎯 The 400 error is likely due to a project configuration issue that can be resolved by regenerating the Firebase configuration from the console.**
