//Initial set up
const express = require("express");
const router = express.Router();
const db = require("../data/usersData.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Set up Authentication config
const secret = require("./keys.js").key;

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
    return;
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
        .catch(err => res.status(500).json({ error: err }));
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/login", (req, res) => {
  const creds = req.body;
  if (!creds.username || !creds.password) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }
  console.log(creds);
  db.getUserByUsername(creds.username)
    .then(user => {
      console.log("User was found in DB");
      console.log("here is the user:");
      console.log(user);
      console.log("the comparison was: ");

      if (user && bcrypt.compareSync(creds.password, user.password)) {
        console.log("inside if statement");

        const token = generateToken(user);
        console.log(token);
        res.status(200).json({ username: user.username, token });
      } else {
        console.log("There was something wrong with the BCRYPT comparison");
        res.status(500).json({ error: "There was an error logging in" });
      }
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  console.log("inside generateToken function");
  console.log(user);
  const payload = {
    ...user
  };
  const options = { expiresIn: "1h" };
  console.log("console loggin the token");
  const token = jwt.sign(payload, secret, options);
  console.log(token);
  return token;
}

module.exports = router;
