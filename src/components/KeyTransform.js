import AFRAME from 'aframe';
import { sendMessage } from '../MessageManager';

const config = {};

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
          sendMessage('PROJECTOR_CONFIG', config);
          // console.log('cam rot y: ' + this.el.object3D.rotation.y);
          break;
        case 'ArrowLeft':
          this.el.object3D.rotation.y += moveVal;
          config.yaxis = this.el.object3D.rotation.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        default: break;
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
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'ArrowDown':
          this.el.object3D.rotation.x += moveVal;
          config.xaxis = this.el.object3D.rotation.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        default: break;
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
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case '+':
          this.el.object3D.position.z -= 0.1;
          config.zoom = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case '_':
          this.el.object3D.position.z += 0.1;
          config.zoom = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case '-':
          this.el.object3D.position.z += 1;
          config.zoom = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        default: break;
      }
    });
  },
});

AFRAME.registerComponent('key-translate', {
  init() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'w':
          this.el.object3D.position.z -= 1;
          config.zpos = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'W':
          this.el.object3D.position.z -= 0.03;
          config.zpos = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'S':
          this.el.object3D.position.z += 0.03;
          config.zpos = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 's':
          this.el.object3D.position.z += 1;
          config.zpos = this.el.object3D.position.z;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'a':
          this.el.object3D.position.x -= 1;
          config.xpos = this.el.object3D.position.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'A':
          this.el.object3D.position.x -= 0.03;
          config.xpos = this.el.object3D.position.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'D':
          this.el.object3D.position.x += 0.03;
          config.xpos = this.el.object3D.position.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'd':
          this.el.object3D.position.x += 1;
          config.xpos = this.el.object3D.position.x;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'e':
          this.el.object3D.position.y -= 1;
          config.ypos = this.el.object3D.position.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'E':
          this.el.object3D.position.y -= 0.03;
          config.ypos = this.el.object3D.position.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'q':
          this.el.object3D.position.y += 1;
          config.ypos = this.el.object3D.position.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        case 'Q':
          this.el.object3D.position.y += 0.03;
          config.ypos = this.el.object3D.position.y;
          // console.log(config);
          sendMessage('PROJECTOR_CONFIG', config);
          break;
        default: break;
      }
    });
  },
});
