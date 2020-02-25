import AFRAME from 'aframe';

// All components go here
AFRAME.registerComponent('stage-x-rotate', {
  isMouseDown: false,
  init() {
    document.addEventListener('mousedown', () => { this.isMouseDown = true; });
    document.addEventListener('mouseup', () => { this.isMouseDown = false; });
    document.addEventListener('mouseleave', () => { this.isMouseDown = false; });
    document.addEventListener('mousemove', (e) => {
      if (this.isMouseDown) {
        this.el.object3D.rotation.y -= e.movementX * 0.004;
      }
    });
  },
});

AFRAME.registerComponent('stage-y-rotate', {
  isMouseDown: false,
  init() {
    document.addEventListener('mousedown', () => { this.isMouseDown = true; });
    document.addEventListener('mouseup', () => { this.isMouseDown = false; });
    document.addEventListener('mouseleave', () => { this.isMouseDown = false; });
    document.addEventListener('mousemove', (e) => {
      if (this.isMouseDown) {
        this.el.object3D.rotation.x -= e.movementY * 0.004;

        if (this.el.object3D.rotation.x < -1.32) this.el.object3D.rotation.x = -1.32;
        if (this.el.object3D.rotation.x > 1.32) this.el.object3D.rotation.x = 1.32;
      }
    });
  },
});

AFRAME.registerComponent('camera-zoom', {
  zoom: 1,
  init() {
    document.addEventListener('wheel', (e) => {
      this.zoom += e.deltaY / 200;
      if (this.zoom < 0) this.zoom = 0;
      if (this.zoom > 1) this.zoom = 1;
      this.el.object3D.position.z = 30 + (100 * this.zoom);
    });
  },
});
