//Database config
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

//Database CRUD operations
function insert(user) {
  return db("users").insert(user);
}

function get() {
  return db("users");
}

function getUserById(id) {
  return db("users")
    .where({ id: id })
    .first();
}

function getUserByUsername(username) {
  return db("users")
    .where({ username: username })
    .first();
}

function update(id, user) {
  return db("users")
    .where({ id: id })
    .update(user);
}

function remove(id) {
  return db("users")
    .where({ id: id })
    .del();
}

module.exports = {
  insert,
  get,
  getUserById,
  update,
  remove,
  getUserByUsername
};
