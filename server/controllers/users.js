const upload = require("../config/multer");
const fs = require("fs");
const model = require("../models/users");

const getUser = (req, res) => {
  res.json({ users: model.GetAll() });
  console.log(req.headers);
};
const getUserById = (req, res) => res.send(model.Get(req.params.user_id));
const addUser = (req, res) => {
  res.send(model.Add(req.body));
};
const updateUser = (req, res) => {
  console.log(req.body);
  res.send(model.Update(req.params.user_id, req.body));
};
const deleteUser = (req, res) => res.send(model.Delete(req.params.user_id));

const followUser = (req, res) =>
  res.send(model.followUser(req.user.id, req.params.userName));
const removeFollower = (req, res) =>
  res.send(model.removeFollower(req.user.id, req.params.userName));
const unfollowUser = (req, res) =>
  res.send(model.removeFollowingUser(req.user.id, req.params.userName));

const uploadAvatar = (req, res) => {
  if (!req.file) return res.send("Image is not added");
  const User = model.uploadAvatar(req.user.id, req.file.filename);
  return res.send(User);
};

module.exports = {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  removeFollower,
  uploadAvatar,
};
