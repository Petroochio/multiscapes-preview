import AFRAME from 'aframe';

// All components go here
AFRAME.registerComponent('key-rotate-x', {
  isMouseDown: false,
  init() {
    document.addEventListener('keydown', (e) => {
      const moveVal = e.shiftKey ? 0.001 : 0.01;
      switch (e.key) {
        case 'ArrowRight':
          this.el.object3D.rotation.y -= moveVal;
          console.log('cam rot y: ' + this.el.object3D.rotation.y);
          break;
        case 'ArrowLeft':
          this.el.object3D.rotation.y += moveVal;
          console.log('cam rot y: ' + this.el.object3D.rotation.y);
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
          console.log('cam rot x: ' + this.el.object3D.rotation.x);
          break;
        case 'ArrowDown':
          this.el.object3D.rotation.x += moveVal;
          console.log('cam rot x: ' + this.el.object3D.rotation.x);
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
          console.log('cam zoom: ' + this.el.object3D.position.z);
          break;
        case '+':
          this.el.object3D.position.z -= 0.1;
          console.log('cam zoom: ' + this.el.object3D.position.z);
          break;
        case '_':
          this.el.object3D.position.z += 0.1;
          console.log('cam zoom: ' + this.el.object3D.position.z);
          break;
        case '-':
          this.el.object3D.position.z += 1;
          console.log('cam zoom: ' + this.el.object3D.position.z);
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
          console.log('base pos z: ' + this.el.object3D.position.z);
          break;
        case 'W':
          this.el.object3D.position.z -= 0.03;
          console.log('base pos z: ' + this.el.object3D.position.z);
          break;
        case 'S':
          this.el.object3D.position.z += 0.03;
          console.log('base pos z: ' + this.el.object3D.position.z);
          break;
        case 's':
          this.el.object3D.position.z += 1;
          console.log('base pos z: ' + this.el.object3D.position.z);
          break;
        case 'a':
          this.el.object3D.position.x -= 1;
          console.log('base pos x: ' + this.el.object3D.position.x);
          break;
        case 'A':
          this.el.object3D.position.x -= 0.03;
          console.log('base pos x: ' + this.el.object3D.position.x);
          break;
        case 'D':
          this.el.object3D.position.x += 0.03;
          console.log('base pos x: ' + this.el.object3D.position.x);
          break;
        case 'd':
          this.el.object3D.position.x += 1;
          console.log('base pos x: ' + this.el.object3D.position.x);
          break;
        case 'e':
          this.el.object3D.position.y -= 1;
          console.log('base pos y: ' + this.el.object3D.position.y);
          break;
        case 'E':
          this.el.object3D.position.y -= 0.03;
          console.log('base pos y: ' + this.el.object3D.position.y);
          break;
        case 'q':
          this.el.object3D.position.y += 1;
          console.log('base pos y: ' + this.el.object3D.position.y);
          break;
        case 'Q':
          this.el.object3D.position.y += 0.03;
          console.log('base pos y: ' + this.el.object3D.position.y);
          break;
        default: break;
      }
    });
  },
});
