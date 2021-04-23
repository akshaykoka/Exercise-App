const express = require("express");
const {
  getPostById,
  addPost,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/posts");
const app = express.Router();
app.get("/", getPost);
app.get("/:post_id", getPostById);

app.post("/", addPost);

app.patch("/:post_id", updatePost);

app.delete("/:post_id", deletePost);

module.exports = app;
