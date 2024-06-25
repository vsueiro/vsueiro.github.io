const unfolding = document.querySelector(".unfolding");
const card = document.querySelector(".card");
const upper = card.querySelector(".upper .paper");
const lower = card.querySelector(".lower .paper");
const papers = document.querySelectorAll(".folds .paper");

// Create a GSAP timeline
const timeline = gsap.timeline({ paused: true });
const duration = 0.25;

// Add animations to the timeline
timeline
  .to(lower, {
    rotationX: 90,
    duration: duration,
    ease: "power1.in",
  })
  .to(papers[0], {
    rotationX: 0,
    duration: duration,
    ease: "power1.out",
    backgroundColor: "#f8f8ff",
  })
  .to(papers[1], {
    rotationX: 0,
    duration: duration,
    ease: "power1.out",
    backgroundColor: "#f8f8ff",
  })
  .to(papers[2], {
    rotationX: 0,
    duration: duration,
    ease: "power1.out",
    backgroundColor: "#f8f8ff",
  })
  .to(papers[3], {
    rotationX: 0,
    duration: duration,
    ease: "power1.out",
    backgroundColor: "#f8f8ff",
  });
// .to(papers[4], {
//   rotationX: 0,
//   duration: duration,
// })
// .to(papers[5], {
//   rotationX: 0,
//   duration: duration,
// });

unfolding.addEventListener("click", () => {
  if (timeline.reversed()) {
    timeline.play();
  } else {
    timeline.reverse();
  }
});
