const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    reduce
} = require('./lib')
describe('day 20 challenge', ()=> {

	describe('part 1', ()=>{

        it('has examples', ()=>{
            var examples = puzzle.lines('day.20', 'examples.txt')
            for (var i=0; i<examples.length; i++) {
                var example = examples[i]
                var input = example.substring(0, example.indexOf('-')).trim()
                var expected = example.substring(example.indexOf('-')+1).trim()

                expect(''+reduce(input).length).to.equal(expected)
            }
        })

		it('works', ()=>{
			var directions = puzzle.line('day.20')

			expect(reduce(directions).length).to.equal(3207)
		})
	})

    describe('reduce', ()=> {

        it('works with no branch', ()=>{
            expect(reduce('A')).to.equal('A')
            expect(reduce('AB')).to.equal('AB')
            expect(reduce('ABC')).to.equal('ABC')
        })
        it('keeps the longest', ()=>{
            expect(reduce('(A|BC)')).to.equal('BC')
        })
        it('works with one-level sub-group', ()=>{
            expect(reduce('DEF(A|BC)')).to.equal('DEFBC')
        })
        it('works with two one-level sub-groups', ()=>{
            expect(reduce('DEF(A|BC)(A|XY)')).to.equal('DEFBCXY')
        })
        it('works with 2 nested levels', ()=>{
            expect(reduce('333(4444|(22|55555))')).to.equal('33355555')
        })
        it('works with branches merging back', ()=>{
            expect(reduce('333(4444|22)22(55555|1)')).to.equal('33344442255555')
        })
        it('ignores not significant option', ()=>{
            expect(reduce('333(1|)22')).to.equal('33322')
        })

        it('resists pointless branch', ()=>{
            expect(reduce('333(4444)22')).to.equal('333444422')
        })
        it('works with 2 operators', ()=>{
            expect(reduce('333(1|22|4444)')).to.equal('3334444')
        })
    })
})
