//Initial set up
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello world");
});

router.get("/notes", (req, res) => {
  res.json({ testing: "here are thee notes" });
});
module.exports = router;
