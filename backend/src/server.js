import http from 'http';

import app from './app.js';
import config from './config/index.js';
import { connectDatabase } from './config/database.js';
import { logger } from './config/logger.js';

async function start() {
  await connectDatabase();

  const server = http.createServer(app);
  server.listen(config.port, () => {
    logger.info(`🚀 Server ready at http://localhost:${config.port}`);
  });

  const gracefulShutdown = (signal) => {
    return () => {
      logger.warn(`${signal} received. Closing server…`);
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    };
  };

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, gracefulShutdown(signal));
  });
}

start().catch((error) => {
  logger.error('Failed to start server', { error });
  process.exit(1);
});






