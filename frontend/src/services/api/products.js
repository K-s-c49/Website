import { apiClient } from './client';

export const productsApi = {
  list: (params) => apiClient.get('/products', { params }),
  detail: (id) => apiClient.get(`/products/${id}`),
  create: (payload, config) => apiClient.post('/products', payload, config),
  update: (id, payload, config) => apiClient.patch(`/products/${id}`, payload, config),
  remove: (id) => apiClient.delete(`/products/${id}`),
};






