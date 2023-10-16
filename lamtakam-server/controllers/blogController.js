const BlogsModel = require("../models/blogsModel");

exports.create_blog = async (req, res, next) => {
  const createdBlog = await BlogsModel.create(req.body);
  try {
    res.status(200).json({
      message: "success",
      data: createdBlog,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.get_blogs = async (req, res, next) => {
  const findAllDataByCondition = await BlogsModel.find()
    .limit(10)
    .select("title blogImg category created_at");

  res.status(200).json({
    status: "success",
    data: findAllDataByCondition,
  });
};

exports.get_blog_by_id = async (req, res, next) => {
  try {
    const findSpeceficBlog = await BlogsModel.findById(req.params.id).select(
      "_id counter content created_at category title"
    );
    res.status(200).json({
      status: "success",
      data: findSpeceficBlog,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.get_blog_ids = async (req, res, next) => {
  const findIds = await BlogsModel.find().select("_id");
  res.status(200).json({
    data: findIds,
  });
};

exports.update_counter_blog = async (req, res, next) => {
  let getBlogCountForUpdate = await BlogsModel.findById(req.params.id);
  let countUpdate = getBlogCountForUpdate.counter + req.body.count;
  await BlogsModel.findByIdAndUpdate(
    req.params.id,
    {
      counter: countUpdate,
    },
    { runValidators: true }
  );
  res
    .status(200)
    .json({ status: "success", message: "counter updated successfully" });
};

// exports.create_comment = async (req, res, next) => {
//   if (!req.params.id) {
//     return res.status(400).json({
//       status: "faild",
//       message: "something is missing in your request",
//     });
//   }

//   try {
//     const findBlogById = await BlogsModel.findById(req.params.id);
//     let comments = findBlogById.comments;
//     if (comments) {
//       comments.push(req.body);
//     } else {
//       comments = req.body;
//     }

//     await BlogsModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         comments,
//       },
//       { runValidators: true }
//     );
//     res.status(200).json({
//       status: "success",
//       message: `comment added successfuly ${JSON.stringify(req.body)}`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "faild",
//       message: error.message,
//     });
//   }
// };

// exports.getComments = async (req, res, next) => {
//   const { status } = req.query;

//   if (status === undefined) {
//     return res.status(200).json({
//       status: "bad request",
//       message: "miss status query at request",
//     });
//   }

//   try {
//     const getCommentsList = await BlogsModel.find()
//       .select("comments")
//       .sort({ created_at: "asc" });

//     let getCommentsOfEachPost = getCommentsList.map((data, index) => {
//       // run C -> O(n*2)
//       return data.comments.filter((commentData) => {
//         return commentData.status === status;
//       });
//     });

//     const allCommentsList = [];
//     for (let index in getCommentsOfEachPost) {
//       // run C -> O(n*2)
//       getCommentsOfEachPost[index].map((commentObj) => {
//         allCommentsList.push(commentObj);
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       data: allCommentsList,
//       length: allCommentsList.length,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };

// exports.update_comments_status = async (req, res, next) => {
//   const comments = req.body;
//   if (!comments || (comments && !Array.isArray(comments))) {
//     return res.status(400).json({
//       status: " failed",
//       message: "comments are not valid",
//     });
//   } else if (comments && comments.length <= 0) {
//     res.json({ comments });
//   }
    
//   const allBLog = await BlogsModel.find().select('comments');

//   for (let index in comments) {
//     console.log(comments[index]);
//     await BlogsModel.updateMany(
//       { _id: comments[index]._id },
//       { status: "accepted" },
//       { runValidators: true }
//     );
//   }

//   res.status(204).json({
//     status: "success",
//     message: "comments status updated succesfully",
//   });
// };
