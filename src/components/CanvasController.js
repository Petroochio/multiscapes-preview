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
    this.hasBegun = false;
    this.speed = 0.8;
  }

  reset() {
    this.layer0ValTarget = 0.02;
    this.layer0Val = 0.00000001;
    this.layer1ValTarget = 0.00000001;
    this.layer1Val = 0;
    this.layer2ValTarget = 0.00000001;
    this.layer2Val = 0;
    this.layer3ValTarget = 0.00000001;
    this.layer3Val = 0;
    this.hasBegun = false;
    this.isMaxed = false;
    this.MAX_SIZE = 0.17;
    this.sizeMult = 0.0035;
    this.speed = 0.8;
    this.triggerClose = false;
  }

  begin() {
    this.hasBegun = true;
  }

  maxTargets() {
    this.triggerClose = true;
    this.closeTime = 3;
    this.layer0ValTarget = 0.0;
    this.layer1ValTarget = 0.0;
    this.layer2ValTarget = 0.0;
    this.layer3ValTarget = 0.0;
    this.speed = 1;

    document.querySelector('#wall-panel-1').setAttribute('position', '0 200 0');
    document.querySelector('#wall-panel-2').setAttribute('position', '0 200 0');
  }

  triggerMax() {
    this.isMaxed = true;
    this.triggerClose = false;
    this.speed = 0.6;
    this.maxedTime = 45;
    this.layer0ValTarget = 1.0;
    this.layer1ValTarget = 1.0;
    this.layer2ValTarget = 1.0;
    this.layer3ValTarget = 1.0;
  }

  update(dt) {
    if (!this.hasBegun) {
      this.layer0Val = 0.0;
      this.layer1Val = 0.0;
      this.layer2Val = 0.0;
      this.layer3Val = 0.0;
      return;
    }
    if (this.triggerClose) {
      this.closeTime -= dt;
      if (this.closeTime <= 0) this.triggerMax();
    }
    if (this.isMaxed) {
      this.maxedTime -= dt;
      if (this.maxedTime <= 0) this.reset();
    }
    if (!this.isMaxed && !this.triggerClose) {
      this.layer0ValTarget = 0.02 + this.stepCount * this.sizeMult;
      if (this.layer0ValTarget > this.MAX_SIZE) {
        this.layer0ValTarget = this.MAX_SIZE;
      }
    }
    // console.log(this.layer0ValTarget);
    this.layer0Val += (this.layer0ValTarget - this.layer0Val) * dt * this.speed;
    // this.layer0Val = this.layer0ValTarget;
    // this.layer0Val = 0.02;

    if (this.stepCount > 45 || this.isMaxed || this.triggerClose) {
      if (!this.isMaxed && !this.triggerClose) {
        this.layer1ValTarget = 0.02 + (this.stepCount - 45) * this.sizeMult;
        if (this.layer1ValTarget > this.MAX_SIZE) {
          this.layer1ValTarget = this.MAX_SIZE;
        }
      }
      this.layer1Val += (this.layer1ValTarget - this.layer1Val) * dt * this.speed;
    }

    if (this.stepCount > 90 || this.isMaxed || this.triggerClose) {
      if (!this.isMaxed && !this.triggerClose) {
        this.layer2ValTarget = 0.02 + (this.stepCount - 90) * this.sizeMult;
        if (this.layer2ValTarget > this.MAX_SIZE) {
          this.layer2ValTarget = this.MAX_SIZE;
        }
      }
      this.layer2Val += (this.layer2ValTarget - this.layer2Val) * dt * this.speed;
    }

    if (this.stepCount > 135 || this.isMaxed || this.triggerClose) {
      if (!this.isMaxed && !this.triggerClose) {
        this.layer3ValTarget = 0.02 + (this.stepCount - 135) * this.sizeMult;
        if (this.layer3ValTarget > this.MAX_SIZE) {
          this.layer3ValTarget = this.MAX_SIZE;
        }
      }
      this.layer3Val += (this.layer3ValTarget - this.layer3Val) * dt * this.speed;
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

    addMessageListener('BEGIN', () => {
      this.mats.forEach((m) => m.begin());
    });

    addMessageListener('REFRESH', () => {
      this.mats.forEach((m) => m.reset());
      document.querySelector('#layer-2-vid').currentTime = 0;
      document.querySelector('#layer-3-vid').currentTime = 0;
      document.querySelector('#layer-4-vid').currentTime = 0;

      document.querySelector('#wall-vid-1').currentTime = 0;
      document.querySelector('#wall-vid-2').currentTime = 60;
      document.querySelector('#wall-panel-1').setAttribute('position', '6 8 -14.31');
      document.querySelector('#wall-panel-2').setAttribute('position', '-40 2.65 -15.11');
      document.querySelector('#wall-panel-1').setAttribute('material', 'shader: flat; src: #wall-vid-1; color: black;');
      document.querySelector('#wall-panel-2').setAttribute('material', 'shader: flat; src: #wall-vid-1; color: black;');
      this.panel1Active = false;
      // this.layer0.setAttribute('material', 'shader: flat; color: black;');
      // this.wallLayer0.setAttribute('material', 'shader: flat; color: black;');

      // this.layer1.setAttribute('material', 'shader: flat; color: black;');
      // this.wallLayer1.setAttribute('material', 'shader: flat; color: black;');


      // this.layer2.setAttribute('material', 'shader: flat; color: black;');
      // this.wallLayer2.setAttribute('material', 'shader: flat; color: black;');


      // this.layer3.setAttribute('material', 'shader: flat; color: black;');
      // this.wallLayer3.setAttribute('material', 'shader: flat; color: black;');
    });
  },

  tick() {
    const currentTime = Date.now();
    const dt = (currentTime - this.prevTime) / 1000;
    this.prevTime = currentTime;
    // console.log(dt);

    if (this.mats.length < 1) return;

    // const totalSteps = this.mats.reduce((total, m) => {
    //   // console.log(total)
    //   return total + m.stepCount;
    // }, 0);
    // console.log(totalSteps);
    let totalSteps = 0;
    for (let i = 0; i < this.mats.length; i += 1) {
      totalSteps += this.mats[i].stepCount;
    }

    if (!this.panel1Active && totalSteps > 100) {
      this.panel1Active = true;
      document.querySelector('#wall-panel-1').setAttribute('material', 'shader: flat; color: white; src: #wall-vid-1;');
      document.querySelector('#wall-panel-1').setAttribute('position', '4 7 -14.31');
    }
    if (!this.panel2Active && totalSteps > 20) {
      this.panel2Active = true;
      // console.log('wat');
      document.querySelector('#wall-panel-2').setAttribute('material', 'shader: flat; src: #wall-vid-1; color: white;');
      document.querySelector('#wall-panel-2').setAttribute('position', '-40 2.65 -14.11');
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

      // const v3 = this.layer3.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      // const wv3 = this.wallLayer3.object3DMap.mesh.material.uniforms[`mat_${m.id}`].value;
      // v3.x = m.x;
      // v3.y = m.y;
      // v3.z = m.layer3Val;
      // wv3.x = m.x;
      // wv3.y = m.y;
      // wv3.z = m.layer3Val;
    });
  },
});
