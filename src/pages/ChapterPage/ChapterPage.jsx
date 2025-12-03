import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header/Header';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import { getChapterContent } from '../../utils/chapterContentLoader';
import styles from './ChapterPage.module.scss';

const ChapterPage = () => {
  const { novelId, chapterId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);

  const t = translations[language];

  const handleLoginClick = () => {
    // Handle login if needed
  };

  const handleBack = () => {
    navigate(`/novel/${novelId}`);
  };

  const handlePreviousChapter = () => {
    const prevChapter = Number(chapterId) - 1;
    if (prevChapter >= 1) {
      navigate(`/novel/${novelId}/chapter/${prevChapter}`);
    }
  };

  const handleNextChapter = () => {
    const nextChapter = Number(chapterId) + 1;
    if (nextChapter <= 27) {
      navigate(`/novel/${novelId}/chapter/${nextChapter}`);
    }
  };

  // Load chapter content dynamically
  useEffect(() => {
    const loadChapter = async () => {
      setLoading(true);
      const data = await getChapterContent(Number(novelId), Number(chapterId), language);
      setChapterData(data);
      setLoading(false);
    };

    loadChapter();
  }, [novelId, chapterId, language]);

  // Handle loading and not found states
  if (loading) {
    return (
      <div className={styles.chapterContainer}>
        <Header onLoginClick={handleLoginClick} />
        <div className={styles.content}>
          <div className={styles.chapterContent}>
            <h1 className={styles.chapterTitle}>{t.chapter.loading}</h1>
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
            {t.chapter.back}
          </button>
          <div className={styles.chapterContent}>
            <h1 className={styles.chapterTitle}>{t.chapter.notFound}</h1>
            <p className={styles.placeholder}>{t.chapter.comingSoon}</p>
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
          {t.chapter.back}
        </button>

        <div className={styles.chapterContent}>
          <div className={styles.storyContent}>
            {formatContent(chapterData.content)}
          </div>

          {/* Chapter Navigation */}
          <div className={styles.chapterNavigation}>
            {Number(chapterId) > 1 ? (
              <button className={styles.navButton} onClick={handlePreviousChapter}>
                {t.chapter.previous}
              </button>
            ) : (
              <div></div>
            )}

            {Number(chapterId) < 27 ? (
              <button className={styles.navButton} onClick={handleNextChapter}>
                {t.chapter.next}
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
