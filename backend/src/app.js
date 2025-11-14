import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { corsOptions } from './config/cors.js';
import { logger, stream } from './config/logger.js';
import { errorConverter, errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import routes from './routes/index.js';
import config from './config/index.js';

const app = express();

// Core middlewares
app.use(helmet());
app.use(
  cors({
    ...corsOptions,
    origin: corsOptions.origin ?? config.clientUrl,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use('/uploads', express.static(config.uploadDir));

// Logging
app.use(morgan(config.isDev ? 'dev' : 'combined', { stream }));

// Root landing
app.get('/', (_req, res) => {
  res.status(200).json({
    name: 'Customize_23 API',
    status: 'online',
    endpoints: {
      health: '/health',
      api: '/api/v1',
    },
  });
});

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

// API routes
app.use('/api/v1', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorConverter);
app.use(errorHandler);

// Global unhandled rejection logging
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection', { reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error });
  process.exit(1);
});

export default app;

