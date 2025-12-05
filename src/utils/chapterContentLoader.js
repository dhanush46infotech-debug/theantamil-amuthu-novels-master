// Dynamic chapter content loader
// This loads chapter content on-demand to reduce initial bundle size

/**
 * Dynamically imports chapter content for a specific novel
 * @param {number} novelId - The novel ID
 * @param {number} chapterId - The chapter ID
 * @param {string} language - The language ('tamil' or 'english')
 * @returns {Promise<Object|null>} - Chapter content or null if not found
 */
export const getChapterContent = async (novelId, chapterId, language = 'tamil') => {
  try {
    let novelModule;

    // Use explicit imports for Vite to properly bundle
    if (language === 'english') {
      if (novelId === 2) {
        novelModule = await import('./chapters/english/novel-2.js');
      }
      // Add more novels here as needed
    } else {
      // Tamil (default)
      if (novelId === 2) {
        novelModule = await import('./chapters/novel-2.js');
      }
      // Add more novels here as needed
    }

    if (!novelModule) {
      // If English version doesn't exist, fallback to Tamil
      if (language === 'english') {
        console.warn(`English version not available for novel ${novelId}, chapter ${chapterId}. Falling back to Tamil.`);
        if (novelId === 2) {
          novelModule = await import('./chapters/novel-2.js');
        }
      }
    }

    const novel = novelModule?.CHAPTERS;
    if (!novel) return null;
    return novel[chapterId] || null;
  } catch (error) {
    console.error(`Failed to load chapter ${chapterId} for novel ${novelId} in ${language}:`, error);
    return null;
  }
};
