import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth/authSlice';
import { productReducer } from '@/features/products/productSlice';
import { cartReducer } from '@/features/cart/cartSlice';
import { orderReducer } from '@/features/orders/orderSlice';
import { checkoutReducer } from '@/features/checkout/checkoutSlice';
import { adminReducer } from '@/features/admin/adminSlice';

/**
 * Global Redux store configuration scoped by feature slices.
 * The structure mirrors the domain-driven folder layout to keep data
 * ownership clear and composable as the application scales.
 */

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    checkout: checkoutReducer,
    admin: adminReducer,
  },
  devTools: import.meta.env.DEV,
});

