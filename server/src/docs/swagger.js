const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Multi-Vendor Marketplace API',
      version: '1.0.0',
      description:
        'API documentation for the Multi-Vendor Marketplace platform.',
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:5000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        RegisterInput: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Alice Vendor' },
            email: { type: 'string', example: 'alice@example.com' },
            password: { type: 'string', example: 'Password123!' },
            role: { type: 'string', enum: ['user', 'vendor', 'admin'] },
          },
          required: ['name', 'email', 'password'],
        },
        LoginInput: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'alice@example.com' },
            password: { type: 'string', example: 'Password123!' },
          },
          required: ['email', 'password'],
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['src/routes/*.js', 'src/models/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

