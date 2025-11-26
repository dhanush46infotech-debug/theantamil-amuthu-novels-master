import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header/Header';
import UserLogin from '../../components/common/UserLogin/UserLogin';
import styles from './NovelDetailPage.module.scss';

// Import the card image from your screenshots
import thenmozhiCard from '../../assets/images/Novel Card/Thenmozhi Card.jpg';
import thenmozhiChapterImage from '../../assets/images/episodes_card/Thenmozhi_episodes.jpg';

const NovelDetailPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  // Dummy novel data - based on your requirement
  const novel = {
    id: 1,
    title: 'ராட்சசனே எனை வதைப்பதேனடா!',
    englishTitle: 'Shadow of Night',
    author: 'தேன்மொழி',
    rating: 4.8,
    reviewCount: 567,
    genres: ['Thriller', 'Mystery'],
    image: thenmozhiCard,
    stats: {
      views: '25.6K',
      bookmarks: '1.9K',
      chapters: 12
    },
    description: {
      tamil: 'மதுரை தெருக்களில் நடக்கும் மர்ம கொலைகளை விசாரிக்கும் துப்பறியும் அதிகாரி ரவியின் பரபரப்பான பயணம்.',
      english: 'A gripping thriller about a detective solving mysterious murders in the streets of Madurai. Dark secrets unfold as Inspector Ravi delves deeper into a conspiracy that threatens the entire city.'
    },
    chapters: [
      { id: 1, title: 'தேன் 1', date: '05/01/2025', words: 1500 },
      { id: 2, title: 'தேன் 2', date: '06/01/2025', words: 1500 },
      { id: 3, title: 'தேன் 3', date: '07/01/2025', words: 1500 },
      { id: 4, title: 'தேன் 4', date: '08/01/2025', words: 1500 },
      { id: 5, title: 'தேன் 5', date: '09/01/2025', words: 1500 },
      { id: 6, title: 'தேன் 6', date: '10/01/2025', words: 1500 },
      { id: 7, title: 'தேன் 7', date: '11/01/2025', words: 1500 },
      { id: 8, title: 'தேன் 8', date: '12/01/2025', words: 1500 },
      { id: 9, title: 'தேன் 9', date: '13/01/2025', words: 1500 },
      { id: 10, title: 'தேன் 10', date: '14/01/2025', words: 1500 },
      { id: 11, title: 'தேன் 11', date: '15/01/2025', words: 1500 },
      { id: 12, title: 'தேன் 12', date: '16/01/2025', words: 1500 }
    ]
  };

  const handleChapterClick = (chapterId) => {
    // Navigate directly to chapter page without login check
    navigate(`/novel/${novel.id}/chapter/${chapterId}`);
  };

  const handleContinueReading = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    // Navigate to first chapter or last read chapter
    console.log('Continue reading');
  };

  const handleDownloadPDF = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    console.log('Download PDF');
  };

  const handleBookmark = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    console.log('Bookmark novel');
  };

  const handleLike = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    console.log('Like novel');
  };

  const handleShare = () => {
    console.log('Share novel');
  };

  return (
    <div className={styles.novelDetailContainer}>
      <Header onLoginClick={handleLoginClick} />

      <div className={styles.content}>
        {/* Novel Header Section */}
        <div className={styles.novelHeader}>
          <div className={styles.imageSection}>
            <img src={novel.image} alt={novel.title} className={styles.novelImage} />
          </div>

          <div className={styles.infoSection}>
            {/* Title */}
            <h1 className={styles.novelTitle}>{novel.title}</h1>

            {/* Author */}
            <div className={styles.authorSection}>
              <span className={styles.author}>👤 {novel.author}</span>
            </div>

            {/* Genres */}
            <div className={styles.genres}>
              {novel.genres.map((genre, index) => (
                <span key={index} className={styles.genreTag}>{genre}</span>
              ))}
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{novel.stats.chapters}</div>
                <div className={styles.statLabel}>அத்தியாயங்கள்</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button className={styles.readButton} onClick={handleContinueReading}>
                📖 படிக்க ஆரம்பிக்கவும்
              </button>
            </div>
          </div>
        </div>

        {/* Story Summary Section */}
        <div className={styles.storySection}>
          <h2 className={styles.sectionTitle}>கதை சுருக்கம்</h2>
          <div className={styles.storyContent}>
            <p className={styles.tamilDescription}>{novel.description.tamil}</p>
            <p className={styles.englishDescription}>{novel.description.english}</p>
          </div>
        </div>

        {/* Chapters Section */}
        <div className={styles.chaptersSection}>
          <h2 className={styles.sectionTitle}>அத்தியாயங்கள் ({novel.chapters.length})</h2>
          <div className={styles.chaptersList}>
            {novel.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={styles.chapterCard}
                onClick={() => handleChapterClick(chapter.id)}
              >
                <div className={styles.chapterImageWrapper}>
                  <img
                    src={thenmozhiChapterImage}
                    alt={chapter.title}
                    className={styles.chapterImage}
                  />
                </div>
                <h3 className={styles.chapterTitle}>{chapter.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Login Modal */}
      <UserLogin isOpen={isLoginModalOpen} onClose={handleCloseLogin} />
    </div>
  );
};

export default NovelDetailPage;
