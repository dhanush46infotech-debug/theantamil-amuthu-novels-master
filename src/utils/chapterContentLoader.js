// Dynamic chapter content loader
// This loads chapter content on-demand to reduce initial bundle size

/**
 * Dynamically imports chapter content for a specific novel
 * @param {number} novelId - The novel ID
 * @param {number} chapterId - The chapter ID
 * @returns {Promise<Object|null>} - Chapter content or null if not found
 */
export const getChapterContent = async (novelId, chapterId) => {
  try {
    // Dynamically import the specific novel's chapters
    const novelModule = await import(`./chapters/novel-${novelId}.js`);
    const novel = novelModule.CHAPTERS;

    if (!novel) return null;
    return novel[chapterId] || null;
  } catch (error) {
    // Novel file doesn't exist or chapter not found
    console.error(`Failed to load chapter ${chapterId} for novel ${novelId}:`, error);
    return null;
  }
};
