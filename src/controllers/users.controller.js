const usersModel = require('../models/users.model');

function createUser(req, res) {
  const { name, email } = req.body;
  const user = usersModel.create({ name, email });
  res.status(201).json(user);
}

function listUsers(req, res) {
  res.status(200).json(usersModel.findAll());
}

function getUserById(req, res) {
  const user = usersModel.findById(Number(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(200).json(user);
}

function updateUser(req, res) {
  const { name, email } = req.body;
  const user = usersModel.update(Number(req.params.id), { name, email });

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(200).json(user);
}

function deleteUser(req, res) {
  const deleted = usersModel.remove(Number(req.params.id));

  if (!deleted) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(204).send();
}

module.exports = {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
};
