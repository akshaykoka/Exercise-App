const users = require("./users");

const list = [
  {
    name: "Pork & Omlette",

    calories: "100",
    time: Date(),
    userName: "johnsmith",
  },
  {
    name: "Millets",

    calories: "600",
    time: Date(),
    userName: "vp",
  },
  {
    name: "Green Salad",

    calories: "70",
    time: Date(),
    userName: "johnsmith",
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
  return listWithOwner().filter((food) => food.userName === userName);
};

module.exports.Add = (food) => {
  if (!food.userName) {
    throw { code: 422, msg: "Food must have an Owner" };
  }
  list.push(food);
  return { ...food };
};

module.exports.Update = (food_id, food) => {
  const oldObj = list[food_id];
  const newObj = { ...oldObj, ...food };
  list[food_id] = newObj;
  return newObj;
};

module.exports.Delete = (food_id) => {
  const food = list[food_id];
  list.splice(food_id, 1);
  return food;
};
