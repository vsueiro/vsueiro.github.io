/* eslint-disable no-undef, no-unused-vars */

let x = 0;
let y = 0;
let w = 128 / 2;
let h = 72 / 2;
let t = 0;
let noiseScale = 0.05;

const colors = [
  {
    limit: 0.85,
    code: "#f8f8ff"
  },
  {
    limit: 0.8,
    code: "#eae4ff"
  },
  {
    limit: 0.75,
    code: "#e5cdfe"
  },
  {
    limit: 0.7,
    code: "#e6b5f6"
  },
  {
    limit: 0.65,
    code: "#ec9ae7"
  },
  {
    limit: 0.6,
    code: "#f37bd1"
  },
  {
    limit: 0.55,
    code: "#fb55b5"
  },
  {
    limit: 0.5,
    code: "#ff1493"
  },
  {
    limit: 0.45,
    code: "#e80094"
  },
  {
    limit: 0.4,
    code: "#d10094"
  },
  {
    limit: 0.35,
    code: "#b80093"
  },
  {
    limit: 0.3,
    code: "#9f0090"
  },
  {
    limit: 0.25,
    code: "#84008d"
  },
  {
    limit: 0.2,
    code: "#690088"
  },
  {
    limit: 0,
    code: "#4b0082"
  }
];

function setup() {
  createCanvas(w, h);
  background(0);
  noStroke();
  noiseDetail(2, 0.5);
}

function draw() {
  t = millis() * 0.0001;

  for (let col = 0; col < w; col++) {
    for (let row = 0; row < h; row++) {
      let c = color("black");
      let noiseValue = noise(col * noiseScale, row * noiseScale, t);
      noiseValue = Math.pow(noiseValue, 2) * 1.5;
      for (let item of colors) {
        if (noiseValue > item.limit) {
          c = color(item.code);
          break;
        }
      }
      set(col, row, c);
    }
  }
  updatePixels();
}
