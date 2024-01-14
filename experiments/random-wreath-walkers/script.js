/* eslint-disable no-undef, no-unused-vars */

let walkers = [];
let amount = 600;
let w = 600;
let h = 600 / (4 / 3);
let iteration = 0;
let canvas;

const palette = [
  "hsl(9, 100%, 64%)",
  "hsl(16, 100%, 66%)",
  "hsl(174, 72%, 56%)",
  "hsl(187, 52%, 80%)",
  "hsl(240, 100%, 99%)",
  "hsl(240, 67%, 94%)",
  "hsl(270, 50%, 40%)",
  "hsl(275, 100%, 25%)",
  "hsl(300, 47%, 75%)",
  "hsl(328, 100%, 54%)",
  "hsl(330, 100%, 71%)"
];

// Get random subset of array
function sample(array, size) {
  let shuffled = array.slice(0);
  let i = array.length;
  let temp;
  let index;

  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(0, size);
}

// const colors = sample(palette, 6);
const colors = palette;

class Walker {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.w = 1;
    this.h = 1;
    this.opacity = 0.1;
    this.directions = [
      [0, -1], // ↑
      [1, -1], // ↗
      [1, 0], // →
      [1, 1], // ↘
      [0, 1], // ↓
      [-1, 1], // ↙
      [-1, 0], // ←
      [-1, -1] // ↖
    ];
    this.stepsLimit = 60 * 60 * 1; // Think of last digit as minutes
    this.steps = 0;

    this.colors = colors;
    this.color = random(this.colors);
    this.fill = color(this.color);
    this.fill.setAlpha(255 * this.opacity);
  }
  walk() {
    const [offsetX, offsetY] = random(this.directions);
    this.x += offsetX;
    this.y += offsetY;
    this.steps++;
  }
  paint() {
    if (this.steps > this.stepsLimit) {
      return;
    }

    fill(this.fill);
    const x = this.x - this.w;
    const y = this.y - this.h;

    rect(x, y, this.w, this.h);
  }
}

function setup() {
  canvas = createCanvas(w, h);
  noStroke();

  for (let i = 0; i < amount; i++) {
    let centerX = w / 2;
    let centerY = h / 2;

    let theta = random(0, 360);

    // Donut style
    let radius = w * 0.25;

    // Pizza style
    // let radius = random(0, w * 0.5);

    // Radial gradient style
    // let seed = random(0, Math.sqrt(h * 0.5));
    // let radius = Math.pow(seed, 2);

    // Convert polar to cartesian
    let x = radius * cos(theta);
    let y = radius * sin(theta);

    x += centerX;
    y += centerY;

    // let offsetX = 0.5;
    // let offsetY = 0.5;

    // Roughly in the center
    // x += random((-w / 2) * offsetX, (w / 2) * offsetX);
    // y += random((-h / 2) * offsetY, (h / 2) * offsetY);

    // Start 4 particles at the same position
    walkers.push(new Walker(x, y, colors));
    // walkers.push(new Walker(x, y, colors));
    // walkers.push(new Walker(x, y, colors));
  }
}

function draw() {
  for (let walker of walkers) {
    walker.walk();
    walker.paint();
  }

  iteration++;

  // Save once “done” and repeat
  // if (iteration > 60 * 60 * 4) {
  //   saveCanvas(canvas, "random-walkers-pow-rect", "png");
  //   setTimeout(function () {
  //     window.location.reload();
  //   }, 5000);
  //   noLoop();
  // }
}
