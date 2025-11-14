import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ordersApi } from '@/services/api/orders.js';
import { getErrorMessage } from '@/lib/utils.js';

export const fetchOrders = createAsyncThunk('orders/fetchMine', async (params, { rejectWithValue }) => {
  try {
    const response = await ordersApi.listMine(params);
    return response.data.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Unable to fetch orders');
    // Silently handle network errors
    if (errorMessage.includes('connect') || errorMessage.includes('Network') || errorMessage.includes('timeout')) {
      return rejectWithValue(null); // Silent failure
    }
    return rejectWithValue(errorMessage);
  }
});

export const fetchAdminOrders = createAsyncThunk('orders/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const response = await ordersApi.listAll(params);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to fetch orders'));
  }
});

export const createOrder = createAsyncThunk('orders/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await ordersApi.create(payload);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to create order'));
  }
});

export const updateOrder = createAsyncThunk('orders/update', async ({ id, ...payload }, { rejectWithValue }) => {
  try {
    const response = await ordersApi.update(id, payload);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to update order'));
  }
});

const initialState = {
  items: [],
  adminItems: [],
  status: 'idle',
  adminStatus: 'idle',
  error: null,
  lastCreatedOrder: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items ?? [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAdminOrders.pending, (state) => {
        state.adminStatus = 'loading';
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.adminStatus = 'succeeded';
        state.adminItems = action.payload.items ?? [];
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.adminStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastCreatedOrder = action.payload;
        state.items = [action.payload, ...state.items];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.adminItems = state.adminItems.map((order) =>
          order.id === action.payload.id ? action.payload : order,
        );
      });
  },
});

export const orderReducer = orderSlice.reducer;

