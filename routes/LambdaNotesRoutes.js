//Initial set up
const express = require("express");
const router = express.Router();
const db = require("../data/data.js");

//Import middleware
const { authenticate } = require("./middleware.js");

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
    return;
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
  console.log("\n CREATE NEW NOTE \n");
  const newNote = req.body;
  if (req.decoded) {
    newNote.user_id = req.decoded.id;
  }
  console.log(newNote);
  if (!newNote.title) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  db.insert(newNote)
    .then(idObj => res.status(201).json({ noteId: idObj[0] }))
    .catch(err => res.status(500).json(err));
});

router.put("/notes/:id", (req, res) => {
  const updatedNote = req.body;
  const id = req.params.id;
  if (!updatedNote.title || !id) {
    res.status(400).json({ error: "Bad Request" });
  } else {
    db.update(id, updatedNote)
      .then(idObj => {
        console.log(idObj);
        if (idObj > 0) {
          res.status(200).json({ messge: "Note was updated" });
        } else
          res
            .status(500)
            .json({ error: "There was an error updating the note" });
      })
      .catch(err => res.status(500).json(err));
  }
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }
  db.remove(id)
    .then(deletedRows => {
      if (deletedRows > 0) {
        res.status(202).json({ message: "Note was deleted" });
      } else
        res.status(500).json({ error: "There was an error deleting the note" });
    })
    .catch(err => res.status(500).json(err));
});
module.exports = router;
