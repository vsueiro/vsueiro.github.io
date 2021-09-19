(() => {

  alert( 'If you’re seeing this, this is the most recent version' )

  // Autoplay fix for (some) iPhones

  // Checks if a video is currently playing
  const playing = ( video ) => {

    if ( video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2 )
      return true

  }

  const autoplay = () => {

    // Loops through all videos on the page
    let videos = document.querySelectorAll( 'video' )

    for ( let video of videos ) {

      // Plays the video (if it was supposed to be playing)
      if ( video.hasAttribute( 'autoplay' ) && !playing( video ) )
        video.play()

    }

  }

  // Runs autoplay function every time users touch the screen
  document.addEventListener( 'touchstart', autoplay )

})()
