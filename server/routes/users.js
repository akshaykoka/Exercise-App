const express = require("express");
const {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const app = express.Router();
app
  .get("/", getUser)
  .get("/:user_id", getUserById)
  .post("/", addUser)
  .patch("/:user_id", updateUser)
  .delete("/:user_id", deleteUser);

module.exports = app;
