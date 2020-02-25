import 'aframe';
import './shaders';
import './components';

window.onload = () => {
  const stage = document.querySelector('#stage');
  const camera = document.querySelector('#camera');

  const socket = new WebSocket('ws://localhost:5000');

  // Connection opened
  socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
  });

  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data.split('m'));
    // if (event.data[0])
  });
};
