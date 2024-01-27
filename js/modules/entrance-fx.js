// Entrance effects

// Gathers all elements to apply the transition
const elements = document.querySelectorAll(".entrance, .flow > *, .works li");

// Stores if reduced motion accessibility setting is on
const reducedMotion = window.matchMedia("(prefers-reduced-motion)").matches;

// Stores if page is already significantly scrolled  (e.g., if user reloads after scrolling past the “fold”)
const isScrolled = document.documentElement.scrollTop > window.innerHeight;

// Stores if there is a hash (e.g., "#work") in the URL
const hasHash = window.location.hash.length > 0;

// Checks if accessibility setting is off and page is not scrolled
if (!reducedMotion && !isScrolled && !hasHash) {
  // Defines arbitrary constant to calculate transition delay, in seconds
  let basis = 1;

  // Loops through them
  for (let order = 1; order < elements.length; order++) {
    // Gets current element
    let element = elements[order];

    // Increases number to prevent delay of 0
    let number = order + 1;

    // Calculates delay (log makes delay smaller each time)
    let delay = basis * Math.log(number);

    // Applies transition delay
    element.style.transitionDelay = delay + "s";
  }
}

// Defines arbitrary delay before triggering transitions
setTimeout(() => {
  // Triggers transitions
  document.body.dataset.entrance = true;
}, 500);
