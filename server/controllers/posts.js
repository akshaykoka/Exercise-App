const users = require("../models/users");
const posts = require("../models/posts");
const upload = require("../config/multer");

const getPost = (req, res) => {
  res.send(posts.GetAll());
};
const getPostById = (req, res) => {
  if (+req.params.post_id) {
    res.send(posts.Get(req.params.post_id));
  } else {
    res.send(posts.GetWall(req.params.post_id));
  }
};
const addPost = (req, res) => {
  if (!req.file) return res.status(400).send("Image is required");
  req.body.userName = req.user.userName;
  req.body.image = req.file.filename;
  return res.send(posts.Add(req.body));
};
const updatePost = (req, res) =>
  res.send(posts.Update(req.params.post_id, req.body));

const deletePost = (req, res) => res.send(posts.Delete(req.params.post_id));

module.exports = { getPost, getPostById, addPost, updatePost, deletePost };
