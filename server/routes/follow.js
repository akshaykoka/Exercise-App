const express = require("express");

const { followUser } = require("../controllers/follow");

const app = express.Router();

app.post("/:userName", followUser);

module.exports = app;
