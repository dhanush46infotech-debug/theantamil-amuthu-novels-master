import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import Header from '../../components/layout/Header/Header';
import Carousel from '../../components/common/Carousel/Carousel';
import UserLogin from '../../components/common/UserLogin/UserLogin';
import { NOVELS } from '../../utils/constants';
import styles from './NovelsPage.module.scss';

// Import novel card images
import thenmozhiCard from '../../assets/images/Novel Card/Thenmozhi Card.jpg';
import swethaCard from '../../assets/images/Novel Card/swetha card.jpg';
import mohanaCard from '../../assets/images/Novel Card/Mohana card.jpg';

// Image mapping
const imageMap = {
  'Novel Card/Thenmozhi Card.jpg': thenmozhiCard,
  'Novel Card/swetha card.jpg': swethaCard,
  'Novel Card/Mohana card.jpg': mohanaCard
};

const NovelsPage = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const t = translations[language];

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  const handleNovelClick = (novelId) => {
    navigate(`/novel/${novelId}`);
  };

  return (
    <div className={styles.novelsContainer}>
      <Header onLoginClick={handleLoginClick} />
      <Carousel />

      {/* Continue Reading Section */}
      <div className={styles.continueReadingSection}>
        <h2 className={styles.sectionHeader}>{language === 'tamil' ? 'தொடர்ந்து படிக்க' : 'Continue Reading'}</h2>
      </div>

      {/* Novels Grid Section */}
      <div className={styles.content}>
        <div className={styles.grid}>
          {NOVELS.map(novel => (
            <div className={styles.novelCard} key={novel.id} onClick={() => handleNovelClick(novel.id)}>
              <div className={styles.cardImage}>
                {novel.image && imageMap[novel.image] ? (
                  <img
                    src={imageMap[novel.image]}
                    alt={novel.title}
                    className={styles.novelImage}
                  />
                ) : (
                  <span className={styles.placeholder}>Novel Cover</span>
                )}
              </div>
              <h3 className={styles.novelTitle}>
                {typeof novel.title === 'object'
                  ? novel.title[language]
                  : novel.title}
              </h3>
              <p className={styles.novelAuthor}>by {novel.author}</p>
              <button className={styles.readNowButton} onClick={(e) => { e.stopPropagation(); handleNovelClick(novel.id); }}>{language === 'tamil' ? 'இப்போது படிக்க' : 'READ NOW'}</button>
            </div>
          ))}
        </div>
      </div>

      {/* User Login Modal */}
      <UserLogin isOpen={isLoginModalOpen} onClose={handleCloseLogin} />
    </div>
  );
};

export default NovelsPage;
