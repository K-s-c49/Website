import { products } from '@/mocks/data/products';
import { orders } from '@/mocks/data/orders';
import { users } from '@/mocks/data/users';

/**
 * Lightweight mock API layer that simulates latency and persistence.
 * Replace these functions with real HTTP requests once the backend is ready.
 */

const networkDelay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockLogin(payload) {
  await networkDelay();
  const user = users.find((item) => item.email === payload.email);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return { user, token: 'mock-token-123' };
}

export async function mockRegister(payload) {
  await networkDelay();
  return { user: { ...payload, role: 'customer', id: crypto.randomUUID() }, token: 'mock-token-123' };
}

export async function mockFetchProducts(filters = {}) {
  await networkDelay();
  const { searchTerm, category, priceRange } = filters;
  return products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = category ? product.category === category : true;
    const matchesPrice = priceRange
      ? product.price >= priceRange[0] && product.price <= priceRange[1]
      : true;
    return matchesSearch && matchesCategory && matchesPrice;
  });
}

export async function mockFetchProductById(id) {
  await networkDelay();
  return products.find((product) => product.id === id);
}

export async function mockFetchOrders(userId) {
  await networkDelay();
  if (!userId) return orders;
  return orders.filter((order) => order.userId === userId);
}

export async function mockCreateOrder(orderPayload) {
  await networkDelay();
  const newOrder = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...orderPayload,
  };
  orders.push(newOrder);
  return newOrder;
}

