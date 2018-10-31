//Database config
const knex = require("knex");
const dbEngine = process.env.DB || "development";
const knexConfig = require("../knexfile.js")[dbEngine];

const db = knex(knexConfig);

//Database CRUD operations
function insert(note) {
  return db("notes").insert(note);
}

function get() {
  return db("notes");
}

function getNotes() {
  return db
    .select("*")
    .from("notes")
    .leftJoin("users", "notes.user_id", "=", "users.id");
}
function getNote(id) {
  return db("notes").where({ id: id });
}

function update(id, note) {
  return db("notes")
    .where({ id: id })
    .update(note);
}

function remove(id) {
  return db("notes")
    .where({ id: id })
    .del();
}

module.exports = { insert, get, getNotes, getNote, update, remove };
