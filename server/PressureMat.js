class PressureMat {
  constructor(id) {
    this.id = id;
    this.stepCount = 0;
    this.x = 0;
    this.y = 0;
  }

  setPos(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  addStep() {
    this.stepCount += 1;
  }
}

module.exports = PressureMat;
