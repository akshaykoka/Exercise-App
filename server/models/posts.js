const users = require("./users");

const list = [
  {
    title: "Benefits of green tea",
    write_up: "Green tea is packed full of health-promoting compounds. Regularly drinking green tea can help you lose weight and reduce your risk of several diseases, including diabetes, heart disease and cancer. Drinking three to five cups of green tea per day seems to be optimal to reap the most health benefits.",
    userName: "vp",
  },
  {
    title: "Why keto diet is bad?",
    write_up: "The keto diet could cause low blood pressure, kidney stones, constipation, nutrient deficiencies and an increased risk of heart disease. Strict diets like keto could also cause social isolation or disordered eating. Keto is not safe for those with any conditions involving their pancreas, liver, thyroid or gallbladder.",
    userName: "maxyence",
  },
  {
    title: "How long should you do Keto?",
    write_up: "Stick to the keto diet for three to six months max, says Mancinelli, noting that some people opt to cycle in and out of the diet throughout the year.",
    userName: "maxyence",
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
