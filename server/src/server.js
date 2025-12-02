/**
 * Server Entry Point
 * ==================
 * Initializes Express app and connects to MongoDB.
 * Runs on port 5000 with hardcoded local development settings.
 */

const http = require('http');
const config = require('./config/config');
const connectDB = require('./config/db');
const logger = require('./config/logger');
const app = require('./app');

const start = async () => {
  logger.info(`Starting server in ${config.NODE_ENV} environment...`);

  // Try to connect to MongoDB but don't exit the process if it fails.
  // This makes the dev server reachable so we can debug network/firewall issues
  // and provide a health endpoint even when the DB is unavailable.
  let dbConnected = false;
  try {
    await connectDB(config.MONGO_URI);
    dbConnected = true;
  } catch (err) {
    logger.warn('MongoDB connection failed during startup; continuing without DB.', err.message || err);
  }

  const server = http.createServer(app);

  // Add a small health override so we can report DB state
  app.get('/_internal_health', (req, res) => {
    res.json({ success: true, server: true, dbConnected });
  });

  // Start listening
  server.listen(config.PORT, '0.0.0.0', () => {
    const addr = server.address();
    const addressInfo = typeof addr === 'string' ? addr : `${addr.address}:${addr.port}`;
    logger.info(`✓ Server running on port ${config.PORT}`);
    logger.info(`✓ Server address: ${addressInfo}`);
    logger.info(`✓ Environment: ${config.NODE_ENV}`);
    logger.info(`✓ MongoDB connected: ${dbConnected}`);
  });

  server.on('error', (err) => {
    logger.error('Server error:', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    // Do not exit immediately in dev; log and allow inspection
  });
};

// Start the server
if (require.main === module) {
  start();
}

// Export for testing
module.exports = { start, config };

