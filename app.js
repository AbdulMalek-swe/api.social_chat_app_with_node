const express = require("express");
const app = express();
var cors = require('cors')
const httpStatus = require("http-status");
 
// router declare start here
const authRoute = require("./src/user/route");
const blogRoute = require("./src/blog/route");
const setupSwagger = require("./src/swagger/swagger.js");
const ApiError = require("./src/utils/ApiError.js");
const { errorConverter, errorHandler } = require("./src/middleware/error.js");
app.use(cors())

// remove cors issue
 setupSwagger(app);
  
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// declare router name
app.use("/api/v1",authRoute);
app.use("/api/v1/blog", blogRoute);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(Number(httpStatus.status.NOT_FOUND || 404), "Not found"));
});
app.use(errorConverter);
app.use(errorHandler); 

module.exports = app;
