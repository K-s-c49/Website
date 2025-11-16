import { apiClient } from './client';

export const cartApi = {
  get: () => apiClient.get('/cart'),
  addItem: (payload) => apiClient.post('/cart', payload),
  updateItem: (payload) => apiClient.patch('/cart', payload),
  removeItem: (productId) => apiClient.delete(`/cart/item/${productId}`),
  clear: () => apiClient.delete('/cart/clear'),
};






