const CommentsModel = require("../models/commentsModel");

exports.create_comment = async (req, res, next) => {
  try {
    const newComment = await CommentsModel.create(req.body);

    res.status(201).json({
      status: "success",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({
      status: "faild",
      message: error.message,
    });
  }
};

exports.getComments = async (req, res, next) => {
  const { status } = req.query;

  if (status === undefined) {
    return res.status(400).json({
      status: "bad request",
      message: "status is not defined",
    });
  }

  try {
    const getCommentsList = await CommentsModel.find({ status }).sort({
      created_at: "asc",
    });

    res.status(200).json({
      status: "success",
      data: getCommentsList,
      length: getCommentsList.length,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.update_comments_status = async (req, res, next) => {
  const comments = req.body;
  if (!comments || (comments && !Array.isArray(comments))) {
    return res.status(400).json({
      status: " failed",
      message: "comments are not valid",
    });
  } else if (comments && comments.length <= 0) {
    res.json({ comments });
  }

  for (let index in comments) {
    await CommentsModel.updateMany(
      { _id: comments[index]._id },
      { status: "accepted" },
      { runValidators: true }
    );
  }

  res.status(204).json({
    status: "success",
    message: "comments status updated succesfully",
  });
};

exports.delete_comment = async (req, res, next) => {
  const comments = req.body;
  if (!comments || (comments && !Array.isArray(comments))) {
    return res.status(400).json({
      status: " failed",
      message: "comments are not valid",
    });
  } else if (comments && comments.length <= 0) {
    res.json({ comments });
  }

  for (let index in comments) {
    await CommentsModel.deleteMany(
      { _id: comments[index]._id },
      { runValidators: true }
    );
  }

  res.status(204).json({
    status: "success",
    message: "comments status updated succesfully",
  });
};

exports.getBlogComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getBlogsComments = await CommentsModel.find({ blogId: id, status:'accepted' });

    res.status(200).json({
      status: "success",
      data: getBlogsComments,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
