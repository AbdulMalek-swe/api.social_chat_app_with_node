const express = require("express");
const app = express();
const httpStatus = require("http-status");
const config = require("./config/config");
const { errorHandler, errorConverter } = require("./middleware/error");
const ApiError = require("./utils/ApiError");
// router declare start here
// const authRoute = require("./src/user/route");
const blogRoute = require("./src/blog/route");
// declare router name
// app.use("auth",authRoute);
app.use("/api/v1", blogRoute);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(Number(httpStatus.NOT_FOUND || 404), "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
