const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const app = express();
const { Server } = require("socket.io")
const server = http.createServer(app);
const socketIo = require("socket.io");
// const io = socketIo(server, { path: "/sockets" });

const io = new Server(server,{
	cors: {
		origin: "http://localhost:5173",
	}
})
const { Pool } = require("pg");

////routes
const openaiRoute = require("./routes/OpenAI");
const fastapiRoute = require("./routes/FastAPI");

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

app.use("/openai", openaiRoute);

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
  console.log(`Server is running on port`);
});

server.listen(5000, () => {console.log("running on 5000")})
