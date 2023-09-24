const express = require("express");
const {
  getComments,
  create_comment,
  update_comments_status,
  delete_comment,
  getBlogComments,
} = require("../controllers/commentController");

const commentRoute = express.Router();

commentRoute.route('/:id').get(getBlogComments)  
commentRoute
  .route("/")
  .get(getComments)
  .post(create_comment)
  .put(update_comments_status)
  .delete(delete_comment);


module.exports = commentRoute;
