const exercises = require("../models/exercises");
const food = require("../models/food");
const bmi = require("../models/BMI");

const allExercises = (req, res) => {
  if (req.user.isAdmin) {
    res.send(exercises.GetAll());
  } else {
    res.send(exercises.GetWall(req.user.userName));
  }
};

const postExercises = (req, res) => {
  req.body.userName = req.user.userName;
  res.send(exercises.Add(req.body));
};

const updateExercises = (req, res) => {
  req.body.userName = req.user.userName;
  res.send(exercises.Update(req.params.exercise_id, req.body));
};

const delExercises = (req, res) => {
  res.send(exercises.Delete(req.params.exercise_id));
};

const getFood = (req, res) => {
  if (req.user.isAdmin) {
    res.send(food.GetAll());
  } else {
    res.send(food.GetWall(req.user.userName));
  }
};

const postFood = (req, res) => {
  req.body.userName = req.user.userName;
  res.send(food.Add({ ...req.body, date: Date() }));
};

const updateFood = (req, res) => {
  req.body.userName = req.user.userName;
  res.send(food.Update(req.params.food_id, req.body));
};

const delFood = (req, res) => {
  res.send(food.Delete(req.params.food_id));
};

const getAllFood = (req, res) => {
  if (req.user.isAdmin) {
    res.send(bmi.GetAll());
  } else {
    res.send(bmi.GetWall(req.user.userName));
  }
};

const postBmi = (req, res) => {
  req.body.userName = req.user.userName;
  res.send(bmi.Add(req.body));
};

module.exports = {
  allExercises,
  postExercises,
  updateExercises,
  delExercises,
  getFood,
  postFood,
  updateFood,
  delFood,
  getAllFood,
  postBmi,
};
