//Initial set up
const express = require("express");
const router = express.Router();
const db = require("../data/usersData.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").load();

//Set up Authentication config
const secret = require("./keys.js").key;
const key = process.env_SECRET_KEY;
console.log(key);
//Import middleware
const middleware = require("./middleware.js");

router.get("/", (req, res) => {
  db.get()
    .then(users => res.send(users))
    .catch(err => res.send(err));
});

router.post("/register", (req, res) => {
  const user = req.body;

  if (!user.username || !user.password) {
    res.status(400).json({ error: "Bad Request" });
  }
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  db.insert(user)
    .then(idObj => {
      const id = idObj[0];
      db.getUserById(id)
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ username: user.username, token });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  const creds = req.body;
  if (!creds.username || !creds.password) {
    res.status(400).json({ error: "Bad Request" });
  }
  db.getUserByUsername(creds.username)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ username: user.username, token });
      } else res.status(500).json({ error: "There was an error logging in" });
    })
    .catch(err => res.status(500).json(err));
});

const generateToken = user => {
  const payload = {
    ...user
  };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

module.exports = router;
