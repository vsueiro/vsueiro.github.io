(() => {
	
	{ // Animation

		// Generates random float in a range
		let random = ( min, max ) => {
			return Math.random() * ( max - min ) + min
		}

		// Animates showcase
		let animate = ( track ) => {

			// Finds respective item
			let item = track.querySelector( '.animation-item' )

			// Defines random apparent depth
			let depth = random( .5, 1 )

			// Defines random animation delay, in seconds
			let delay = random( .5, 5 )

			// Removes animation
			track.style.animationName = ''

			// Randomizes horizontal position
			track.style.left = random( 0, 100 ) + '%'

			// Calculates animation speed
			track.style.animationDuration = 10 * ( 1 - depth + .5 ) + 's'

			// Calculates layer order
			track.style.zIndex = Math.round( depth * 1000 )

			// Applies apparent depth
			item.style.transform = 'scale(' + depth +')'

			// Begins animation after delay
			setTimeout( () => { track.style.animationName = 'float' }, delay * 1000 )

		}

		// Gathers all elements to be animated
		let tracks = document.querySelectorAll( '.animation-track' )

		// Loops through them
		for ( let track of tracks ) {

			// Starts animation for the first time
			animate( track )

			// Starts animation again after it ends
			track.addEventListener( 'animationend', () => { animate( event.target ) } )

			// Finds respective item
			let item = track.querySelector( '.animation-item' )

			// Detects clicks on each item
			item.addEventListener( 'click', event => {

				// Gets the URL
				let url = event.target.dataset.href

				// Opens URL
				window.open( url, '_self' )

			} )

		}

	}

	{ // Clipboard

		// Gathers all elements to be copied
		let clipboards = document.querySelectorAll( '.clipboard' )

		// Loops through them
		for ( let clipboard of clipboards ) {

			// Waits for click on clipboard component
			clipboard.addEventListener( 'click', event => {

				// Defines respective button and button text
				let button = clipboard.querySelector( 'button' )
				let span   = button.querySelector( 'span' )

				// Checks if click was on button
				if ( event.target === button ) {

					// Gathers the desired text 
					let text = clipboard.querySelector( 'span' ).textContent
					
					// Tries to copy to clipboard
					navigator.clipboard.writeText( text )
						.then(
							success => {

								// Applies success styling 
								clipboard.classList.add( 'success' )

								// Changes text
								span.textContent = 'Copied'

								// Reverts changes after 2s
								setTimeout( () => {
									clipboard.classList.remove( 'success' )
									span.textContent = 'Copy'
								}, 2000 )
								
							}, 
							error => {

								// Changes text
								span.textContent = 'Error'

								// Disables button
								button.disabled = true
								
							}
						)

				}

			} )

		}

	}

	{ // Safari Fixes

		// Checks if browser is Safari
  	const safari = /^((?!chrome|android).)*safari/i.test( navigator.userAgent )

  	// Checks if system is iOS
  	const ios = /iP(ad|od|hone)/i.test( window.navigator.userAgent )

  	if ( ios && safari ) {

  		// Creates browser-specific attribute
  		document.body.dataset.browser = 'safari'

			{ // Fixes autoplay for (some) iPhones

		    // Checks if a video is currently playing
		    const playing = ( video ) => {

		      if ( video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2 )
		        return true

		    }

		    // Defines autoplay function
		    const autoplay = () => {

		      // Gathers all videos on the page
		      let videos = document.querySelectorAll( 'video' )

		      // Loops through them
		      for ( let video of videos ) {

		        // Plays the video (if it was supposed to be playing)
		        if ( video.hasAttribute( 'autoplay' ) && !playing( video ) )
		          video.play()

		      }

		    }

		    // Runs autoplay function every time users touch the screen
		    document.addEventListener( 'touchstart', autoplay )

		  }

		}

	}

	{ // Entrance FX

		// Gathers all elements to apply the transition
		const elements = document.querySelectorAll( '.entrance, .flow > *, .works li' )

		// Defines arbitrary constant to calculate transition delay, in seconds
		const basis = 1

		// Loops through them
		for ( let order = 1; order < elements.length; order++ ) {

			// Gets current element
			let element = elements[ order ]

			// Increases number to prevent delay of 0
			let number = order + 1

			// Calculates delay (log makes delay smaller each time)
			let delay = basis * Math.log( number )

			// Applies transition delay
			element.style.transitionDelay = delay + 's'

		}

		// Defines arbitrary delay before triggering transitions
		setTimeout( () => {

			// Triggers transitions
			document.body.dataset.entrance = true

		}, 500 )

	}

	{ // Enables click on project thumbnail

		// Gathers all items from the works list
		let items = document.querySelectorAll( '.works li' )

		// Loops through them
		for ( let item of items ) {

			// Detects when the user clicks it
			item.addEventListener( 'click', event => {

				// Gets respective anchor
				let anchor = item.querySelector( 'a' )

				// Runs only if click was not on the anchor itself
				if ( event.target !== anchor ) {

					// Gets respective URL
					let url = anchor.href

					// Opens URL
					window.open( url, '_self' )

				}

			} )

		}

	}

})()
