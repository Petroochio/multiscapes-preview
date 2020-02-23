const midi = require('midi');
 
// Set up a new output.
const output = new midi.Output();
 
// Count the available output ports.
console.log(output.getPortName(0), "-----",output.getPortName(1));
 
// // Get the name of a specified output port.
// ;
 
// // Open the first available output port.
output.openPort(1);
 
// // Send a MIDI message.
output.sendMessage([144, 1, 127]);
 
// // Close the port when done.
output.closePort();