export const ROUTES = {
  home: '/',
  products: '/products',
  product: (id = ':productId') => `/products/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  orders: '/orders',
  about: '/about',
  login: '/auth/login',
  register: '/auth/register',
  resetPassword: '/auth/reset-password',
  admin: '/admin',
  adminProducts: '/admin/products',
  adminOrders: '/admin/orders',
  adminUsers: '/admin/users',
};

export const USER_ROLES = {
  guest: 'guest',
  customer: 'customer',
  admin: 'admin',
};

export const ORDER_STATUS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export const PAYMENT_METHODS = ['credit_card', 'paypal', 'bank_transfer', 'cod'];

export const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', eta: '3-5 business days', price: 5 },
  { id: 'express', name: 'Express Shipping', eta: '1-2 business days', price: 15 },
  { id: 'pickup', name: 'Store Pickup', eta: 'Ready within 24h', price: 0 },
];




