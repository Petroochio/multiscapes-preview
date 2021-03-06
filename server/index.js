/* eslint-disable */
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const PressureMat = require('./PressureMat');

class Pillar {
  constructor(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.rot = 0;
  }

  set(p) {
    this.x = p.x;
    this.y = p.y;
    this.w = p.w;
    this.h = p.h;
    this.rot = p.rot;
  }
}

const pillars = [];
for (let i = 0; i < 10; i++) {
  pillars.push(new Pillar(i));
}

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

function savePillars() {
  fs.writeFile('pillars.txt', JSON.stringify(pillars), function (err) {
    if (err) return console.log(err);
    console.log('saved pillars');
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

fs.readFile('pillars.txt', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  JSON.parse(data).forEach((p) => {
    pillars[p.id].x = p.x;
    pillars[p.id].y = p.y;
    pillars[p.id].w = p.w;
    pillars[p.id].h = p.h;
    pillars[p.id].rot = p.rot;
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

let startTime = null;
const MAX_SECTION_TIME = 1200000; // make this bigger
let isInEnd = false;

wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify({ type: 'MAT_STATE', data: mats }));
  wss.broadcast(JSON.stringify({ type: 'PILLAR_STATE', data: pillars }));

  ws.on('message', function incoming(message) {
    const m = JSON.parse(message);
    switch (m.type) {
      case 'PROJECTOR_CONFIG':
        // fs.writeFile(`projector${m.data.id}.txt`, JSON.stringify(m.data.config), function (err) {
        //   if (err) return console.log(err);
        //   console.log('projector config ' + m.data.id);
        // });
        break;
      case 'BEGIN_SECTION':
        startTime = Date.now();
        isInEnd = false;
        wss.broadcast(JSON.stringify({ type: 'BEGIN', data: '' }));
        break;
      case 'STOP_SECTION':
        wss.broadcast(JSON.stringify({ type: 'END_PROJECTIONS', data: '' }));
        break;
      case 'LOAD_PROJECTOR':
        fs.readFile(`projector${m.data.id}.txt`, (err, conf) => {
          if (err) {
            console.error(err);
            return;
          }
          ws.send(JSON.stringify({ type: 'PROJECTOR_CONFIG_LOAD', data: JSON.parse(conf) }));
        });
        break;
      case 'SET_PILLAR':
        // console.log(m.data.x, m.data.y);
        pillars[m.data.id].set(m.data);
        // send update
        wss.broadcast(JSON.stringify({ type: 'PILLAR_STATE', data: pillars }));
        break;
      case 'SAVE_PILLARS':
        savePillars();
        break;
      case 'GET_PILLARS':
        // send update
        wss.broadcast(JSON.stringify({ type: 'PILLAR_STATE', data: pillars }));
        break;
      case 'MAT_PLACEMENT':
        console.log(m.data.x, m.data.y);
        mats[m.data.id].setPos(m.data.x, m.data.y);
        // save
        saveMats();
        // send update
        wss.broadcast(JSON.stringify({ type: 'MAT_STATE', data: mats }));
        break;
      case 'MAT_STEP':
        mats[m.data].addStep();
        // console.log('mat step')
        wss.broadcast(JSON.stringify({ type: 'MAT_STATE', data: mats }));
        break;
      case 'DO_END_TRIGGER':
        isInEnd = true;
        wss.broadcast(JSON.stringify({ type: 'TRIGGER_END', data: ' ' }));
        break;
      case 'DO_REFRESH':
        // mats[m.data].addStep();
        // console.log('mat step')
        mats.forEach((m) => {
          m.stepCount = 0;
        });
        isInEnd = false;
        startTime = null;
        wss.broadcast(JSON.stringify({ type: 'REFRESH', data: ' ' }));
        wss.broadcast(JSON.stringify({ type: 'MAT_STATE', data: mats }));
        break;
      default: break;
    }
  });
});
console.log('ws go!');
// TCP for thing
var net = require('net');

var s = net.createServer();

let sockets = [];

s.on('connection', function(sock) {
  console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
  sockets.push(sock);

  sock.on('error', () => console.log('got sock error'));

  let prevVal = 0;
  sock.on('data', function(data) {
    // console.log('DATA ' + sock.remoteAddress + ': ' + data);
    const dataString = '' + data; // hacky

    if (dataString[0] === 'p') {
      const id = parseInt(dataString.split('-')[1]);
      const pval = parseInt(dataString.split('-')[2]);
      if (pval === 1) {
        console.log('step ' + id);
        mats[id].addStep();
        wss.broadcast(JSON.stringify({ type: 'MAT_STATE', data: mats }));
      }

      if (startTime !== null && !isInEnd && startTime + MAX_SECTION_TIME < Date.now()) {
        isInEnd = true;
        wss.broadcast(JSON.stringify({ type: 'TRIGGER_END', data: ' ' }));
      }
    }
    // Write the data back to all the connected, the client will receive it as data from the server
    // sockets.forEach(function(sock, index, array) {
    //     sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
    // });
  });
});
0
s.on('error', (e) => {
  console.log(e);
});
// s.listen(1337, '192.168.0.17');
console.log('tcp go!');

// loop
