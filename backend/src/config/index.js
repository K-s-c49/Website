import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const ENV_FILE = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const envPath = path.resolve(process.cwd(), ENV_FILE);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config(); // fallback
}

const config = {
  env: process.env.NODE_ENV ?? 'development',
  isDev: (process.env.NODE_ENV ?? 'development') === 'development',
  port: parseInt(process.env.PORT ?? '4000', 10),
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/codecraftecom',
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? 'access-secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh-secret',
    accessExpiry: process.env.JWT_ACCESS_EXPIRY ?? '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY ?? '7d',
  },
  passwordReset: {
    secret: process.env.PASSWORD_RESET_TOKEN_SECRET ?? 'password-reset-secret',
    expiry: process.env.PASSWORD_RESET_TOKEN_EXPIRY ?? '1h',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? 'whsec_placeholder',
  },
  uploadDir: process.env.UPLOAD_DIR ?? path.resolve(process.cwd(), 'storage/uploads'),
};

export default config;




