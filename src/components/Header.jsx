import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Menu from './Menu';
import SearchBar from './SearchBar';
import DarkModeToggle from './DarkModeToggle';
import HeaderSocialIcons from './HeaderSocialIcons';
import LoginModal from './LoginModal';

import Logo from '../assets/TTM NOVRLS.png';
import styles from '../styles/header.module.scss';
import { useLanguage } from '../context/LanguageContext';

const HamburgerMenu = ({ isOpen, onClick, ariaLabel }) => {
  return (
    <button
      className={styles.hamburger}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28 }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28 }}
      />
    </button>
  );
};

const LanguageSwitcher = ({ currentLanguage, setCurrentLanguage }) => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const languages = [
    { code: 'TAMIL', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'ENGLISH', name: 'English', flag: '🇬🇧' },
    { code: 'TELUGU', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'HINDI', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  const handleSelect = (lang) => {
    setCurrentLanguage(lang);
    setOpen(false);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={styles.languageButton}
        onClick={() => setOpen(!open)}
        aria-label={t('aria.selectLanguage')}
        aria-expanded={open}
      >
        🌐
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.languageMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <ul className={styles.languageList}>
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button
                    className={`${styles.languageItem} ${
                      currentLanguage === lang.code ? styles.active : ''
                    }`}
                    onClick={() => handleSelect(lang.code)}
                  >
                    <span style={{ marginRight: '8px' }}>{lang.flag}</span>
                    {lang.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationCount] = useState(3);
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState('user');

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleUserLoginClick = () => {
    setLoginType('user');
    setLoginModalOpen(true);
  };

  const handleAdminLoginClick = () => {
    setLoginType('admin');
    setLoginModalOpen(true);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <HamburgerMenu
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            ariaLabel={menuOpen ? t('aria.closeMenu') : t('aria.openMenu')}
          />
          <img src={Logo} alt="TTM Novels Logo" className={styles.logo} />
        </div>

        <div className={styles.centerSection}>
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
          />
          <SearchBar onSearch={handleSearch} isMobile={isMobile} />
          <DarkModeToggle showText={false} />
          <HeaderSocialIcons />
        </div>

        <div className={styles.rightSection}>
          <button
            onClick={handleUserLoginClick}
            className={styles.iconButton}
            aria-label="User Login"
            title="User login"
          >
            👤
          </button>
          <button
            onClick={handleAdminLoginClick}
            className={styles.iconButton}
            aria-label="Admin Login"
            title="Admin login"
          >
            🔒
          </button>
          <button
            onClick={handleNotificationClick}
            className={styles.iconButton}
            aria-label="Notifications"
            title="View notifications"
          >
            🔔
            <span className={styles.notificationBadge}>{notificationCount}</span>
          </button>
        </div>
      </header>

      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        loginType={loginType}
      />
    </>
  );
};

export default Header;