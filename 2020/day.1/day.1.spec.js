const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')

describe('day 1 challenge', ()=> {

    describe('input', ()=>{

        let input
        let candidates
        beforeEach(()=>{
            input = puzzle('day.1').map(s => parseInt(s))
            candidates = input.filter(i => i < (2020-55))
        })

        it('is big', ()=>{
            expect(input.length).to.equal(200)
        })
        it('has a minimum', ()=>{
            expect(Math.min.apply(null, input)).to.equal(55);
        })
        it('has a maximum', ()=>{
            expect(Math.max.apply(null, input)).to.equal(2008);
        })
        it('can be reduced', ()=>{
            let entries = input.filter(i => i < (2020-55))
            expect(entries.length).to.equal(177)
        })

        it('has an hidden answer for part 1', ()=>{
            let answer
            for (var i=0; i<candidates.length; i++) {
                for (var j=0; j<candidates.length; j++) {
                    if (candidates[i] + candidates[j] == 2020) {
                        answer = candidates[i] * candidates[j];
                    }
                }
            }
            expect(answer).to.equal(970816)
        })
        it('has an hidden answer for part 2', ()=>{
            let answer
            for (var i=0; i<candidates.length; i++) {
                for (var j=0; j<candidates.length; j++) {
                    for (var k=0; k<candidates.length; k++) {
                        if (candidates[i] + candidates[j] + candidates[k] == 2020) {
                            answer = candidates[i] * candidates[j] * candidates[k];
                        }
                    }
                }
            }
            expect(answer).to.equal(96047280)
        })
    })

})
