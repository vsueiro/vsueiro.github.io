// Clipboard

// Gathers all elements to be copied
let clipboards = document.querySelectorAll(".clipboard");

// Loops through them
for (let clipboard of clipboards) {
  // Waits for click on clipboard component
  clipboard.addEventListener("click", (event) => {
    // Defines respective button and button text
    let button = clipboard.querySelector("button");
    let span = button.querySelector("span");

    // Checks if click was on button
    if (event.target === button) {
      // Gathers the desired text
      let text = clipboard.querySelector("span").textContent;

      // Tries to copy to clipboard
      navigator.clipboard.writeText(text).then(
        (success) => {
          // Applies success styling
          clipboard.classList.add("success");

          // Changes text
          span.textContent = "Copied";

          // Reverts changes after 2s
          setTimeout(() => {
            clipboard.classList.remove("success");
            span.textContent = "Copy";
          }, 2000);
        },
        (error) => {
          // Changes text
          span.textContent = "Error";

          // Disables button
          button.disabled = true;
        }
      );
    }
  });
}
