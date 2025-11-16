import httpStatus from 'http-status';
import { logger } from '../config/logger.js';
import { ApiError } from '../utils/ApiError.js';

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, `Not found: ${req.originalUrl}`));
};

export const errorConverter = (err, _req, _res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, error.errors);
  }
  next(error);
};

export const errorHandler = (err, _req, res, _next) => {
  const { statusCode = httpStatus.INTERNAL_SERVER_ERROR, message } = err;
  const response = {
    code: statusCode,
    message,
    ...(err.errors && err.errors.length ? { errors: err.errors } : {}),
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  };

  if (statusCode >= 500) {
    logger.error('Unhandled error', { err });
  }

  res.status(statusCode).json(response);
};






