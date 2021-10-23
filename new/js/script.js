let app = {

	random : ( min, max ) => {

		return Math.random() * ( max - min ) + min
		
	},

	showcase : {

		items : [],

		animate : () => {

			for ( let item of app.showcase.items ) {

				item.element.style.left = item.left + '%';

			}

		},

		initialize : () => {

			let elements = document.querySelectorAll( '.showcase-item-container' )

			for ( let element of elements ) {

				let item = {

					element  : element,
					status   : undefined,
					depth    : app.random( 0.8, 1.2 ),
					left     : app.random( 0, 100 )

				}

				app.showcase.items.push( item )

			}

			app.showcase.animate()

		}

	},

	initialize : () => {

		app.showcase.initialize()

	}

}


app.initialize()
