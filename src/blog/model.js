const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    blog: {
      type: String,
      required: true,
    },
    poll: [
      {
        name: {
          type: String,
        },
        vote: {
          type: Number,
          default:0
        },
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
