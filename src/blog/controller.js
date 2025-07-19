const ApiError = require("../../utils/ApiError");
const sendResponse = require("../../utils/helper");
const { get, create } = require("./service");
const httpStatus = require("http-status")?.status;
// get first 1k blog
module.exports.getBlog = async (req, res, next) => {
  try {
    const result = await get(req);
    sendResponse(res, httpStatus?.OK, {
      data: result,
      message: "Successfully get the blog",
    });
  } catch (error) {
    next(error);
  }
};
// create the blog section
module.exports.createBlog = async (req, res, next) => {
  try {
    const result = await create(req?.body);
    sendResponse(res, httpStatus?.OK, {
      data: result,
      message: "Successfully get the blog",
    });
  } catch (error) {
    next(error);
  }
};
