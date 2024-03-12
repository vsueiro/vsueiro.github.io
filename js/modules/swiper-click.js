// Enables click to advance image carousel

// Gathers all <swiper-container> elements from the page
const swiperElements = document.querySelectorAll("swiper-container");

// Loops through every swiper element on the page
for (let swiperElement of swiperElements) {
  // Detects when user clicks it
  swiperElement.addEventListener("click", () => {
    // Goes to the next slide
    swiperElement.swiper.slideNext();
  });
}
