const express = require("express");
const user = require("./controller"); 
const router = express.Router();
router.post("/signin", user.signup).post("/login", user.signin);
router.route("/refresh-token").post(user.refreshToken);
router.route("/veryfi-token").get( user.veryfiTokens);
module.exports = router;
