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
    // Determine the file path based on language
    const filePath = language === 'english'
      ? `./chapters/english/novel-${novelId}.js`
      : `./chapters/novel-${novelId}.js`;

    // Dynamically import the specific novel's chapters
    const novelModule = await import(/* @vite-ignore */ filePath);
    const novel = novelModule.CHAPTERS;

    if (!novel) return null;
    return novel[chapterId] || null;
  } catch (error) {
    // If English version doesn't exist, fallback to Tamil
    if (language === 'english') {
      console.warn(`English version not available for novel ${novelId}, chapter ${chapterId}. Falling back to Tamil.`);
      try {
        const novelModule = await import(`./chapters/novel-${novelId}.js`);
        const novel = novelModule.CHAPTERS;
        if (!novel) return null;
        return novel[chapterId] || null;
      } catch (fallbackError) {
        console.error(`Failed to load fallback Tamil chapter ${chapterId} for novel ${novelId}:`, fallbackError);
        return null;
      }
    }

    // Novel file doesn't exist or chapter not found
    console.error(`Failed to load chapter ${chapterId} for novel ${novelId}:`, error);
    return null;
  }
};
