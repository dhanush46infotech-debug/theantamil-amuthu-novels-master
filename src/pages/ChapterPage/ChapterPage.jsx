import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header/Header';
import { useAuth } from '../../context/AuthContext';
import { getChapterContent } from '../../utils/chapterContentLoader';
import styles from './ChapterPage.module.scss';

const ChapterPage = () => {
  const { novelId, chapterId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLoginClick = () => {
    // Handle login if needed
  };

  const handleBack = () => {
    navigate(`/novel/${novelId}`);
  };

  // Load chapter content dynamically
  useEffect(() => {
    const loadChapter = async () => {
      setLoading(true);
      const data = await getChapterContent(Number(novelId), Number(chapterId));
      setChapterData(data);
      setLoading(false);
    };

    loadChapter();
  }, [novelId, chapterId]);

  // Handle loading and not found states
  if (loading) {
    return (
      <div className={styles.chapterContainer}>
        <Header onLoginClick={handleLoginClick} />
        <div className={styles.content}>
          <div className={styles.chapterContent}>
            <h1 className={styles.chapterTitle}>ஏற்றுகிறது...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!chapterData) {
    return (
      <div className={styles.chapterContainer}>
        <Header onLoginClick={handleLoginClick} />
        <div className={styles.content}>
          <button className={styles.backButton} onClick={handleBack}>
            ← திரும்பிச் செல்க
          </button>
          <div className={styles.chapterContent}>
            <h1 className={styles.chapterTitle}>அத்தியாயம் கிடைக்கவில்லை</h1>
            <p className={styles.placeholder}>இந்த அத்தியாயம் இன்னும் வெளியிடப்படவில்லை. விரைவில் வரும்...</p>
          </div>
        </div>
      </div>
    );
  }

  // Format chapter content with proper paragraph breaks
  const formatContent = (content) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className={styles.paragraph}>
        {paragraph}
      </p>
    ));
  };

  return (
    <div className={styles.chapterContainer}>
      <Header onLoginClick={handleLoginClick} />

      <div className={styles.content}>
        <button className={styles.backButton} onClick={handleBack}>
          ← திரும்பிச் செல்க
        </button>

        <div className={styles.chapterContent}>
          <h1 className={styles.chapterTitle}>{chapterData.subtitle || chapterData.title}</h1>
          <div className={styles.storyContent}>
            {formatContent(chapterData.content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
