import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminApi } from '@/services/api/admin.js';
import { getErrorMessage } from '@/lib/utils.js';

export const fetchAdminUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await adminApi.getUsers();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to load users'));
  }
});

export const toggleAdminUserStatus = createAsyncThunk(
  'admin/toggleUserStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await adminApi.toggleUserStatus(userId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to update user'));
    }
  },
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(toggleAdminUserStatus.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id || user._id === action.payload._id ? action.payload : user,
        );
      });
  },
});

export const adminReducer = adminSlice.reducer;






