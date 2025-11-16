import config from '../config/index.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token.js';
import { ApiError } from '../utils/ApiError.js';
import httpStatus from 'http-status';
import { User } from '../models/User.js';

export async function issueTokenPair(user) {
  const payload = { sub: user.id, role: user.role, email: user.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshTokens.push({ token: refreshToken });
  await user.save();

  return { accessToken, refreshToken };
}

export async function rotateRefreshToken(token) {
  try {
    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.sub);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    const tokenExists = user.refreshTokens.some((entry) => entry.token === token);
    if (!tokenExists) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token invalidated');
    }

    user.refreshTokens = user.refreshTokens.filter((entry) => entry.token !== token);
    await user.save();

    return issueTokenPair(user);
  } catch (error) {
    throw error instanceof ApiError ? error : new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
  }
}

export async function revokeRefreshTokens(userId) {
  await User.findByIdAndUpdate(userId, { $set: { refreshTokens: [] } });
}






