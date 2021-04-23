const model = require("../models/users");
const register = (req, res, next) => {
  model
    .Register(req.body)
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  model
    .Login(req.body.userName, req.body.password)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = { register, login };
