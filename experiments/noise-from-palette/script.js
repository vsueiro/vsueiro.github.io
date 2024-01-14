import Noise from "./Noise.js";

const canvas = document.querySelector("canvas");
const palette = [
  [64, 224, 208],
  [75, 0, 130],
  [102, 51, 153],
  [176, 224, 230],
  [221, 160, 221],
  [230, 230, 250],
  [248, 248, 255],
  [255, 20, 147],
  [255, 99, 71],
  [255, 105, 180],
  [255, 127, 80]
];

new Noise(canvas, palette);
