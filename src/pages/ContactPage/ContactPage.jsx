import { useState } from 'react';
import Header from '../../components/layout/Header/Header';
import UserLogin from '../../components/common/UserLogin/UserLogin';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './ContactPage.module.scss';

const ContactPage = () => {
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
    <div className={styles.contactContainer}>
      <Header onLoginClick={handleLoginClick} />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t.contact.title}</h1>
          <p className={styles.description}>{t.contact.description}</p>
        </div>

        <div className={styles.placeholder}>
          <p>{t.contact.placeholder}</p>
        </div>

        {/* Placeholder for future contact form */}
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <h3>{t.contact.email}</h3>
            <p>info@theantamilamudhu.com</p>
          </div>
          <div className={styles.infoCard}>
            <h3>{t.contact.phone}</h3>
            <p>+91 XXXX XXXXXX</p>
          </div>
          <div className={styles.infoCard}>
            <h3>{t.contact.address}</h3>
            <p>Tamil Nadu, India</p>
          </div>
        </div>
      </div>

      {isLoginModalOpen && (
        <UserLogin onClose={handleCloseLogin} />
      )}
    </div>
  );
};

export default ContactPage;
