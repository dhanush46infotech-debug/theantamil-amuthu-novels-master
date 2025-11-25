import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header/Header';
import Carousel from '../../components/common/Carousel/Carousel';
import UserLogin from '../../components/common/UserLogin/UserLogin';
import { NOVELS } from '../../utils/constants';
import styles from './NovelsPage.module.scss';

const NovelsPage = () => {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className={styles.novelsContainer}>
      <Header onLoginClick={handleLoginClick} />
      <Carousel />

      {/* Continue Reading Section */}
      <div className={styles.continueReadingSection}>
        <h2 className={styles.sectionHeader}>Continue Reading</h2>
      </div>

      {/* Novels Grid Section */}
      <div className={styles.content}>
        <div className={styles.grid}>
          {NOVELS.map(novel => (
            <div className={styles.novelCard} key={novel.id}>
              <div className={styles.cardImage}>
                {novel.image ? (
                  <img
                    src={`/src/assets/images/${novel.image}`}
                    alt={novel.title}
                    className={styles.novelImage}
                  />
                ) : (
                  <span className={styles.placeholder}>Novel Cover</span>
                )}
              </div>
              <h3 className={styles.novelTitle}>{novel.title}</h3>
              <p className={styles.novelAuthor}>by {novel.author}</p>
              <button className={styles.readNowButton}>READ NOW</button>
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
