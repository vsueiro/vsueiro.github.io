let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let particles = [];

class Particle {
  constructor() {
    this.radius = 4;

    this.position = {};
    this.velocity = {};

    this.position.x = Math.random() * canvas.width;
    this.position.y = Math.random() * canvas.height;

    this.velocity.x = this.radius * (Math.random() - 0.5);
    this.velocity.y = this.radius * (Math.random() - 0.5);
  }

  wrap() {
    if (this.position.x > canvas.width) this.position.x = 0;

    if (this.position.x < 0) this.position.x = canvas.width;

    if (this.position.y > canvas.height) this.position.y = 0;

    if (this.position.y < 0) this.position.y = canvas.height;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.wrap();
  }

  show() {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "HotPink";
    context.fill();
  }
}

function setup() {
  canvas.width = 640;
  canvas.height = 360;

  for (let i = 0; i < 1000; i++) particles.push(new Particle());
}

function draw() {
  context.globalAlpha = 0.05;
  context.fillStyle = "Indigo";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;

  for (let particle of particles) {
    particle.update();
    particle.show();
  }

  requestAnimationFrame(draw);
}

setup();
draw();
