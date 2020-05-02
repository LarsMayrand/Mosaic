// console.time()

// // const draw = SVG(document.body)

// const draw = SVG().addTo('body').size(300,300);

// const Hex = Honeycomb.extendHex({ size: 5 })
// const Grid = Honeycomb.defineGrid(Hex)
// // get the corners of a hex (they're the same for all hexes created with the same Hex factory)
// const corners = Hex().corners()
// // an SVG symbol can be reused
// const hexSymbol = draw.symbol()
//     // map the corners' positions to a string and create a polygon
//     .polygon(corners.map(({ x, y }) => `${x},${y}`))
//     .fill('none')
//     .stroke({ width: 1, color: '#999' })

// // render 10,000 hexes
// Grid.rectangle({ width: 100, height: 100 }).forEach(hex => {
//     const { x, y } = hex.toPoint()
//     // use hexSymbol and set its position for each hex
//     draw.use(hexSymbol).translate(x, y)
// })






// var draw = SVG().addTo('body').size(300, 300)
// var rect = draw.rect(100, 100).attr({ fill: '#f06' })



// Scroll down to try the different grid shape methods.
// Also try changing the hex orientation to 'flat' (line 7) or the
// hex offset to 1.

const draw = SVG(document.body)
const Hex = Honeycomb.extendHex({
  size: 20,
  // orientation: 'flat',	// default: 'pointy'
  // offset: 1,						// default: -1

  render(draw) {
    const position = this.toPoint()
    const centerPosition = this.center().add(position)

    this.draw = draw

		// draw the hex
    this.draw
      .polygon(this.corners().map(({ x, y }) => `${x},${y}`))
      .fill('none')
      .stroke({ width: 1, color: '#999' })
      .translate(position.x, position.y)

    const fontSize = 12

		// draw x and y coordinates
    this.draw
      .text(`${this.x},${this.y}`)
      .font({
        size: fontSize,
        anchor: 'middle',
        leading: 1.4,
        fill: '#69c'
      })
      .translate(centerPosition.x, centerPosition.y - fontSize)
  }
})
const Grid = Honeycomb.defineGrid(Hex)

Grid.rectangle({
  width: 10,					// value:		number (with in hexes)
  height: 10,					// value:		number (height in hexes)
  start: [0, 0],			// value: 	any point
                      // default:	[0, 0]
  direction: 0,				// value:		0, 1, 2, 3, 4 or 5
                      // default:	0 for pointy hexes, 1 for flat hexes
  onCreate: renderHex
})

/*
Grid.triangle({
  size: 10,						// value:		number (side in hexes)
  start: [0, 0],			// value: 	any point
                      // default:	[0, 0]
  direction: 1,				// value:		1 or 5
                      // default:	1
  onCreate: renderHex
})
*/

/*
Grid.hexagon({
  radius: 5,					// value:		number (excluding center hex)
  center: [5, 5],			// value: 	any point
                      // default:	[0, 0]
  onCreate: renderHex
})
*/

/*
Grid.parallelogram({
  width: 10,					// value:		number (with in hexes)
  height: 10,					// value:		number (height in hexes)
  start: [0, 0],			// value: 	any point
                      // default:	[0, 0]
  direction: 1,				// value:		1, 3 or 5
                      // default:	1
  onCreate: renderHex
})
*/

function renderHex(hex) {
    hex.render(draw)
}