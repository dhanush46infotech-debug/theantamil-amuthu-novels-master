import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header/Header';
import UserLogin from '../../components/common/UserLogin/UserLogin';
import styles from './SwethaNovelPage.module.scss';

// Import images
import swethaCard from '../../assets/images/Novel Card/swetha card.jpg';
import swethaChapterImage from '../../assets/images/episodes_card/swetha swe episodes.jpg';

const SwethaNovelPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  // Chapters for Swetha novel
  const chapters = [
    { id: 1, title: 'அத்தியாயம் 1', date: '05/01/2025', words: 1500 },
    { id: 2, title: 'அத்தியாயம் 2', date: '06/01/2025', words: 1500 },
    { id: 3, title: 'அத்தியாயம் 3', date: '07/01/2025', words: 1500 },
    { id: 4, title: 'அத்தியாயம் 4', date: '08/01/2025', words: 1500 },
    { id: 5, title: 'அத்தியாயம் 5', date: '09/01/2025', words: 1500 },
    { id: 6, title: 'அத்தியாயம் 6', date: '10/01/2025', words: 1500 },
    { id: 7, title: 'அத்தியாயம் 7', date: '11/01/2025', words: 1500 },
    { id: 8, title: 'அத்தியாயம் 8', date: '12/01/2025', words: 1500 },
    { id: 9, title: 'அத்தியாயம் 9', date: '13/01/2025', words: 1500 },
    { id: 10, title: 'அத்தியாயம் 10', date: '14/01/2025', words: 1500 },
    { id: 11, title: 'அத்தியாயம் 11', date: '15/01/2025', words: 1500 },
    { id: 12, title: 'அத்தியாயம் 12', date: '16/01/2025', words: 1500 },
    { id: 13, title: 'அத்தியாயம் 13', date: '17/01/2025', words: 1500 },
    { id: 14, title: 'அத்தியாயம் 14', date: '18/01/2025', words: 1500 },
    { id: 15, title: 'அத்தியாயம் 15', date: '19/01/2025', words: 1500 },
    { id: 16, title: 'அத்தியாயம் 16', date: '20/01/2025', words: 1500 },
    { id: 17, title: 'அத்தியாயம் 17', date: '21/01/2025', words: 1500 },
    { id: 18, title: 'அத்தியாயம் 18', date: '22/01/2025', words: 1500 },
    { id: 19, title: 'அத்தியாயம் 19', date: '23/01/2025', words: 1500 },
    { id: 20, title: 'அத்தியாயம் 20', date: '24/01/2025', words: 1500 },
    { id: 21, title: 'அத்தியாயம் 21', date: '25/01/2025', words: 1500 },
    { id: 22, title: 'அத்தியாயம் 22', date: '26/01/2025', words: 1500 },
    { id: 23, title: 'அத்தியாயம் 23', date: '27/01/2025', words: 1500 },
    { id: 24, title: 'அத்தியாயம் 24', date: '28/01/2025', words: 1500 },
    { id: 25, title: 'அத்தியாயம் 25', date: '29/01/2025', words: 1500 },
    { id: 26, title: 'அத்தியாயம் 26', date: '30/01/2025', words: 1500 },
    { id: 27, title: 'அத்தியாயம் 27', date: '31/01/2025', words: 1500 }
  ];

  const novel = {
    id: 2,
    title: 'தாலாட்டும் தாழம்பூவே',
    author: 'Swetha Swe',
    genres: ['Love', 'Romantic'],
    image: swethaCard,
    stats: {
      views: '25.6K',
      bookmarks: '1.9K',
      chapters: chapters.length
    },
    description: {
      tamil: 'சிறுவயதில் வீட்டை விட்டு வெளியேறிய நாயகன், எட்டு வருடங்கள் கடந்து யாரும் எதிர்பார்க்காத வகையில், கையில் குழந்தையுடன் வீட்டிற்கு வருகிறான். சிறுவயது முதல் தாய், தந்தை, தங்கை, தம்பி என்று அவர்களையே தன் உலகம் என்று வாழ்ந்த நாயகிக்குத் துரோகம் இழைத்தது மட்டுமில்லாமல், அவளை "அவர்கள் வீட்டுப் பெண்ணே இல்லை" என்று கூறியதால், வீட்டை விட்டு வெளியேறி, யாரும் இல்லாமல் நிர்கதியாக நிற்கிறாள் நாயகி. இவர்கள் இருவரும் திருமண பந்தத்தில் ஒன்று சேர்ந்தால், அவர்களின் வாழ்க்கை எவ்வாறு இருக்கும்? தெரிந்துகொள்ளக் காத்திருங்கள்... "தாலாட்டும் தாழம்பூவே!"',
      english: ''
    },
    chapters: chapters
  };

  const handleChapterClick = (chapterId) => {
    navigate(`/novel/2/chapter/${chapterId}`);
  };

  const handleContinueReading = () => {
    navigate(`/novel/2/chapter/1`);
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
              <span className={styles.author}>{novel.author}</span>
            </div>

            {/* Genres */}
            <div className={styles.genres}>
              {novel.genres.map((genre, index) => (
                <span key={index} className={styles.genreTag}>{genre}</span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button className={styles.readButton} onClick={handleContinueReading}>
                படிக்க ஆரம்பிக்கவும்
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
          <h2 className={styles.sectionTitle}>அத்தியாயங்கள் [{novel.chapters.length}]</h2>
          <div className={styles.chaptersList}>
            {novel.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={styles.chapterCard}
                onClick={() => handleChapterClick(chapter.id)}
              >
                <div className={styles.chapterImageWrapper}>
                  <img
                    src={swethaChapterImage}
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

export default SwethaNovelPage;
