const express = require("express");
const app = express();
const { getExercises } = require("../controllers/autocomplete");

app.get("/:searchString", getExercises);

module.exports = app;
