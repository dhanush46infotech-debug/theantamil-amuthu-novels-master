import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Header from '../../components/layout/Header/Header';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useReadingProgress } from '../../context/ReadingProgressContext';
import { translations } from '../../translations';
import { getChapterContent } from '../../utils/chapterContentLoader';
import styles from './ChapterPage.module.scss';

// Novel metadata - contains title, default language, and total chapters
const NOVEL_METADATA = {
  1: {
    title: 'ராட்சசனே எனை வதைப்பதேனடா!',
    defaultLanguage: 'tamil',
    totalChapters: 14
  },
  2: {
    title: 'தாலாட்டும் தாழம்பூவே!',
    defaultLanguage: 'tamil',
    totalChapters: 27
  },
  3: {
    title: 'மோகனா',
    defaultLanguage: 'tamil',
    totalChapters: 40
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
  const [displayChapterId, setDisplayChapterId] = useState(Number(chapterId));

  // Ensure numeric conversion for proper lookups
  const numNovelId = Number(novelId);
  const numChapterId = Number(chapterId);

  console.log('[CHAPTER_PAGE] RENDER - novelId:', numNovelId, 'chapterId:', numChapterId, 'displayChapterId:', displayChapterId);

  const t = translations[userLanguage];
  const novelMeta = NOVEL_METADATA[numNovelId];

  const handleLoginClick = () => {
    // Handle login if needed
  };

  const handleBack = useCallback(() => {
    try {
      const backPath = `/novel/${novelId}`;
      console.log('[BACK_BTN] Clicked - novelId:', novelId, 'Path:', backPath);
      navigate(backPath);
    } catch (error) {
      console.error('[BACK_BTN] Error:', error);
    }
  }, [novelId, navigate]);

  const handlePreviousChapter = useCallback(() => {
    try {
      const currentChapterId = Number(chapterId);
      const prevChapter = currentChapterId - 1;
      console.log('[PREV_BTN] Clicked - Current:', currentChapterId, 'Previous:', prevChapter, 'Novel:', novelId);

      if (prevChapter >= 1) {
        const newPath = `/novel/${novelId}/chapter/${prevChapter}`;
        console.log('[PREV_BTN] Navigate to:', newPath);
        navigate(newPath);
      }
    } catch (error) {
      console.error('[PREV_BTN] Error:', error);
    }
  }, [chapterId, novelId, navigate]);

  const handleNextChapter = useCallback(() => {
    try {
      const currentChapterId = Number(chapterId);
      const nextChapter = currentChapterId + 1;
      const config = NOVEL_METADATA[Number(novelId)];
      const maxChapters = config?.totalChapters || 27;

      console.log('[NEXT_BTN] Clicked - Current:', currentChapterId, 'Next:', nextChapter, 'Max:', maxChapters);

      if (nextChapter <= maxChapters) {
        const newPath = `/novel/${novelId}/chapter/${nextChapter}`;
        console.log('[NEXT_BTN] Navigate to:', newPath);
        navigate(newPath);
      }
    } catch (error) {
      console.error('[NEXT_BTN] Error:', error);
    }
  }, [chapterId, novelId, navigate]);

  // Update displayChapterId when route params change
  useEffect(() => {
    const newChapterId = Number(chapterId);
    console.log('[CHAPTER_PAGE] Route params changed - old displayChapterId:', displayChapterId, 'new:', newChapterId);
    setDisplayChapterId(newChapterId);
  }, [chapterId]);

  // Load chapter content dynamically with proper language fallback
  useEffect(() => {
    const currentNovelId = Number(novelId);
    const currentChapterId = Number(chapterId);
    
    console.log('[CHAPTER_LOAD] useEffect triggered - novel:', currentNovelId, 'chapter:', currentChapterId, 'language:', userLanguage);
    
    const loadChapter = async () => {
      try {
        setLoading(true);
        console.log('[CHAPTER_LOAD] Starting load for novel:', currentNovelId, 'chapter:', currentChapterId);
        
        const data = await getChapterContent(currentNovelId, currentChapterId, userLanguage);
        console.log('[CHAPTER_LOAD] Chapter loaded - data exists:', !!data);
        
        setChapterData(data);
        setLoading(false);
      } catch (error) {
        console.error('[CHAPTER_LOAD] Error loading chapter:', error);
        setChapterData(null);
        setLoading(false);
      }
    };

    loadChapter();
  }, [novelId, chapterId, userLanguage]);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterId]);

  // Update reading progress when chapter changes
  useEffect(() => {
    if (numNovelId && numChapterId) {
      updateProgress(numNovelId, numChapterId);

      // Check if this is the last chapter based on novel metadata
      const maxChapters = novelMeta?.totalChapters || 27;
      if (numChapterId === maxChapters && novelMeta) {
        // Mark as complete when reaching the last chapter
        completeNovel(numNovelId, novelMeta.title, getNovelCoverImage(numNovelId), getNovelAuthor(numNovelId));
      }
    }
  }, [numNovelId, numChapterId, updateProgress, completeNovel, novelMeta]);

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

  // Get max chapters - ensure it's always available
  const currentChapterId = Number(chapterId);
  const maxChapters = NOVEL_METADATA[Number(novelId)]?.totalChapters || 27;
  const showPrevButton = currentChapterId > 1;
  const showNextButton = currentChapterId < maxChapters;
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
            {showPrevButton ? (
              <button
                type="button"
                className={styles.navButton}
                onClick={handlePreviousChapter}
              >
                {t.chapter.previous}
              </button>
            ) : (
              <div></div>
            )}

            {showNextButton ? (
              <button
                type="button"
                className={styles.navButton}
                onClick={handleNextChapter}
              >
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
