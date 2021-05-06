const exercises = require("../models/exercises");

const getExercises = (req, res) => {
  res.send(
    exercises.GetPreviousExercises(req.user.userName, req.params.searchString)
  );
};

module.exports = { getExercises };
