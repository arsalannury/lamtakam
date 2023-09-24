const mongoose = require("mongoose");

const CommentsModel = new mongoose.Schema({
  blogId: mongoose.Types.ObjectId,
  response_comment_id: {
    type: mongoose.Types.ObjectId,
    default: null
  },
  sign_in_created_by: String,
  created_at: {
    default: new Date(),
    type: Date,
  },
  created_by: {
    type: String,
    required: [true, "created by must be entered"],
  },
  content: {
    type: String,
    required: [true, "content must be entered"],
  },
  status: String,
  created_by_image: String,
});

const commentsModel = mongoose.model("Comments", CommentsModel);
module.exports = commentsModel;
