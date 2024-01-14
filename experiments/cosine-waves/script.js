/* eslint-disable no-undef, no-unused-vars */

let w = 400;
let h = 400;
let waves = [];

function setup() {
  createCanvas(w, h);
  background("Indigo");

  for (let i = 1; i <= 2; i++) {
    const options = {
      cycles: i,
      h: h * 0.8,
      w: w * 0.8,
      offsetX: w * 0.1,
      color: "Turquoise"
    };
    const wave = new Wave(options);
    waves.push(wave);
  }
  for (let i = 1; i <= 2; i++) {
    const options = {
      a: PI,
      cycles: i,
      h: h * 0.8,
      w: w * 0.8,
      offsetX: w * 0.1,
      color: "DeepPink"
    };
    const wave = new Wave(options);
    waves.push(wave);
  }
}

function draw() {
  for (let wave of waves) {
    wave.update();
    wave.render();
  }
}
