const users = require("./users");

const list = [
  {
    title: "Lorem Ipsom",
    write_up: "lorem is the best",
    userName: "johnsmith",
  },
  {
    title: "Lorem Ipsom",
    write_up: "lorem is the best",
    userName: "johnsmith",
  },
  {
    title: "Lorem Ipsom",
    write_up: "lorem is the best",
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
  return listWithOwner().filter((post) => post.userName == userName);
};

module.exports.GetFeed = (userName) =>
  listWithOwner().filter((post) =>
    users
      .GetByUserName(userName)
      .following.some((f) => f.userName == post.userName)
  );

module.exports.Get = (post_id) => list[post_id];
module.exports.Add = (post) => {
  if (!post.userName) {
    throw { code: 422, msg: "Post must have an Owner" };
  }
  list.push(post);
  return { ...post };
};
module.exports.Update = (post_id, post) => {
  const oldObj = list[post_id];
  const newObj = { ...oldObj, ...post };
  list[post_id] = newObj;
  return newObj;
};
module.exports.Delete = (post_id) => {
  const post = list[post_id];
  list.splice(post_id, 1);
  return post;
};
