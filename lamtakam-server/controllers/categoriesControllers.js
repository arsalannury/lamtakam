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
  const { id } = req.params;
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

exports.update_category = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    await categoryModel.findByIdAndUpdate(
      id,
      {
        category: {
          value: body.category.value,
          label: body.category.label,
        },
      },
      { runValidators: true }
    );
    return res.status(201).json({
      status: "success",
      message: "data updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
