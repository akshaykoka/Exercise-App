const express = require("express");
const { register, login } = require("../controllers/auth");

const app = express.Router();
app.post("/register", register).post("/login", login);

module.exports = app;
