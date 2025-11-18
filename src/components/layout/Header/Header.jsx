import { useState } from 'react';
import logo from '../../../assets/images/brand/TTM NOVRLS.png';
import styles from './Header.module.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('Tamil');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add search functionality here
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Section: Hamburger Menu & Logo */}
        <div className={styles.leftSection}>
          {/* Hamburger Menu */}
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo */}
          <div className={styles.logoContainer}>
            <img src={logo} alt="TTM Novels Logo" className={styles.logo} />
          </div>
        </div>

        {/* Center Section: Language Selector & Search Bar */}
        <div className={styles.centerSection}>
          {/* Language Selector */}
          <div className={styles.languageSelector}>
            <button
              className={styles.languageButton}
              onClick={toggleLanguageDropdown}
              aria-label="Select language"
            >
              <svg
                className={styles.languageIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span className={styles.languageText}>{language}</span>
              <svg
                className={`${styles.dropdownArrow} ${isLanguageDropdownOpen ? styles.open : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Language Dropdown */}
            {isLanguageDropdownOpen && (
              <div className={styles.languageDropdown}>
                <button
                  className={`${styles.languageOption} ${language === 'Tamil' ? styles.active : ''}`}
                  onClick={() => handleLanguageChange('Tamil')}
                >
                  <span>தமிழ்</span>
                  <span className={styles.languageLabel}>Tamil</span>
                </button>
                <button
                  className={`${styles.languageOption} ${language === 'English' ? styles.active : ''}`}
                  onClick={() => handleLanguageChange('English')}
                >
                  <span>English</span>
                </button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.searchContainer}>
              <svg
                className={styles.searchIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search novels..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.nav}>
            <a href="/" className={styles.navLink}>Home</a>
            <a href="/novels" className={styles.navLink}>Novels</a>
            <a href="/authors" className={styles.navLink}>Authors</a>
            <a href="/about" className={styles.navLink}>About</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
