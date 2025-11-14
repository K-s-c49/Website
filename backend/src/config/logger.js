import { createLogger, format, transports } from 'winston';
import config from './index.js';

const logFormat = format.printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
  return `${timestamp} [${level}] ${message} ${metaString}`;
});

export const logger = createLogger({
  level: config.isDev ? 'debug' : 'info',
  format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), logFormat),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});

export const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

