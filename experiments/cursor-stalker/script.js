let stalker;

let lastTimestamp = 0;
let targetX = 0;
let targetY = 0;
let stalkerX = 0;
let stalkerY = 0;

window.addEventListener("mousemove", function (event) {
  targetX = event.clientX / window.innerWidth;
  targetY = event.clientY / window.innerHeight;
});

// By Freya Holmér
// https://youtu.be/LSNQuFEDOyQ

function expDecay(a, b, decay, dt) {
  return b + (a - b) * Math.exp(-decay * dt);
}

function setup() {
  stalker = document.createElement("div");
  stalker.classList.add("stalker");
  document.body.append(stalker);
}

setup();

function update(timestamp) {
  const deltaTime = (timestamp - lastTimestamp) / 1000;

  // Useful range is approx. 1 (slow) 25 (fast)
  const decay = 12;

  stalkerX = expDecay(stalkerX, targetX, decay, deltaTime);
  stalkerY = expDecay(stalkerY, targetY, decay, deltaTime);

  stalker.style.left = `${stalkerX * 100}%`;
  stalker.style.top = `${stalkerY * 100}%`;

  lastTimestamp = timestamp;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
