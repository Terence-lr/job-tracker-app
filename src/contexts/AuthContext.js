import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  async function signup(email, password, displayName) {
    try {
      console.log('🔐 AUTH CONTEXT - Starting signup process...', { email, displayName });
      console.log('🔥 AUTH CONTEXT - Firebase auth object:', auth);
      console.log('🔥 AUTH CONTEXT - Firebase config:', auth.app.options);
      console.log('🔥 AUTH CONTEXT - Auth domain:', auth.app.options.authDomain);
      console.log('🔥 AUTH CONTEXT - Project ID:', auth.app.options.projectId);
      console.log('🔥 AUTH CONTEXT - API Key:', auth.app.options.apiKey ? 'Present' : 'Missing');
      
      console.log('🚀 AUTH CONTEXT - Calling createUserWithEmailAndPassword...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ AUTH CONTEXT - User created successfully:', userCredential.user.uid);
      console.log('✅ AUTH CONTEXT - User email:', userCredential.user.email);
      
      // Update the user's display name
      if (displayName) {
        console.log('📝 AUTH CONTEXT - Updating user profile with display name...');
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
        console.log('✅ AUTH CONTEXT - Profile updated successfully');
      }
      
      return userCredential;
    } catch (error) {
      console.error('❌ AUTH CONTEXT - Signup error details:');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Full error object:', error);
      throw error;
    }
  }

  // Sign in function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign out function
  function logout() {
    return signOut(auth);
  }

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
