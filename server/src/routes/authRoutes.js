const express = require('express');
const {
  register,
  login,
  refreshToken,
  logout,
  changePassword,
} = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema, refreshSchema, changePasswordSchema } = require('../utils/validators');
const { authLimiter } = require('../middlewares/rateLimiter');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user or vendor
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered
 *       409:
 *         description: Email already exists
 */

router.post('/register', authLimiter, validate(registerSchema), register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login and receive access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Logged in
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authLimiter, validate(loginSchema), login);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Rotate refresh token and issue a new access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Tokens refreshed
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh', validate(refreshSchema), refreshToken);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout and revoke refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logout', logout);

/**
 * @openapi
 * /auth/change-password:
 *   patch:
 *     summary: Change password for the authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: Invalid payload
 *       401:
 *         description: Unauthorized
 */
router.patch(
  '/change-password',
  requireAuth,
  validate(changePasswordSchema),
  changePassword
);

module.exports = router;

