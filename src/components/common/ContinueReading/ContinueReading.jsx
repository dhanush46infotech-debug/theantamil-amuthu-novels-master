import styles from './ContinueReading.module.scss';

const ContinueReading = ({ onLoginClick, userName }) => {
  return (
    <div className={styles.continueReadingContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.text}>
          <span className={styles.continueText}>CONTINUE READING</span>
          <span>FOR</span>
          <button onClick={onLoginClick} className={styles.loginButton}>
            {userName || 'LOGIN USER NAME'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueReading;
