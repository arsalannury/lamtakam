const counterModel = require("../models/counterModel");

exports.saveCount = async (req, res) => {
  if (!req.body.count || !req.body.blog || !req.clientIp || !req.count) {
    return res.status(400).send("miss some propeties");
  }

  const data = new counterModel({
    count: req.body.count,
    ip: req.clientIp,
    blog: {
      blogId: req.body.blog.blogId,
      blogTitle: req.body.blog.blogTitle,
    },
  });

  try {
    const dataSaved = await data.save();
    return res.status(200).json({
      message: "success",
      data: dataSaved,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
