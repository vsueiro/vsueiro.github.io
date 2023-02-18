// Enables click on project thumbnail

// Gathers all items from the works list
let items = document.querySelectorAll(".works li");

// Loops through them
for (let item of items) {
  // Skip item if its <a> tag has the disabled attribute
  if (item.querySelector("a").hasAttribute("disabled")) {
    continue;
  }

  // Make it look clicable by changing the cursor
  item.style.cursor = "pointer";

  // Detects when the user clicks it
  item.addEventListener("click", (event) => {
    // Gets respective anchor
    let anchor = item.querySelector("a");

    // Runs only if click was not on the anchor itself
    if (event.target !== anchor) {
      // Gets respective URL
      let url = anchor.href;

      // Opens URL
      window.open(url, "_self");
    }
  });
}
