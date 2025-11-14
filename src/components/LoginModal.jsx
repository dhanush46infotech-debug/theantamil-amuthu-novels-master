import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from '../styles/loginModal.module.scss';

const LoginModal = ({ isOpen, onClose, loginType }) => {
  const [secretCode, setSecretCode] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const CORRECT_SECRET_CODE = 'thenmozzhimohanaswethanovels-tamilthaenamudhu';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (loginType === 'user') {
        // User login - only needs username
        if (username.trim()) {
          console.log(`User logged in successfully: ${username}`);
          setUsername('');
          setError('');
          onClose();
          // You can add additional logic here (e.g., redirect, set auth state)
        } else {
          setError('Please enter your username');
        }
      } else {
        // Admin login - needs secret code
        if (secretCode === CORRECT_SECRET_CODE) {
          console.log('Admin logged in successfully');
          setSecretCode('');
          setError('');
          onClose();
          // You can add additional logic here (e.g., redirect, set auth state)
        } else {
          setError('Invalid admin secret code');
        }
      }
      setIsLoading(false);
    }, 800);
  };

  const handleClose = () => {
    setSecretCode('');
    setUsername('');
    setError('');
    onClose();
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
                {loginType === 'admin' ? (
                  <>
                    <span className={styles.icon}>🔒</span>
                    Admin Login
                  </>
                ) : (
                  <>
                    <span className={styles.icon}>👤</span>
                    User Login
                  </>
                )}
              </h2>
              <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close login modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.formGroup}>
                {loginType === 'user' ? (
                  <>
                    <label htmlFor="username" className={styles.label}>
                      Enter Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      className={styles.input}
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError('');
                      }}
                      placeholder="Enter your username"
                      autoFocus
                      required
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="secretCode" className={styles.label}>
                      Enter Admin Secret Code
                    </label>
                    <input
                      id="secretCode"
                      type="password"
                      className={styles.input}
                      value={secretCode}
                      onChange={(e) => {
                        setSecretCode(e.target.value);
                        setError('');
                      }}
                      placeholder="Enter admin secret code"
                      autoFocus
                      required
                    />
                  </>
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
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading || (loginType === 'user' ? !username.trim() : !secretCode.trim())}
              >
                {isLoading ? (
                  <span className={styles.loadingSpinner}>⏳</span>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className={styles.modalFooter}>
              <p className={styles.helpText}>
                {loginType === 'admin'
                  ? 'Admin access required - Secret code protected'
                  : 'Simply enter your username to continue'}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
