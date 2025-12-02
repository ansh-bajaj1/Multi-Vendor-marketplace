/**
 * MongoDB Connection
 * ==================
 * Connects to MongoDB using Mongoose.
 * Hardcoded URIs for local development:
 * - Development: mongodb://127.0.0.1:27017/marketplace
 * - Test: mongodb://127.0.0.1:27017/marketplace_test
 */

const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Connect to MongoDB
 * @param {string} mongoUri - MongoDB connection string
 * @returns {Promise<void>}
 * @throws {Error} If connection fails, logs error and exits process
 */
const connectDB = async (mongoUri) => {
  try {
    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined');
    }

    logger.info(`Connecting to MongoDB: ${mongoUri}`);

    mongoose.set('strictQuery', true);

    await mongoose.connect(mongoUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000,
      retryWrites: true,
    });

    logger.info('✓ MongoDB connected successfully');

    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('error', (error) => {
      logger.error('MongoDB connection error:', error);
    });

    return mongoose.connection;
  } catch (error) {
    logger.error('✗ MongoDB connection failed:', {
      message: error.message,
      mongoUri,
    });
    logger.error('Make sure MongoDB is running on 127.0.0.1:27017');
    process.exit(1);
  }
};

module.exports = connectDB;

