import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/loginModal.module.scss';

const LoginModal = ({ isOpen, onClose, loginType }) => {
  const [secretCode, setSecretCode] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminSelection, setShowAdminSelection] = useState(false);
  const { t } = useLanguage();
  const { login } = useAuth();

  const CORRECT_SECRET_CODE = 'Saramozhimona';
  const ADMIN_USERS = [
    { name: 'Thenmozhi', icon: '👩‍💼' },
    { name: 'Mohanamozhi', icon: '👩‍💻' },
    { name: 'Swetha Swe', icon: '👩‍🎨' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (loginType === 'user') {
        // User login - only needs username
        if (username.trim()) {
          login(username, false);
          console.log(`User logged in successfully: ${username}`);
          setUsername('');
          setError('');
          onClose();
        } else {
          setError('Please enter your username');
        }
      } else {
        // Admin login - needs secret code first, then show admin selection
        if (secretCode === CORRECT_SECRET_CODE) {
          setShowAdminSelection(true);
          setSecretCode('');
          setError('');
        } else {
          setError('Invalid admin secret code');
        }
      }
      setIsLoading(false);
    }, 800);
  };

  const handleAdminSelect = (adminName) => {
    login(adminName, true);
    console.log(`${adminName} logged in successfully`);
    setShowAdminSelection(false);
    onClose();
  };

  const handleClose = () => {
    setSecretCode('');
    setUsername('');
    setError('');
    setShowAdminSelection(false);
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

            {loginType === 'admin' && showAdminSelection ? (
              <div className={styles.adminSelection}>
                <h3 className={styles.selectionTitle}>Select Admin Account</h3>
                <div className={styles.adminGrid}>
                  {ADMIN_USERS.map((admin) => (
                    <motion.button
                      key={admin.name}
                      className={styles.adminCard}
                      onClick={() => handleAdminSelect(admin.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className={styles.adminIcon}>{admin.icon}</span>
                      <span className={styles.adminName}>{admin.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
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
            )}

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
