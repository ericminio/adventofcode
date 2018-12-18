const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    crash,
    inspect,
    Cart,
    sort,
	displayCart
} = require('./lib')
var findCartsInMap = require('./cart.parser')
var findCartsInMapFooter = require('./cart.footer')
var parseMap = require('./map.parser')

describe('day 13 challenge', ()=> {

    describe('part 1', ()=>{

        describe('exploration', ()=>{
            it('is ready', ()=>{
                expect(1+1).to.equal(2)
            })
        })
        describe('cart input', ()=>{
            // var lines = puzzle.lines('day.13', 'input.txt')
            // var carts = findCartsInMap(lines);
            // sort(carts)
            // carts.forEach((cart)=>{
            //     console.log('cart:', cart.position.x, cart.position.y, cart.heading.x, cart.heading.y);
            // })
        })
        describe('map parser', ()=>{
            it('understands -', ()=>{
                var map = parseMap(['-']);
                expect(map).to.deep.equal([{
                    position: { x:0, y:0 },
                    exits:[ { x:1, y:0 }, { x:-1, y:0 }]
                }])
            })
            it('understands |', ()=>{
                var map = parseMap(['|']);
                expect(map).to.deep.equal([{
                    position: { x:0, y:0 },
                    exits:[ { x:0, y:1 }, { x:0, y:-1 }]
                }])
            })
            it('understands +', ()=>{
                var map = parseMap(['+']);
                expect(map).to.deep.equal([{
                    position: { x:0, y:0 },
                    exits:[
                        { x:0, y:1 }, { x:0, y:-1 },
                        { x:1, y:0 }, { x:-1, y:0 }
                    ]
                }])
            })
            it('understands top-left /', ()=>{
                var map = parseMap([
                    '/-',
                    '| '
                ]);
                expect(map[0].exits).to.deep.equal([
                    { x:1, y:0 }, { x:0, y:1 }
                ])
            })
            it('understands bottom-right /', ()=>{
                var map = parseMap([
                    ' |',
                    '-/'
                ]);
                expect(map[2].exits).to.deep.equal([
                    { x:-1, y:0 }, { x:0, y:-1 }
                ])
            })
            it('understands bottom-left \\', ()=>{
                var map = parseMap([
                    '| ',
                    '\\-'
                ]);
                expect(map[1].exits).to.deep.equal([
                    { x:1, y:0 }, { x:0, y:-1 }
                ])
            })
            it('understands top-right \\', ()=>{
                var map = parseMap([
                    '-\\',
                    ' |'
                ]);
                expect(map[1].exits).to.deep.equal([
                    { x:-1, y:0 }, { x:0, y:1 }
                ])
            })
        })
        describe('crash detection', ()=>{
            it ('works', ()=>{
                expect(inspect([
                    new Cart({ x:7, y:3 }),
                    new Cart({ x:7, y:3 }),
                ])).to.deep.equal({ x:7, y:3 })
            })
            it ('works with different data', ()=>{
                expect(inspect([
                    new Cart({ x:1, y:2 }),
                    new Cart({ x:1, y:2 }),
                ])).to.deep.equal({ x:1, y:2 })
            })
            it ('works with different 3 carts', ()=>{
                expect(inspect([
                    new Cart({ x:10, y:20 }),
                    new Cart({ x:1, y:2 }),
                    new Cart({ x:1, y:2 }),
                ])).to.deep.equal({ x:1, y:2 })
            })
            it ('resists unordered carts', ()=>{
                expect(inspect([
                    new Cart({ x:1, y:2 }),
                    new Cart({ x:10, y:20 }),
                    new Cart({ x:1, y:2 }),
                ])).to.deep.equal({ x:1, y:2 })
            })
        })
        describe('move', ()=>{
            it('follows heading', ()=>{
                var cart = new Cart({ x:7, y:2, heading:{x:0, y:1} })
                cart.move([{
                    position: { x:7, y:3 },
                    exits: [
                        { x:0, y:1 }
                    ]
                }])

                expect(cart.position).to.deep.equal({ x:7, y:3})
            })
        })
        describe('turns', ()=>{
            it('turns left the first time', ()=>{
                var cart = new Cart({ x:0, y:0, heading:{x:1, y:0} })
                var map = [{
                    position: { x:0, y:0 },
                    exits: [
                        { x:1, y:0 },
                        { x:0, y:1 },
                        { x:-1, y:0 },
                        { x:0, y:-1 }
                    ]
                }]
                cart.modifyHeading(map)

                expect(cart.heading).to.deep.equal({ x:0, y:-1})
            })
            it('goes strait the second time', ()=>{
                var cart = new Cart({ x:0, y:0, heading:{x:0, y:1} })
                var map = [{
                    position: { x:0, y:0 },
                    exits: [
                        { x:1, y:0 },
                        { x:0, y:1 },
                        { x:-1, y:0 },
                        { x:0, y:-1 }
                    ]
                }]
                cart.modifyHeading(map)
                cart.modifyHeading(map)

                expect(cart.heading).to.deep.equal({ x:1, y:0})
            })
            it('turns right the third time', ()=>{
                var cart = new Cart({ x:0, y:0, heading:{x:-1, y:0} })
                var map = [{
                    position: { x:0, y:0 },
                    exits: [
                        { x:1, y:0 },
                        { x:0, y:1 },
                        { x:-1, y:0 },
                        { x:0, y:-1 }
                    ]
                }]
                cart.modifyHeading(map)
                cart.modifyHeading(map)
                cart.modifyHeading(map)

                expect(cart.heading).to.deep.equal({ x:-1, y:0})
            })
            it('turns left again the fourth time', ()=>{
                var cart = new Cart({ x:0, y:0, heading:{x:-1, y:0} })
                var map = [{
                    position: { x:0, y:0 },
                    exits: [
                        { x:1, y:0 },
                        { x:0, y:1 },
                        { x:-1, y:0 },
                        { x:0, y:-1 }
                    ]
                }]
                cart.modifyHeading(map)
                cart.modifyHeading(map)
                cart.modifyHeading(map)
                cart.modifyHeading(map)

                expect(cart.heading).to.deep.equal({ x:0, y:1})
            })
            it('follows the natural flow when turn is not on an intersection', ()=>{
                var cart = new Cart({ x:0, y:0, heading:{x:1, y:0} })
                var map = [{
                    position: { x:0, y:0 },
                    exits: [
                        { x:0, y:1 },
                        { x:-1, y:0 }
                    ]
                }]
                cart.modifyHeading(map)

                expect(cart.heading).to.deep.equal({ x:0, y:1 })
            })
            it('follows straight when this is the only option', ()=>{
                var cart = new Cart({ x:0, y:0, heading:{x:0, y:1} })
                var map = [{
                    position: { x:0, y:0 },
                    exits: [
                        { x:0, y:1 },
                        { x:0, y:-1 }
                    ]
                }]
                cart.modifyHeading(map)

                expect(cart.heading).to.deep.equal({ x:0, y:1 })
            })
            it('resists turn that are not an intersection', ()=>{
                var cart = new Cart({ x:0, y:0, heading:{x:1, y:0} })
                var map = parseMap([
                    '-\\',
                    ' |',
                    ' +-'
                ]);
                cart.move(map)
                cart.move(map)
                cart.move(map)
                cart.move(map)

                expect(cart.position).to.deep.equal({ x:2, y:2 })
            })
            it('resists turn-around', ()=>{
                var cart = new Cart({ x:1, y:1, heading:{x:0, y:-1} })
                var map = parseMap([
                    '/+',
                    '||'
                ]);
                cart.move(map)
                cart.move(map)
                cart.move(map)

                expect(cart.position).to.deep.equal({ x:0, y:1 })
            })
            it('resists two turns', ()=>{
                var cart = new Cart({ x:0, y:2, heading:{x:1, y:0} })
                var map = parseMap([
                    ' /--',
                    ' +  ',
                    '-+  '
                ]);
                cart.move(map)
                cart.move(map)
                cart.move(map)
                cart.move(map)

                expect(cart.position).to.deep.equal({ x:2, y:0 })
            })
        })
        it('has an example', ()=>{
            var lines = puzzle.raw('day.13', 'example.txt')
            var carts = findCartsInMap(lines)
            var map = parseMap(lines)

            expect(crash(carts, map)).to.deep.equal({ x:7, y:3})
        })
        it('is solved', ()=>{
            var lines = puzzle.raw('day.13', 'input.txt')
            var carts = findCartsInMap(lines)
            var map = parseMap(lines)

            expect(crash(carts, map)).to.deep.equal({ x: 91, y: 69 })
        })

    })

	describe('part 2', ()=>{

		var reduceAfterEachMove = function(carts, map) {
			while (carts.length > 1) {
				var i = 0
				while (i < carts.length) {
					var cart = carts[i]
		            cart.move(map)
					var collisionIndex = -1
					for (var j = 0; j < carts.length; j++) {
						if (j != i
							&& carts[j].position.x == carts[i].position.x
							&& carts[j].position.y == carts[i].position.y) {
							collisionIndex = j
						}
					}
					if (collisionIndex !== -1) {
						carts.splice(collisionIndex, 1)
						if (collisionIndex < i) {
							i--
						}
						carts.splice(i, 1)
						i--
					}
					i++
				}
				sort(carts)
		    }
			return carts
		}

		it('has an example (reduceAfterEachMove)', ()=>{
            var lines = puzzle.raw('day.13', 'example2.txt')
            var carts = findCartsInMap(lines)
            var map = parseMap(lines)
			carts = reduceAfterEachMove(carts, map)

			expect(carts.length).to.equal(1)
			expect(carts[0].position).to.deep.equal({ x:6, y:4 })
        })
		it.skip('is solved (reduceAfterEachMove)', ()=>{
            var lines = puzzle.raw('day.13', 'input.txt')
            var carts = findCartsInMap(lines)
            var map = parseMap(lines)
			carts = reduceAfterEachMove(carts, map)

			expect(carts.length).to.equal(1)
			expect(carts[0].position).to.deep.equal({ x:44, y:87 })

        })
	})
})
