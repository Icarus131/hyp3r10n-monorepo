const axios = require("axios");
const express = require("express");
const http = require("http");

const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const blackList = new Set();
let blackListSize = blackList.size;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const testFastReq = async (req, res) => {
  try {
    console.log("got in Fast");
    const response = await axios.get("http://localhost:8080/");
    console.log("res from fastapi-->", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", moreInfo: error.message });
  }
};

const sum = async (req, res) => {
  try {
    const { x, y } = req.query;
    if (!x || !y) {
      return res.status(400).json({ error: "Missing parameters" });
    }
    const response = await axios.get(`http://localhost:8080/sum?x=${x}&y=${y}`);
    console.log("res from fastapi-->", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", moreInfo: error.message });
  }
};

const predict = async (req, res) => {
  try {
    const data = req.body;
    const ipAddress = data.IP.toLowerCase(); 
    if (blackList.has(ipAddress)) {
      return res.status(418).json({ Result: "You dirty attacker 👀" });
    }

    const startTime = new Date();
    const response = await axios.post("http://localhost:8080/predict", data);
    const endTime = new Date();
    const latency = endTime - startTime;

    const predictionResult = response.data.Result; 
    if (predictionResult !== "Benign") {
      blackList.add(ipAddress.toLowerCase()); 
      io.emit("blocked_message", ipAddress); 
      return res
        .status(418)
        .json({ Result: "You have been added to watchlist 👀" });
    }

    console.log("Response:", response.data);
    res.status(200).json({ Result: response.data, latency: latency });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", moreInfo: error.message });
  }
};

module.exports = { testFastReq, sum, predict };
