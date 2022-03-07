( function() {

  let shuffle = {

    container : document.querySelector( '.shuffle' ),

    render : function( string ) {

      for ( let i = 0; i < string.length; i++ ) {

        let char = string.charAt( i )

        let
        letter = document.createElement( 'span' )
        letter.innerHTML = char

        shuffle.container.appendChild( letter )

      }

      shuffle.standard()

    },

    random : function( start, end, increments ) {

      let numbers = []

      for ( let n = start; n <= end; n += increments ) {
        numbers.push( n )
      }

      let randomIndex = Math.floor( Math.random() * numbers.length )
      return numbers[ randomIndex ]

    },

    update : function() {

      for ( let letter of shuffle.container.childNodes ) {

        let translate = shuffle.random( -16, 16, 16 )

        letter.style.transform = 'translateY( ' + translate + '% )'

      }

    },

    standard : function() {

      let positions = [ 0, 0, -16, 0, -16, 0, -16, 0, -16 ]
      let count = 0

      for ( let letter of shuffle.container.childNodes ) {

        let translate = positions[ count ]

        letter.style.transform = 'translateY( ' + translate + '% )'

        count++

      }

    },

    auto : function() {

      let count = 0

      let interval = setInterval( function() {

        shuffle.update()

        if ( count >= 3 ) {

          clearInterval( interval )
          shuffle.standard()
          count = 0

        } else {

          count++

        }

      }, 400 )

    },

  }

  shuffle.render( 'Montadino' )

  setInterval( function() {
    shuffle.auto()
  }, 4000 )

} )()