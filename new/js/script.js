let app = {

	random : ( min, max) => {

		return Math.random() * ( max - min ) + min
		
	},

	showcase : {

		items : [],

		reset : () => {

			// Gets index of element that concluded animation
			let index = parseInt( event.target.dataset.index )

			let item = app.showcase.items[ index ]

			// Resets all transition styles
			item.container.style.transitionProperty = 'none'
			item.container.style.transitionDuration = '0s'
			item.container.style.transitionDelay = '0s'

			setTimeout( () => {

				// Resets all positioning styles
				item.element.style.left = '0%'
				item.figure.style.transform = ''
				item.container.style.zIndex = '1'
				item.container.style.transform = 'translateY( 100% )'

				// Begins animation
				app.showcase.animate( app.showcase.items[ index ] )

			}, 100 )

		},

		animate : ( item ) => {

			console.log( 'animating', item )

			// Generates random values
			item.depth = app.random( .5, 1)
			item.left  = app.random( 0, 100 )
			item.delay = app.random( 0, 10)

			// Adds transition styles

			// Sets animation only to transform
			item.container.style.transitionProperty = 'transform'

			// Defines transition speed (inversely based on depth)
			item.container.style.transitionDuration = 20 * ( 1 - item.depth + .5) + 's'

			// Defines transition delay
			item.container.style.transitionDelay = item.delay + 's'


			setTimeout( () => {

				// Places item horizontally
				item.element.style.left = item.left + '%'

				// Scales element to simulate subtle depth
				item.figure.style.transform = 'scale(' + item.depth + ')'

				// Makes items with more depth appear behind others
				item.container.style.zIndex = Math.round( 1000 * item.depth )

				// Makes item move to destination
				item.container.style.transform = 'translateY( -100% )'

				// Resets animation when it ends
				item.container.addEventListener( 'transitionend', app.showcase.reset, { once : true } )

			}, 100 )

		},

		initialize : () => {

			// Gathers all items to be animated

			let containers = document.querySelectorAll( '.showcase-item-container' )

			for ( let container of containers ) {

				let element = container.querySelector( '.showcase-item' )
				let figure  = container.querySelector( 'figure' )

				let item = {

					container : container,
					element   : element,
					figure    : figure,

				}

				// Adds index to container, to be used on reset function
				container.dataset.index = app.showcase.items.length

				app.showcase.items.push( item )

			}

			for ( let item of app.showcase.items ) {

				app.showcase.animate( item )

			} 

		}

	},

	initialize : () => {

		app.showcase.initialize()

	}

}


app.initialize()
