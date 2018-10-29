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
module.exports = router;
