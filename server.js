//Set up Server configuration:

//import dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const NotesRoutes = require("./routes/LambdaNotesRoutes.js");
const UsersRoutes = require("./routes/UsersRoutes.js");

//initialize server
const server = express();

//apply middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/", NotesRoutes);
server.use("/api/users/", UsersRoutes);

module.exports = server;
