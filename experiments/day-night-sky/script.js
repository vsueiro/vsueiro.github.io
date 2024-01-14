const sky = document.querySelector("#sky");

function animate() {
  sky.classList.toggle("day");
}

document.addEventListener("click", animate);
