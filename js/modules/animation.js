// Animation

// Generates random float in a range
let random = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Animates showcase
let animate = (track) => {
  // Finds respective item
  let item = track.querySelector(".animation-item");

  // Defines random apparent depth
  let depth = random(0.5, 1);

  // Defines random animation delay, in seconds
  let delay = random(0.5, 5);

  // Removes animation
  track.style.animationName = "";

  // Randomizes horizontal position
  track.style.left = random(0, 100) + "%";

  // Calculates animation speed
  track.style.animationDuration = 10 * (1 - depth + 0.5) + "s";

  // Calculates layer order
  track.style.zIndex = Math.round(depth * 1000);

  // Applies apparent depth
  item.style.transform = "scale(" + depth + ")";

  // Begins animation after delay
  setTimeout(() => {
    track.style.animationName = "float";
  }, delay * 1000);
};

// Gathers all elements to be animated
let tracks = document.querySelectorAll(".animation-track");

// Loops through them
for (let track of tracks) {
  // Starts animation for the first time
  animate(track);

  // Starts animation again after it ends
  track.addEventListener("animationend", () => {
    animate(event.target);
  });

  // Finds respective item
  let item = track.querySelector(".animation-item");

  // Detects clicks on each item
  item.addEventListener("click", (event) => {
    // Gets the URL
    let url = event.target.dataset.href;

    const target = url.startsWith("http") ? "_blank" : "_self";

    // Opens URL
    window.open(url, target);
  });
}

// Pauses animation when tab is inactive
document.addEventListener("visibilitychange", () => {
  // Assigns “hidden” or “visible”
  document.body.dataset.visibility = document.visibilityState;
});
