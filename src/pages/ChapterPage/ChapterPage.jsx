import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import { useAuth } from '../../context/AuthContext';
import styles from './ChapterPage.module.scss';

const ChapterPage = () => {
  const { novelId, chapterId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLoginClick = () => {
    // Handle login if needed
  };

  const handleBack = () => {
    navigate(`/novel/${novelId}`);
  };

  return (
    <div className={styles.chapterContainer}>
      <Header onLoginClick={handleLoginClick} />

      <div className={styles.content}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back to Novel
        </button>

        <div className={styles.chapterContent}>
          <h1 className={styles.chapterTitle}>Chapter {chapterId}</h1>
          <p className={styles.placeholder}>Chapter content will be added here...</p>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
