// Rotator

let ems = document.querySelectorAll("#rotator em");
let current = 0;
let timeout;

// Overlap all <em> elements
ems.forEach((em, index) => {
  em.style.transform = `translateY(-${1.5 * index}em)`;
});

function showNext() {
  // Hide current <em>
  ems[current].classList.remove("show");

  // Get next <em>
  let next = getRandomIndex(ems.length, current);
  current = next;

  // Show next <em>
  ems[next].classList.add("show");

  // Reset timer
  clearTimeout(timeout);

  // Change the em element after 4 seconds
  timeout = setTimeout(showNext, 4000);
}

// Get a random index, but not the same as the current one
function getRandomIndex(max, exclude) {
  let randomIndex = Math.floor(Math.random() * max);
  return randomIndex === exclude ? getRandomIndex(max, exclude) : randomIndex;
}

// Change the em element after 5 seconds
timeout = setTimeout(showNext, 5000);

// Change the em element on click
document.querySelector("#rotator span").addEventListener("click", showNext);
