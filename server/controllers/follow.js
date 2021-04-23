const users = require("../models/users");

const followUser = (req, res) => {
  res.send(users.followUser(req.user.id, req.params.userName));
};

module.exports = { followUser };
