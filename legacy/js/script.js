(() => {

  // Autoplay fix for (some) iPhones

  // Checks if browser is Safari
  const safari = /^((?!chrome|android).)*safari/i.test( navigator.userAgent )

  if ( safari ) {

    // Checks if a video is currently playing
    const playing = ( video ) => {

      if ( video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2 )
        return true

    }

    // Defines autoplay function
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

  }

})()
