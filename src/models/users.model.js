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

function update(id, { name, email }) {
  const user = findById(id);

  if (!user) {
    return undefined;
  }

  user.name = name;
  user.email = email;
  return user;
}

function remove(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  return true;
}

module.exports = { create, findAll, findById, update, remove };
