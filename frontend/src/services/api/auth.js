import { apiClient } from './client';

export const authApi = {
  register: (payload) => apiClient.post('/auth/register', payload),
  login: (payload) => apiClient.post('/auth/login', payload),
  refresh: (payload) => apiClient.post('/auth/refresh', payload),
  forgotPassword: (payload) => apiClient.post('/auth/forgot-password', payload),
  resetPassword: (payload) => apiClient.post('/auth/reset-password', payload),
  profile: () => apiClient.get('/auth/me'),
  updateProfile: (payload) => apiClient.patch('/auth/me', payload),
  logout: () => apiClient.post('/auth/logout'),
};






