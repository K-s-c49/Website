import httpStatus from 'http-status';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {
  registerUser,
  loginUser,
  refreshAuthToken,
  logoutUser,
  initiatePasswordReset,
  resetPassword,
  updateProfile,
} from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const { user, tokens } = await registerUser(req.body);
  res.status(httpStatus.CREATED).json(new ApiResponse(httpStatus.CREATED, { user, tokens }, 'Account created'));
});

export const login = asyncHandler(async (req, res) => {
  const { user, tokens } = await loginUser(req.body.email, req.body.password);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, { user, tokens }, 'Authenticated successfully'));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const tokens = await refreshAuthToken(req.body.refreshToken);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, tokens, 'Token refreshed'));
});

export const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.user.id);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, null, 'Logged out'));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const result = await initiatePasswordReset(req.body.email);
  res.status(httpStatus.OK).json(
    new ApiResponse(
      httpStatus.OK,
      { ...(result ? { resetToken: result.resetToken } : {}) },
      'If that email exists, a reset link has been sent',
    ),
  );
});

export const resetPasswordController = asyncHandler(async (req, res) => {
  await resetPassword(req.body.token, req.body.password);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, null, 'Password updated'));
});

export const getProfile = asyncHandler(async (req, res) => {
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, req.user));
});

export const updateProfileController = asyncHandler(async (req, res) => {
  const user = await updateProfile(req.user.id, req.body);
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, user, 'Profile updated'));
});




