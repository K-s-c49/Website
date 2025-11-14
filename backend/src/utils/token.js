import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const generateAccessToken = (payload, options = {}) =>
  jwt.sign(payload, config.jwt.accessSecret, { expiresIn: config.jwt.accessExpiry, ...options });

export const generateRefreshToken = (payload, options = {}) =>
  jwt.sign(payload, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiry, ...options });

export const verifyAccessToken = (token) => jwt.verify(token, config.jwt.accessSecret);
export const verifyRefreshToken = (token) => jwt.verify(token, config.jwt.refreshSecret);




