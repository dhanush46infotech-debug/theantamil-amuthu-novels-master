// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  VERIFY_TOKEN: '/auth/verify',

  // User
  GET_USER: '/user/profile',
  UPDATE_USER: '/user/profile',

  // Novels
  GET_NOVELS: '/novels',
  GET_NOVEL: '/novels/:id',

  // Continue Reading
  GET_READING_PROGRESS: '/reading/progress',
  UPDATE_READING_PROGRESS: '/reading/progress',
};

export default API_BASE_URL;
