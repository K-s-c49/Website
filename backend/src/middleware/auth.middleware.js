import httpStatus from 'http-status';
import { verifyAccessToken } from '../utils/token.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.js';

export const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication token missing');
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.sub);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User no longer exists');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token'));
  }
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated'));
  }

  if (!roles.includes(req.user.role)) {
    return next(new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to perform this action'));
  }

  return next();
};




