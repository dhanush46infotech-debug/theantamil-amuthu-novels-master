import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Menu from './Menu';
import SearchBar from './SearchBar';
import DarkModeToggle from './DarkModeToggle';
import HeaderSocialIcons from './HeaderSocialIcons';

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
  const languages = ['TAMIL', 'ENGLISH', 'TELUGU', 'HINDI'];

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
                <li key={lang}>
                  <button
                    className={`${styles.languageItem} ${
                      currentLanguage === lang ? styles.active : ''
                    }`}
                    onClick={() => handleSelect(lang)}
                  >
                    {lang}
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
    console.log('User login clicked');
  };

  const handleAdminLoginClick = () => {
    console.log('Admin login clicked');
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
          <SearchBar onSearch={handleSearch} isMobile={isMobile} />
          <HeaderSocialIcons />
          <button
            onClick={handleNotificationClick}
            className={styles.iconButton}
          >
            🔔
            <span className={styles.notificationBadge}>{notificationCount}</span>
          </button>
          <DarkModeToggle showText={false} />
        </div>

        <div className={styles.rightSection}>
          <button
            onClick={handleUserLoginClick}
            className={styles.iconButton}
          >
            👤
          </button>
          <button
            onClick={handleAdminLoginClick}
            className={styles.iconButton}
          >
            🔒
          </button>
        </div>
      </header>

      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;