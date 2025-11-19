import { useState } from 'react';
import styles from './Carousel.module.scss';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        {/* Slides */}
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide 1 */}
          <div className={styles.carouselSlide}>
            <div className={styles.slideContent}>
              <h2 className={styles.slideTitle}>Slide 1</h2>
              <p className={styles.slideDescription}>Content for slide 1</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className={styles.carouselSlide}>
            <div className={styles.slideContent}>
              <h2 className={styles.slideTitle}>Slide 2</h2>
              <p className={styles.slideDescription}>Content for slide 2</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className={styles.carouselSlide}>
            <div className={styles.slideContent}>
              <h2 className={styles.slideTitle}>Slide 3</h2>
              <p className={styles.slideDescription}>Content for slide 3</p>
            </div>
          </div>
        </div>

        {/* Previous Button */}
        <button
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Next Button */}
        <button
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className={styles.carouselDots}>
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
