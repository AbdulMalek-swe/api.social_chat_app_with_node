const Blog = require("./model");
 

exports.get = async (blogData) => {
  const page = parseInt(blogData?.query?.page) || 1;
  const limit = parseInt(blogData?.query?.limit) || 100;
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
  const shuffled = latestBlogs.sort(() => 0.5 - Math.random()); 
  // Step 3: Paginate from shuffled
  const paginatedBlogs = shuffled.slice(skip, skip + limit);
  
  return {
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: paginatedBlogs,
  };
};
// create blog 
exports.create = async (blogData) => {
  console.log(blogData,"----"); 
   return Blog.create(blogData);
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

  