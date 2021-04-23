const model = require("../models/users");

const getUser = (req, res) => {
  res.json({ users: model.GetAll() });
  console.log(req.headers);
};
const getUserById = (req, res) => res.send(model.Get(req.params.user_id));
const addUser = (req, res) => {
  res.send(model.Add(req.body));
};
const updateUser = (req, res) => {
  console.log(req.body);
  res.send(model.Update(req.params.user_id, req.body));
};
const deleteUser = (req, res) => res.send(model.Delete(req.params.user_id));

module.exports = { getUser, getUserById, addUser, updateUser, deleteUser };
