import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartApi } from '@/services/api/cart.js';
import { formatCurrency, getErrorMessage } from '@/lib/utils.js';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const withSummary = (items) => {
  const subtotal = items.reduce((total, item) => {
    const product = item.product ?? {};
    const price = product.salePrice ?? product.price ?? item.price ?? 0;
    return total + price * item.quantity;
  }, 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping;
  return {
    items,
    subtotal,
    shipping,
    total,
  };
};

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await cartApi.get();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to load cart'));
  }
});

export const addCartItem = createAsyncThunk('cart/addItem', async (payload, { rejectWithValue }) => {
  try {
    const response = await cartApi.addItem(payload);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to add item to cart'));
  }
});

export const updateCartItem = createAsyncThunk('cart/updateItem', async (payload, { rejectWithValue }) => {
  try {
    const response = await cartApi.updateItem(payload);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to update cart item'));
  }
});

export const removeCartItem = createAsyncThunk('cart/removeItem', async (productId, { rejectWithValue }) => {
  try {
    const response = await cartApi.removeItem(productId);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to remove cart item'));
  }
});

export const clearCart = createAsyncThunk('cart/clear', async (_, { rejectWithValue }) => {
  try {
    await cartApi.clear();
    return [];
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to clear cart'));
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items ?? [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items ?? [];
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items ?? [];
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items ?? [];
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const selectCartSummary = (state) => {
  const summary = withSummary(state.cart.items);
  return {
    ...summary,
    subtotalFormatted: formatCurrency(summary.subtotal),
    shippingFormatted: summary.shipping ? formatCurrency(summary.shipping) : 'Calculated at checkout',
    totalFormatted: formatCurrency(summary.total),
  };
};

export const cartReducer = cartSlice.reducer;

