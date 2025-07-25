const mongoose = require("mongoose");
const config = require("../config/config");
const logger = require("../config/logger");
const httpStatus = require("http-status")?.status;
const ApiError = require("../utils/ApiError");
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError( statusCode , message, false, err.stack);
  }
  next(error);
};
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  res.locals.errorMessage = err.message;
  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };
  if (config.env === "development") {
    logger.error(err?.message);
  }
  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
  errorConverter,
};
