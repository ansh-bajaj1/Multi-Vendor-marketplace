const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRES || '15m';
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const generateRefreshToken = (payload) => {
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRES || '7d';
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn });
};

const verifyToken = (token, secret) => jwt.verify(token, secret);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};

