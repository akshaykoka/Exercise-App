const express = require("express");
const upload = require("../config/multer");
const {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  followUser,
  removeFollower,
  unfollowUser,
  uploadAvatar,
} = require("../controllers/users");

const app = express.Router();
app
  .get("/", getUser)
  .get("/:user_id", getUserById)
  .post("/", addUser)
  .post("/avatar", upload.single("file"), uploadAvatar)
  .patch("/:user_id", updateUser)
  .delete("/:user_id", deleteUser)
  .post("/follow/:userName", followUser)
  .post("/remove/follower/:userName", removeFollower)
  .post("/unfollow/:userName", unfollowUser);

module.exports = app;
