const mqtt = require("mqtt");
const { exec } = require("child_process");
const fs = require("fs");
const os = require('os');

// const brokerUrl = "mqtt://172.19.0.2:1883"; // Replace with your MQTT broker address
const brokerUrl = "mqtt://broker.hivemq.com";
let DEVICE_TOPIC;
let DEVICE_TOPIC_RECV;
let FILE_PATH;
const csv = require("csv-parser");

const client = mqtt.connect(brokerUrl);
let jsonDataArray = [];
function readCsvFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                jsonDataArray.push(row);
            })
            .on("end", () => {
                console.log("CSV file processed");
                resolve();
            })
            .on("error", (error) => {
                reject(error);
            });
    });
}
fs.readFile("config.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  try {
    const topics = JSON.parse(data);
    DEVICE_TOPIC = topics.DEVICE_TOPIC;
    DEVICE_TOPIC_RECV = topics.DEVICE_TOPIC_RECV;
    FILE_PATH = topics.FILE_PATH;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});

client.on("connect", () => {
  console.log("Connected Finally Bro !");
  client.subscribe(DEVICE_TOPIC);
  client.subscribe(DEVICE_TOPIC_RECV);
  const jsonData = {
    title: "PSH",
    time: Date.now().toString(),
  };
  const message = JSON.stringify(jsonData);
  client.publish(DEVICE_TOPIC, message);
});

client.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log(data);
  if (data?.title === "ACK") {
    console.log(
      `Received ACK from listener for Device ${DEVICE_TOPIC}, executing command...`
    );
    // Execute command to build Docker image

    exec("docker build -t device-software .", (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Command execution error for Device ${DEVICE_TOPIC}: ${error.message}`
        );
        return;
      }
      if (stderr) {
        console.error(`Command stderr for Device ${DEVICE_TOPIC}: ${stderr}`);
        client.publish(DEVICE_TOPIC, JSON.stringify({}));
        readCsvFile(FILE_PATH)
        publishMessagesWithDelay(1500)
        return;
    }
    
      console.log(`Command stdout for Device : ${stdout}`);
      //   startSendingLogs();
    });
  }
});

client.on("error", (err) => {
  console.error("MQTT error:", err);
});

client.on("close", () => {
  console.log("Connection to MQTT broker closed");
});

client.on("offline", () => {
  console.log("MQTT client is offline");
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function publishMessagesWithDelay(delay) {
    for (let i = 0; i < jsonDataArray.length; i++) {
        // Get IP address
        let ip = getIpAddress() || "";
        // Construct message
        const outMessage = { ...jsonDataArray[i], title: "LOG", IP: ip };
        delete outMessage['label']
        // Publish message to MQTT topic
        client.publish(DEVICE_TOPIC, JSON.stringify(outMessage));
        // Wait for the specified delay (in milliseconds)
        await sleep(delay);
        console.log("Message published:", outMessage);
    }
}

function getIpAddress() {
    const networkInterfaces = os.networkInterfaces();
    let ipAddress;

    // Iterate over each network interface
    Object.keys(networkInterfaces).forEach((interfaceName) => {
        const interfaces = networkInterfaces[interfaceName];
        interfaces.forEach((iface) => {
            // Filter out internal and IPv6 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                ipAddress = iface.address;
                return; // Exit the loop once the first non-internal IPv4 address is found
            }
        });
        if (ipAddress) return; // Exit the loop once the IP address is found
    });

    return ipAddress;
}

// Usage

