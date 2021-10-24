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

		// Randomizes apparent depth
		let depth = random( .5, 1 )
		track.querySelector( '.showcase-item' ).style.transform = 'translate( -50%, -50% ) scale(' + depth +')'

		// Calculates animation speed
		track.style.animationDuration = 16 * ( 1 - depth + .5 ) + 's'

		// Calculates layer order
		track.style.zIndex = Math.round( depth * 1000 )

		// Randomizes animation delay, in seconds
		let delay = random( 0, 8 )

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