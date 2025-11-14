import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/services/api/auth.js';
import { clearStoredTokens, getStoredTokens, setStoredTokens } from '@/services/api/client.js';
import { getErrorMessage } from '@/lib/utils.js';

const tokens = getStoredTokens();

const initialState = {
  status: 'idle',
  user: null,
  error: null,
  isAuthenticated: Boolean(tokens.accessToken),
};

const extractUserPayload = (response) => {
  const { user, tokens: tokenPair } = response.data.data;
  if (tokenPair) {
    setStoredTokens(tokenPair);
  }
  return { user, tokenPair };
};

export const register = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authApi.register(payload);
      return extractUserPayload(response);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to register'));
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authApi.login(payload);
      return extractUserPayload(response);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to login'));
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.profile();
      return response.data.data;
    } catch (error) {
      // Silently handle network errors when backend is not available
      const errorMessage = getErrorMessage(error, 'Unable to load profile');
      // Don't show error for network/connection issues - backend might not be running
      if (errorMessage.includes('connect') || errorMessage.includes('Network') || errorMessage.includes('timeout')) {
        return rejectWithValue(null); // Silent failure
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authApi.updateProfile(payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to update profile'));
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authApi.logout();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to logout'));
  } finally {
    clearStoredTokens();
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'idle';
        // Only set error if it's not a network error (null means silent failure)
        state.error = action.payload || null;
        state.user = null;
        state.isAuthenticated = false;
        // Only clear tokens if it's an actual auth error, not a network error
        if (action.payload && !action.payload.includes('connect') && !action.payload.includes('Network')) {
          clearStoredTokens();
        }
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'idle';
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const authReducer = authSlice.reducer;

