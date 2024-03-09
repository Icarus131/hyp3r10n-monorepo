const express = require("express");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const app = express();
const port = 8000;
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.get("/", (req, res) => {
  res.status(200).send("Sup?");
});

app.listen(8000, () => {
  console.log(`Server is running on port`);
});
