const users = [];
let nextId = 1;

function create({ name, email }) {
  const user = { id: nextId++, name, email };
  users.push(user);
  return user;
}

function findAll() {
  return users;
}

function findById(id) {
  return users.find((user) => user.id === id);
}

module.exports = { create, findAll, findById };
