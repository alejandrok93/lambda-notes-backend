//Database config
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

//Database CRUD operations
function insert(note) {
  return db("notes").insert(note);
}

function get() {
  return db("notes");
}

function getNote(id) {
  return db("notes").where({ id: id });
}

function update(id, note) {
  return db("notes")
    .where({ id: id })
    .update(note);
}

module.exports = { insert, get, getNote, update };
