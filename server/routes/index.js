const express = require("express");

const app = express.Router();
const { LoginRequired } = require("../middleware/security");
const authRoutes = require("./auth");
const postRoutes = require("./posts");
const userRoutes = require("./users");
const inputRoutes = require("./inputs");
const autocompleteRoutes = require("./autocomplete");

app
  .use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .use("/auth", authRoutes)
  .use("/users", LoginRequired, userRoutes)
  .use("/posts", LoginRequired, postRoutes)
  .use("/inputs", LoginRequired, inputRoutes)
  .use("/auto", LoginRequired, autocompleteRoutes);

module.exports = app;
