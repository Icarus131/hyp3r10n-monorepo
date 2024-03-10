// const fs = require('fs');
// const csv = require('csv-parser');

// // Path to your CSV file
// const filePath = 'output.csv';

// // Read the CSV file
// fs.createReadStream(filePath)
//   .pipe(csv())
//   .on('data', (row) => {
//     // Log the JSON representation of each row
//     console.log(JSON.stringify(row));
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });

const os = require('os');

// Get the network interfaces
const networkInterfaces = os.networkInterfaces();

// Iterate over each network interface
Object.keys(networkInterfaces).forEach((interfaceName) => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach((iface) => {
        // Filter out internal and IPv6 addresses
        if (iface.family === 'IPv4' && !iface.internal) {
            console.log(`Interface: ${interfaceName}, IP Address: ${iface.address}`);
        }
    });
});