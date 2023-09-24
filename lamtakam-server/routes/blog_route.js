const experss = require("express");
const {
  create_blog,
  get_blogs,
  get_blog_by_id,
  update_counter_blog,
} = require("../controllers/blogController");

const blogRoute = experss.Router();

blogRoute.route("/").post(create_blog).get(get_blogs);
blogRoute.route("/:id").get(get_blog_by_id).put(update_counter_blog);

module.exports = blogRoute;
