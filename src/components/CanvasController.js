import AFRAME from 'aframe';

// All components go here
AFRAME.registerComponent('canvas-controller', {
  layer0: { canvas: null, ctx: null },
  layer1: { canvas: null, ctx: null },
  init() {
    this.layer0.canvas = document.querySelector('#layer-0');
    this.layer0.ctx = this.layer0.canvas.getContext('2d');
    this.layer1.canvas = document.querySelector('#layer-1');
    this.layer1.ctx = this.layer1.canvas.getContext('2d');
  },

  drawLayer0() {
    const ctx = this.layer0.ctx;
    const width = this.layer0.canvas.width;
    const height = this.layer0.canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width / 2, 0, height, 0, Math.PI, false);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width / 2, height / 3, height / 5, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.clearRect(0, 0, width, height);
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

    ctx.beginPath();
    ctx.arc(width / 2, height / 3, height / 10, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.clearRect(0, 0, width, height);
  },

  update() {
    // layer 0 stuff
    this.drawLayer0();
    this.drawLayer1();
  },
});
