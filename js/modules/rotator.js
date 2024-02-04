// Rotator

// Get text rotator swiper
const rotatorSwiper = document.querySelector("#rotator swiper-container");

// Add click event listener
rotatorSwiper.addEventListener("click", () => {
  // Get the number of slides
  const total = rotatorSwiper.swiper.slides.length;

  // Get the current active slide index
  const current = rotatorSwiper.swiper.activeIndex;

  let randomSlide;
  // Generate a random slide index
  do {
    randomSlide = Math.floor(Math.random() * total);
  } while (randomSlide === current); // Ensure it's not the current slide

  // Slide to the random slide
  rotatorSwiper.swiper.slideTo(randomSlide);
});
