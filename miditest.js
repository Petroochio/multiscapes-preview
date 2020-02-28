const midi = require('midi');
const msc = require('midi-show-control');

const testMSG = msc.buildMessage({
  deviceId: 1,
  commandFormat: "lighting.general",
  command: "go",
  cue: "1",
  // cueList: "3.1",
  // cuePath: "1.9"
});

// Set up a new output.
const output = new midi.Output();

// Count the available output ports.
// console.log(output.getPortName(0), '-----', output.getPortName(1), output.getPortName(2));

// // Get the name of a specified output port.
// ;

// // Open the first available output port.
output.openPort(1);

// // Send a MIDI message.
// output.sendMessage();
output.sendMessage(testMSG);

// // Close the port when done.
output.closePort();
