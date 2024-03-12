// Safari Fixes

// Checks if browser is Safari
const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Creates browser-specific attribute
if (safari) {
  document.body.dataset.browser = "safari";
}

// Checks if system is iOS
const ios = /iP(ad|od|hone)/i.test(window.navigator.userAgent);

// Checks if users is on iOS Safari
if (ios && safari) {
  {
    // Fixes autoplay for (some) iPhones

    // Checks if a video is currently playing
    const playing = (video) => {
      if (
        video.currentTime > 0 &&
        !video.paused &&
        !video.ended &&
        video.readyState > 2
      )
        return true;
    };

    // Defines autoplay function
    const autoplay = () => {
      // Gathers all videos on the page
      let videos = document.querySelectorAll("video");

      // Loops through them
      for (let video of videos) {
        // Plays the video (if it was supposed to be playing)
        if (video.hasAttribute("autoplay") && !playing(video)) video.play();
      }
    };

    // Runs autoplay function every time users touch the screen
    document.addEventListener("touchstart", autoplay);
  }
}
