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

describe.only('day 13 challenge', ()=> {

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
                cart.move()

                expect(cart.position).to.deep.equal({ x:7, y:3})
            })
            it('modifies heading', ()=>{
                var cart = new Cart({ x:0, y:0, heading:{x:1, y:0} })
                var map = [{
                    position: { x:1, y:0 },
                    exits: [
                        { x:0, y:1 },
                        { x:-1, y:0 }
                    ]
                }]
                cart.move(map)

                expect(cart.heading).to.deep.equal({ x:0, y:1})
            })
        })

        it('has example #0', ()=>{
            var lines = puzzle.lines('day.13', 'example0.txt')
            var carts = findCartsInMapFooter(lines)

            expect(crash(carts, {})).to.deep.equal({ x:7, y:3})
        })
    })
})
