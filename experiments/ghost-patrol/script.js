let cemetery = document.querySelector(".cemetery");
let graves = cemetery.querySelector(".graves");
let ghostContainer = document.querySelector(".ghost-container");
let ghost = ghostContainer.querySelector(".ghost");
let current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

ghostContainer.style.top = current.y + "px";
ghostContainer.style.left = current.x + "px";

function handleClick(event) {
  let threshold = 10;

  ghost.dataset.moving = "false";

  if (current.x > event.x + threshold) {
    ghost.dataset.moving = "left";
  } else if (current.x < event.x - threshold) {
    ghost.dataset.moving = "right";
  }

  ghostContainer.style.top = event.y + "px";
  ghostContainer.style.left = event.x + "px";

  if (!("isFakeClick" in event)) {
    let target = document.createElement("div");
    target.classList.add("target");
    document.body.appendChild(target);
    target.style.top = event.y + "px";
    target.style.left = event.x + "px";

    setTimeout(() => {
      target.remove();
    }, 1000);
  }

  current = { x: event.x, y: event.y };
}

cemetery.onclick = handleClick;

setInterval(() => {
  let delay = Math.random() * 800;
  setTimeout(() => {
    let offsetY = -104 - Math.random() * 24;
    let offsetX = -40 + Math.random() * 80;
    let size = 8 + Math.random() * 8;
    let opacity = 0.25 + Math.random() * 0.25;

    let sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    document.body.appendChild(sparkle);
    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";
    sparkle.style.opacity = opacity;
    sparkle.style.top = current.y + offsetY + "px";
    sparkle.style.left = current.x + offsetX + "px";

    setTimeout(() => {
      sparkle.remove();
    }, 1600);
  }, delay);
}, 200);

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    handleClick({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      isFakeClick: true,
    });
  }
});

for (let i = 0; i < 100; i++) {
  let chance = Math.random() < 0.75;

  let slot = document.createElement("div");
  slot.classList.add("slot");

  if (chance) {
    let type = Math.floor(Math.random() * 3) + 0;
    let rotation = Math.random() * 32 - 16;

    let grave = document.createElement("div");
    grave.classList.add("grave", "type-" + type);
    grave.style.transform = "rotate(" + rotation + "deg) translate(0, 12px)";

    if (type === 2) {
      grave.innerText = "✝";
    }

    let offsetX = Math.random() * 16 - 8;
    let offsetY = Math.random() * 16 - 8;

    slot.style.transform = "translate(" + offsetX + "px, " + offsetY + "px)";

    slot.append(grave);
  }

  graves.append(slot);
}
