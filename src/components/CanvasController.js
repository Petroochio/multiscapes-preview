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

  maxTargets() {
    this.isMaxed = true;
    this.layer0ValTarget = 1.0;
    this.layer1ValTarget = 1.0;
    this.layer2ValTarget = 1.0;
    this.layer3ValTarget = 1.0;
  }

  update(dt) {
    if (!this.isMaxed) this.layer0ValTarget = 0.02 + this.stepCount / 200;
    // console.log(this.layer0ValTarget);
    this.layer0Val += (this.layer0ValTarget - this.layer0Val) * dt * 0.9;
    // this.layer0Val = this.layer0ValTarget;
    // this.layer0Val = 0.02;

    if (this.stepCount > 100) {
      if (!this.isMaxed) this.layer1ValTarget = 0.02 + this.stepCount / 400;
      this.layer1Val += (this.layer1ValTarget - this.layer1Val) * dt * 0.9;
    }

    if (this.stepCount > 200) {
      if (!this.isMaxed) this.layer2ValTarget = 0.02 + this.stepCount / 550;
      this.layer2Val += (this.layer2ValTarget - this.layer2Val) * dt * 0.9;
    }

    if (this.stepCount > 300) {
      if (!this.isMaxed) this.layer3ValTarget = 0.02 + this.stepCount / 650;
      this.layer3Val += (this.layer3ValTarget - this.layer3Val) * dt * 0.9;
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
  // mats: [new MatCircle(0, 0.5, 0.5, 0)],
  mats: [],
  init() {
    this.layer0 = document.querySelector('#layer-0');
    this.layer1 = document.querySelector('#layer-1');
    this.layer2 = document.querySelector('#layer-2');
    this.layer3 = document.querySelector('#layer-3');
    this.wallLayer0 = document.querySelector('#wall-layer-0');
    this.wallLayer1 = document.querySelector('#wall-layer-1');
    this.wallLayer2 = document.querySelector('#wall-layer-2');
    this.wallLayer3 = document.querySelector('#wall-layer-3');
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

    addMessageListener('TRIGGER_END', () => {
      this.mats.forEach((m) => m.maxTargets());
    });

    addMessageListener('STOP_PROJECTIONS', () => {
      this.layer0.setAttribute('material', 'shader: flat; color: black;');
      this.wallLayer0.setAttribute('material', 'shader: flat; color: black;');

      this.layer1.setAttribute('material', 'shader: flat; color: black;');
      this.wallLayer1.setAttribute('material', 'shader: flat; color: black;');


      this.layer2.setAttribute('material', 'shader: flat; color: black;');
      this.wallLayer2.setAttribute('material', 'shader: flat; color: black;');


      this.layer3.setAttribute('material', 'shader: flat; color: black;');
      this.wallLayer3.setAttribute('material', 'shader: flat; color: black;');
    });
  },

  tick() {
    const currentTime = Date.now();
    const dt = (currentTime - this.prevTime) / 1000;
    this.prevTime = currentTime;

    const totalSteps = this.mats.reduce((total, m) => total + m.stepCount);
    if (!this.panel1Active && totalSteps > 200) {
      this.panel1Active = true;
      document.querySelector('#wall-panel-1').setAttribute('material', 'shader: flat; src: #wall-vid-1');
    } else if (!this.panel2Active && totalSteps > 350) {
      this.panel2Active = true;
      document.querySelector('#wall-panel-2').setAttribute('material', 'shader: flat; src: #wall-vid-2');
    }

    // update and apply mat vals
    this.mats.forEach((m) => {
      m.update(dt);
      const v0 = this.layer0.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      const wv0 = this.wallLayer0.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      v0.x = m.x;
      v0.y = m.y;
      v0.z = m.layer0Val;
      wv0.x = m.x;
      wv0.y = m.y;
      wv0.z = m.layer0Val;

      const v1 = this.layer1.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      const wv1 = this.wallLayer1.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      v1.x = m.x;
      v1.y = m.y;
      v1.z = m.layer1Val;
      wv1.x = m.x;
      wv1.y = m.y;
      wv1.z = m.layer1Val;

      const v2 = this.layer2.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      const wv2 = this.wallLayer2.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      v2.x = m.x;
      v2.y = m.y;
      v2.z = m.layer2Val;
      wv2.x = m.x;
      wv2.y = m.y;
      wv2.z = m.layer2Val;

      const v3 = this.layer3.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      const wv3 = this.wallLayer3.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      v3.x = m.x;
      v3.y = m.y;
      v3.z = m.layer3Val;
      wv3.x = m.x;
      wv3.y = m.y;
      wv3.z = m.layer3Val;
    });
  },
});
