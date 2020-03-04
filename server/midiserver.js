/* eslint-disable */
const midi = require('midi');
const msc = require('midi-show-control');

function genMessage(cueNum) {
  return msc.buildMessage({
    deviceId: 1,
    commandFormat: "lighting.general",
    command: "go",
    cue: cueNum,
  });
}

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000 });
// add broadcast func
wss.broadcast = function broadcast(msg) {
  console.log(msg);
  wss.clients.forEach(function each(client) {
      client.send(msg);
   });
};

let threshold = 650;
let threshold2 = 650;

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const m = JSON.parse(message);
    switch (m.type) {
      case 'SET_THRESHOLD_1':
        threshold = m.data;
        break;
      case 'SET_THRESHOLD_2':
        threshold = m.data;
        break;
      default: break;
    }
  });
});

// Set up a new output.
const output = new midi.Output();

// // Open the first available output port.
// output.openPort(1);

// // Send a MIDI message.
// output.sendMessage();

// // Close the port when done.
// output.closePort();

// TCP for thing
var net = require('net');

var s = net.createServer((sock) => {
  sock.on('error', (e) => console.log(e));
  // sock.end('goodbye\n')
});

let sockets = [];

let cue = 1;
const cueStart = 11;
const numCues = 9;
const DEBOUNCE = 20000;
let lastTime = Date.now();
s.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    sock.on('error', (e) => { console.log(e) });

    let prevVal = 0;
    sock.on('data', function(data) {
        // console.log('DATA ' + sock.remoteAddress + ': ' + data);
        const dataString = '' + data; // hacky
        // console.log(dataString[0]);
        if (dataString[0] === 'c') {
          if (dataString.length < 2) return;

          const capVal = dataString.split('-')[1];
          // console.log(capVal);
          // console.log(capVal);
          let currentTime = Date.now();
          if (capVal - prevVal > threshold && lastTime + DEBOUNCE < currentTime) {
            // console.log(capVal - prevVal);
            output.openPort(1);
            output.sendMessage(genMessage(Math.round(numCues * Math.random() + cueStart)));
            output.closePort();
            console.log('Do cue ', Math.round(numCues * Math.random() + cueStart), 'Threshold: ', threshold, capVal - prevVal);
            lastTime = currentTime;
          }
          prevVal = capVal;
          // if (capVal > 2500) {
          //   wss.clients.forEach(c => c.send('CAP_HIGH'));
          // } else {
          //   wss.clients.forEach(c => c.send('CAP_LOW'));
          // }
        }
        // Write the data back to all the connected, the client will receive it as data from the server
        // sockets.forEach(function(sock, index, array) {
        //     sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        // });
    });
});

s.on('error', (e) => {
  console.log(e);
});

s.listen(1337, '192.168.0.11');
console.log('tcp go!');

// loop
