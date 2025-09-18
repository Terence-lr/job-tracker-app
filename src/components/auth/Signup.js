import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { auth, verifyFirebaseConfig } from '../../firebase/config';
import ConfigTest from '../ConfigTest';

const Signup = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [retryCount, setRetryCount] = useState(0);
  const { signup } = useAuth();

  // Verify Firebase configuration on component mount
  useEffect(() => {
    console.log('🔍 SIGNUP COMPONENT - Verifying Firebase configuration...');
    const configStatus = verifyFirebaseConfig();
    console.log('🔍 SIGNUP COMPONENT - Config verification result:', configStatus);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific errors when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error when user starts typing
    if (error) {
      setError('');
    }
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength validation
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Display name validation
    if (!formData.displayName.trim()) {
      errors.displayName = 'Full name is required';
      isValid = false;
    } else if (formData.displayName.trim().length < 2) {
      errors.displayName = 'Full name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  // Retry function for failed signup attempts
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError('');
    setSuccess('');
    handleSubmit({ preventDefault: () => {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');
    
    // Validate form
    if (!validateForm()) {
      setError('Please fix the errors below');
      return;
    }

    try {
      setLoading(true);
      console.log('🚀 Attempting to create account...', { 
        email: formData.email, 
        displayName: formData.displayName 
      });
      
      // Log Firebase auth object before attempting signup
      console.log('🔥 Firebase auth object:', auth);
      console.log('🔥 Firebase config:', auth.app.options);
      console.log('🔥 Auth domain:', auth.app.options.authDomain);
      console.log('🔥 Project ID:', auth.app.options.projectId);
      
      await signup(formData.email, formData.password, formData.displayName);
      
      setSuccess('Account created successfully! Redirecting to dashboard...');
      console.log('✅ Account creation successful');
      
    } catch (error) {
      console.error('❌ SIGNUP FAILED - DETAILED ERROR INFO:');
      console.error('Error object:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Full error details:', JSON.stringify(error, null, 2));
      
      let errorMessage = '';
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email address is already registered. Please try logging in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection and try again.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/invalid-api-key':
          errorMessage = 'Invalid API key. Please contact support.';
          break;
        case 'auth/app-not-authorized':
          errorMessage = 'App not authorized. Please contact support.';
          break;
        case 'auth/quota-exceeded':
          errorMessage = 'Service quota exceeded. Please try again later.';
          break;
        default:
          errorMessage = `Account creation failed: ${error.message} (Code: ${error.code})`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <ConfigTest />
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Start tracking your job applications</p>
        </div>

        {error && (
          <div className="error-message">
            <div className="error-content">
              {error}
              {retryCount < 3 && (
                <button 
                  type="button" 
                  onClick={handleRetry}
                  className="retry-btn"
                  disabled={loading}
                >
                  Try Again ({3 - retryCount} attempts left)
                </button>
              )}
            </div>
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="displayName">Full Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className={fieldErrors.displayName ? 'error' : ''}
            />
            {fieldErrors.displayName && (
              <span className="field-error">{fieldErrors.displayName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className={fieldErrors.email ? 'error' : ''}
            />
            {fieldErrors.email && (
              <span className="field-error">{fieldErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password (min 6 characters)"
              className={fieldErrors.password ? 'error' : ''}
            />
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className={`strength-fill strength-${getPasswordStrength(formData.password)}`}
                  ></div>
                </div>
                <span className="strength-text">
                  {getPasswordStrength(formData.password) < 3 ? 'Weak' : 
                   getPasswordStrength(formData.password) < 5 ? 'Medium' : 'Strong'}
                </span>
              </div>
            )}
            {fieldErrors.password && (
              <span className="field-error">{fieldErrors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className={fieldErrors.confirmPassword ? 'error' : ''}
            />
            {fieldErrors.confirmPassword && (
              <span className="field-error">{fieldErrors.confirmPassword}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
