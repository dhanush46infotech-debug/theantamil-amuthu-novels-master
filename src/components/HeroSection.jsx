import { useState, useEffect } from 'react';
import styles from '../styles/HeroSection.module.scss';
import buttonStyles from '../styles/ReadNowButton.module.scss';

// Import genre images
import RomanticImg from '../assets/Romantic.jpg';
import HeroicImg from '../assets/Heroic.jpg';
import FantasyImg from '../assets/Fantasy.jpg';
import CrimeImg from '../assets/Crime.jpg';
import HorrorImg from '../assets/Horrorobj.jpg';

// Import social media logos
import gmailLogo from '../assets/gmail-logo.png';
import facebookLogo from '../assets/facebook-logo.png';
import instagramLogo from '../assets/instagram-logo.png';
import youtubeLogo from '../assets/youtube-logo.png';

const HeroSection = () => {
  // Image carousel state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // Main slide state
  const [mainSlide, setMainSlide] = useState(0);
  // YouTube modal state
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);

  // Stars data for slide 2
  const [stars] = useState(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2
    }));
  });

  // Navigation functions
  const goToNextMainSlide = () => {
    setMainSlide((prev) => (prev + 1) % 2);
  };

  const goToPrevMainSlide = () => {
    setMainSlide((prev) => (prev - 1 + 2) % 2);
  };

  // YouTube modal handler
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

  const carouselImages = [
    { id: 1, image: RomanticImg, alt: 'Romantic' },
    { id: 2, image: HeroicImg, alt: 'Heroic' },
    { id: 3, image: FantasyImg, alt: 'Fantasy' },
    { id: 4, image: CrimeImg, alt: 'Crime' },
    { id: 5, image: HorrorImg, alt: 'Horror' }
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // 5 seconds per image

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className={styles.heroContainer}>
      {/* SLIDE 1: Image Carousel with Ken Burns Effect */}
      <div className={`${styles.mainSlide} ${mainSlide === 0 ? styles.active : ''}`}>
        {/* Image carousel */}
        {carouselImages.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.carouselImage} ${
              index === activeImageIndex ? styles.activeImage : ''
            }`}
            style={{
              backgroundImage: `url(${item.image})`
            }}
          />
        ))}

        {/* Dark overlay */}
        <div className={styles.overlay} />

        {/* Center Quote */}
        <div className={styles.quoteContainer}>
          <h1 className={styles.quoteText}>
            தேன்தமிழமுது தேடிப்படி<br />
            அள்ளி அள்ளி பருக<br />
            ஆசை பெருகுமே!!
          </h1>
        </div>

        {/* 3D Read Now Button */}
        <button className={`${buttonStyles.readNowButton} ${styles.heroButton}`}>
          <span className={buttonStyles.buttonText}>READ NOW</span>
        </button>

        {/* WELCOME text with letter-by-letter dripping animation */}
        <div className={styles.welcomeText}>
          {['W', 'E', 'L', 'C', 'O', 'M', 'E'].map((letter, index) => {
            const letterClasses = [
              styles.letterW, // W → Drip Stretch Down
              styles.letterE1, // E → Liquid Drop Movement
              styles.letterL, // L → Melting Pull-down
              styles.letterC, // C → Dripping Slide
              styles.letterO, // O → Bottom Drip Expansion
              styles.letterM, // M → Wobble + Drip Stretch
              styles.letterE2 // E → Soft Melt + Downward Trail
            ];

            return (
              <span
                key={index}
                className={`${styles.drippingLetter} ${letterClasses[index]}`}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {letter}
              </span>
            );
          })}
        </div>


      </div>

      {/* SLIDE 2: Stars Animation with Footer Content */}
      <div className={`${styles.mainSlide} ${mainSlide === 1 ? styles.active : ''}`}>
        <div className={styles.starsBackground}>
          {stars.map((star) => (
            <div
              key={star.id}
              className={styles.star}
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.duration}s`
              }}
            />
          ))}
        </div>

        {/* Social Media Icons */}
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
    </div>
  );
};

export default HeroSection;


