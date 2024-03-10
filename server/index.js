const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const socketIo = require("socket.io");

// const io = socketIo(server, { path: "/sockets" });
const mqtt = require("mqtt");
const brokerUrl = "mqtt://broker.hivemq.com";
const deviceTopics = ["D1", "D2", "D3", "D4", "D5"]; // Topics for each device
const axios = require('axios');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "testaccout33@gmail.com",
    pass: "rexmriznhrrkegcc",
  },
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const { Pool } = require("pg");

const fastapiRoute = require("./routes/FastAPI");

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Listener connected to MQTT broker");
  deviceTopics.forEach((topic) => {
    client.subscribe(topic); // Subscribe to topics for all devices
    console.log(topic, "DONE");
  });
});

client.on("message", (topic, message) => {
    const data = JSON.parse(message.toString());
    console.log(data);
	io.emit("receieve_message", data)
    const { title, time } = data;
    if (title == "PSH") {
      console.log(`Received message from Device ${topic}: ${message}`);
      // Send ACK back to device
      const outMessage = { title: "ACK", time: Date.now() };
      client.publish(`${topic}_RECV`, JSON.stringify(outMessage), () => {
        console.log(`ACK sent to Device ${topic}_RECV`);
      });
    } else if (title == "LOG") {
      console.log("got log");
      axios
        .post("http://localhost:8000/fastapi/predict", data)
        .then((response) => {
          console.log("Response from /fastapi/predict:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data to /fastapi/predict:", error);
        });
    }
  });
  
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

////endpoints
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("it brok 💀");
});

app.get("/", (req, res) => {
  res.status(200).send("Sup?");
});

app.post("/mail", (req, res) => {
  const mailOptions = {
    to: "acc088930@gmail.com", //The Embrione Mail comes here.
    subject: `Suspicious activity on tagged account`,
    text: JSON.stringify(req.body),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(200).json({
        message: JSON.stringify(error.message),
      });
    } else {
      // console.log("Email sent: " + info.response + Date.now());
      console.log("Mail Sent Successfully!");
      res.status(200).json({
        message: "Success! Message Sent! ",
      });
    }
    // res.json({name: 'This is the backendddd'})
  });
});


app.use("/fastapi", fastapiRoute);

////sockets
io.on("connection", (socket) => {
  console.log("A user connected to /sockets");

  socket.on("disconnect", () => {
    console.log("User disconnected from /sockets");
  });

  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
    // io.emit("chat message", msg);
  });
});

// const pool = new Pool({
//   user: "postgres",
//   password: "password",
//   host: "127.0.0.1",
//   port: 5432, // default Postgres port
//   database: "postgres",
// });

// Create table query
// const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS raw_logs_ingested (
//         log_id SERIAL,
//         time TIMESTAMPTZ NOT NULL,
//         level VARCHAR(255),
//         message TEXT,
//         resourceId VARCHAR(255),
//         traceId VARCHAR(255),
//         spanId VARCHAR(255),
//         commit VARCHAR(255),
//         metadata VARCHAR(255),
//         PRIMARY KEY(log_id, time)
//     );
// `;

// // Create hypertable query
// const createHypertableQuery = `
//     SELECT create_hypertable('raw_logs_ingested', 'time', if_not_exists => TRUE);
// `;

// // Create index queries
// const createIndexQueries = [
//   `CREATE INDEX IF NOT EXISTS idx_level ON raw_logs_ingested (level);`,
//   `CREATE INDEX IF NOT EXISTS idx_message_fulltext ON raw_logs_ingested USING GIN(to_tsvector('english', message));`,
//   `CREATE INDEX IF NOT EXISTS idx_resourceId ON raw_logs_ingested (resourceId);`,
// ];

// // Initialize database schema
// pool
//   .query(createTableQuery)
//   .then(() => pool.query(createHypertableQuery))
//   .then(() => Promise.all(createIndexQueries.map((query) => pool.query(query))))
//   .then(() => console.log("Database setup complete"))
//   .catch((error) => console.error("Error setting up database:", error));

////run server
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});

server.listen(7000, () => {
  console.log("Socket running on port 7000");
});
