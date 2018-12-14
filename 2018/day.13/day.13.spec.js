const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    crash,
    inspect,
    Cart,
    sort
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
})
