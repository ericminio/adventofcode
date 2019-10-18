const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    reduce
} = require('./lib')
describe.only('day 20 challenge', ()=> {

	describe('part 1', ()=>{

        it('has examples', ()=>{
            var examples = puzzle.lines('day.20', 'examples.txt')
            for (var i=0; i<examples.length; i++) {
                var example = examples[i]
                var input = example.substring(0, example.indexOf('-')).trim()
                var expected = example.substring(example.indexOf('-')+1).trim()

                expect(reduce(input)).to.equal(expected)
            }
        })

		it('works', ()=>{
			var directions = puzzle.line('day.20')

			expect(reduce(directions)).to.equal('3066')
		})
	})

    describe('reduce', ()=> {

        it('works with no branch', ()=>{
            expect(reduce('A')).to.equal('1')
            expect(reduce('AB')).to.equal('2')
            expect(reduce('ABC')).to.equal('3')
        })
        it('keeps the longest', ()=>{
            expect(reduce('(A|BC)')).to.equal('2')
        })
        it('works with one-level sub-group', ()=>{
            expect(reduce('DEF(A|BC)')).to.equal('5')
        })
        it('works with two one-level sub-groups', ()=>{
            expect(reduce('DEF(A|BC)(A|BC)')).to.equal('7')
        })
        it('works with 2 nested levels', ()=>{
            expect(reduce('333(4444|(22|55555))')).to.equal('8')
        })
        it('works with branches merging back', ()=>{
            expect(reduce('333(4444|22)22(55555|1)')).to.equal('14')
        })
        it('ignores not significant option', ()=>{
            expect(reduce('333(A|)22')).to.equal('5')
        })
        it('works with 2 operators', ()=>{
            expect(reduce('333(1|22|333)')).to.equal('6')
        })
    })
})
