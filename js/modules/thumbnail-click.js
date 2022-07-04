// Enables click on project thumbnail

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