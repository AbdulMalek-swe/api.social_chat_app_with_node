const express = require("express");
const blog = require("./controller"); // your blog controller
const router = express.Router();
/**
 * @swagger
 * /api/v1/blog:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of all blog posts
 */
router.get("/", blog.getBlog);

/**
 * @swagger
 * /api/v1/blog:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first blog post"
 *               content:
 *                 type: string
 *                 example: "This is the content of the blog post"
 *     responses:
 *       201:
 *         description: Blog post created successfully
 */
router.post("/", blog.createBlog);


module.exports = router;
