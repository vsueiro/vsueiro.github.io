class Palette {
  constructor() {
    this.conveyor = {
      background: [75, 0, 130], // Indigo
      gears: [102, 51, 153], // RebeccaPurple
      belt: [230, 230, 250], // Lavender
      stripe: [248, 248, 255, 0.5] // GhostWhite, but half transparent
    };
    this.cookie = {
      batter: {
        from: [255, 127, 80], // Coral
        to: [255, 165, 133] // Coral, but with 76 lightness
      },
      chip: {
        from: [71, 24, 0], // Tomato, but with 14 lightness
        to: [122, 41, 0], // Tomato, but with 24 lightness
        overlap: [255, 20, 147, 0.75] // DeepPink
      }
    };
    this.score = {
      fill: [71, 24, 0], // Tomato, but with 14 lightness
      stroke: [255, 255, 255]
    };
    this.lives = {
      fill: [255, 20, 147], // DeepPink
      stroke: [255, 255, 255]
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
    return this.rgb(color);
  }
}

class Stripe {
  constructor(game, conveyor, index) {
    this.game = game;
    this.conveyor = conveyor;
    this.index = index;
    this.count = this.conveyor.stripeCount;
    this.height = 0.04 * 2;
    this.width = 1 - 0.04 * 2;
    this.x = 0.04;
    this.step = (1 + this.height - this.count * this.height) / this.count;
    this.y = this.index * (this.step + this.height);
  }

  gone() {
    return this.y < this.height * -1;
  }

  reset() {
    this.y = 1;
  }
}

class Conveyor {
  constructor(game) {
    this.game = game;
    this.min = 3 / 1000;
    this.max = 12 / 1000;
    this.speed = this.min;
    this.stripes = [];
    this.stripeCount = 4;
    for (let i = 0; i < this.stripeCount; i++)
      this.stripes[i] = new Stripe(this.game, this, i);
  }

  updateSpeed() {
    let increment = this.game.score.points / 10000;
    this.speed = this.min + increment;

    if (this.speed > this.max) this.speed = this.max;
    if (this.speed < this.min) this.speed = this.min;
  }

  reset() {
    this.speed = this.min;
  }

  renderBackground() {
    this.game.context.beginPath();
    this.game.context.rect(0, 0, this.game.width, this.game.height);
    this.game.context.fillStyle = this.game.palette.rgb(
      this.game.palette.conveyor.background
    );
    this.game.context.fill();
  }

  renderGears() {
    for (let side of ["left", "right"]) {
      let x = this.game.spacing / 2;
      if (side === "right") x = this.game.width - this.game.spacing;

      for (let row of [0.1, 0.4, 0.7]) {
        this.game.context.beginPath();
        this.game.context.rect(
          x,
          this.game.height * row,
          this.game.spacing / 2,
          this.game.height * 0.2
        );
        this.game.context.fillStyle = this.game.palette.rgb(
          this.game.palette.conveyor.gears
        );
        this.game.context.fill();
      }
    }
  }

  renderBelt() {
    this.game.context.beginPath();
    this.game.context.rect(
      this.game.spacing,
      0,
      this.game.width - this.game.spacing * 2,
      this.game.height
    );
    this.game.context.fillStyle = this.game.palette.rgb(
      this.game.palette.conveyor.belt
    );
    this.game.context.fill();
  }

  renderStripes() {
    for (let stripe of this.stripes) {
      let w = stripe.width * this.game.width;
      let h = stripe.height * this.game.height;
      let x = stripe.x * this.game.width;
      let y = stripe.y * this.game.height;

      this.game.context.beginPath();
      this.game.context.rect(x, y, w, h);
      this.game.context.fillStyle = this.game.palette.rgb(
        this.game.palette.conveyor.stripe
      );
      this.game.context.fill();
      this.animate(stripe);
    }
  }

  animate(stripe) {
    if (!this.game.paused) {
      stripe.y = stripe.y - this.speed;
      if (stripe.gone()) stripe.reset();
    }
  }

  render() {
    this.renderBackground();
    this.renderGears();
    this.renderBelt();
    this.renderStripes();
  }
}

class Chips {
  constructor(game) {
    this.game = game;
    this.list = [];
  }

  render() {
    for (let chip of this.list) chip.render();
  }
}

class Chip {
  constructor(game, cookie, x, y) {
    this.game = game;
    this.cookie = cookie;
    this.r = this.game.random(0.01, 0.02, "float");
    this.x = x;
    this.y = y;
    this.stroke = this.game.spacing / 8;
    this.color = this.game.palette.interpolate(this.game.palette.cookie.chip);
    this.overlap = false;
    this.checkScore();

    if (this.game.width <= 480) {
      this.r = this.r * 2;
      this.stroke = this.stroke * 2;
    }
  }

  overlaps() {
    for (let chip of this.cookie.chips.list) {
      let r = (this.r + chip.r) * this.game.width;
      let x = (this.x - chip.x) * this.game.width;
      let y = (this.y - chip.y) * this.game.height;

      let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

      if (distance < r) {
        this.overlap = true;
        chip.overlap = true;
      }
    }
    return this.overlap;
  }

  checkScore() {
    if (this.overlaps()) {
      this.game.score.update(-1);
    } else {
      this.game.score.update(1);
    }
  }

  animate() {
    if (!this.game.paused) {
      this.y = this.y - this.game.conveyor.speed;
    }
  }

  render() {
    let r = this.r * this.game.width;
    let x = this.x * this.game.width;
    let y = this.y * this.game.height;

    this.game.context.beginPath();
    this.game.context.arc(x, y, r, 0, 2 * Math.PI);
    this.game.context.fillStyle = this.color;
    this.game.context.fill();

    if (this.overlap) {
      this.game.context.strokeStyle = this.game.palette.rgb(
        this.game.palette.cookie.chip.overlap
      );
      this.game.context.lineWidth = this.stroke;
      this.game.context.stroke();
    }

    this.animate();
  }
}

class Cookie {
  constructor(game) {
    this.game = game;

    let margin = (this.game.spacing / this.game.width) * 2;

    this.r = this.game.random(0.08, 0.09, "float");
    this.x = this.game.random(margin, 1 - margin, "float");
    this.y = 1;
    this.color = this.game.palette.interpolate(this.game.palette.cookie.batter);
    this.chips = new Chips(this.game);

    if (this.game.width <= 480) this.r = this.r * 2;
  }

  renderBatter() {
    let r = this.r * this.game.width;
    let x = this.x * this.game.width;
    let y = this.y * this.game.height + r;

    this.game.context.beginPath();
    this.game.context.arc(x, y, r, 0, 2 * Math.PI);
    this.game.context.fillStyle = this.color;
    this.game.context.fill();
  }

  overlaps() {
    for (let cookie of this.game.cookies.list) {
      let r = (this.r + cookie.r) * this.game.width;
      let x = (this.x - cookie.x) * this.game.width;
      let y = (this.y - cookie.y) * this.game.height;

      let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

      if (distance < r) return true;
    }
    return false;
  }

  gone() {
    let r = this.r * this.game.width;
    let y = this.y * this.game.height;
    return y + r * 2 < 0;
  }

  animate() {
    if (!this.game.paused) {
      this.y = this.y - this.game.conveyor.speed;
    }
  }

  render() {
    this.renderBatter();
    this.chips.render();
    this.animate();
  }
}

class Cookies {
  constructor(game) {
    this.game = game;
    this.list = [];
    this.min = 1;
    this.max = 4;
    this.chance = this.min;
  }

  clean() {
    let i = this.list.length;
    while (i--) {
      let cookie = this.list[i];
      if (cookie.gone()) {
        if (cookie.chips.list.length === 0) this.game.lives.update(-1, cookie);

        this.list.splice(i, 1);
      }
    }
  }

  reset() {
    this.list = [];
    this.chance = this.min;
  }

  updateChance() {
    let increment = this.game.score.points / 10;
    this.chance = this.min + increment;

    if (this.chance > this.max) this.chance = this.max;
    if (this.chance < this.min) this.chance = this.min;
  }

  lottery() {
    this.updateChance();

    if (this.game.chance(this.chance)) {
      let cookie = new Cookie(this.game);
      if (!cookie.overlaps()) this.list.push(cookie);
    }
  }

  render() {
    this.lottery();
    this.clean();
    for (let cookie of this.list) cookie.render();
  }
}

class Events {
  constructor(game) {
    this.game = game;

    // Enables canvas to receive focus (required for keydown event)
    this.game.canvas.setAttribute("tabindex", "1");

    this.game.canvas.addEventListener("keydown", (event) =>
      this.keydown(event)
    );
    this.game.canvas.addEventListener("mousedown", (event) =>
      this.click(event)
    );
    this.game.canvas.addEventListener("mousemove", (event) => this.move(event));
    this.game.canvas.addEventListener("mouseleave", (event) =>
      this.leave(event)
    );
    this.game.canvas.addEventListener("touchstart", (event) =>
      this.touchstart(event)
    );
  }

  cursor(event) {
    let rect = this.game.canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / this.game.canvas.width,
      y: (event.clientY - rect.top) / this.game.canvas.height
    };
  }

  touchstart(event) {
    this.game.touch = true;
  }

  keydown(event) {
    if (!event.repeat) {
      // this.game.paused = !this.game.paused
    }
  }

  click(event) {
    let cursor = this.cursor(event);

    if (this.game.cooldown) return false;

    if (this.game.state === "over") this.game.restart();

    if (!this.game.paused) {
      for (let cookie of this.game.cookies.list) {
        let r = cookie.r * this.game.canvas.width;
        let x = (cursor.x - cookie.x) * this.game.canvas.width;
        let y = (cursor.y - cookie.y) * this.game.canvas.height - r;

        let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

        if (distance < r) {
          let chip = new Chip(this.game, cookie, cursor.x, cursor.y);
          cookie.chips.list.push(chip);

          if (this.game.state === "start") this.game.state = "playing";

          break;
        }
      }
    }
  }

  leave(event) {
    this.game.cursor.visible = false;
  }

  move(event) {
    let cursor = this.cursor(event);
    this.game.cursor.visible = true;
    this.game.cursor.x = cursor.x;
    this.game.cursor.y = cursor.y;
  }
}

class Cursor {
  constructor(game) {
    this.game = game;
    this.visible = false;
    this.x = 0;
    this.y = 0;
    this.r = 0.02;
    this.color = this.game.palette.rgb(this.game.palette.cookie.chip.from);
  }

  render() {
    if (this.game.touch) return false;

    if (this.visible) {
      let r = this.r * this.game.width;
      let x = this.x * this.game.width;
      let y = this.y * this.game.height;

      this.game.context.beginPath();
      this.game.context.arc(x, y, r, 0, 2 * Math.PI);
      this.game.context.lineWidth = 2;
      this.game.context.strokeStyle = this.color;
      this.game.context.stroke();
    }
  }
}

class Fonts {
  constructor() {
    this.list = [
      {
        name: "Sniglet",
        url:
          "https://rawcdn.githack.com/theleagueof/sniglet/5c6b0860bdd0d8c4f16222e4de3918c384db17c4/webfonts/Sniglet-webfont.woff"
      }
    ];

    this.load();
  }

  load() {
    for (let font of this.list) {
      let file = new FontFace(font.name, "url(" + font.url + ")");

      file.load().then((font) => {
        document.fonts.add(font);
      });
    }
  }
}

class Siren {
  constructor(game) {
    this.game = game;
    this.alpha = 0;
  }

  on() {
    this.alpha = 0.5;
  }

  animate() {
    this.alpha -= 0.005;

    if (this.alpha < 0) this.alpha = 0;
  }

  render() {
    this.game.context.beginPath();
    this.game.context.rect(0, 0, this.game.width, this.game.height);
    this.game.context.fillStyle = this.game.palette.rgba(
      this.game.palette.lives.fill,
      this.alpha
    );
    this.game.context.fill();

    this.animate();
  }
}

class Highlights {
  constructor(game) {
    this.game = game;
    this.list = [];
  }

  render() {
    for (let highlight of this.list) {
      highlight.render();
    }
  }
}

class Highlight {
  constructor(game, cookie) {
    this.game = game;
    this.cookie = cookie;
    this.initial = {};
    this.initial.r = cookie.r * 2;
    this.initial.alpha = 1;

    this.x = cookie.x;
    this.y = cookie.y;
    this.r = this.initial.r;
    this.alpha = this.initial.alpha;

    this.render();
  }

  animate() {
    this.r = this.r * 0.98;
    this.alpha = this.alpha * 0.98;
  }

  render() {
    let r = this.r * this.game.width;
    let x = this.x * this.game.width;
    let y = (this.y + this.cookie.r) * this.game.height;

    this.game.context.beginPath();
    this.game.context.arc(x, y, r, 0, 2 * Math.PI);
    this.game.context.fillStyle = this.game.palette.rgba(
      this.game.palette.lives.fill,
      this.alpha
    );
    this.game.context.fill();
    this.animate();
  }
}

class Lives {
  constructor(game) {
    this.game = game;
    this.count = 3;
    this.symbol = "•";
    this.display = "";
    this.font = "Sniglet, sans-serif";
    this.highlights = [];
  }

  update(number, cookie) {
    if (this.game.state === "playing") {
      this.count += number;

      if (number < 0) {
        this.game.siren.on();

        let highlight = new Highlight(this.game, cookie);
        this.game.highlights.list.push(highlight);
      }

      if (this.count <= 0) {
        this.count = 0;

        this.game.score.updateMax();

        this.game.state = "over";
        this.game.paused = true;
        this.game.cooldown = true;

        window.setTimeout(() => {
          this.game.cooldown = false;
        }, 1000);
      }
    }
  }

  reset() {
    this.count = 3;
    this.highlights = [];
  }

  render() {
    this.size = this.game.spacing * 2;
    this.stroke = this.size / 4;
    this.x = this.game.spacing * 2;
    this.y = this.game.spacing;

    this.display = this.symbol.repeat(this.count);

    this.game.context.textBaseline = "top";
    this.game.context.font = this.size + "px " + this.font;
    this.game.context.textAlign = "right";

    this.game.context.lineJoin = "round";
    this.game.context.lineWidth = this.stroke;
    this.game.context.strokeStyle = this.game.palette.rgb(
      this.game.palette.lives.stroke
    );
    this.game.context.strokeText(
      this.display,
      this.game.width - this.x,
      this.y
    );

    this.game.context.fillStyle = this.game.palette.rgb(
      this.game.palette.lives.fill
    );
    this.game.context.fillText(this.display, this.game.width - this.x, this.y);
  }
}

class Score {
  constructor(game) {
    this.game = game;
    this.chips = 0;
    this.points = 0;
    this.max = 0;
    this.font = "Sniglet, sans-serif";
    this.increase = true;

    if (localStorage.getItem("max"))
      this.max = parseInt(localStorage.getItem("max"), 10);
  }

  update(number) {
    if (number >= 0) this.increase = true;
    else this.increase = false;

    this.chips += number;
    this.points = this.chips;
  }

  updateMax() {
    if (this.points > this.max) {
      this.max = this.points;
      localStorage.setItem("max", this.max);
    }
  }

  reset() {
    this.chips = 0;
    this.points = 0;
    this.increase = true;
  }

  render() {
    this.size = this.game.spacing * 2;
    this.stroke = this.size / 4;
    this.x = this.game.spacing * 2;
    this.y = this.game.spacing;

    this.game.context.textBaseline = "top";
    this.game.context.font = this.size + "px " + this.font;
    this.game.context.textAlign = "left";

    this.game.context.lineJoin = "round";
    this.game.context.lineWidth = this.stroke;
    this.game.context.strokeStyle = this.game.palette.rgb(
      this.game.palette.score.stroke
    );
    this.game.context.strokeText(this.points, this.x, this.y);

    if (this.increase)
      this.game.context.fillStyle = this.game.palette.rgb(
        this.game.palette.score.fill
      );
    else
      this.game.context.fillStyle = this.game.palette.rgb(
        this.game.palette.lives.fill
      );
    this.game.context.fillText(this.points, this.x, this.y);
  }
}

class Screen {
  // This class is really crappy

  constructor(game) {
    this.game = game;
    this.font = "Sniglet, sans-serif";
  }

  render() {
    if (this.game.state === "start") {
      let size = this.game.spacing * 1.5;
      let stroke = this.size / 4;
      let x = this.game.width * 0.5;
      let y = this.game.height * 0.5;

      this.game.context.font = size + "px " + this.font;
      this.game.context.textAlign = "center";
      this.game.context.lineJoin = "round";
      this.game.context.lineWidth = stroke;

      this.game.context.textBaseline = "bottom";
      this.game.context.strokeStyle = this.game.palette.rgb(
        this.game.palette.score.stroke
      );
      this.game.context.strokeText(
        "Put chips on all cookies",
        x,
        y - size * 0.25
      );
      this.game.context.fillStyle = this.game.palette.rgb(
        this.game.palette.cookie.chip.from
      );
      this.game.context.fillText(
        "Put chips on all cookies",
        x,
        y - size * 0.25
      );

      this.game.context.textBaseline = "top";
      this.game.context.strokeStyle = this.game.palette.rgb(
        this.game.palette.score.stroke
      );
      this.game.context.strokeText(
        "so you don’t get fired",
        x,
        y + size * 0.25
      );
      this.game.context.fillStyle = this.game.palette.rgb(
        this.game.palette.lives.fill
      );
      this.game.context.fillText("so you don’t get fired", x, y + size * 0.25);
    }
    if (this.game.state === "over") {
      let size = this.game.spacing * 1.5;
      let stroke = this.size / 4;
      let x = this.game.width * 0.5;
      let y = this.game.height * 0.5;

      this.game.context.font = size + "px " + this.font;
      this.game.context.textAlign = "center";
      this.game.context.lineJoin = "round";
      this.game.context.lineWidth = stroke;

      this.game.context.textBaseline = "bottom";
      this.game.context.strokeStyle = this.game.palette.rgb(
        this.game.palette.score.stroke
      );
      this.game.context.strokeText("You’re fired!", x, y - size * 0.25);
      this.game.context.fillStyle = this.game.palette.rgb(
        this.game.palette.lives.fill
      );
      this.game.context.fillText("You’re fired!", x, y - size * 0.25);

      this.game.context.textBaseline = "top";
      this.game.context.strokeStyle = this.game.palette.rgb(
        this.game.palette.score.stroke
      );
      this.game.context.strokeText(
        "Your record: " + this.game.score.max,
        x,
        y + size * 0.25
      );
      this.game.context.fillStyle = this.game.palette.rgb(
        this.game.palette.cookie.chip.from
      );
      this.game.context.fillText(
        "Your record: " + this.game.score.max,
        x,
        y + size * 0.25
      );
    }
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.updateDimensions();

    this.state = "start";
    this.touch = false;
    this.paused = false;
    this.cooldown = false;
    this.fonts = new Fonts();
    this.palette = new Palette(this);
    this.conveyor = new Conveyor(this);
    this.cookies = new Cookies(this);
    this.siren = new Siren(this);
    this.highlights = new Highlights(this);
    this.score = new Score(this);
    this.lives = new Lives(this);
    this.screen = new Screen(this);
    this.cursor = new Cursor(this);
    this.events = new Events(this);

    this.update();
  }

  random(min, max, float = false) {
    if (float) return Math.random() * (min - max) + max;
    else return Math.floor(Math.random() * (max - min + 1) + min);
  }

  chance(percent) {
    return percent / 100 > Math.random();
  }

  update() {
    this.updateDimensions();
    this.conveyor.updateSpeed();
    this.conveyor.render();
    this.cookies.render();
    this.siren.render();
    this.highlights.render();
    this.score.render();
    this.lives.render();
    this.screen.render();
    this.cursor.render();

    window.requestAnimationFrame(() => this.update());
  }

  updateDimensions() {
    this.width = this.canvas.width = this.canvas.offsetWidth;
    this.height = this.canvas.height = this.canvas.offsetHeight;

    this.spacing = this.width * 0.04;
  }

  restart() {
    this.conveyor.reset();
    this.cookies.reset();
    this.score.reset();
    this.lives.reset();
    this.state = "start";
    this.paused = false;
  }
}

window.game = new Game(document.querySelector("canvas"));
