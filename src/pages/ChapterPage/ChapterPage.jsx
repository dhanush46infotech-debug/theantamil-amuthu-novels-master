import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
    totalChapters: 27
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

  // Ensure numeric conversion for proper lookups
  const numNovelId = Number(novelId);
  const numChapterId = Number(chapterId);

  console.log('[CHAPTER_PAGE] RENDER - novelId:', numNovelId, 'chapterId:', numChapterId, 'userLanguage:', userLanguage);

  const t = translations[userLanguage];
  const novelMeta = NOVEL_METADATA[numNovelId];

  const handleLoginClick = () => {
    // Handle login if needed
  };

  const handleBack = () => {
    const backPath = `/novel/${numNovelId}`;
    console.log('[CHAPTER_PAGE] Back button - going to:', backPath);
    navigate(backPath);
  };

  const handlePreviousChapter = () => {
    const prevChapter = numChapterId - 1;
    console.log('[PREV_DEBUG] Current numChapterId:', numChapterId, 'prevChapter:', prevChapter, 'numNovelId:', numNovelId);
    if (prevChapter >= 1) {
      const newPath = `/novel/${numNovelId}/chapter/${prevChapter}`;
      console.log('[PREV_NAVIGATE] Going to:', newPath);
      navigate(newPath);
    }
  };

  const handleNextChapter = () => {
    const nextChapter = numChapterId + 1;
    const maxChapters = novelMeta?.totalChapters || 27;
    console.log('[NEXT_DEBUG] Current numChapterId:', numChapterId, 'nextChapter:', nextChapter, 'maxChapters:', maxChapters, 'novelMeta:', novelMeta);
    if (nextChapter <= maxChapters) {
      const newPath = `/novel/${numNovelId}/chapter/${nextChapter}`;
      console.log('[NEXT_NAVIGATE] Going to:', newPath);
      navigate(newPath);
    }
  };

  // Load chapter content dynamically with proper language fallback
  useEffect(() => {
    console.log('[CHAPTER_PAGE] useEffect triggered - novelId:', numNovelId, 'chapterId:', numChapterId, 'userLanguage:', userLanguage);
    
    const loadChapter = async () => {
      setLoading(true);
      console.log('[CHAPTER_PAGE] Loading chapter content for chapter:', numChapterId, 'in', userLanguage);
      
      const data = await getChapterContent(numNovelId, numChapterId, userLanguage);
      console.log('[CHAPTER_PAGE] Chapter loaded:', numChapterId, 'Data exists:', !!data);
      setChapterData(data);
      setLoading(false);
    };

    loadChapter();
  }, [numNovelId, numChapterId, userLanguage]);

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
  const maxChapters = novelMeta?.totalChapters || 27;
  const showPrevButton = numChapterId > 1;
  const showNextButton = numChapterId < maxChapters;
  const formatContent = (content) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className={styles.paragraph}>
        {paragraph}
      </p>
    ));
  };

  return (
    <div className={styles.chapterContainer} key={`chapter-${numNovelId}-${numChapterId}`}>
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
                onClick={(e) => {
                  console.log('[PREV_BTN] Clicked - Current chapter:', numChapterId);
                  e.preventDefault();
                  e.stopPropagation();
                  handlePreviousChapter();
                }}
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
                onClick={(e) => {
                  console.log('[NEXT_BTN] Clicked - Current chapter:', numChapterId);
                  e.preventDefault();
                  e.stopPropagation();
                  handleNextChapter();
                }}
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
