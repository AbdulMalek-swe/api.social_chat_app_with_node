 const jwt = require("jsonwebtoken")
exports.generateToken = async (user) => {
    const accessToken =  user.generateAccessToken();
    const refreshToken =  user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return {
        accessToken,
        refreshToken
    }
}
exports.refreshTokenDecode = async(token)=>{
    const decodedToken = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    )
    return decodedToken
}