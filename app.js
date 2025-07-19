const express = require("express");
const app = express();
var cors = require('cors')
const httpStatus = require("http-status");
const config = require("./config/config");
const { errorHandler, errorConverter } = require("./middleware/error");
const ApiError = require("./utils/ApiError");

// router declare start here
const authRoute = require("./src/user/route");
const blogRoute = require("./src/blog/route");
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// declare router name
app.use("/api/v1",authRoute);
app.use("/api/v1", blogRoute);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(Number(httpStatus.NOT_FOUND || 404), "Not found"));
});
app.use(errorConverter);
app.use(errorHandler); 

module.exports = app;
