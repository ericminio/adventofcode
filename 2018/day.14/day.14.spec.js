const { expect } = require('chai')
var deepEqual = require('deep-equal')

describe('day 14 challenge', ()=> {

	var board
	var elves
	var sum
	beforeEach(()=>{
		board = []
		board.push(3)
		board.push(7)
		elves = [0, 1]
	})

	var explore = function(board, elves) {
		sum = board[elves[0]] + board[elves[1]]
		if (sum < 10) {
			board.push(sum)
		}
		else {
			board.push(1)
			board.push(sum - 10)
		}
		for (var i=0; i<elves.length; i++) {
			elves[i] = (elves[i] + board[elves[i]] + 1) % board.length
		}
		return sum
	}

	describe('part 1', ()=>{

		var score = function(options) {
			while(options.board.length < (options.first + options.after)) {
				explore(options.board, options.elves)
			}
			if (options.board.length > options.after + options.first) {
				options.board.pop()
			}
			return options.board.slice(-options.after).join('')
		}

		it('can be explored', ()=>{
			expect(score({ after:2, first:7, board:board, elves:elves })).to.equal('24')
		})

        it('has an example #1', ()=>{
            expect(score({ after:10, first:9, board:board, elves:elves })).to.equal('5158916779')
        })
        it('has an example #2', ()=>{
            expect(score({ after:10, first:5, board:board, elves:elves })).to.equal('0124515891')
        })
        it('has an example #3', ()=>{
            expect(score({ after:10, first:18, board:board, elves:elves })).to.equal('9251071085')
        })
        it('has an example #4', ()=>{
            expect(score({ after:10, first:2018, board:board, elves:elves })).to.equal('5941429882')
        })
        it('is solved', ()=>{
            expect(score({ after:10, first:540391, board:board, elves:elves })).to.equal('1474315445')
        })


    })

	describe('part 2', ()=>{

		var found
		var tail
		var i
		var search = function(target) {
			found = -1
			while (found == -1) {
				var sum = board[elves[0]] + board[elves[1]]
				var toBeAdded = []
				if (sum < 10) {
					toBeAdded.push(sum)
				}
				else {
					toBeAdded.push(1)
					toBeAdded.push(sum - 10)
				}

				for (var i=0; i<toBeAdded.length; i++) {
					board.push(toBeAdded[i])
					tail = board.slice(-target.length)
					found = deepEqual(tail, target)? board.length-target.length : -1

					if (found != -1) {
						break
					}
				}
				for (var i=0; i<elves.length; i++) {
					elves[i] = (elves[i] + board[elves[i]] + 1) % board.length
				}
			}
			return found
		}
		it('part 2 example #1', ()=>{
			expect(search([5, 1, 5, 8, 9])).to.equal(9)
		})
		it('part 2 example #2', ()=>{
			expect(search([0, 1, 2, 4, 5])).to.equal(5)
		})
		it('part 2 example #3', ()=>{
			expect(search([9, 2, 5, 1, 0])).to.equal(18)
		})
		it('part 2 example #4', ()=>{
			expect(search([5, 9, 4, 1, 4])).to.equal(2018)
		})
		it.skip('is solved', ()=>{
			expect(search([5, 4, 0, 3, 9, 1])).to.equal(20278122)
		})
	})
})
