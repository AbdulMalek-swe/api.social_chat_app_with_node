const Blog = require("./model");

exports.create = async (userData) => {};

exports.get = async (blogData) => {
  const page = parseInt(blogData?.query?.page) || 1;
  const limit = parseInt(blogData?.query?.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Blog.countDocuments();
  // const blogs = await Blog.aggregate([
  //   { $sample: { size: total } },
  //   { $skip: skip },
  //   { $limit: limit },
  // ]);
  const latestBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(1000)
      .lean(); 
  return {
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: latestBlogs,
  };
};

//  await Blog.findOneAndUpdate(
//     {
//       _id: "6877c667de5728dd49ab489e",
//       "poll._id": "6877c667de5728dd49ab489f",
//     },
//     {
//       $inc: { "poll.$.vote": 1 },
//     },
//     { new: true }
//   );
