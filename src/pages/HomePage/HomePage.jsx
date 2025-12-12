import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import novelService from '../../services/API/novelService';
import styles from './HomePage.module.scss';

// Import novel card images
import thenmozhiCard from '../../assets/images/Novel Card/Thenmozhi Card.jpg';
import swethaCard from '../../assets/images/Novel Card/swetha card.jpg';
import mohanaCard from '../../assets/images/Novel Card/Mohana card.jpg';

// Image mapping
const imageMap = {
  'Novel Card/Thenmozhi Card.jpg': thenmozhiCard,
  'Novel Card/swetha card.jpg': swethaCard,
  'Novel Card/Mohana card.jpg': mohanaCard,
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch novels
  useEffect(() => {
    const fetchNovels = async () => {
      try {
        setLoading(true);
        const response = await novelService.getAllNovels();
        const novelsList = response.novels || response || [];
        setNovels(novelsList);
      } catch (error) {
        console.error('Error fetching novels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/novels?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNovelClick = (novelId) => {
    navigate(`/novel/${novelId}`);
  };

  return (
    <div className={styles.homePage}>
      <Header />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Your Next <span className={styles.highlight}>Favorite Book</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Explore over 50,000 e-books across all genres.<br />
            Read anytime, anywhere.
          </p>

          {/* Hero Search Bar */}
          <form className={styles.heroSearchForm} onSubmit={handleSearch}>
            <div className={styles.heroSearchContainer}>
              <svg
                className={styles.heroSearchIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                className={styles.heroSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className={styles.searchButton}>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Tamil Novels Showcase Section */}
      <section className={styles.novelsSection}>
        <div className={styles.novelsContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Tamil Novels</h2>
            <p className={styles.sectionSubtitle}>
              Immerse yourself in captivating Tamil stories
            </p>
          </div>

          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Loading novels...</p>
            </div>
          ) : (
            <div className={styles.novelsGrid}>
              {novels.map((novel, index) => (
                <div
                  key={novel.id}
                  className={styles.novelCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleNovelClick(novel.id)}
                >
                  <div className={styles.novelImageWrapper}>
                    {novel.coverImage && imageMap[novel.coverImage] ? (
                      <img
                        src={imageMap[novel.coverImage]}
                        alt={novel.title}
                        className={styles.novelImage}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm2 2h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
                        </svg>
                      </div>
                    )}
                    <div className={styles.novelOverlay}>
                      <button className={styles.readButton}>
                        Read Now
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className={styles.novelInfo}>
                    <h3 className={styles.novelTitle}>{novel.title}</h3>
                    <p className={styles.novelAuthor}>By {novel.author}</p>

                    <div className={styles.novelMeta}>
                      <div className={styles.rating}>
                        <svg className={styles.starIcon} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span>{novel.rating}</span>
                      </div>
                      <div className={styles.chapters}>
                        <svg className={styles.bookIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                        <span>{novel.totalChapters} Chapters</span>
                      </div>
                    </div>

                    <div className={styles.genreBadge}>
                      {novel.genre}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.viewAllContainer}>
            <button className={styles.viewAllButton} onClick={() => navigate('/novels')}>
              View All Novels
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
