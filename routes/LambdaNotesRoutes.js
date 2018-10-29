//Initial set up
const express = require("express");
const router = express.Router();
const db = require("../data/data.js");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.get("/notes", (req, res) => {
  db.get()
    .then(notes => {
      if (!notes) {
        res.status(500).json({ error: "There was an error" });
      } else res.status(200).json(notes);
    })
    .error(err => res.status(500).json(err));
});

router.get("/notes/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "Bad Request" });
  }

  db.getNote(id)
    .then(note => {
      if (!note) {
        res.status(500).json({ error: "There was an error" });
      } else res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});
module.exports = router;
