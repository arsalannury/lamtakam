const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoute = require("./routes/blog_route");
const requestIp = require("request-ip");
const categoriesRoute = require("./routes/categories_route");
const blogIdsRoute = require("./routes/blog_ids_route");
const commentsroute = require('./routes/comment_route');

dotenv.config({ path: "./config.env" });
const corsConfig = {
  origin: "*",
};

const app = express();
const mongoString = process.env.DATABASE;
mongoose
  .connect(mongoString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("db connected successfuly");
  })
  .catch((err) => {
    throw err;
  });
app.use(express.json({ limit: "50mb" }));
app.set("trust proxy", true);
app.use(requestIp.mw());
app.use(cors(corsConfig));
app.use("/blogs", blogRoute);
app.use("/categories", categoriesRoute);
app.use('/blogIds', blogIdsRoute);
app.use("/comments", commentsroute);

module.exports = app;
