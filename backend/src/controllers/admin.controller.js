import httpStatus from 'http-status';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-refreshTokens');
  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, users));
});

export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.isActive = !user.isActive;
  await user.save();

  res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, user, 'User status updated'));
});






