(() => {

	// Generates random float in a range

	const random = ( min, max ) => {
		return Math.random() * ( max - min ) + min
	}

	// Animates showcase

	const animate = ( track ) => {

		// Randomizes horizontal position
		track.style.left = random( 0, 100 ) + '%'

		// Randomizes animation initial delay
		// track.style.animationDelay = random( 2, 6 ) + 's';

		// Randomizes depth

		// Calculates item scale

		// Calculates item layer

		// Calculates animation speed
		// track.style.animationDuration = random( 2, 6 ) + 's';

	}

	const reset = () => {

		const track = event.target
		animate( track )

	}

	const tracks = document.querySelectorAll( '.showcase-track' )

	for ( let track of tracks ) {

		// Begins animation
		animate( track )

		// Shuffles animation properties each time it runs
		track.addEventListener( 'animationiteration', reset )

	}

})()