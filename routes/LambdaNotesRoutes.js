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
      if (!notes || notes.length === 0) {
        res
          .status(500)
          .json({ error: "There was an error retrievin the notes" });
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
      if (!note || note.length === 0) {
        res
          .status(500)
          .json({ error: "There was an error retrieving the note" });
      } else res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
  const newNote = req.body;

  if (!newNote.title) {
    res.status(400).json({ error: "Bad Request" });
  }

  db.insert(newNote)
    .then(idObj => res.status(201).json({ noteId: idObj[0] }))
    .catch(err => res.status(500).json(err));
});
module.exports = router;
