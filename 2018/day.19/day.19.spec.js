const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
	run,
	divisors
} = require('./lib')

describe('day 19 challenge', ()=> {

	var lines
	var pointer
	beforeEach(()=>{
		lines = puzzle.lines('day.19', 'input.txt')
		pointer = parseInt(lines[0].substring(4))
	})

	describe('part 1', ()=>{

		var start
		beforeEach(()=>{
			start = [0, 0, 0, 0, 0, 0]
		})

		it('has an example', ()=>{
			var lines = puzzle.lines('day.19', 'example.txt')
			var pointer = parseInt(lines[0].substring(4))
			var registers = run({ registers:start, pointer:pointer, instructions:lines })

			expect(registers).to.deep.equal([6, 5, 6, 0, 0, 9])
		})
		it.skip('solves the puzzle in O(n2)', ()=>{
			var registers = run({ registers:start, pointer:pointer, instructions:lines })

			expect(registers).to.deep.equal([1228, 867, 868, 868, 1, 256])
		})

		describe('other story', ()=>{

			it('is about a number visible after 15 instructions', ()=>{
				var registers = run({ count:15, registers:start, pointer:pointer, instructions:lines })
				var number = registers[1]

				expect(number).to.equal(867)
			})
			it('makes the puzzle solvable in O(n)', ()=>{
				var registers = run({ count:15, registers:start, pointer:pointer, instructions:lines })
				var number = registers[1]
				var sum = divisors(number).reduce((acc, current)=> acc+current, 0)

				expect(sum).to.equal(1228)
			})
		})
	})

	describe('part 2', ()=>{

		var start
		beforeEach(()=>{
			start = [1, 0, 0, 0, 0, 0]
		})

		it('exposes target after 20 instructions', ()=>{
			var number = run({ count:20, registers:start, pointer:pointer, instructions:lines })[1]

			expect(number).to.equal(10551267)
		})
		it('is solved', ()=>{
			var number = run({ count:20, registers:start, pointer:pointer, instructions:lines })[1]
			var sum = divisors(number).reduce((acc, current)=> acc+current, 0)

			expect(sum).to.equal(15285504)
		})
	})


})
