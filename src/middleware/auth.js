const jwt = require("jsonwebtoken");
const User = require("../user/model");
const ApiError = require("../utils/ApiError");

const auth = async (req,res,next)=>{
  try{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      token = req.headers.authorization.split(" ")[1];
    }
    if(!token) return next(new ApiError(401,"Not authorized, token missing"));

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if(!user) return next(new ApiError(401,"User not found"));

    req.user = user;
    next();
  }catch(err){
    next(new ApiError(401,"Invalid token"));
  }
};

module.exports = auth;
