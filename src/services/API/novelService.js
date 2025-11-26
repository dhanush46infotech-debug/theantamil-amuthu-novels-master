import apiClient from './client';
import { API_ENDPOINTS } from './config';

/**
 * Novel Service
 * Handles all API calls related to novels
 */

const novelService = {
  /**
   * Get all novels
   * @returns {Promise} Array of novels
   */
  getAllNovels: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GET_NOVELS);
      return response.data;
    } catch (error) {
      console.error('Error fetching novels:', error);
      throw error;
    }
  },

  /**
   * Get a specific novel by ID
   * @param {string|number} novelId - The ID of the novel
   * @returns {Promise} Novel details
   */
  getNovelById: async (novelId) => {
    try {
      const endpoint = API_ENDPOINTS.GET_NOVEL.replace(':id', novelId);
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching novel ${novelId}:`, error);
      throw error;
    }
  },

  /**
   * Get novel by slug or title
   * @param {string} slug - The slug or title of the novel
   * @returns {Promise} Novel details
   */
  getNovelBySlug: async (slug) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GET_NOVEL_BY_SLUG, {
        params: { slug }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching novel by slug ${slug}:`, error);
      throw error;
    }
  },

  /**
   * Get specific novel "ராட்சசனே எனை வதைப்பதேனடா!" by Thenmozhi
   * This is a dedicated endpoint for this specific novel
   * @returns {Promise} Novel details with all chapters
   */
  getRatsasaneEnaiVathaippathenaNovel: async () => {
    try {
      // Using the specific endpoint for this novel
      const response = await apiClient.get(API_ENDPOINTS.GET_RATSASANE_NOVEL);
      return response.data;
    } catch (error) {
      console.error('Error fetching Ratsasane Enai Vathaippathena novel:', error);
      throw error;
    }
  },

  /**
   * Get chapters for a novel
   * @param {string|number} novelId - The ID of the novel
   * @returns {Promise} Array of chapters
   */
  getNovelChapters: async (novelId) => {
    try {
      const endpoint = API_ENDPOINTS.GET_NOVEL_CHAPTERS.replace(':id', novelId);
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching chapters for novel ${novelId}:`, error);
      throw error;
    }
  },

  /**
   * Get a specific chapter
   * @param {string|number} novelId - The ID of the novel
   * @param {string|number} chapterId - The ID of the chapter
   * @returns {Promise} Chapter details with content
   */
  getChapter: async (novelId, chapterId) => {
    try {
      const endpoint = API_ENDPOINTS.GET_CHAPTER
        .replace(':novelId', novelId)
        .replace(':chapterId', chapterId);
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching chapter ${chapterId} for novel ${novelId}:`, error);
      throw error;
    }
  },

  /**
   * Bookmark a novel
   * @param {string|number} novelId - The ID of the novel
   * @returns {Promise} Bookmark status
   */
  bookmarkNovel: async (novelId) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.BOOKMARK_NOVEL, {
        novelId
      });
      return response.data;
    } catch (error) {
      console.error(`Error bookmarking novel ${novelId}:`, error);
      throw error;
    }
  },

  /**
   * Remove bookmark from a novel
   * @param {string|number} novelId - The ID of the novel
   * @returns {Promise} Bookmark status
   */
  removeBookmark: async (novelId) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.REMOVE_BOOKMARK, {
        data: { novelId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error removing bookmark for novel ${novelId}:`, error);
      throw error;
    }
  },

  /**
   * Like a novel
   * @param {string|number} novelId - The ID of the novel
   * @returns {Promise} Like status
   */
  likeNovel: async (novelId) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LIKE_NOVEL, {
        novelId
      });
      return response.data;
    } catch (error) {
      console.error(`Error liking novel ${novelId}:`, error);
      throw error;
    }
  },

  /**
   * Update reading progress
   * @param {string|number} novelId - The ID of the novel
   * @param {string|number} chapterId - The current chapter ID
   * @param {number} progress - Reading progress percentage (0-100)
   * @returns {Promise} Progress update status
   */
  updateReadingProgress: async (novelId, chapterId, progress = 0) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.UPDATE_READING_PROGRESS, {
        novelId,
        chapterId,
        progress
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating reading progress:`, error);
      throw error;
    }
  },

  /**
   * Get user's reading progress for a novel
   * @param {string|number} novelId - The ID of the novel
   * @returns {Promise} Reading progress data
   */
  getReadingProgress: async (novelId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GET_READING_PROGRESS, {
        params: { novelId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching reading progress for novel ${novelId}:`, error);
      throw error;
    }
  },

  /**
   * Download novel as PDF
   * @param {string|number} novelId - The ID of the novel
   * @returns {Promise} PDF file blob
   */
  downloadNovelPDF: async (novelId) => {
    try {
      const endpoint = API_ENDPOINTS.DOWNLOAD_NOVEL_PDF.replace(':id', novelId);
      const response = await apiClient.get(endpoint, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error(`Error downloading PDF for novel ${novelId}:`, error);
      throw error;
    }
  },

  /**
   * Search novels
   * @param {string} query - Search query
   * @param {Object} filters - Optional filters (genre, author, etc.)
   * @returns {Promise} Array of matching novels
   */
  searchNovels: async (query, filters = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_NOVELS, {
        params: { query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching novels:', error);
      throw error;
    }
  },

  /**
   * Get novels by genre
   * @param {string} genre - Genre name
   * @returns {Promise} Array of novels
   */
  getNovelsByGenre: async (genre) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GET_NOVELS_BY_GENRE, {
        params: { genre }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching novels for genre ${genre}:`, error);
      throw error;
    }
  },

  /**
   * Get novels by author
   * @param {string} author - Author name
   * @returns {Promise} Array of novels
   */
  getNovelsByAuthor: async (author) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GET_NOVELS_BY_AUTHOR, {
        params: { author }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching novels for author ${author}:`, error);
      throw error;
    }
  }
};

export default novelService;
