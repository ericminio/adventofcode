const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
	run,
	divisors
} = require('./lib')

describe('day 21 challenge', ()=> {

	describe('part 1', ()=>{

		var start
		beforeEach(()=>{
			start = [0, 0, 0, 0, 0, 0]
		})

		it('is solved', ()=>{
			var lines = puzzle.lines('day.21', 'input.txt')
			var pointer = parseInt(lines[0].substring(4))
			var registers = run({ break:'eqrr 4 0 3', registers:start, pointer:pointer, instructions:lines })

			expect(registers[4]).to.equal(10720163)
		})

	})


})
