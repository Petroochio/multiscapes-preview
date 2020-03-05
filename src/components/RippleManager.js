import AFRAME from 'aframe';
import { addMessageListener } from '../MessageManager';

class MatRipple {
  constructor() {
    this.stepCount = 0;
  }

  set(m) {
    this.id = m.id;
    this.x = m.x;
    this.y = m.y;
    this.prevSteps = this.stepCount;
    this.stepCount = m.steps;
    if (this.prevSteps !== this.stepCount) {
      // do thing
    }
  }
}

AFRAME.registerComponent('ripple-manager', {
  init() {
    this.currTime = 0;
    this.mats = [];
    for (let i = 0; i < 15; i += 1) {
      this.mats[i] = new MatRipple();
    }

    addMessageListener('MAT_STATE', (matData) => {
      matData.forEach((m) => {
        this.mats[m.id].set(m);

        if (this.mats[m.id].prevSteps !== this.mats[m.id].stepCount) {
          const ripple = this.el.object3DMap.mesh.material.uniforms[`ripple${m.id}`].value;

          ripple.x = m.x;
          ripple.y = m.y;
          ripple.z = this.currTime;
        }
      });
    });
  },

  tick(aframeTime) {
    this.currTime = aframeTime;
  },
});
