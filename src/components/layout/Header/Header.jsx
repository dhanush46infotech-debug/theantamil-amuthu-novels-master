import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search functionality here
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo and Brand */}
        <div className={styles.brand} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <svg
            className={styles.brandIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 2h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
          </svg>
          <span className={styles.brandName}>NovelNest</span>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/novels" className={styles.navLink}>Browse</a>
          <a href="/categories" className={styles.navLink}>Categories</a>
          <a href="/library" className={styles.navLink}>My Library</a>
        </nav>

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
              placeholder="Search books..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Sign In Button */}
        <button
          className={styles.signInButton}
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
