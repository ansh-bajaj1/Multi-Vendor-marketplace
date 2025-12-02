const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const tokenService = require('../services/tokenService');

const buildCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const sendAuthResponse = (
  res,
  user,
  accessToken,
  refreshToken,
  statusCode = StatusCodes.OK
) => {
  if (refreshToken) {
    res.cookie('refreshToken', refreshToken, buildCookieOptions());
  }

  res.status(statusCode).json({
    success: true,
    data: {
      user,
      accessToken,
    },
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, vendorProfile } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email already in use');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    vendorProfile:
      role === 'vendor'
        ? {
            ...vendorProfile,
            approved: false,
          }
        : undefined,
  });

  const userSafe = user.toObject();
  delete userSafe.password;

  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({
    userId: user.id,
    role: user.role,
  });

  await tokenService.saveRefreshToken(
    user.id,
    refreshToken,
    process.env.REFRESH_TOKEN_EXPIRES,
    req.ip
  );

  sendAuthResponse(
    res,
    userSafe,
    accessToken,
    refreshToken,
    StatusCodes.CREATED
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  if (user.isBlocked) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Account is blocked');
  }

  const userSafe = user.toObject();
  delete userSafe.password;

  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({
    userId: user.id,
    role: user.role,
  });

  await tokenService.saveRefreshToken(
    user.id,
    refreshToken,
    process.env.REFRESH_TOKEN_EXPIRES,
    req.ip
  );

  sendAuthResponse(res, userSafe, accessToken, refreshToken);
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies.refreshToken;
  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token missing');
  }

  const storedToken = await RefreshToken.findOne({ token });
  if (!storedToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token');
  }

  const decoded = tokenService.verifyRefreshToken(token);

  await storedToken.deleteOne();

  const user = await User.findById(decoded.userId).select('-password');
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not found');
  }

  const newAccessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
  });
  const newRefreshToken = generateRefreshToken({
    userId: user.id,
    role: user.role,
  });

  await tokenService.saveRefreshToken(
    user.id,
    newRefreshToken,
    process.env.REFRESH_TOKEN_EXPIRES,
    req.ip
  );

  sendAuthResponse(res, user, newAccessToken, newRefreshToken);
});

const logout = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies.refreshToken;
  if (token) {
    await tokenService.deleteRefreshToken(token);
    res.clearCookie('refreshToken');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Logged out successfully',
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Password updated successfully',
  });
});

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  changePassword,
};

