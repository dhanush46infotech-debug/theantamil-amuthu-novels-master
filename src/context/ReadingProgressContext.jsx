import { createContext, useContext, useState, useEffect } from 'react';

const ReadingProgressContext = createContext();

export const useReadingProgress = () => {
  const context = useContext(ReadingProgressContext);
  if (!context) {
    throw new Error('useReadingProgress must be used within a ReadingProgressProvider');
  }
  return context;
};

export const ReadingProgressProvider = ({ children }) => {
  const [ongoingNovels, setOngoingNovels] = useState([]);
  const [completedNovels, setCompletedNovels] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedOngoing = localStorage.getItem('ongoingNovels');
    const savedCompleted = localStorage.getItem('completedNovels');

    if (savedOngoing) {
      setOngoingNovels(JSON.parse(savedOngoing));
    }
    if (savedCompleted) {
      setCompletedNovels(JSON.parse(savedCompleted));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ongoingNovels', JSON.stringify(ongoingNovels));
  }, [ongoingNovels]);

  useEffect(() => {
    localStorage.setItem('completedNovels', JSON.stringify(completedNovels));
  }, [completedNovels]);

  // Start reading a novel
  const startReading = (novelId, novelTitle, coverImage, author) => {
    // Don't add if already completed
    if (completedNovels.some(novel => novel.novelId === novelId)) {
      return;
    }

    // Check if already in ongoing
    const existingIndex = ongoingNovels.findIndex(novel => novel.novelId === novelId);

    if (existingIndex === -1) {
      // Add new novel to ongoing
      setOngoingNovels(prev => [...prev, {
        novelId,
        novelTitle,
        coverImage,
        author,
        lastChapter: 1,
        startedAt: new Date().toISOString()
      }]);
    }
  };

  // Update current chapter
  const updateProgress = (novelId, chapterId) => {
    setOngoingNovels(prev =>
      prev.map(novel =>
        novel.novelId === novelId
          ? { ...novel, lastChapter: chapterId, updatedAt: new Date().toISOString() }
          : novel
      )
    );
  };

  // Mark novel as completed
  const completeNovel = (novelId, novelTitle, coverImage, author) => {
    // Remove from ongoing
    setOngoingNovels(prev => prev.filter(novel => novel.novelId !== novelId));

    // Add to completed if not already there
    if (!completedNovels.some(novel => novel.novelId === novelId)) {
      setCompletedNovels(prev => [...prev, {
        novelId,
        novelTitle,
        coverImage,
        author,
        completedAt: new Date().toISOString()
      }]);
    }
  };

  // Check if a novel is ongoing
  const isOngoing = (novelId) => {
    return ongoingNovels.some(novel => novel.novelId === novelId);
  };

  // Check if a novel is completed
  const isCompleted = (novelId) => {
    return completedNovels.some(novel => novel.novelId === novelId);
  };

  // Get last chapter for a novel
  const getLastChapter = (novelId) => {
    const novel = ongoingNovels.find(novel => novel.novelId === novelId);
    return novel ? novel.lastChapter : 1;
  };

  const value = {
    ongoingNovels,
    completedNovels,
    startReading,
    updateProgress,
    completeNovel,
    isOngoing,
    isCompleted,
    getLastChapter
  };

  return (
    <ReadingProgressContext.Provider value={value}>
      {children}
    </ReadingProgressContext.Provider>
  );
};
