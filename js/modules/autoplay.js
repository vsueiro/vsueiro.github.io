// Autoplay videos based on accessibility setting

// Track reduced motion setting
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

// Define function to play or pause videos
function toggleVideos() {

  // Get all videos that should autoplay on the page
  const videos = document.querySelectorAll("video[autoplay]");

  // Create alias for clarity
  const reducedMotion = mediaQuery.matches;

  // If users prefer reduced motion
  if (reducedMotion) {

    // Pause all videos and show user controls    
    videos.forEach(video => {
      video.pause()
      video.controls = true;
    });

    // Stop executing
    return;
  }
  
  // Otherwise, play all videos and hide controls
  videos.forEach(video => {
    video.play();
    video.controls = false;
  });
}

// On load
toggleVideos();

// On change
mediaQuery.addEventListener("change", toggleVideos);