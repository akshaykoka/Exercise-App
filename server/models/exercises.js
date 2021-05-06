const users = require("./users");
Autocomplete = require('autocomplete')
var auto = new Autocomplete()
const { v4: uuidv4 } = require("uuid");

const list = [
  {
    id: "001",
    name: "Push Ups",
    type: "A1",
    duration: "60",
    calories: "100",
    time: Date(),
    userName: "johnsmith",
  },
  {
    id: "002",
    name: "Lat Pull Downs",
    type: "A4",
    duration: "120",
    calories: "100",
    time: Date(),
    userName: "johnsmith",
  },
  {
    id: "003",
    name: "Star Push Ups",
    type: "A4",
    duration: "60",
    calories: "100",
    time: Date(),
    userName: "vp",
  },
];

const listWithOwner = () =>
  list.map((x, i) => ({
    ...x,
    id: i,
    user: users.GetByUserName(x.userName),
  }));

module.exports.GetAll = () => {
  return listWithOwner();
};

module.exports.GetWall = (userName) => {
  return listWithOwner().filter((exercise) => exercise.userName === userName);
};

module.exports.Add = (exercise) => {
  if (!exercise.userName) {
    throw { code: 422, msg: "Exercise must have an Owner" };
  }
  list.push(exercise);
  return { ...exercise };
};

module.exports.Update = (exercise_id, exercise) => {
  const oldObj = list[exercise_id];
  const newObj = { ...oldObj, ...exercise };
  list[exercise_id] = newObj;
  return newObj;
};

module.exports.Delete = (exercise_id) => {
  const exercise = list[exercise_id];
  list.splice(exercise_id, 1);
  return exercise;
};

module.exports.GetPreviousExercises = (userName, searchString) => {
  const exercises = list.filter(
    (exercise) =>
      exercise.userName === userName).map(x => x.name);
  auto.initialize(exercises);
  let results = auto.search(searchString);
  var stringMatches = results.map(function (result) {
    return result.key
  })

  return stringMatches;

}