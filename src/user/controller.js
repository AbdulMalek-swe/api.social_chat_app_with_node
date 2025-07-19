const {  generateAccessToken,generateRefreshToken, generateToken, refreshTokenDecode} = require("../../utils/token");
const jwt = require("jsonwebtoken");
const { signupService, findUserByEmail } = require("./service"); 
   module.exports.signup = async (req, res) => {
    try {
      const {email,password,confirmPassword} = req.body;
      if (!email || !password || password!==confirmPassword) {
        return res.status(401).json({ 
          status: "fail",
          error: "Please provide your credentials",
        });
      }
        const user = await signupService(req.body);
        const {accessToken,refreshToken} =  await generateToken(user)
        const { password: pwd, ...others } = user.toObject();
        const options = {
          httpOnly: true,
          secure: true,
        };
        res.status(200) .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options).json({
              status: "success",
              message: "Successfully logged in",
              accessToken:accessToken,
              refreshToken:refreshToken,
              user:others
            });
      }
      catch (error) {
        res.status(401).json({
         error: error.message
        })
      } 
    } 
    module.exports.signin= async (req, res,next) => {
        try {
          console.log(req.body);
            const { email, password } = req.body;
            if (!email || !password) {
              return res.status(401).json({ 
                status: "fail",
                error: "Please provide your credentials",
              });
            }
            const user = await findUserByEmail(email);
            console.log(user);
            if (!user) {
              return res.status(401).json({
                status: "fail",
                error: "No user found. Please create an account",
              });
            }
            const isPasswordValid = user.isPasswordCorrect(password );
            if (!isPasswordValid) {
              return res.status(401).json({
                status: "fail",
                error: "Password is not correct",
              });
            }
            const {accessToken,refreshToken} =  await generateToken(user)
            const { password: pwd, ...others } = user.toObject();
            const options = {
              httpOnly: true,
              secure: true,
            };
            res.status(200) .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options).json({
              status: "success",
              message: "Successfully logged in",
              accessToken:accessToken,
              refreshToken:refreshToken,
              user:others
            });
          } catch (error) {
            next( error)
          } 
    };
    module.exports.refreshToken = async(req,res)=>{
      try {
   const {email} =  await refreshTokenDecode(req.body.token)
         const user = await findUserByEmail(email);
         console.log(user)
      const {accessToken,refreshToken} = await  generateToken(user)
        res.status(200).json({
          status: "success",
          message: "success",
           accessToken:accessToken,
           refreshToken:refreshToken,
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          error:error.message
        });
      }
    }
  
    module.exports.veryfiTokens = async(req,res)=>{
      try {
        const {email} = req.user;
       console.log(email)
     
        res.status(200).json({
          status: "fail",
          error: "error is back dfgdf",
           valid:true
            
        });
      } catch (error) {
        console.log(error.message,"come to error in verify token")
        res.status(400).json({
          status: "fail",
          valid:false
        });
      }
    }
  