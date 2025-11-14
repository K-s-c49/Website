import httpStatus from 'http-status';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { issueTokenPair, rotateRefreshToken, revokeRefreshTokens } from './token.service.js';
import { sendPasswordResetEmail } from './email.service.js';

export async function registerUser(payload) {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already registered');
  }

  const user = await User.create(payload);
  const tokens = await issueTokenPair(user);

  return { user, tokens };
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const isMatch = await user.isPasswordMatch(password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  if (!user.isActive) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Account disabled. Contact support.');
  }

  const tokens = await issueTokenPair(user);
  return { user, tokens };
}

export async function refreshAuthToken(refreshToken) {
  return rotateRefreshToken(refreshToken);
}

export async function logoutUser(userId) {
  await revokeRefreshTokens(userId);
}

export async function initiatePasswordReset(email) {
  const user = await User.findOne({ email });
  if (!user) {
    return;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  await sendPasswordResetEmail({ to: email, token: resetToken });

  return { resetToken, user };
}

export async function resetPassword(token, newPassword) {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password reset token invalid or expired');
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();
}

export async function updateProfile(userId, updates) {
  const allowedFields = ['firstName', 'lastName', 'address', 'avatarUrl'];
  const filtered = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key)),
  );

  const user = await User.findByIdAndUpdate(userId, filtered, { new: true });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
}

