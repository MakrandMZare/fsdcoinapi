// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     const { type, productId } = JSON.parse(message);
//     if (type === 'subscribe') {
//       ws.send(JSON.stringify({
//         type: 'subscribe',
//         channels: [{ name: 'ticker', product_ids: [productId] }]
//       }));
//     }
//   });
// });

// server.listen(3000, () => {
//   console.log('Server started on port 3000');
// });








const express = require("express");
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});