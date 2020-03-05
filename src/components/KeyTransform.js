import AFRAME from 'aframe';
import { sendMessage, addMessageListener } from '../MessageManager';

const config = { fov: 80 };
let id = 1;
// All components go here
AFRAME.registerComponent('key-rotate-x', {
  isMouseDown: false,
  init() {
    document.addEventListener('keydown', (e) => {
      const moveVal = e.shiftKey ? 0.001 : 0.01;
      switch (e.key) {
        case 'ArrowRight':
          this.el.object3D.rotation.y -= moveVal;
          config.yaxis = this.el.object3D.rotation.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          // console.log('cam rot y: ' + this.el.object3D.rotation.y);
          break;
        case 'ArrowLeft':
          this.el.object3D.rotation.y += moveVal;
          config.yaxis = this.el.object3D.rotation.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        default: break;
      }
    });

    addMessageListener('PROJECTOR_CONFIG_LOAD', (c) => {
      if (c.yaxis) {
        config.yaxis = c.yaxis;
        this.el.object3D.rotation.y = config.yaxis;
      }
    });
  },
});

AFRAME.registerComponent('key-rotate-y', {
  isMouseDown: false,
  init() {
    document.addEventListener('keydown', (e) => {
      const moveVal = e.shiftKey ? 0.001 : 0.01;
      switch (e.key) {
        case 'ArrowUp':
          this.el.object3D.rotation.x -= moveVal;
          config.xaxis = this.el.object3D.rotation.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'ArrowDown':
          this.el.object3D.rotation.x += moveVal;
          config.xaxis = this.el.object3D.rotation.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        default: break;
      }
    });

    addMessageListener('PROJECTOR_CONFIG_LOAD', (c) => {
      if (c.xaxis) {
        config.xaxis = c.xaxis;
        this.el.object3D.rotation.x = config.xaxis;
      }
    });
  },
});

AFRAME.registerComponent('key-rotate-z', {
  isMouseDown: false,
  init() {
    document.addEventListener('keydown', (e) => {
      const moveVal = e.shiftKey ? 0.001 : 0.01;
      switch (e.key) {
        case ',':
          this.el.object3D.rotation.z -= moveVal;
          config.zaxis = this.el.object3D.rotation.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case '.':
          this.el.object3D.rotation.z += moveVal;
          config.zaxis = this.el.object3D.rotation.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case '<':
          this.el.object3D.rotation.z -= moveVal;
          config.zaxis = this.el.object3D.rotation.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case '>':
          this.el.object3D.rotation.z += moveVal;
          config.zaxis = this.el.object3D.rotation.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        default: break;
      }
    });

    addMessageListener('PROJECTOR_CONFIG_LOAD', (c) => {
      if (c.zaxis) {
        config.zaxis = c.zaxis;
        this.el.object3D.rotation.z = config.zaxis;
      }
    });
  },
});

AFRAME.registerComponent('key-zoom', {
  init() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case '=':
          this.el.object3D.position.z -= 1;
          config.zoom = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case '+':
          this.el.object3D.position.z -= 0.1;
          config.zoom = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case '_':
          this.el.object3D.position.z += 0.1;
          config.zoom = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case '-':
          this.el.object3D.position.z += 1;
          config.zoom = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case '[':
          config.fov -= 1;
          this.el.setAttribute('fov', config.fov);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case ']':
          config.fov += 1;
          this.el.setAttribute('fov', config.fov);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        default: break;
      }
    });

    addMessageListener('PROJECTOR_CONFIG_LOAD', (c) => {
      if (c.zoom) {
        config.zoom = c.zoom;
        this.el.object3D.position.z = config.zoom;
      }

      if (c.fov) {
        config.fov = c.fov;
        this.el.setAttribute('fov', config.fov);
      }
    });
  },
});

AFRAME.registerComponent('key-translate', {
  schema: {
    pid: {type: 'int', default: 1}
  },
  init() {
    console.log(this.data.pid);
    id = this.data.pid;
    sendMessage('LOAD_PROJECTOR', { id });
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'w':
          this.el.object3D.position.z -= 1;
          config.zpos = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'W':
          this.el.object3D.position.z -= 0.03;
          config.zpos = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'S':
          this.el.object3D.position.z += 0.03;
          config.zpos = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 's':
          this.el.object3D.position.z += 1;
          config.zpos = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'a':
          this.el.object3D.position.x -= 1;
          config.xpos = this.el.object3D.position.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'A':
          this.el.object3D.position.x -= 0.03;
          config.xpos = this.el.object3D.position.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'D':
          this.el.object3D.position.x += 0.03;
          config.xpos = this.el.object3D.position.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'd':
          this.el.object3D.position.x += 1;
          config.xpos = this.el.object3D.position.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'e':
          this.el.object3D.position.y -= 1;
          config.ypos = this.el.object3D.position.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'E':
          this.el.object3D.position.y -= 0.03;
          config.ypos = this.el.object3D.position.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'q':
          this.el.object3D.position.y += 1;
          config.ypos = this.el.object3D.position.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        case 'Q':
          this.el.object3D.position.y += 0.03;
          config.ypos = this.el.object3D.position.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', { id, config });
          break;
        default: break;
      }
    });

    addMessageListener('PROJECTOR_CONFIG_LOAD', (c) => {
      //play vids
      document.querySelector('#layer-2-vid').play();
      document.querySelector('#layer-3-vid').play();
      document.querySelector('#layer-4-vid').play();

      document.querySelector('#wall-vid-1').play();
      document.querySelector('#wall-vid-2').play();

      if (c.ypos) {
        config.ypos = c.ypos;
        this.el.object3D.position.y = config.ypos;
      }

      if (c.xpos) {
        config.xpos = c.xpos;
        this.el.object3D.position.x = config.xpos;
      }

      if (c.zpos) {
        config.zpos = c.zpos;
        this.el.object3D.position.z = config.zpos;
      }
    });
  },
});
