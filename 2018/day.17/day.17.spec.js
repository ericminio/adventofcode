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
			it('can read clay from vertical input', ()=>{
				expect(map.point(3, 4)).to.equal(1)
			})
			it('can read clay from horizontal input', ()=>{
				expect(map.point(7, 1)).to.equal(1)
				expect(map.point(7, 2)).to.equal(1)
				expect(map.point(7, 3)).to.equal(1)
				expect(map.point(7, 4)).to.equal(1)
				expect(map.point(7, 5)).to.equal(1)
				expect(map.point(7, 6)).to.equal(1)
				expect(map.point(7, 7)).to.equal(1)
			})
			it('leaves other points as sand', ()=>{
				expect(map.point(7, 0)).to.equal(0)
				expect(map.point(7, 8)).to.equal(0)
			})
        })
	})
})
