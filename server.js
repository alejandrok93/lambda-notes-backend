//Set up Server configuration:

//import dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//initialize server
const server = express();

//apply middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

//routes

module.exports = server;
