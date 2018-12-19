const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
	digest,
	Map
} = require('./lib')

describe.only('day 17 challenge', ()=> {

    describe('part 1', ()=>{

        describe('exploration', ()=>{
			var map
			beforeEach(()=>{
				var lines = puzzle.lines('day.17', 'example.txt')
				map = digest(lines)
			})

			it('can read spring', ()=>{
				expect(map.point(0, 6)).to.equal(-1)
				for (var i=0; i<map.width(); i++) {
					if (i != 6) {
						expect(map.point(0, i)).to.equal(0)
					}
				}
			})
			it('can read height', ()=>{
				expect(map.height()).to.equal(14)
			})
        })
	})
})
