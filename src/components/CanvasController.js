import AFRAME from 'aframe';
import { addMessageListener } from '../MessageManager';

class MatCircle {
  constructor(id, x, y, steps) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.stepCount = steps; // use this to grow radius, have multiple r for each level
    this.layer0ValTarget = this.stepCount / 100;
    this.layer0Val = 0;
    this.layer1ValTarget = 0;
    this.layer1Val = 0;
  }

  update(dt) {
    this.layer0ValTarget = this.stepCount / 100;
    // console.log(this.layer0ValTarget);
    // this.layer0Val += (this.layer0ValTarget - this.layer0Val) * dt * 2;
    this.layer0Val = 0.2; //this.layer0ValTarget;
  }
}

// All components go here
AFRAME.registerComponent('canvas-controller', {
  layer0: null,
  layer1: null,
  layer2: { canvas: null, ctx: null },
  // mats: [new MatCircle(0, 0.5, 0.5, 0)],
  mats: [],
  init() {
    this.layer0 = document.querySelector('#layer-0');
    this.layer1 = document.querySelector('#layer-1');
    this.prevTime = Date.now();

    addMessageListener('MAT_STATE', (matData) => {
      if (this.mats.length < 1) {
        this.mats = matData.map((m) => new MatCircle(m.id, m.x, m.y, m.stepCount));
      } else {
        matData.forEach((m) => {
          this.mats[m.id].x = m.x;
          this.mats[m.id].y = m.y;
          // add steps
          this.mats[m.id].stepCount = m.stepCount;
        });
      }
    });
  },

  tick() {
    const currentTime = Date.now();
    const dt = (currentTime - this.prevTime) / 1000;
    this.prevTime = currentTime;

    // update and apply mat vals
    this.mats.forEach((m) => {
      m.update(dt);
      const v0 = this.layer0.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      v0.x = m.x;
      v0.y = m.y;
      console.log(m.x, m.y, m.layer0Val);
      v0.z = m.layer0Val;

      const v1 = this.layer1.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      v1.x = m.x;
      v1.y = m.y;
      v0.z = m.layer1Val;
    });
  },
});
