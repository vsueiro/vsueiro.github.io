class Stalker {
  constructor(decay) {
    this.decay = decay || 12; // Useful range is approx. 1 (slow) 24 (fast)
    this.element = document.createElement("div");
    this.x = 0.5;
    this.y = 0.5;

    this.setup();
  }

  setup() {
    this.element.classList.add("stalker");
    document.body.append(this.element);
  }

  // By Freya Holmér https://youtu.be/LSNQuFEDOyQ
  expDecay(a, b, decay, dt) {
    return b + (a - b) * Math.exp(-decay * dt);
  }

  update(deltaTime) {
    this.x = this.expDecay(this.x, targetX, this.decay, deltaTime);
    this.y = this.expDecay(this.y, targetY, this.decay, deltaTime);

    this.element.style.left = `${this.x * 100}%`;
    this.element.style.top = `${this.y * 100}%`;
  }
}

let stalkers = [];
let lastTimestamp = 0;
let targetX = 0;
let targetY = 0;

window.addEventListener("mousemove", (event) => {
  targetX = event.clientX / window.innerWidth;
  targetY = event.clientY / window.innerHeight;
});

function setup() {
  stalkers.push(new Stalker(16));
}

setup();

function update(timestamp) {
  const deltaTime = (timestamp - lastTimestamp) / 1000;

  for (let stalker of stalkers) {
    stalker.update(deltaTime);
  }

  lastTimestamp = timestamp;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
