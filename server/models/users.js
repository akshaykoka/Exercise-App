const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;

const list = [
  {
    firstName: "Moshe",
    lastName: "Plotkin",
    userName: "JewPaltz",
    email: "jewpaltz@123.com",

    password: "$2b$08$ovDdePT2UjP9nkMaOhpFgOQEsBclWpB9RfS2p5XZwq.vDIzwNw5ke",
    isAdmin: true,
    following: ["vp", "johnsmith"],
  },
  {
    firstName: "Kamala",
    lastName: "Harris",
    userName: "vp",
    email: "kamalaharis@gmail.com",

    password: "Her",
    isAdmin: true,
    following: ["johnsmith"],
  },
  {
    firstName: "John",
    lastName: "Smith",
    userName: "johnsmith",
    email: "johnsmith@gmail.com",

    password: "BeepBop",
    isAdmin: true,
    following: ["vp"],
  },
];

module.exports.GetAll = () => list;

module.exports.Get = (user_id) => list[user_id];

module.exports.GetByUserName = (userName) => ({
  ...list.find((x, i) => x.userName == userName),
  password: undefined,
});

module.exports.Add = (user) => {
  if (!user.firstName) {
    throw { code: 422, msg: "First Name is required" };
  }
  list.push(user);
  return { ...user, password: undefined };
};

module.exports.Register = async (user) => {
  const hash = await bcrypt.hash(user.password, +SALT_ROUNDS);

  user.password = hash;
  user.rePasword = undefined;
  if (!user.firstName) {
    throw { code: 422, msg: "First Name is required" };
  }

  list.push({ ...user, following: [], isAdmin: false });
  return { ...user, password: undefined };
};

module.exports.Update = (user_id, user) => {
  const oldObj = list[user_id];
  if (user.firstName) {
    oldObj.firstName = user.firstName;
  }
  if (user.lastName) {
    oldObj.lastName = user.lastName;
  }
  if (user.userName) {
    oldObj.userName = user.userName;
  }
  if (user.email) {
    oldObj.email = user.email;
  }
  if (user.password) {
    oldObj.password = user.password;
  }

  return { ...oldObj, password: undefined };
};

module.exports.Delete = (user_id) => {
  const user = list[user_id];
  list.splice(user_id, 1);
  return user;
};

module.exports.Login = async (userName, password) => {
  console.log({ userName, password });
  const user = list.find((x) => x.userName === userName);
  const userIndex = list.findIndex((x) => x.userName === userName);
  if (!user)
    throw { code: 401, msg: "Sorry there is no user with that userName" };

  if (!(await bcrypt.compare(password, user.password))) {
    throw { code: 401, msg: "Wrong Password" };
  }

  const data = { ...user, id: userIndex, password: undefined };

  const token = jwt.sign(data, JWT_SECRET);

  return { user: data, token };
};

module.exports.FromJWT = (token) => {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

module.exports.followUser = (user_id, userName) => {
  try {
    if (list[user_id].following.indexOf(userName) === -1) {
      list[user_id].following.push(userName);

      return list[user_id];
    }
  } catch (error) {}
};
