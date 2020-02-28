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

// Set up a new output.
const output = new midi.Output();

// // Open the first available output port.
output.openPort(1);

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
s.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    let prevVal = 0;
    sock.on('data', function(data) {
        // console.log('DATA ' + sock.remoteAddress + ': ' + data);
        const dataString = '' + data; // hacky
        // console.log(dataString[0]);
        if (dataString[0] === 'c') {
          const capVal = dataString.split('-')[1];
          // console.log(capVal);
          if (capVal - prevVal > 400) {
            // console.log(capVal - prevVal);
            output.openPort(1);
            output.sendMessage(genMessage(cue));
            output.closePort();
            console.log(cue);
            cue += 1;
            if (cue > 3) cue = 1;
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
