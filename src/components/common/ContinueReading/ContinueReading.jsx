import styles from './ContinueReading.module.scss';

const ContinueReading = () => {
  return (
    <div className={styles.continueReadingContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.text}>
          <span className={styles.continueText}>CONTINUE READING</span>
        </div>
      </div>
    </div>
  );
};

export default ContinueReading;
