const express = require("express");
const httpStatus = require("http-status");
const config = require("./config/config");
const { errorHandler, errorConverter } = require("./middleware/error");
const ApiError = require("./utils/ApiError");

const app = express();
app.get("/", (req, res, next) => {
  // simulate error
  const error = new Error("Oops! Something went wrong.");
  error.statusCode = 500;
  next(error); // pass to error handler
});
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(Number(httpStatus.NOT_FOUND || 404), "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
