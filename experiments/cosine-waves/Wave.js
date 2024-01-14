/* eslint-disable no-undef, no-unused-vars */

class Wave {
  constructor(options) {
    this.defaults = {
      w: 400,
      h: 400,
      x: 0,
      y: 0,
      a: 0,
      r: 12,
      offsetY: 200,
      offsetX: 0,
      cycles: 3,
      readings: 400,
      color: "black"
    };
    this.options = Object.assign(this, this.defaults, options);
  }
  update() {
    this.y = (cos(this.a) * this.h) / 2;
    this.a += PI / this.readings;
    this.x += this.w / (this.cycles * 2 * this.readings);
  }
  render() {
    if (this.x > this.w) {
      return;
    }

    const c = color(this.color);
    c.setAlpha(255 * 0.025);
    fill(c);
    noStroke();
    circle(this.offsetX + this.x, this.offsetY + this.y, this.r);
  }
}
