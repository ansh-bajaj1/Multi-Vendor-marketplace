/**
 * Configuration Management
 * ========================
 * Hardcoded values for local development.
 * For production, replace with process.env values.
 */

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  // Environment
  NODE_ENV,
  IS_PRODUCTION: NODE_ENV === 'production',
  IS_TEST: NODE_ENV === 'test',
  IS_DEVELOPMENT: NODE_ENV === 'development',

  // Server
  PORT: process.env.PORT || 5000,

  // MongoDB Configuration
  MONGO_URI:
    NODE_ENV === 'test'
      ? 'mongodb://127.0.0.1:27017/marketplace_test'
      : 'mongodb://127.0.0.1:27017/marketplace',

  // JWT Configuration
  JWT: {
    SECRET: process.env.JWT_SECRET || 'supersecretkey',
    REFRESH_SECRET:
      process.env.JWT_REFRESH_SECRET || 'superrefreshsecret',
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || '15m',
    REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || '7d',
  },

  // CORS
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',

  // Cloudinary (if using file uploads)
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'dev-cloud',
    API_KEY: process.env.CLOUDINARY_API_KEY || 'dev-key',
    API_SECRET: process.env.CLOUDINARY_API_SECRET || 'dev-secret',
  },

  // Email Service (if using email)
  EMAIL: {
    HOST: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    PORT: process.env.EMAIL_PORT || 465,
    USER: process.env.EMAIL_USER || 'dev@example.com',
    PASSWORD: process.env.EMAIL_PASSWORD || 'dev-password',
  },
};

module.exports = config;
