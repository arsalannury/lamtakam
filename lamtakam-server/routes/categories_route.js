const express = require("express");
const { create_category, get_all_category } = require("../controllers/categoriesControllers");

const categoriesRoute = express.Router();

categoriesRoute.route('/').post(create_category).get(get_all_category);

module.exports = categoriesRoute;
