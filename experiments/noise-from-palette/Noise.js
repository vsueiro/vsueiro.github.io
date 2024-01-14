class Noise {
  constructor(element, palette) {
    this.canvas = element;
    this.context = this.canvas.getContext("2d");
    this.animate();
    this.fps = 24;
    this.delay = 1000 / this.fps;
    this.last = 0;
    this.palette = palette;
  }
  animate(timestamp = 0) {
    const elapsed = timestamp - this.last;

    if (elapsed >= this.delay) {
      this.update();
      this.render();
      this.last = timestamp;
    }

    window.requestAnimationFrame((timestamp) => this.animate(timestamp));
  }
  update() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  randomItem(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }
  render() {
    const imageData = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    const data = imageData.data;
    const channels = 4; // r, g, b, a

    for (let i = 0; i < data.length; i += channels) {
      if (this.palette) {
        const color = this.randomItem(this.palette);

        data[i + 0] = color[0]; // red
        data[i + 1] = color[1]; // green
        data[i + 2] = color[2]; // blue
        data[i + 3] = 255; // alpha
      } else {
        data[i + 0] = this.randomInt(0, 256); // red
        data[i + 1] = this.randomInt(0, 256); // green
        data[i + 2] = this.randomInt(0, 256); // blue
        data[i + 3] = 255; // alpha
      }
    }

    this.context.putImageData(imageData, 0, 0);
  }
}

export default Noise;
