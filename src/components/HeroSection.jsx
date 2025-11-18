import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/HeroSection.module.scss';
import buttonStyles from '../styles/ReadNowButton.module.scss';

// Import genre images for Slide 1
import RomanticImg from '../assets/Romantic.jpg';
import HeroicImg from '../assets/Heroic.jpg';
import FantasyImg from '../assets/Fantasy.jpg';
import CrimeImg from '../assets/Crime.jpg';
import HorrorImg from '../assets/Horrorobj.jpg';

const HeroSection = () => {
  // Main slide state (Slide 1: Image Carousel, Slide 2: Stars Animation)
  const [mainSlide, setMainSlide] = useState(0);

  // Image carousel state (for Slide 1)
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const carouselImages = [
    { id: 1, image: RomanticImg, alt: 'Romantic' },
    { id: 2, image: HeroicImg, alt: 'Heroic' },
    { id: 3, image: FantasyImg, alt: 'Fantasy' },
    { id: 4, image: CrimeImg, alt: 'Crime' },
    { id: 5, image: HorrorImg, alt: 'Horror' }
  ];

  // Auto-rotate images in Slide 1 carousel
  useEffect(() => {
    if (mainSlide === 0) {
      const interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % carouselImages.length);
      }, 5000); // 5 seconds per image

      return () => clearInterval(interval);
    }
  }, [mainSlide, carouselImages.length]);

  // Generate random stars for Slide 2
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2
    }));
  };

  const stars = generateStars(100);

  const goToNextMainSlide = () => {
    setMainSlide(1);
  };

  const goToPrevMainSlide = () => {
    setMainSlide(0);
  };

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
            letterSpacing: '1px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '20px',
            padding: '30px 40px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 20px rgba(255, 255, 255, 0.1)'
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
            left: 'calc(50% - 7.7cm)',
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

        {/* Next button to go to Slide 2 */}
        <button
          className={styles.nextSlideBtn}
          onClick={goToNextMainSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* SLIDE 2: Stars Animation */}
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

        {/* Previous button to go back to Slide 1 */}
        <button
          className={`${styles.prevSlideBtn} ${styles.navigationBtn}`}
          onClick={goToPrevMainSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dot pagination (shows from Slide 2 onwards) */}
        <div className={styles.dotPagination}>
          <button
            className={`${styles.dot} ${mainSlide === 0 ? styles.activeDot : ''}`}
            onClick={() => setMainSlide(0)}
            aria-label="Go to slide 1"
          />
          <button
            className={`${styles.dot} ${mainSlide === 1 ? styles.activeDot : ''}`}
            onClick={() => setMainSlide(1)}
            aria-label="Go to slide 2"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
