const express = require("express");
const blog = require("./controller");
const router = express.Router();
router.get("/blog", blog.getBlog).post("blog", blog.createBlog);
module.exports = router;
