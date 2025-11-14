import { apiClient } from './client';

export const ordersApi = {
  create: (payload) => apiClient.post('/orders', payload),
  listMine: (params) => apiClient.get('/orders/me', { params }),
  listAll: (params) => apiClient.get('/orders', { params }),
  update: (id, payload) => apiClient.patch(`/orders/${id}`, payload),
};




