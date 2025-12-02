const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    error = new ApiError(statusCode, message);
  }

  logger.error(err);

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors || [],
  });
};

module.exports = errorHandler;

