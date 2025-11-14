import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/userAuthModal.module.scss';

const UserAuthModal = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { login } = useAuth();

  // Mock user database (in real app, this would be in backend)
  const [users] = useState(() => {
    const savedUsers = localStorage.getItem('ttm-novels-users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setError('');
  };

  const validateForm = () => {
    const { emailOrPhone, password, confirmPassword, name } = formData;

    if (!emailOrPhone.trim()) {
      setError('Email or Phone number is required');
      return false;
    }

    // Basic email or phone validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    if (!emailPattern.test(emailOrPhone) && !phonePattern.test(emailOrPhone)) {
      setError('Please enter a valid email or 10-digit phone number');
      return false;
    }

    if (!password.trim()) {
      setError('Password is required');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (authMode === 'register') {
      if (!name.trim()) {
        setError('Name is required');
        return false;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }

      // Check if user already exists
      const existingUser = users.find(u => u.emailOrPhone === emailOrPhone);
      if (existingUser) {
        setError('User already exists. Please login.');
        return false;
      }
    }

    return true;
  };

  const handleRegister = () => {
    const newUser = {
      id: Date.now(),
      name: formData.name,
      emailOrPhone: formData.emailOrPhone,
      password: formData.password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('ttm-novels-users', JSON.stringify(updatedUsers));

    // Auto login after registration
    login(newUser.name, false, { emailOrPhone: newUser.emailOrPhone });
    console.log('User registered and logged in:', newUser.name);
    resetForm();
    onClose();
  };

  const handleLogin = () => {
    const user = users.find(
      u => u.emailOrPhone === formData.emailOrPhone && u.password === formData.password
    );

    if (user) {
      login(user.name, false, { emailOrPhone: user.emailOrPhone });
      console.log('User logged in:', user.name);
      resetForm();
      onClose();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (validateForm()) {
        if (authMode === 'register') {
          handleRegister();
        } else {
          handleLogin();
        }
      }
      setIsLoading(false);
    }, 800);
  };

  const resetForm = () => {
    setFormData({
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
      name: '',
    });
    setError('');
  };

  const handleClose = () => {
    resetForm();
    setAuthMode('login');
    onClose();
  };

  const switchMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <span className={styles.icon}>👤</span>
                {authMode === 'login' ? 'User Login' : 'User Registration'}
              </h2>
              <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.authForm}>
              {authMode === 'register' && (
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    autoFocus
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="emailOrPhone" className={styles.label}>
                  Email or Phone Number
                </label>
                <input
                  id="emailOrPhone"
                  type="text"
                  className={styles.input}
                  value={formData.emailOrPhone}
                  onChange={(e) => handleInputChange('emailOrPhone', e.target.value)}
                  placeholder="Enter email or 10-digit phone number"
                  autoFocus={authMode === 'login'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  {authMode === 'register' ? 'Create Password' : 'Password'}
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder={authMode === 'register' ? 'Create a password (min 6 characters)' : 'Enter your password'}
                />
              </div>

              {authMode === 'register' && (
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={styles.input}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter your password"
                  />
                </div>
              )}

              {error && (
                <motion.p
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className={styles.loadingSpinner}>⏳</span>
                ) : authMode === 'login' ? (
                  'Login'
                ) : (
                  'Register'
                )}
              </button>
            </form>

            <div className={styles.modalFooter}>
              <p className={styles.switchText}>
                {authMode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button onClick={switchMode} className={styles.switchButton}>
                      Register here
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={switchMode} className={styles.switchButton}>
                      Login here
                    </button>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserAuthModal;
