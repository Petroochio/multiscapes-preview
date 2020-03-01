import AFRAME from 'aframe';
import { addMessageListener } from '../MessageManager';

class MatCircle {
  constructor(id, x, y, steps) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.stepCount = steps; // use this to grow radius, have multiple r for each level
  }
}

// All components go here
AFRAME.registerComponent('canvas-controller', {
  layer0: { canvas: null, ctx: null },
  layer1: { canvas: null, ctx: null },
  layer2: { canvas: null, ctx: null },
  // mats: [new MatCircle(0, 0.5, 0.5, 0)],
  mats: [new MatCircle(0,0.5,0.5,0)],//, new MatCircle(1,0.5,0.25,0)],
  init() {
    this.layer0.canvas = document.querySelector('#layer-0');
    this.layer0.ctx = this.layer0.canvas.getContext('2d');
    this.layer1.canvas = document.querySelector('#layer-1');
    this.layer1.ctx = this.layer1.canvas.getContext('2d');
    // this.layer2.canvas = document.querySelector('#layer-2');
    // this.layer2.ctx = this.layer1.canvas.getContext('2d');

    addMessageListener('MAT_STATE', (matData) => {
      // if (this.mats.length < 1) {
      //   this.mats = matData.map((m) => new MatCircle(m.id, m.x, m.y, m.stepCount));
      //   console.log(this.mats);
      // } else {
      console.log('else');
      console.log(this.mats);
      matData.forEach((m) => {
        this.mats[m.id].x = m.x;
        this.mats[m.id].y = m.y;
        // add steps
      });
      // }
    });
  },

  x: 0,
  drawLayer0() {
    const ctx = this.layer0.ctx;
    const width = this.layer0.canvas.width;
    const height = this.layer0.canvas.height;

    // ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    // ctx.globalCompositeOperation = 'xor';
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(width / 2, 0, height, 0, Math.PI, false);
    ctx.closePath();
    ctx.fill();

    // ctx.fillStyle = '#ffffff';
    // ctx.beginPath();
    // ctx.arc(500, 500, 100, 0, Math.PI * 2);
    // ctx.closePath();
    // ctx.fill();


    // const holePath = new Path2D();
    // const holePath1 = new Path2D();
    // const holePath2 = new Path2D();
    // const holePath3 = new Path2D();
    // const holePath4 = new Path2D();

    // holePath1.arc(width / 2, height / 3, height / 5, 0, Math.PI * 2);
    // // holePath.arc(width / 2, height / 3, height / 5, 0, Math.PI * 2, true);
    // holePath2.arc(width * 0.7, height * 0.8, height / 10, 0, Math.PI * 2, true);
    // holePath3.arc(width / 5, height / 3 * 2, height / 7, 0, Math.PI * 2, true);
    // holePath4.arc(width / 5 * 3, height / 4, height / 15, 0, Math.PI * 2, true);

    // ctx.save();
    // ctx.clip(holePath1);
    // ctx.clearRect(0, 0, width, height);
    // ctx.restore();

    // ctx.save();
    // ctx.clip(holePath2);
    // ctx.clearRect(0, 0, width, height);
    // ctx.restore();

    // ctx.save();
    // ctx.clip(holePath3);
    // ctx.clearRect(0, 0, width, height);
    // ctx.restore();

    // ctx.save();
    // ctx.clip(holePath4);
    // ctx.clearRect(0, 0, width, height);
    // ctx.restore();
    this.x += 1;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, height * 0.5, 100, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    // // console.log(this.mats);
    // this.mats.forEach((m) => {
    //   m.x += 0.00001;
    //   // const holePath = new Path2D();
    //   // console.log(width * m.x);
    //   // ctx.save();
    //   ctx.fillStyle = '#ffffff';
    //   ctx.beginPath();
    //   ctx.arc(width * m.x, height * m.y, 100, 0, Math.PI * 2);
    //   ctx.closePath();
    //   ctx.fill();

    //   // ctx.clip(holePath);
    //   // ctx.restore();
    // });

    ctx.restore();
  },

  drawLayer1() {
    const ctx = this.layer1.ctx;
    const width = this.layer1.canvas.width;
    const height = this.layer1.canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width / 2, 0, height, 0, Math.PI, false);
    ctx.closePath();
    ctx.fill();

    // ctx.fillStyle = '#000000';
    // ctx.beginPath();
    // ctx.arc(width / 2, height / 3, height / 10, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.fill();
    // ctx.clip();
    // ctx.clearRect(0, 0, width, height);

    // ctx.beginPath();
    // ctx.arc(width / 5, height / 3 * 2, height / 13, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.fill();
    // ctx.clip();
    // ctx.clearRect(0, 0, width, height);
  },

  drawLayer2() {
    const ctx = this.layer2.ctx;
    const width = this.layer2.canvas.width;
    const height = this.layer2.canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width / 2, 0, height, 0, Math.PI, false);
    ctx.closePath();
    ctx.fill();

    // ctx.beginPath();
    // ctx.arc(width / 2, height / 3, height / 10, 0, Math.PI * 2, true);
    // ctx.clip();
    // ctx.clearRect(0, 0, width, height);
  },

  tick() {
    // layer 0 stuff
    this.drawLayer0();
    this.drawLayer1();
    // this.drawLayer2();
  },
});
