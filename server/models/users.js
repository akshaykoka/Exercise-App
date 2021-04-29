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
    followers: [],
  },
  {
    firstName: "Kamala",
    lastName: "Harris",
    userName: "vp",
    email: "kamalaharis@gmail.com",

    password: "Her",
    isAdmin: true,
    following: ["johnsmith"],
    followers: [],
  },
  {
    firstName: "John",
    lastName: "Smith",
    userName: "johnsmith",
    email: "johnsmith@gmail.com",

    password: "BeepBop",
    isAdmin: true,
    following: ["vp"],
    followers: [],
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

  list.push({ ...user, following: [], followers: [], isAdmin: false });
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

const getUserIndexByName = (userName) => {
  return list.map((e) => e.userName).indexOf(userName);
};

module.exports.followUser = (user_id, userName) => {
  // add the userName to following list
  if (list[user_id].following.indexOf(userName) !== -1)
    throw { code: 303, message: "The user is already being followed" };

  // add the user username to followers list of the second account
  const mainUserName = list[user_id].userName;
  const secondUserIndex = getUserIndexByName(userName);
  if (list[secondUserIndex].followers.indexOf(mainUserName) !== -1)
    throw { code: 303, message: "The user is already a follower" };

  list[user_id].following.push(userName);
  list[secondUserIndex].followers.push(mainUserName);
  return list[user_id];
};

module.exports.removeFollowingUser = (user_id, userName) => {
  // remove the userName to following list
  const insideFollowing = list[user_id].following.indexOf(userName);
  if (insideFollowing === -1)
    throw { code: 303, message: "The user is not being followed" };

  const mainUserName = list[user_id].userName;
  const secondUserIndex = getUserIndexByName(userName);

  const insideFollowers = list[secondUserIndex].followers.indexOf(mainUserName);
  if (insideFollowers === -1)
    throw { code: 303, message: "The user is not a follower" };

  list[user_id].following.splice(insideFollowing, 1);
  list[secondUserIndex].followers.splice(insideFollowers, 1);

  return list[user_id];
};

module.exports.removeFollower = (user_id, userName) => {
  // remove the userName to following list
  const insideFollowers = list[user_id].followers.indexOf(userName);
  if (insideFollowers === -1)
    throw { code: 303, message: "The user is not a follower" };

  const mainUserName = list[user_id].userName;
  const secondUserIndex = getUserIndexByName(userName);

  const insideFollowing = list[secondUserIndex].following.indexOf(mainUserName);
  if (insideFollowing === -1)
    throw { code: 303, message: "The user is not following" };

  list[user_id].followers.splice(insideFollowers, 1);
  list[secondUserIndex].following.splice(insideFollowing, 1);

  return list[user_id];
};

module.exports.uploadAvatar = function uploadAvatar(user_id, avatar) {
  list[user_id].avatar = avatar;
  return list[user_id];
};
