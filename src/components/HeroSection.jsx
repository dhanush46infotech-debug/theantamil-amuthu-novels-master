import styles from '../styles/HeroSection.module.scss';

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      {/* Dark overlay for better contrast */}
      <div className={styles.overlay} />
    </div>
  );
};

export default HeroSection;
