const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
console.log('ws go!');
// TCP for thing
var net = require('net');

var s = net.createServer();
s.listen(1337, '192.168.0.3');

let sockets = [];

s.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        // console.log('DATA ' + sock.remoteAddress + ': ' + data);
        const dataString = '' + data; // hacky
        // console.log(dataString[0]);
        if (dataString[0] === 'c') {
          const capVal = parseInt(dataString.split('-')[1]);
          // console.log(capVal);
          if (capVal > 2500) {
            wss.clients.forEach(c => c.send('CAP_HIGH'));
          } else {
            wss.clients.forEach(c => c.send('CAP_LOW'));
          }
        }

        if (dataString[0] === 'p') {
          const pVal = parseInt(dataString.split('-')[1]);
          console.log(pVal);
        }
        // Write the data back to all the connected, the client will receive it as data from the server
        // sockets.forEach(function(sock, index, array) {
        //     sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        // });
    });
});
console.log('tcp go!');
