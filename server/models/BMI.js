const users = require("./users");

const list = [
  {
    height: "180",
    weight: "120",
    bmi: "24",
    time: Date(),
    userName: "johnsmith",
  },
  {
    height: "183",
    weight: "100",
    bmi: "27",
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
  return listWithOwner().filter((bmi) => bmi.userName === userName);
};

module.exports.Add = (bmi) => {
  if (!bmi.userName) {
    throw { code: 422, msg: "BMI must have an Owner" };
  }
  list.push(bmi);
  return { ...bmi };
};

module.exports.Update = (bmi_id, bmi) => {
  const oldObj = list[bmi_id];
  const newObj = { ...oldObj, ...bmi };
  list[bmi_id] = newObj;
  return newObj;
};

module.exports.Delete = (bmi_id) => {
  const bmi = list[bmi_id];
  list.splice(bmi_id, 1);
  return bmi;
};
