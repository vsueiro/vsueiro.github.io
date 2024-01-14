const creature = document.querySelector("#creature");
const template = document.querySelector("#template");

class Aim {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  update(event) {
    let x = event.clientX;
    let y = event.clientY;

    if (event.type === "touchmove") {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }

    this.x = x / window.innerWidth;
    this.y = y / window.innerHeight;
  }
}

class Eyes {
  constructor(creature, amount) {
    this.creature = creature;
    this.list = [];

    for (let i = 0; i < amount; i++) this.list.push(new Eye(creature));
  }
  look() {
    this.list.forEach((eye) => {
      eye.look();
    });
  }
}

class Eye {
  constructor(creature) {
    this.creature = creature;
    this.element = template.content.firstElementChild.cloneNode(true);

    this.distance = 0;
    this.angle = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.intensity = 40;
    this.sensitivity = 0.2;
    this.aperture = 0;

    this.render();
  }
  locate() {
    let rect = this.element.getBoundingClientRect();

    this.x = (rect.left + rect.width / 2) / window.innerWidth;
    this.y = (rect.top + rect.height / 2) / window.innerHeight;
  }
  measure(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;

    this.distance = Math.sqrt(x * x + y * y);
    this.angle = Math.atan2(y, x);

    this.offsetX = Math.cos(this.angle);
    this.offsetY = Math.sin(this.angle);
  }
  look() {
    this.locate();
    this.measure(this.x, this.y, this.creature.aim.x, this.creature.aim.y);

    let x = this.offsetY * this.intensity * this.distance;
    let y = this.offsetX * this.intensity * this.distance;

    if (x > this.intensity) x = this.intensity;

    if (y > this.intensity) y = this.intensity;

    Object.assign(this.element.querySelector(".pupil").style, {
      top: 50 - x + "%",
      left: 50 - y + "%",
    });

    this.blink();
  }
  blink() {
    if (this.distance < this.sensitivity)
      this.aperture =
        ((this.sensitivity - this.distance) * 40) / this.sensitivity;
    else this.aperture = 0;

    this.element.querySelectorAll(".lid")[0].style.height = this.aperture + "%";
    this.element.querySelectorAll(".lid")[1].style.height = this.aperture + "%";
  }
  render() {
    creature.append(this.element);
  }
}

class Creature {
  constructor(amount) {
    this.eyes = new Eyes(this, amount);
    this.aim = new Aim();

    this.listen();
  }
  update(event) {
    this.aim.update(event);
    this.eyes.look();
  }
  listen() {
    document.addEventListener("mousemove", (event) => {
      this.update(event);
    });
    document.addEventListener("touchmove", (event) => {
      this.update(event);
    });
    document.addEventListener("click", this.morph);
  }
  morph() {
    creature.classList.toggle("monster");
  }
}

new Creature(2);
