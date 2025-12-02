const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!token && req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Authentication required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user || user.isBlocked) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid account');
    }

    req.user = user;
    next();
  } catch (error) {
    next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        error.message || 'Invalid authentication token'
      )
    );
  }
};

module.exports = { requireAuth };

