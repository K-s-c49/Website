export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    profile: '/auth/profile',
  },
  products: {
    list: '/products',
    detail: (id = ':id') => `/products/${id}`,
    featured: '/products/featured',
  },
  cart: {
    current: '/cart',
    checkout: '/cart/checkout',
  },
  orders: {
    list: '/orders',
    detail: (id = ':id') => `/orders/${id}`,
  },
  admin: {
    products: '/admin/products',
    users: '/admin/users',
    orders: '/admin/orders',
  },
};

export const withQuery = (path, params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  );
  return query.toString() ? `${path}?${query.toString()}` : path;
};




