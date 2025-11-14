import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsApi } from '@/services/api/products.js';
import { getErrorMessage } from '@/lib/utils.js';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await productsApi.list(filters);
      return response.data.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Unable to fetch products');
      // Silently handle network errors
      if (errorMessage.includes('connect') || errorMessage.includes('Network') || errorMessage.includes('timeout')) {
        return rejectWithValue(null); // Silent failure
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productsApi.detail(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to fetch product'));
    }
  },
);

const initialState = {
  items: [],
  filters: {
    category: null,
    priceRange: null,
    searchTerm: '',
  },
  featured: [],
  pagination: {
    total: 0,
    page: 1,
    pages: 1,
  },
  status: 'idle',
  error: null,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.pagination = action.payload.pagination;
        state.featured = action.payload.items.filter((item) => item.isFeatured).slice(0, 4);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export const productReducer = productSlice.reducer;

