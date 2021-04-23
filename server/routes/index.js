const express = require("express");

const app = express.Router();
const { LoginRequired } = require("../middleware/security");
const authRoutes = require("./auth");
const friendRoutes = require("./follow");
const postRoutes = require("./posts");
const userRoutes = require("./users");
const inputRoutes = require("./inputs");

app
  .use("/auth", authRoutes)
  .use("/users", userRoutes)
  .use("/posts", LoginRequired, postRoutes)
  .use("/inputs", LoginRequired, inputRoutes)
  .use("/friends", LoginRequired, friendRoutes);

module.exports = app;
