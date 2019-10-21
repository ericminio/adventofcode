const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    parse,
    strongest,
    inRange
} = require('./lib')

describe('day 23 challenge', ()=> {

	describe('part 1', ()=>{

		it('has an example', ()=>{
			var lines = puzzle.lines('day.23', 'example.txt')
            var nanobots = parse(lines)
            var nanobot = strongest(nanobots)
            expect(nanobot).to.deep.equal({ x:0, y:0, z:0, r:4 })

            var count = inRange(nanobot, nanobots)
            expect(count).to.equal(7)
		})

        it('is solved', ()=>{
			var lines = puzzle.lines('day.23', 'input.txt')
            var nanobots = parse(lines)
            var nanobot = strongest(nanobots)
            expect(nanobot).to.deep.equal({ x:68647597, y:57952122, z:11099502, r:99192429 })

            var count = inRange(nanobot, nanobots)
            expect(count).to.equal(309)
		})
	})


})
