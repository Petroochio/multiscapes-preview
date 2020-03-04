import AFRAME from 'aframe';
import { addMessageListener } from '../MessageManager';

class MatCircle {
  constructor(id, x, y, steps) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.stepCount = steps; // use this to grow radius, have multiple r for each level
    this.layer0ValTarget = 0.02;
    this.layer0Val = 0.00000001;
    this.layer1ValTarget = 0.00000001;
    this.layer1Val = 0;
    this.layer2ValTarget = 0.00000001;
    this.layer2Val = 0;
    this.layer3ValTarget = 0.00000001;
    this.layer3Val = 0;
  }

  update(dt) {
    this.layer0ValTarget = 0.02 + this.stepCount / 200;
    // console.log(this.layer0ValTarget);
    this.layer0Val += (this.layer0ValTarget - this.layer0Val) * dt *0.9;
    // this.layer0Val = this.layer0ValTarget;
    // this.layer0Val = 0.02;

    if (this.stepCount > 100) {
      this.layer1ValTarget = 0.02 + this.stepCount / 400;
      this.layer1Val += (this.layer1ValTarget - this.layer1Val) * dt *0.9;
    } 

    if (this.stepCount > 200) {
      this.layer2ValTarget = 0.02 + this.stepCount / 550;
      this.layer2Val += (this.layer2ValTarget - this.layer2Val) * dt *0.9;
    } 

    if (this.stepCount > 300) {
      this.layer3ValTarget = 0.02 + this.stepCount / 650;
      this.layer3Val += (this.layer3ValTarget - this.layer3Val) * dt *0.9;
    } 
    // this.layer1ValTarget = this.stepCount / 500;
    // // console.log(this.layer0ValTarget);
    // this.layer1Val += (this.layer1ValTarget - this.layer1Val) * dt * 2;
    // this.layer0Val = this.layer0ValTarget;
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
    this.layer2 = document.querySelector('#layer-2');
    this.layer3 = document.querySelector('#layer-3');
    this.prevTime = Date.now();

    addMessageListener('MAT_STATE', (matData) => {
      console.log('mats');
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
      v0.z = m.layer0Val;

      const v1 = this.layer1.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      v1.x = m.x;
      v1.y = m.y;
      v1.z = m.layer1Val;

      const v2 = this.layer2.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      v2.x = m.x;
      v2.y = m.y;
      v2.z = m.layer2Val;

      const v3 = this.layer3.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      v3.x = m.x;
      v3.y = m.y;
      v3.z = m.layer3Val;
    });
  },
});
