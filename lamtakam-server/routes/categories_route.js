const express = require("express");
const {
  create_category,
  get_all_category,
  remove_category,
} = require("../controllers/categoriesControllers");

const categoriesRoute = express.Router();

categoriesRoute.route("/").post(create_category).get(get_all_category);
categoriesRoute.route("/:id").delete(remove_category);

module.exports = categoriesRoute;
