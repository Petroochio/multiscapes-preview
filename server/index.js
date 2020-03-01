/* eslint-disable */
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const PressureMat = require('./PressureMat');

const mats = [];
for (let i = 0; i < 16; i++) {
  mats.push(new PressureMat(i));
}

function saveMats() {
  fs.writeFile('mat_placement.txt', JSON.stringify(mats), function (err) {
    if (err) return console.log(err);
    console.log('saved mats');
  });
}

// load mats
fs.readFile('mat_placement.txt', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  JSON.parse(data).forEach((m) => {
    mats[m.id].x = m.x;
    mats[m.id].y = m.y;
  });
});

const wss = new WebSocket.Server({ port: 5000 });
// add broadcast func
wss.broadcast = function broadcast(msg) {
  console.log(msg);
  wss.clients.forEach(function each(client) {
      client.send(msg);
   });
};

wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify({ type: 'MAT_STATE', data: mats }));

  ws.on('message', function incoming(message) {
    const m = JSON.parse(message);
    switch (m.type) {
      case 'PROJECTOR_CONFIG':
        console.log(m.data);
        break;
      case 'MAT_PLACEMENT':
        console.log(m.data.x, m.data.y);
        mats[m.data.id].setPos(m.data.x, m.data.y);
        // save
        saveMats();
        // send update
        wss.broadcast(JSON.stringify({ type: 'MAT_STATE', data: mats }));
        break;
      default: break;
    }
  });
});
console.log('ws go!');
// TCP for thing
var net = require('net');

// var s = net.createServer();
// s.listen(1337, '192.168.0.11');

// let sockets = [];

// s.on('connection', function(sock) {
//     console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
//     sockets.push(sock);

//     let prevVal = 0;
//     sock.on('data', function(data) {
//         // console.log('DATA ' + sock.remoteAddress + ': ' + data);
//         const dataString = '' + data; // hacky
//         // console.log(dataString[0]);
//         if (dataString[0] === 'c') {
//           const capVal = dataString.split('-')[1];
//           // console.log(capVal);
//           if (capVal - prevVal > 400) console.log(capVal - prevVal);
//           prevVal = capVal;
//           // if (capVal > 2500) {
//           //   wss.clients.forEach(c => c.send('CAP_HIGH'));
//           // } else {
//           //   wss.clients.forEach(c => c.send('CAP_LOW'));
//           // }
//         }

//         if (dataString[0] === 'p') {
//           const pVal = dataString.split('-')[1];
//           console.log(pVal);
//         }
//         // Write the data back to all the connected, the client will receive it as data from the server
//         // sockets.forEach(function(sock, index, array) {
//         //     sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
//         // });
//     });
// });

// sock.on('error', )
console.log('tcp go!');

// loop
