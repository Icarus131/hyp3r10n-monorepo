const mqtt = require("mqtt");
const { exec } = require("child_process");
const fs = require('fs');

// const brokerUrl = "mqtt://172.19.0.2:1883"; // Replace with your MQTT broker address
const brokerUrl = "mqtt://broker.hivemq.com";
let DEVICE_TOPIC;
let DEVICE_TOPIC_RECV;


const client = mqtt.connect(brokerUrl);

fs.readFile('config.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
  
    try {
      const topics = JSON.parse(data);
      DEVICE_TOPIC = topics.DEVICE_TOPIC;
      DEVICE_TOPIC_RECV = topics.DEVICE_TOPIC_RECV;
  
    } catch (error) {
      console.error('Error parsing JSON:', error);
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
        startSendingLogs();
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

function startSendingLogs() {
  console.log("SENDING LOGS START HERE");
  const jsonData = {
    title: "LOG",
    time: Date.now().toString(),
  };
  const outMessage = JSON.stringify(jsonData);
  client.publish(DEVICE_TOPIC, outMessage);
}
