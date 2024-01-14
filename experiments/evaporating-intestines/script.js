class Utils {
  constructor(app) {
    this.app = app;
  }
  random(min, max, float = false) {
    if (float) return Math.random() * (min - max) + max;
    else return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

class Palette {
  constructor() {
    this.background = [75, 0, 130]; // Indigo
    this.tentacles = {
      from: [75, 0, 130], // Indigo
      to: [255, 99, 71] // Tomato
    };
  }

  rgb(array) {
    return "rgb(" + array.join(",") + ")";
  }

  rgba(array, alpha) {
    let temp = Object.values(array);
    if (temp.length < 4) temp[3] = alpha;

    return "rgba(" + temp.join(",") + ")";
  }

  interpolate(colors, factor = Math.random()) {
    let from = colors.from;
    let to = colors.to;
    let color = from.slice();
    for (let i = 0; i < 3; i++) {
      color[i] = Math.round(color[i] + factor * (to[i] - from[i]));
    }
    return color;
  }
}

class Cursor {
  constructor(app) {
    this.app = app;
    this.x = 0;
    this.y = 0;
    this.min = 0.05;
    this.max = 1;
    this.increment = 0.05;
    this.intensity = this.min;
    this.down = false;
    this.event = undefined;
  }
  update(event) {
    if (this.event) {
      this.x = this.event.clientX;
      this.y = this.event.clientY;

      if (this.down) this.intensity += this.increment;
      else this.intensity -= this.increment;

      if (this.intensity < this.min) this.intensity = this.min;
      if (this.intensity > this.max) this.intensity = this.max;
    }
  }
}

class Events {
  constructor(app) {
    this.app = app;
    app.canvas.addEventListener("mousemove", (event) => this.move(event));
    app.canvas.addEventListener("mousedown", (event) => this.down(event));
    app.canvas.addEventListener("mouseup", (event) => this.up(event));
    app.canvas.addEventListener("mouseleave", (event) => this.leave(event));
  }
  move(event) {
    this.app.cursor.event = event;
  }
  down(event) {
    this.app.cursor.down = true;
    this.app.cursor.event = event;
  }
  up(event) {
    this.app.cursor.down = false;
    this.app.cursor.event = event;
  }
  leave(event) {
    this.app.cursor.down = false;
    this.app.cursor.event = event;
  }
}

class Tentacles {
  constructor(app) {
    this.app = app;
    this.list = [];
  }
  update() {
    let i = this.list.length;
    while (i--) {
      let tentacle = this.list[i];
      if (tentacle.r < 4) {
        this.list.splice(i, 1);
      }
      tentacle.update();
    }
  }
  render() {
    this.list.forEach((tentacle) => {
      tentacle.render();
    });
  }
}

class Tentacle {
  constructor(app) {
    this.app = app;
    this.factor = 1;
    this.color = this.app.palette.tentacles;
    this.r =
      this.app.cursor.intensity * 50 + this.app.utils.random(0, 20, "float");
    this.x = this.app.cursor.x + this.app.utils.random(-10, 10, "float");
    this.y = this.app.cursor.y + this.app.utils.random(-10, 10, "float");
  }
  update() {
    this.x += -2 + this.app.utils.random(-2, 0, "float");
    this.y += -1 + this.app.utils.random(-1, 0, "float");
    this.r *= 0.98;
    this.factor *= 0.98;
  }
  render() {
    this.app.context.beginPath();
    this.app.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.app.context.fillStyle = this.app.palette.rgb(
      this.app.palette.interpolate(this.color, this.factor)
    );
    this.app.context.fill();
  }
}

class Background {
  constructor(app) {
    this.app = app;
    this.color = this.app.palette.rgba(this.app.palette.background, 1);
  }
  update() {}
  render() {
    this.app.context.beginPath();
    this.app.context.rect(0, 0, this.app.canvas.width, this.app.canvas.height);
    this.app.context.fillStyle = this.color;
    this.app.context.fill();
  }
}

class App {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.utils = new Utils(this);
    this.events = new Events(this);
    this.cursor = new Cursor(this);
    this.palette = new Palette(this);
    this.background = new Background(this);
    this.tentacles = new Tentacles(this);
    this.update();
  }
  update() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    if (this.cursor.intensity > this.cursor.min) {
      for (let i = 0; i < 3; i++) {
        let tentacle = new Tentacle(this);
        this.tentacles.list.push(tentacle);
      }
    }

    this.cursor.update();
    this.background.update();
    this.tentacles.update();
    this.render();
  }
  render() {
    this.background.render();
    this.tentacles.render();
    window.requestAnimationFrame(() => this.update());
  }
}

const canvas = document.querySelector("canvas");

window.app = new App(canvas);
