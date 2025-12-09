// Dynamic chapter content loader
// This loads chapter content on-demand with backend API fallback to local files

import novelService from '../services/API/novelService';

/**
 * Novel configuration mapping
 */
const NOVEL_CONFIG = {
  1: {
    name: 'raatchasane-novel',
    languages: ['tamil', 'english'],
    totalChapters: 14
  },
  2: {
    name: 'thaalaattum-novel',
    languages: ['tamil', 'english'],
    totalChapters: 27
  },
  3: {
    name: 'mohanamozhi-novel',
    languages: ['tamil', 'english'],
    totalChapters: 27
  }
};

/**
 * Dynamically imports chapter content for a specific novel
 * Tries backend API first, then falls back to local files
 * @param {number} novelId - The novel ID
 * @param {number} chapterId - The chapter ID
 * @param {string} language - The language ('tamil' or 'english')
 * @returns {Promise<Object|null>} - Chapter content or null if not found
 */
export const getChapterContent = async (novelId, chapterId, language = 'tamil') => {
  try {
    const config = NOVEL_CONFIG[novelId];

    if (!config) {
      console.error(`Novel ${novelId} configuration not found`);
      return null;
    }

    // Validate chapter ID
    if (chapterId < 1 || chapterId > config.totalChapters) {
      console.error(`Invalid chapter ID ${chapterId} for novel ${novelId}`);
      return null;
    }

    // Check if language is supported
    if (!config.languages.includes(language)) {
      console.warn(`Language ${language} not available for novel ${novelId}, falling back to Tamil`);
      language = 'tamil';
    }

    // STEP 1: Try backend API first
    console.log(`[CHAPTER_LOADER] Attempting to load from backend API: Novel ${novelId}, Chapter ${chapterId}, Language: ${language}`);
    try {
      const apiResponse = await novelService.getChapter(novelId, chapterId, language);
      if (apiResponse && (apiResponse.content || apiResponse.title)) {
        console.log(`[CHAPTER_LOADER] ✓ Successfully loaded from backend API`);
        return {
          title: apiResponse.title || `Chapter ${chapterId}`,
          content: apiResponse.content || ''
        };
      }
    } catch (apiError) {
      console.log(`[CHAPTER_LOADER] Backend API unavailable or chapter not found, falling back to local files:`, apiError.message);
    }

    // STEP 2: Fallback to local files
    let chapterModule;

    // Try new structure first (individual chapter files)
    try {
      const novelFolder = config.name;
      chapterModule = await import(`../chapters/${novelFolder}/${language}/chapter-${chapterId}.js`);

      if (chapterModule && chapterModule.CHAPTER) {
        console.log(`[CHAPTER_LOADER] ✓ Loaded from local files (new structure)`);
        return chapterModule.CHAPTER;
      }
    } catch (newStructureError) {
      console.log(`[CHAPTER_LOADER] New structure not found, trying old structure...`);

      // Fallback to old structure for backward compatibility
      try {
        let novelModule;

        if (language === 'english') {
          if (novelId === 2) {
            novelModule = await import('./chapters/english/novel-2.js');
          }
        } else {
          // Tamil (default)
          if (novelId === 2) {
            novelModule = await import('./chapters/novel-2.js');
          }
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
        if (novel && novel[chapterId]) {
          console.log(`[CHAPTER_LOADER] ✓ Loaded from local files (old structure)`);
          return novel[chapterId];
        }
      } catch (fallbackError) {
        console.error(`[CHAPTER_LOADER] Old structure also failed:`, fallbackError);
      }
    }

    console.error(`[CHAPTER_LOADER] ✗ Chapter ${chapterId} not found for novel ${novelId} in ${language}`);
    return null;
  } catch (error) {
    console.error(`[CHAPTER_LOADER] ✗ Failed to load chapter ${chapterId} for novel ${novelId} in ${language}:`, error);
    return null;
  }
};

/**
 * Get novel configuration
 * @param {number} novelId - The novel ID
 * @returns {Object|null} - Novel configuration or null
 */
export const getNovelConfig = (novelId) => {
  return NOVEL_CONFIG[novelId] || null;
};

/**
 * Check if a chapter exists
 * @param {number} novelId - The novel ID
 * @param {number} chapterId - The chapter ID
 * @param {string} language - The language
 * @returns {Promise<boolean>} - True if chapter exists
 */
export const chapterExists = async (novelId, chapterId, language = 'tamil') => {
  const content = await getChapterContent(novelId, chapterId, language);
  return content !== null;
};
