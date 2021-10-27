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
			let delay = random( 0, 8 )

			// Removes animation
			track.style.animationName = ''

			// Randomizes horizontal position
			track.style.left = random( 0, 100 ) + '%'

			// Calculates animation speed
			track.style.animationDuration = 16 * ( 1 - depth + .5 ) + 's'

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
								span.textContent = 'Copied ✨'

								// Reverts changes after 2s
								setTimeout( () => {
									clipboard.classList.remove( 'success' )
									span.textContent = 'Copy'
								}, 2000 )
								
							}, 
							error => {

								// Changes text
								span.textContent = 'Error 💔'

								// Disables button
								button.disabled = true
								
							}
						)

				}

			} )

		}

	}

})()
