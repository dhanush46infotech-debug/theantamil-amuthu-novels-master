/**
 * NovelDetailPage - API Integrated Version
 *
 * This is an example implementation showing how to integrate the novel APIs
 * Replace the dummy data in NovelDetailPage.jsx with this code when backend is ready
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header/Header';
import UserLogin from '../../components/common/UserLogin/UserLogin';
import novelService from '../../services/API/novelService';
import styles from './NovelDetailPage.module.scss';

const NovelDetailPageWithAPI = () => {
  const { id } = useParams(); // Get novel ID from URL
  const { user } = useAuth();
  const navigate = useNavigate();

  // State management
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch novel data on component mount
  useEffect(() => {
    fetchNovelData();
  }, [id]);

  // Fetch novel data from API
  const fetchNovelData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Option 1: Fetch by ID
      const response = await novelService.getNovelById(id);

      // Option 2: Fetch specific novel (if using the dedicated endpoint)
      // const response = await novelService.getRatsasaneEnaiVathaippathenaNovel();

      setNovel(response.data.novel);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching novel:', err);
      setError('Failed to load novel. Please try again.');
      setLoading(false);
    }
  };

  // Handle login modal
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
  };

  // Handle chapter click
  const handleChapterClick = async (chapterId) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    // Navigate to chapter reading page
    navigate(`/novel/${id}/chapter/${chapterId}`);

    // Update reading progress
    try {
      await novelService.updateReadingProgress(id, chapterId, 0);
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  // Handle continue reading
  const handleContinueReading = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      // Get user's reading progress
      const progressResponse = await novelService.getReadingProgress(id);
      const { currentChapterId } = progressResponse.data;

      // Navigate to last read chapter or first chapter
      const chapterId = currentChapterId || novel.chapters[0].chapterId;
      navigate(`/novel/${id}/chapter/${chapterId}`);
    } catch (err) {
      console.error('Error getting progress:', err);
      // Fallback to first chapter
      navigate(`/novel/${id}/chapter/${novel.chapters[0].chapterId}`);
    }
  };

  // Handle PDF download
  const handleDownloadPDF = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const blob = await novelService.downloadNovelPDF(id);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${novel.slug || id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      alert('PDF downloaded successfully!');
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to download PDF. Please try again.');
    }
  };

  // Handle bookmark
  const handleBookmark = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      if (isBookmarked) {
        await novelService.removeBookmark(id);
        setIsBookmarked(false);
        alert('Bookmark removed!');
      } else {
        await novelService.bookmarkNovel(id);
        setIsBookmarked(true);
        alert('Novel bookmarked!');
      }
    } catch (err) {
      console.error('Error bookmarking:', err);
      alert('Failed to update bookmark. Please try again.');
    }
  };

  // Handle like
  const handleLike = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await novelService.likeNovel(id);
      setIsLiked(true);
      alert('Novel liked!');

      // Update likes count in UI if needed
      if (novel && response.data.totalLikes) {
        setNovel({
          ...novel,
          stats: {
            ...novel.stats,
            likes: response.data.totalLikes
          }
        });
      }
    } catch (err) {
      console.error('Error liking novel:', err);
      alert('Failed to like novel. Please try again.');
    }
  };

  // Handle share
  const handleShare = () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: novel.title,
        text: novel.description.english,
        url: shareUrl
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying:', err));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.novelDetailContainer}>
        <Header onLoginClick={handleLoginClick} />
        <div className={styles.content}>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>Loading novel...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !novel) {
    return (
      <div className={styles.novelDetailContainer}>
        <Header onLoginClick={handleLoginClick} />
        <div className={styles.content}>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>{error || 'Novel not found'}</h2>
            <button onClick={() => navigate('/novels')} style={{ marginTop: '1rem' }}>
              Back to Novels
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render novel details
  return (
    <div className={styles.novelDetailContainer}>
      <Header onLoginClick={handleLoginClick} />

      <div className={styles.content}>
        {/* Novel Header Section */}
        <div className={styles.novelHeader}>
          <div className={styles.imageSection}>
            <img src={novel.coverImage} alt={novel.title} className={styles.novelImage} />
          </div>

          <div className={styles.infoSection}>
            {/* Badge */}
            {novel.status === 'completed' && (
              <div className={styles.badge}>{novel.statusLabel}</div>
            )}

            {/* Title */}
            <h1 className={styles.novelTitle}>{novel.title}</h1>
            {novel.englishTitle && (
              <p className={styles.englishTitle}>{novel.englishTitle}</p>
            )}

            {/* Author and Rating */}
            <div className={styles.authorRating}>
              <span className={styles.author}>👤 {novel.author.name}</span>
              <div className={styles.rating}>
                <span className={styles.stars}>{'⭐'.repeat(Math.round(novel.rating.average))}</span>
                <span className={styles.ratingValue}>{novel.rating.average}</span>
                <span className={styles.reviewCount}>({novel.rating.total} reviews)</span>
              </div>
            </div>

            {/* Genres */}
            <div className={styles.genres}>
              {novel.genres.map((genre, index) => (
                <span key={index} className={styles.genreTag}>{genre.name}</span>
              ))}
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{novel.stats.viewsFormatted}</div>
                <div className={styles.statLabel}>பார்வைகள்</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{novel.stats.bookmarksFormatted}</div>
                <div className={styles.statLabel}>புக்மார்க்குகள்</div>
              </div>
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
              <button className={styles.pdfButton} onClick={handleDownloadPDF}>
                ⬇️ நாவலை PDF ஆக பதிவிறக்கவும்
              </button>
            </div>

            {/* Icon Actions */}
            <div className={styles.iconActions}>
              <button
                className={styles.iconButton}
                onClick={handleBookmark}
                title="Bookmark"
                style={{ opacity: isBookmarked ? 1 : 0.6 }}
              >
                🔖
              </button>
              <button
                className={styles.iconButton}
                onClick={handleLike}
                title="Like"
                style={{ opacity: isLiked ? 1 : 0.6 }}
              >
                ❤️
              </button>
              <button className={styles.iconButton} onClick={handleShare} title="Share">
                🔗
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
                onClick={() => handleChapterClick(chapter.chapterId)}
              >
                <h3 className={styles.chapterTitle}>
                  {chapter.title}
                  {chapter.subtitle && ` - ${chapter.subtitle}`}
                </h3>
                <div className={styles.chapterMeta}>
                  <span className={styles.chapterDate}>📅 {chapter.publishedDateFormatted}</span>
                  <span className={styles.chapterWords}>📝 {chapter.words} words</span>
                  <span className={styles.chapterWords}>⏱️ {chapter.readTime}</span>
                </div>
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

export default NovelDetailPageWithAPI;
