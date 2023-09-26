const categoryModel = require("../models/categoriesModel");

exports.create_category = async (req, res, next) => {
  try {
    const categoryObj = await categoryModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: categoryObj,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};
exports.get_all_category = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.remove_category = async (req, res, next) => {
  const { id } = req.body.params;
  try {
    await categoryModel.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      message: "category removed",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
