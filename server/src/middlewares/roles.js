const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(
      new ApiError(StatusCodes.FORBIDDEN, 'You do not have permission')
    );
  }
  return next();
};

module.exports = { requireRole };

