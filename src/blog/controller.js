const ApiError = require("../../utils/ApiError");
const sendResponse = require("../../utils/helper");
const { get } = require("./service");
const httpStatus = require("http-status")?.status;
module.exports.getBlog = async (req, res, next) => {
  try {
    const result = await get(req);
    sendResponse(res, httpStatus?.OK, { data: result ,message:"Successfully get the blog"});
  } catch (error) {
    next(error);
  }
};
module.exports.createBlog = async (req, res, next) => {
  try {
    res.send({ name: httpStatus?.OK });
  } catch (error) {
    next(error);
  }
};
