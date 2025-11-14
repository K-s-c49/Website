import axios from 'axios';

const ACCESS_TOKEN_KEY = 'cc_access_token';
const REFRESH_TOKEN_KEY = 'cc_refresh_token';

export const getStoredTokens = () => ({
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
});

export const setStoredTokens = ({ accessToken, refreshToken }) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const clearStoredTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = getStoredTokens();
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors gracefully
    if (!error.response) {
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        return Promise.reject(new Error('Request timeout. Please check your connection.'));
      }
      if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
        return Promise.reject(new Error('Unable to connect to server. Please ensure the backend is running.'));
      }
      return Promise.reject(new Error('Network error. Please try again later.'));
    }
    
    // Handle HTTP errors
    const message = error.response?.data?.message ?? error.message ?? 'An error occurred';
    return Promise.reject(new Error(message));
  },
);

