const mongoose = require("mongoose");

const CategoriesModel = new mongoose.Schema({
  category: {
    value: { required: true, type: String, unique: true },
    label: { required: true, type: String, unique: true },
  },
});

module.exports = mongoose.model("Categories", CategoriesModel);
