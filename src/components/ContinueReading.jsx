import React from 'react';
import styles from '../styles/continueReading.module.scss';

const ContinueReading = () => {
  // Novel data
  const novels = [
    {
      id: 1,
      title: 'வந்தத்துணையே! என் வாழ்க்கைத்துணையே!',
      author: 'Mohanaamozhi',
    },
    {
      id: 2,
      title: 'தாலாட்டும் தாழம்பூவே',
      author: 'Swetha Swe',
    },
    {
      id: 3,
      title: 'ராட்சசனே எனை வதைப்பதேனடா!',
      author: 'Thenmozhi',
    },
  ];

  return (
    <div className={styles.continueReadingSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Continue Reading</h2>

        <div className={styles.novelsGrid}>
          {novels.map((novel) => (
            <div key={novel.id} className={styles.novelCard}>
              <div className={styles.novelContent}>
                <h3 className={styles.novelTitle}>{novel.title}</h3>
                <p className={styles.novelAuthor}>by {novel.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueReading;
