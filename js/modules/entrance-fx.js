// Entrance effects

// Gathers all elements to apply the transition
const elements = document.querySelectorAll( '.entrance, .flow > *, .works li' )

// Stores accessibility setting
const reducedMotion = window.matchMedia( '(prefers-reduced-motion)' ).matches

// Checks accessibility setting
if ( !reducedMotion ) {
  
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

}

// Defines arbitrary delay before triggering transitions
setTimeout( () => {

  // Triggers transitions
  document.body.dataset.entrance = true

}, 500 )