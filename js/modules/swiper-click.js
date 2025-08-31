// // Enables click to advance image carousel

// // Gathers all <swiper-container> elements from the page
// const swiperElements = document.querySelectorAll("swiper-container");

// // Loops through every swiper element on the page
// for (let swiperElement of swiperElements) {
//   // Detects when user clicks it
//   swiperElement.addEventListener("click", (event) => {

//     console.log(event.target.tagName, event.target.classList)

//     // Ignore clicks on caption
//     if (event.target.tagName === "FIGCAPTION") {
//       return;
//     }

//     // Goes to the next slide
//     swiperElement.swiper.slideNext();
//   });
// }
