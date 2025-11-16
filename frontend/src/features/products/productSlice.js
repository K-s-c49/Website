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

export const createProduct = createAsyncThunk(
  'products/create',
  async ({ formData, config }, { rejectWithValue }) => {
    try {
      const response = await productsApi.create(formData, config);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to create product'));
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, formData, config, payload }, { rejectWithValue }) => {
    try {
      // If formData is provided, use it (for file uploads), otherwise use payload (for JSON updates)
      const response = formData
        ? await productsApi.update(id, formData, config)
        : await productsApi.update(id, payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to update product'));
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await productsApi.remove(id);
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to delete product'));
    }
  },
);

const initialState = {
  items: [],
  filters: {
    category: null,
    priceRange: null,
    search: '',
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
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => (item.id ?? item._id) === (action.payload.id ?? action.payload._id),
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedProduct && (state.selectedProduct.id ?? state.selectedProduct._id) === (action.payload.id ?? action.payload._id)) {
          state.selectedProduct = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => (item.id ?? item._id) !== action.payload);
        state.featured = state.featured.filter((item) => (item.id ?? item._id) !== action.payload);
        if (state.selectedProduct && (state.selectedProduct.id ?? state.selectedProduct._id) === action.payload) {
          state.selectedProduct = null;
        }
        state.status = 'succeeded';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export const productReducer = productSlice.reducer;

