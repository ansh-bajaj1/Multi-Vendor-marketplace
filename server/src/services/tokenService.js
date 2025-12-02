const jwt = require('jsonwebtoken');
const ms = require('ms');
const { StatusCodes } = require('http-status-codes');
const RefreshToken = require('../models/RefreshToken');
const ApiError = require('../utils/ApiError');

const saveRefreshToken = async (userId, token, expiresIn, ip) => {
  const msValue = ms(expiresIn || '7d');
  const expiresAt = new Date(Date.now() + msValue);
  return RefreshToken.create({
    user: userId,
    token,
    expiresAt,
    createdByIp: ip,
  });
};

const deleteRefreshToken = async (token) =>
  RefreshToken.deleteOne({ token }).exec();

const rotateRefreshToken = async (token) => {
  const storedToken = await RefreshToken.findOne({ token });
  if (!storedToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token not found');
  }
  await storedToken.deleteOne();
};

const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET);

module.exports = {
  saveRefreshToken,
  deleteRefreshToken,
  rotateRefreshToken,
  verifyRefreshToken,
};

