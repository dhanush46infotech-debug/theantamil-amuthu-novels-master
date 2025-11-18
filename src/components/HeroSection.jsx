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
        <div style={{
          position: 'absolute',
          top: 'calc(50% - 3cm)',
          left: 'calc(50% - 5cm)',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
          maxWidth: '90%',
          padding: '20px'
        }}>
          <h1 style={{
            fontFamily: '"Style Chenet 006", serif',
            fontSize: 'clamp(19.2px, 4vw, 38.4px)',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7)',
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: '1px'
          }}>
            தேன்தமிழமுது தேடிப்படி<br />
            அள்ளி அள்ளி பருக<br />
            ஆசை பெருகுமே!!
          </h1>
        </div>

        {/* 3D Read Now Button */}
        <button
          className={buttonStyles.readNowButton}
          style={{
            position: 'absolute',
            top: 'calc(50% + 2.5cm)',
            left: 'calc(50% - 5.35cm)',
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
        >
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
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: '60px',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}>
            <a href="mailto:thentamizhamuzhunovels@gmail.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: 0.9,
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              <img src={gmailLogo} alt="Gmail" style={{ width: '80px', height: '80px', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
            </a>

            <a href="https://www.facebook.com/share/g/1FKze6xJV1/" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: 0.9,
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              <img src={facebookLogo} alt="Facebook" style={{ width: '80px', height: '80px', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
            </a>

            <a href="https://www.instagram.com/thentamizhamuzhunovels?igsh=MTVmZ3p6dTlzZDEzeA" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: 0.9,
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              <img src={instagramLogo} alt="Instagram" style={{ width: '80px', height: '80px', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
            </a>

            <a href="#" onClick={handleYouTubeClick} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: 0.9,
              cursor: 'pointer',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              <img src={youtubeLogo} alt="YouTube" style={{ width: '80px', height: '80px', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
            </a>
        </div>


      </div>

      {/* YouTube Modal */}
      {showYouTubeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowYouTubeModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ color: '#0a2a43', margin: 0, fontSize: '24px' }}>YouTube Channels</h2>
              <button
                onClick={() => setShowYouTubeModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: 0,
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {youtubeChannels.map((channel, index) => (
                <a
                  key={index}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#0a2a43',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e8f4f8';
                    e.currentTarget.style.borderColor = '#1e90ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <img src={youtubeLogo} alt="YouTube" style={{ width: '40px', height: '40px' }} />
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>{channel.name}</span>
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


