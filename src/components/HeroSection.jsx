import { useState, useEffect } from 'react';
import styles from '../styles/HeroSection.module.scss';

// Import genre images
import CrimeImg from '../assets/crime.jpg';
import FantasyImg from '../assets/Fantasy.jpg';
import HeroImg from '../assets/Heroimg.jpg';
import HorrorImg from '../assets/HORRORIMG.jpg';
import RomanticImg from '../assets/Romanticimg.jpg';

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const genres = [
    { id: 1, image: CrimeImg },
    { id: 2, image: FantasyImg },
    { id: 3, image: HeroImg },
    { id: 4, image: HorrorImg },
    { id: 5, image: RomanticImg }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % genres.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroContainer}>
      {/* Full-screen image slides */}
      {genres.map((genre, index) => (
        <div
          key={genre.id}
          className={`${styles.slideImage} ${
            index === activeIndex ? styles.active : ''
          }`}
          style={{
            backgroundImage: `url(${genre.image})`
          }}
        />
      ))}

      {/* Dark overlay for better contrast */}
      <div className={styles.overlay} />

      {/* Navigation dots */}
      <div className={styles.navigation}>
        {genres.map((genre, index) => (
          <button
            key={genre.id}
            className={`${styles.dot} ${
              index === activeIndex ? styles.activeDot : ''
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
