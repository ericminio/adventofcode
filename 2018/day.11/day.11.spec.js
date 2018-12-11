const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    power,
    largest
} = require('./lib')

describe('day 11 challenge', ()=> {

    describe('part 1', ()=>{

        describe('exploration', ()=>{
            it('is ready', ()=>{
                var cell = {
                    x:3,
                    y:5,
                    serial:8
                }
                expect(power(cell)).to.equal(4)
            })
            it('is promising', ()=>{
                expect(power({ x:122, y:79, serial:57 })).to.equal(-5)
                expect(power({ x:217, y:196, serial:39 })).to.equal(0)
                expect(power({ x:101, y:153, serial:71 })).to.equal(4)

                expect(power({ x:33, y:45, serial:18 })).to.equal(4)
                expect(power({ x:34, y:45, serial:18 })).to.equal(4)
                expect(power({ x:35, y:45, serial:18 })).to.equal(4)

                expect(power({ x:33, y:46, serial:18 })).to.equal(3)
                expect(power({ x:34, y:46, serial:18 })).to.equal(3)
                expect(power({ x:35, y:46, serial:18 })).to.equal(4)
            })
            it.skip('full of promises', ()=>{
                expect(largest(18)).to.deep.equal({ x:33, y:45, power:29, size:3 })
                expect(largest(42)).to.deep.equal({ x:21, y:61, power:30, size:3 })
            })
        })
        it.skip('is solved', ()=>{
            expect(largest(3031)).to.deep.equal({ x:21, y:76, power:30, size:3 })
        })
    })

    describe.skip('part 2', ()=>{

        describe('exploration', ()=>{
            it('is ready', ()=>{
                expect(1+1).to.equal(2)
            })
            it.skip('is promising', ()=>{
                expect(largest(18)).to.deep.equal({ x:90, y:269, power:113, size:16 })
            })
        })

        it.skip('is solved', ()=>{
            expect(largest(3031)).to.deep.equal({ x:234, y:108, power:160, size:16 })
        })
    })
})
