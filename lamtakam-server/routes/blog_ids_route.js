const express = require("express");
const { get_blog_ids } = require("../controllers/blogController");

const blogIdsRoute = express.Router();

blogIdsRoute.route("/").get(get_blog_ids);

module.exports = blogIdsRoute;
