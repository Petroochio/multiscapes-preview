let socket;
const listeners = [];
export const init = () => {
  socket = new WebSocket('ws://localhost:5000');

  // Connection opened
  socket.addEventListener('open', (event) => {
    // socket.send('Hello Server!');
  });

  // Listen for messages
  socket.addEventListener('message', (event) => {
    // console.log('Message from server ', event.data.split('m'));
    // if (event.data[0])
    const message = JSON.parse(event.data);
    console.log(message);
    listeners.forEach(({ type, l }) => {
      if (message.type === type) l(message.data);
    });
  });
};

export const sendMessage = (type, data) => {
  socket.send(JSON.stringify({ type, data }));
};

export const addMessageListener = (msgType, listener) => {
  listeners.push({ type: msgType, l: listener });
};
