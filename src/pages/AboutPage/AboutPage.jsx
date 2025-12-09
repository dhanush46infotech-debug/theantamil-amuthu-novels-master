import { useState } from 'react';
import Header from '../../components/layout/Header/Header';
import UserLogin from '../../components/common/UserLogin/UserLogin';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className={styles.aboutContainer}>
      <Header onLoginClick={handleLoginClick} />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t.about.title}</h1>
          <p className={styles.description}>{t.about.description}</p>
        </div>

        <div className={styles.placeholder}>
          <p>{t.about.placeholder}</p>
        </div>

        {/* Placeholder for future content */}
        <div className={styles.sections}>
          <div className={styles.section}>
            <h2>{t.about.mission}</h2>
            <p>{t.about.missionText}</p>
          </div>

          <div className={styles.section}>
            <h2>{t.about.vision}</h2>
            <p>{t.about.visionText}</p>
          </div>
        </div>
      </div>

      {isLoginModalOpen && (
        <UserLogin onClose={handleCloseLogin} />
      )}
    </div>
  );
};

export default AboutPage;
