window.onload = () => {
  const stage = document.querySelector('#stage');
  const camera = document.querySelector('#camera');

  const socket = new WebSocket('ws://localhost:5000');

  // Connection opened
  socket.addEventListener('open', function (event) {
      socket.send('Hello Server!');
  });
  const name = 2;
  name = 3;

  // Listen for messages
  socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data.split('m'));
    // if (event.data[0])
  });
}