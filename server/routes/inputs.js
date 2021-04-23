const express = require("express");
const {
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
} = require("../controllers/inputs");
const app = express.Router();

app.get("/exercise", allExercises);

app.post("/exercise", postExercises);

app.patch("/exercise/:exercise_id", updateExercises);

app.delete("/exercise/:exercise_id", delExercises);

app.get("/food", getFood);

app.post("/food", postFood);

app.patch("/food/:food_id", updateFood);

app.delete("/food/:food_id", delFood);

app.get("/bmi", getAllFood);

app.post("/bmi", postBmi);

module.exports = app;
