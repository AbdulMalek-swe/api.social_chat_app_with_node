const User = require("./model");
const ApiError = require("../utils/ApiError");
const crypto = require("crypto");

class UserService{
  static async register(data){
    const user = await User.create(data);
    return user;
  }

  static async login({email,phone,password}){
    const user = await User.findOne({ $or:[{email},{phone}] });
    if(!user) throw new ApiError(400,"Invalid credentials");

    const isMatch = await user.isPasswordCorrect(password);
    if(!isMatch) throw new ApiError(400,"Invalid credentials");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
  }

  static async getMe(userId){
    const user = await User.findById(userId);
    if(!user) throw new ApiError(404,"User not found");
    return user;
  }

  static async refreshAccessToken(refreshToken){
    if(!refreshToken) throw new ApiError(401,"Refresh token required");
    const user = await User.findOne({ refreshToken });
    if(!user) throw new ApiError(401,"Invalid refresh token");
    const newAccessToken = user.generateAccessToken();
    return newAccessToken;
  }

  static async forgotPassword(emailOrPhone){
    const user = await User.findOne({ $or:[{email: emailOrPhone},{phone: emailOrPhone}] });
    if(!user) throw new ApiError(404,"User not found");

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10*60*1000; // 10 min
    await user.save();

    // send email or sms here with resetToken
    return resetToken;
  }

  static async resetPassword(token,newPassword){
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    if(!user) throw new ApiError(400,"Invalid or expired token");

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return true;
  }

  static async changePassword(userId, oldPassword, newPassword){
    const user = await User.findById(userId);
    if(!user) throw new ApiError(404,"User not found");

    const isMatch = await user.isPasswordCorrect(oldPassword);
    if(!isMatch) throw new ApiError(400,"Old password is incorrect");

    user.password = newPassword;
    await user.save();
    return true;
  }

  static async updateProfile(userId, data){
    const user = await User.findByIdAndUpdate(userId,data,{new:true});
    if(!user) throw new ApiError(404,"User not found");
    return user;
  }
}

module.exports = UserService;
