const mongoose = require("mongoose");

const BlogsModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: [2, "title must be more than 2 character"],
  },
  content: {
    type: String,
    max: [8000, "content can not be more than 8000 character"],
    required: true,
  },
  blogImg: String,
  category: [{ value: String, label: String }],
  created_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
  counter: {
    type: Number,
    required: true,
    default: 0,
  },
  // comments: [
  //   {
  //     sign_in_created_by: String,
  //     created_at: {
  //       default: new Date(),
  //       type: Date,
  //     },
  //     created_by: {
  //       type: String,
  //       required: [true, "created by must be entered"],
  //     },
  //     content: {
  //       type: String,
  //       required: [true, "content must be entered"],
  //     },
  //     status: String,
  //   },
  // ],
});

const Blogs = mongoose.model("Blogs", BlogsModel);
module.exports = Blogs;
