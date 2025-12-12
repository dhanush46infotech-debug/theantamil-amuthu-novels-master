import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left Section - Brand */}
        <div className={styles.brandSection}>
          <div className={styles.brandCard}>
            <div className={styles.brandHeader}>
              <svg
                className={styles.brandIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 2h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
              </svg>
              <span className={styles.brandName}>NovelNest</span>
            </div>
            <div className={styles.brandTagline}>TAMIL NOVELS</div>
          </div>
          <button className={styles.ctaButton} onClick={() => navigate('/novels')}>
            BROWSE NOVELS
          </button>
        </div>

        {/* Center Section - Description */}
        <div className={styles.descriptionSection}>
          <h2 className={styles.logoTitle}>NovelNest.</h2>
          <p className={styles.description}>
            The leading platform for Tamil novel readers. Discover thousands of captivating stories across all genres.
            Join our community of readers exploring the rich world of Tamil literature.
          </p>
        </div>

        {/* Right Section - Links Grid */}
        <div className={styles.linksGrid}>
          {/* Content Column */}
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>CONTENT</h3>
            <ul className={styles.linkList}>
              <li><a href="/novels">Novels</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/authors">Authors</a></li>
              <li><a href="/trending">Trending</a></li>
              <li><a href="/new-releases">New Releases</a></li>
            </ul>
          </div>

          {/* More Column */}
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>MORE</h3>
            <ul className={styles.linkList}>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/advertise">Advertise</a></li>
            </ul>
          </div>

          {/* Socials Column */}
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>SOCIALS</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <div className={styles.copyright}>
            © {currentYear} NovelNest. All rights reserved
          </div>
          <div className={styles.bottomLinks}>
            <a href="/advertise">Advertise with NovelNest</a>
            <span className={styles.separator}>|</span>
            <a href="/terms">User Agreement</a>
            <span className={styles.separator}>|</span>
            <a href="/privacy">Privacy Policy</a>
            <span className={styles.separator}>|</span>
            <a href="/cookies">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
