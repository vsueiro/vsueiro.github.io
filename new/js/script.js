(() => {

	// Generates random float in a range

	let random = ( min, max ) => {
		return Math.random() * ( max - min ) + min
	}

	// Animates showcase

	let animate = ( track ) => {

		// Pauses animation
		track.style.animationPlayState = 'paused'

		// Randomizes horizontal position
		track.style.left = random( 0, 100 ) + '%'

		// Calculates animation speed
		track.style.animationDuration = random( 2, 6 ) + 's';

		// Randomizes animation delay, in seconds
		let delay = random( 1, 6 )

		// Begins animation after delay
		setTimeout( () => {

			track.style.animationPlayState = 'running'

		}, delay * 1000 )

	}

	let tracks = document.querySelectorAll( '.showcase-track' )

	for ( let track of tracks ) {

		// Begins animation
		animate( track )

		// Shuffles animation properties each time it runs
		// track.addEventListener( 'animationiteration', () => { animate( event.target ) } )

		// Pauses animation on hover

		let item = track.querySelector( '.showcase-item' )

		item.addEventListener( 'mouseover', () => {
			let track = item.parentElement
			track.style.animationPlayState = 'paused'
		} )

		item.addEventListener( 'mouseout', () => {
			let track = item.parentElement
			track.style.animationPlayState = 'running'
		} )

	}

})()