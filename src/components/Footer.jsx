import { useState } from 'react';
import styles from '../styles/Footer.module.scss';
import gmailLogo from '../assets/gmail-logo.png';
import facebookLogo from '../assets/facebook-logo.png';
import instagramLogo from '../assets/instagram-logo.png';
import youtubeLogo from '../assets/youtube-logo.png';

const Footer = () => {
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);

  const handleYouTubeClick = (e) => {
    e.preventDefault();
    setShowYouTubeModal(true);
  };

  const youtubeChannels = [
    {
      name: 'YouTube(Thenmozhi)',
      url: 'https://www.youtube.com/@thenthuzhinovels'
    },
    {
      name: 'YouTube(MohanaMozhi)',
      url: 'https://www.youtube.com/@mohanaamozhi_novels'
    },
    {
      name: 'YouTube(Swetha swe)',
      url: 'https://youtube.com/@swethaa_swe?si=GqKD38Gj9YAa6mhw'
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Follow Us - Centered */}
        <div className={styles.followSection}>
          <h3 className={styles.followTitle}>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="mailto:thentamizhamuzhunovels@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <img src={gmailLogo} alt="Gmail" />
            </a>

            <a href="https://www.facebook.com/share/g/1FKze6xJV1/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <img src={facebookLogo} alt="Facebook" />
            </a>

            <a href="https://www.instagram.com/thentamizhamuzhunovels?igsh=MTVmZ3p6dTlzZDEzeA" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <img src={instagramLogo} alt="Instagram" />
            </a>

            <a href="#" onClick={handleYouTubeClick} className={styles.socialIcon}>
              <img src={youtubeLogo} alt="YouTube" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          © 2026 தேன்தமிழமுது. All rights reserved.
        </div>
      </div>

      {/* YouTube Modal */}
      {showYouTubeModal && (
        <div className={styles.modalOverlay} onClick={() => setShowYouTubeModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>YouTube Channels</h2>
              <button className={styles.modalClose} onClick={() => setShowYouTubeModal(false)}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              {youtubeChannels.map((channel, index) => (
                <a
                  key={index}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelLink}
                >
                  <img src={youtubeLogo} alt="YouTube" className={styles.channelIcon} />
                  <span className={styles.channelName}>{channel.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;