const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');

const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return next(
      new ApiError(StatusCodes.BAD_REQUEST, 'Validation failed', errors)
    );
  }

  req[property] = value;
  return next();
};

module.exports = validate;

