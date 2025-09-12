const UserService = require("./service"); 

exports.register = async (req,res,next)=>{
  try{
    const user = await UserService.register(req.body);
    res.status(201).json({ success:true, user });
  }catch(err){ next(err) }
};

exports.login = async (req,res,next)=>{
  try{
    const { email, phone, password } = req.body;
    const result = await UserService.login({ email, phone, password });
    res.status(200).json({ success:true, ...result });
  }catch(err){ next(err) }
};

exports.getMe = async (req,res,next)=>{
  try{
    const user = await UserService.getMe(req.user._id);
    res.status(200).json({ success:true, user });
  }catch(err){ next(err) }
};

exports.refreshAccessToken = async (req,res,next)=>{
  try{
    const { refreshToken } = req.body;
    const token = await UserService.refreshAccessToken(refreshToken);
    res.status(200).json({ success:true, accessToken: token });
  }catch(err){ next(err) }
};

exports.forgotPassword = async (req,res,next)=>{
  try{
    const { emailOrPhone } = req.body;
    const resetToken = await UserService.forgotPassword(emailOrPhone);
    res.status(200).json({ success:true, resetToken }); // in prod, send via email/sms
  }catch(err){ next(err) }
};

exports.resetPassword = async (req,res,next)=>{
  try{
    const { token, newPassword } = req.body;
    await UserService.resetPassword(token,newPassword);
    res.status(200).json({ success:true, message:"Password reset successful" });
  }catch(err){ next(err) }
};

exports.changePassword = async (req,res,next)=>{
  try{
    const { oldPassword, newPassword } = req.body;
    await UserService.changePassword(req.user._id, oldPassword,newPassword);
    res.status(200).json({ success:true, message:"Password changed successfully" });
  }catch(err){ next(err) }
};

exports.updateProfile = async (req,res,next)=>{
  try{
    const user = await UserService.updateProfile(req.user._id, req.body);
    res.status(200).json({ success:true, user });
  }catch(err){ next(err) }
};
