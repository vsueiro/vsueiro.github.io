(() => {

	// Generates random float in a range

	let random = ( min, max ) => {

		return Math.random() * ( max - min ) + min

	}

	// Animates showcase

	let animate = ( track ) => {

		// Removes animation
		track.style.animationName = ''

		// Randomizes horizontal position
		track.style.left = random( 0, 100 ) + '%'

		// Calculates animation speed
		track.style.animationDuration = random( 5, 10 ) + 's'

		// Randomizes animation delay, in seconds
		let delay = random( 0, 5 )

		// Begins animation after delay
		setTimeout( () => {

			track.style.animationName = 'float'

		}, delay * 1000 )

	}

	let tracks = document.querySelectorAll( '.showcase-track' )

	for ( let track of tracks ) {

		// Begins animation
		animate( track )

		// Shuffles animation properties each time it runs
		track.addEventListener( 'animationend', () => { animate( event.target ) } )

	}

})()