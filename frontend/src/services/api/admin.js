import { apiClient } from './client';

export const adminApi = {
  getUsers: () => apiClient.get('/admin/users'),
  toggleUserStatus: (userId) => apiClient.patch(`/admin/users/${userId}/status`),
};






