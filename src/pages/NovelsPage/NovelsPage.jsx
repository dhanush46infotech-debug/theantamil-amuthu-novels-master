import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header/Header';
import Carousel from '../../components/common/Carousel/Carousel';
import ContinueReading from '../../components/common/ContinueReading/ContinueReading';
import UserLogin from '../../components/common/UserLogin/UserLogin';
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
      <ContinueReading />

      {/* User Login Modal */}
      <UserLogin isOpen={isLoginModalOpen} onClose={handleCloseLogin} />
    </div>
  );
};

export default NovelsPage;
