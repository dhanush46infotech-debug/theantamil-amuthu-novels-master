import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header/Header';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useReadingProgress } from '../../context/ReadingProgressContext';
import { translations } from '../../translations';
import { getChapterContent } from '../../utils/chapterContentLoader';
import styles from './ChapterPage.module.scss';

// Novel metadata - contains title and default language
const NOVEL_METADATA = {
  1: {
    title: 'ராட்சசனே எனை வதைப்பதேனடா!',
    defaultLanguage: 'tamil'
  },
  2: {
    title: 'தாலாட்டும் தாழம்பூவே!',
    defaultLanguage: 'tamil'
  },
  3: {
    title: 'மோகனா',
    defaultLanguage: 'tamil'
  }
};

const ChapterPage = () => {
  const { novelId, chapterId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language: userLanguage } = useLanguage();
  const { updateProgress, completeNovel } = useReadingProgress();
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayLanguage, setDisplayLanguage] = useState(userLanguage);

  const t = translations[displayLanguage];
  const novelMeta = NOVEL_METADATA[novelId];

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

  // Load chapter content dynamically with proper language fallback
  useEffect(() => {
    const loadChapter = async () => {
      setLoading(true);
      
      // Use default language for the novel if user language is not available
      const languageToUse = displayLanguage;
      
      const data = await getChapterContent(Number(novelId), Number(chapterId), languageToUse);
      setChapterData(data);
      setLoading(false);
    };

    loadChapter();
  }, [novelId, chapterId, displayLanguage]);

  // Set default language based on novel when component mounts
  useEffect(() => {
    if (novelMeta) {
      setDisplayLanguage(novelMeta.defaultLanguage);
    }
  }, [novelId, novelMeta]);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterId]);

  // Update reading progress when chapter changes
  useEffect(() => {
    if (novelId && chapterId) {
      updateProgress(Number(novelId), Number(chapterId));

      // Check if this is the last chapter (chapter 27 for novels 1 and 2)
      if (Number(chapterId) === 27 && novelMeta) {
        // Mark as complete when reaching the last chapter
        completeNovel(Number(novelId), novelMeta.title, getNovelCoverImage(Number(novelId)), getNovelAuthor(Number(novelId)));
      }
    }
  }, [novelId, chapterId, updateProgress, completeNovel, novelMeta]);

  // Helper function to get novel cover image
  const getNovelCoverImage = (id) => {
    const coverImages = {
      1: 'Novel Card/Thenmozhi Card.jpg',
      2: 'Novel Card/swetha card.jpg',
      3: 'Novel Card/Mohana card.jpg'
    };
    return coverImages[id] || '';
  };

  // Helper function to get novel author
  const getNovelAuthor = (id) => {
    const authors = {
      1: 'தென்மொழி',
      2: 'ஸ்வேதா ஸ்வே',
      3: 'மோகனா'
    };
    return authors[id] || '';
  };

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
          {/* Novel Title Heading */}
          {novelMeta && (
            <h1 className={styles.novelTitle}>{novelMeta.title}</h1>
          )}
          
          {/* Chapter Header */}
          {chapterData.title && (
            <h2 className={styles.chapterHeading}>{chapterData.title}</h2>
          )}

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
