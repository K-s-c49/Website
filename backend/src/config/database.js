import mongoose from 'mongoose';
import config from './index.js';
import { logger } from './logger.js';

mongoose.set('strictQuery', true);

export async function connectDatabase() {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info('🗄️  MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error', { error });
    throw error;
  }
}

export function disconnectDatabase() {
  return mongoose.connection.close();
}




