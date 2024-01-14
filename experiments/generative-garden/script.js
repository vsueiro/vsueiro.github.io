const garden = document.querySelector("#garden");
const delay = 100;

function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function hide(element) {
  element.style.opacity = 0;
}

function show(element) {
  element.style.opacity = 1;
}

function add(parent, child) {
  parent.append(child);
}

function seed() {
  let seeds = random(1, 6);

  // Removes all plants from garden
  garden.replaceChildren();

  for (let i = 0; i < seeds; i++) {
    let plant, stem, leaf, leaves, sleep;

    sleep = random(0, seeds) * delay;

    plant = document.createElement("div");
    plant.classList.add("plant");

    stem = document.createElement("div");
    stem.classList.add("stem");

    plant.append(stem);

    leaves = random(1, 6);

    for (let j = 0; j < leaves; j++) {
      leaf = document.createElement("div");
      leaf.classList.add("leaf");

      setTimeout(add, sleep + delay * (j + 1), plant, leaf);
    }

    hide(plant);
    setTimeout(show, sleep, plant);

    garden.append(plant);
  }
}

seed();

document.addEventListener("click", seed);
